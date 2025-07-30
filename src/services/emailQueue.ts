import { Queue, Worker, Job } from 'bullmq';
import { redisConfigForBullMQ } from '../config/redis';
import { EmailJob, EmailContext, EmailJobResult } from '../types';
import { sendEmail } from './emailService';
import { logger } from '../utils/logger';
import { supabase } from '../config/database';

// Create email queue
export const emailQueue = new Queue('email-queue', {
  connection: redisConfigForBullMQ.connection,
  prefix: redisConfigForBullMQ.prefix,
});

// Email worker
export const emailWorker = new Worker(
  'email-queue',
  async (job: Job<EmailJob>) => {
    const { data } = job;
    logger.info(`Processing email job ${job.id} for ${data.to}`);

    try {
      // Send email
      await sendEmail(data);
      
      // Log to database
      await logEmailNotification(data, 'sent');
      
      logger.info(`Email sent successfully: ${job.id}`);
      return { success: true, jobId: job.id };
    } catch (error) {
      logger.error(`Email job ${job.id} failed:`, error);
      
      // Log to database
      await logEmailNotification(data, 'failed', error instanceof Error ? error.message : 'Unknown error');
      
      throw error;
    }
  },
  {
    connection: redisConfigForBullMQ.connection,
    prefix: redisConfigForBullMQ.prefix,
    concurrency: 5, // Process 5 emails concurrently
    removeOnComplete: { count: 100 }, // Keep last 100 completed jobs
    removeOnFail: { count: 50 }, // Keep last 50 failed jobs
  }
);

// Add email to queue
export const addEmailToQueue = async (
  emailJob: EmailJob,
  options?: {
    priority?: number;
    delay?: number;
    attempts?: number;
  }
): Promise<EmailJobResult> => {
  try {
    const job = await emailQueue.add(
      'send-email',
      emailJob,
      {
        priority: options?.priority || 0,
        delay: options?.delay || 0,
        attempts: options?.attempts || parseInt(process.env.EMAIL_RETRY_ATTEMPTS || '3'),
        backoff: {
          type: 'exponential',
          delay: parseInt(process.env.EMAIL_RETRY_DELAY || '5000'),
        },
        removeOnComplete: { count: 100 },
        removeOnFail: { count: 50 },
      }
    );

    logger.info(`Email job added to queue: ${job.id}`);
    
    return {
      success: true,
      jobId: job.id || '',
      message: 'Email queued successfully'
    };
  } catch (error) {
    logger.error('Failed to add email to queue:', error);
    return {
      success: false,
      jobId: '',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Get queue status
export const getQueueStatus = async () => {
  const waiting = await emailQueue.getWaiting();
  const active = await emailQueue.getActive();
  const completed = await emailQueue.getCompleted();
  const failed = await emailQueue.getFailed();
  const delayed = await emailQueue.getDelayed();

  return {
    waiting: waiting.length,
    active: active.length,
    completed: completed.length,
    failed: failed.length,
    delayed: delayed.length,
  };
};

// Log email notification to database
const logEmailNotification = async (
  emailJob: EmailJob,
  status: 'sent' | 'failed',
  errorMessage?: string
) => {
  try {
    const { error } = await supabase
      .from('email_notifications')
      .insert({
        user_id: emailJob.userId,
        organization_id: emailJob.organizationId || null,
        reference_id: emailJob.referenceId || null,
        to_email: emailJob.to,
        context: emailJob.context,
        status: status === 'sent' ? 'sent' : 'failed',
        error_message: errorMessage || null,
        // Removed sent_at field as it doesn't exist in the database schema
      });

    if (error) {
      logger.error('Failed to log email notification:', error);
    }
  } catch (error) {
    logger.error('Error logging email notification:', error);
  }
};

// Worker event handlers
emailWorker.on('completed', (job) => {
  logger.info(`Email job ${job.id} completed successfully`);
});

emailWorker.on('failed', (job, err) => {
  logger.error(`Email job ${job?.id} failed:`, err);
});

emailWorker.on('error', (err) => {
  logger.error('Email worker error:', err);
}); 