import { Resend } from 'resend';
import { EmailJob } from '../types';
import { logger } from '../utils/logger';

const resendApiKey = process.env.RESEND_API_KEY || 'placeholder-resend-key';
const resend = new Resend(resendApiKey);

export const sendEmail = async (emailJob: EmailJob): Promise<void> => {
  try {
    const { to, subject, html } = emailJob;
    
    logger.info(`Sending email to: ${to}, subject: ${subject}`);

    // In development with placeholder API key, just log the email
    if (resendApiKey === 'placeholder-resend-key') {
      logger.info(`[DEV MODE] Email would be sent to: ${to}`);
      logger.info(`[DEV MODE] Subject: ${subject}`);
      logger.info(`[DEV MODE] HTML: ${html.substring(0, 100)}...`);
      return;
    }

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Intune <noreply@app.intune.bio>',
      to: [to],
      subject,
      html,
    });

    if (error) {
      logger.error('Resend API error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    logger.info(`Email sent successfully to ${to}, message ID: ${data?.id}`);
  } catch (error) {
    logger.error('Email sending failed:', error);
    throw error;
  }
};

export const sendBatchEmails = async (emailJobs: EmailJob[]): Promise<void> => {
  try {
    const messages = emailJobs.map((emailJob) => ({
      from: process.env.FROM_EMAIL || 'Intune <noreply@app.intune.bio>',
      to: [emailJob.to],
      subject: emailJob.subject,
      html: emailJob.html,
    }));

    logger.info(`Sending batch of ${messages.length} emails`);

    // In development with placeholder API key, just log the emails
    if (resendApiKey === 'placeholder-resend-key') {
      logger.info(`[DEV MODE] Batch emails would be sent:`);
      messages.forEach((msg, index) => {
        logger.info(`[DEV MODE] Email ${index + 1}: ${msg.to[0]} - ${msg.subject}`);
      });
      return;
    }

    const { data, error } = await resend.batch.send(messages);

    if (error) {
      logger.error('Resend batch API error:', error);
      throw new Error(`Failed to send batch emails: ${error.message}`);
    }

    logger.info(`Batch emails sent successfully`);
  } catch (error) {
    logger.error('Batch email sending failed:', error);
    throw error;
  }
}; 