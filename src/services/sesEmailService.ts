import AWS from "aws-sdk";
import { EmailJob } from "../types";
import { logger } from "../utils/logger";

// Configure AWS SES
const ses = new AWS.SES({
  region: process.env.AWS_SES_REGION || "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const sendEmail = async (emailJob: EmailJob): Promise<void> => {
  try {
    const { to, subject, html } = emailJob;

    logger.info(`Sending email via SES to: ${to}, subject: ${subject}`);

    // In development with placeholder credentials, just log the email
    if (
      !process.env.AWS_ACCESS_KEY_ID ||
      process.env.AWS_ACCESS_KEY_ID === "placeholder"
    ) {
      logger.info(`[DEV MODE] SES Email would be sent to: ${to}`);
      logger.info(`[DEV MODE] Subject: ${subject}`);
      logger.info(`[DEV MODE] HTML: ${html.substring(0, 100)}...`);
      return;
    }

    const params = {
      Source: process.env.FROM_EMAIL || "noreply@app.intune.bio",
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: html,
            Charset: "UTF-8",
          },
        },
      },
    };

    const result = await ses.sendEmail(params).promise();
    logger.info(
      `Email sent successfully to ${to}, message ID: ${result.MessageId}`
    );
  } catch (error) {
    logger.error("SES email sending failed:", error);
    throw error;
  }
};

export const sendBatchEmails = async (emailJobs: EmailJob[]): Promise<void> => {
  try {
    logger.info(`Sending batch of ${emailJobs.length} emails via SES`);

    // In development with placeholder credentials, just log the emails
    if (
      !process.env.AWS_ACCESS_KEY_ID ||
      process.env.AWS_ACCESS_KEY_ID === "placeholder"
    ) {
      logger.info(`[DEV MODE] SES Batch emails would be sent:`);
      emailJobs.forEach((emailJob, index) => {
        logger.info(
          `[DEV MODE] Email ${index + 1}: ${emailJob.to} - ${emailJob.subject}`
        );
      });
      return;
    }

    // Process emails in batches of 10 (SES limit for bulk sending)
    const batchSize = 10;
    for (let i = 0; i < emailJobs.length; i += batchSize) {
      const batch = emailJobs.slice(i, i + batchSize);

      const bulkParams = {
        Source: process.env.FROM_EMAIL || "noreply@app.intune.bio",
        Destinations: batch.map((emailJob) => ({
          Destination: {
            ToAddresses: [emailJob.to],
          },
          ReplacementTemplateData: JSON.stringify({
            subject: emailJob.subject,
            html: emailJob.html,
          }),
        })),
        DefaultTemplateData: JSON.stringify({
          subject: "Default Subject",
          html: "<p>Default content</p>",
        }),
        Template: "email-template", // You'll need to create this template in SES
      };

      try {
        const result = await ses.sendBulkTemplatedEmail(bulkParams).promise();
        logger.info(`Batch ${Math.floor(i / batchSize) + 1} sent successfully`);
      } catch (error) {
        logger.error(`Batch ${Math.floor(i / batchSize) + 1} failed:`, error);
        throw error;
      }
    }

    logger.info(`All batch emails sent successfully`);
  } catch (error) {
    logger.error("SES batch email sending failed:", error);
    throw error;
  }
};

// Alternative method for batch sending without templates
export const sendBatchEmailsSimple = async (
  emailJobs: EmailJob[]
): Promise<void> => {
  try {
    logger.info(
      `Sending batch of ${emailJobs.length} emails via SES (simple method)`
    );

    // In development with placeholder credentials, just log the emails
    if (
      !process.env.AWS_ACCESS_KEY_ID ||
      process.env.AWS_ACCESS_KEY_ID === "placeholder"
    ) {
      logger.info(`[DEV MODE] SES Batch emails would be sent:`);
      emailJobs.forEach((emailJob, index) => {
        logger.info(
          `[DEV MODE] Email ${index + 1}: ${emailJob.to} - ${emailJob.subject}`
        );
      });
      return;
    }

    // Send emails individually (SES doesn't have a simple bulk send without templates)
    const promises = emailJobs.map(async (emailJob) => {
      try {
        await sendEmail(emailJob);
      } catch (error) {
        logger.error(`Failed to send email to ${emailJob.to}:`, error);
        throw error;
      }
    });

    await Promise.all(promises);
    logger.info(`All batch emails sent successfully`);
  } catch (error) {
    logger.error("SES batch email sending failed:", error);
    throw error;
  }
};
