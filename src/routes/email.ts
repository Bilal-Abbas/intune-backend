import { Router, Request, Response } from "express";
import Joi from "joi";
import { randomUUID } from "crypto";
import { authenticateToken, requireAuth } from "../middleware/auth";
import { addEmailToQueue, getQueueStatus } from "../services/emailQueue";
import { EmailJob, EmailContext } from "../types";
import { logger } from "../utils/logger";

const router = Router();

// Validation schema for email job
const emailJobSchema = Joi.object({
  to: Joi.string().email().required(),
  userId: Joi.string().uuid().required(),
  organizationId: Joi.string().uuid().optional(),
  referenceId: Joi.string().uuid().optional(),
  context: Joi.string()
    .valid(...Object.values(EmailContext))
    .required(),
  subject: Joi.string().min(1).max(200).required(),
  html: Joi.string().min(1).required(),
  priority: Joi.number().min(0).max(10).optional(),
  delay: Joi.number().min(0).optional(),
  attempts: Joi.number().min(1).max(10).optional(),
});

// Validation schema for batch email jobs
const batchEmailJobSchema = Joi.object({
  emails: Joi.array().items(emailJobSchema).min(1).max(100).required(),
});

// Add single email to queue
router.post(
  "/queue",
  authenticateToken,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const { error, value } = emailJobSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          error: "Validation error",
          message: error.details[0].message,
          details: error.details,
        });
      }

      const emailJob: EmailJob = {
        ...value,
        id: randomUUID(),
      };

      const result = await addEmailToQueue(emailJob, {
        priority: value.priority,
        delay: value.delay,
        attempts: value.attempts,
      });

      if (!result.success) {
        console.error("Failed to queue email:", result.error);
        return res.status(500).json({
          error: "Failed to queue email",
          message: result.error,
        });
      }

      logger.info(`Email queued by user ${req.user?.id}: ${result.jobId}`);

      return res.status(200).json({
        success: true,
        jobId: result.jobId,
        message: "Email queued successfully",
      });
    } catch (error) {
      console.error("Error queuing email:", error);
      logger.error("Error queuing email:", error);
      return res.status(500).json({
        error: "Internal server error",
        message: "Failed to queue email",
      });
    }
  }
);

// Add batch emails to queue
router.post(
  "/queue/batch",
  authenticateToken,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const { error, value } = batchEmailJobSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          error: "Validation error",
          message: error.details[0].message,
          details: error.details,
        });
      }

      const results = [];
      const errors = [];

      for (let i = 0; i < value.emails.length; i++) {
        const emailData = value.emails[i];

        const emailJob: EmailJob = {
          ...emailData,
          id: randomUUID(),
        };

        const result = await addEmailToQueue(emailJob);

        if (result.success) {
          results.push({
            email: emailJob.to,
            jobId: result.jobId,
            success: true,
          });
        } else {
          errors.push({
            email: emailJob.to,
            error: result.error,
            success: false,
          });
        }
      }

      logger.info(
        `Batch emails queued by user ${req.user?.id}: ${results.length} successful, ${errors.length} failed`
      );

      return res.status(200).json({
        success: true,
        total: value.emails.length,
        successful: results.length,
        failed: errors.length,
        results,
        errors,
      });
    } catch (error) {
      logger.error("Error queuing batch emails:", error);
      return res.status(500).json({
        error: "Internal server error",
        message: "Failed to queue batch emails",
      });
    }
  }
);

// Get queue status
router.get(
  "/queue/status",
  authenticateToken,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const status = await getQueueStatus();

      return res.status(200).json({
        success: true,
        status,
      });
    } catch (error) {
      console.error("Error getting queue status:", error);
      logger.error("Error getting queue status:", error);
      return res.status(500).json({
        error: "Internal server error",
        message: "Failed to get queue status",
      });
    }
  }
);

// Health check endpoint
router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Email queue service is healthy",
    timestamp: new Date().toISOString(),
  });
});

export default router;
