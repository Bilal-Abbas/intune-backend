import { createNotification, NotificationData } from '../services/notificationService';
import { logger } from './logger';

/**
 * Helper function to send a notification when a message is received
 */
export const notifyMessageReceived = async (
  recipientUserId: string,
  senderName: string,
  threadId: string,
  organizationId?: string
) => {
  try {
    await createNotification({
      userId: recipientUserId,
      organizationId,
      context: 'message_received',
      referenceId: threadId,
      message: `You have received a new message from ${senderName}`,
      metadata: {
        senderName,
        threadId,
        type: 'message',
      },
    });
    logger.info(`Message notification sent to user ${recipientUserId}`);
  } catch (error) {
    logger.error('Failed to send message notification:', error);
  }
};

/**
 * Helper function to send a notification when a proposal is received
 */
export const notifyProposalReceived = async (
  recipientUserId: string,
  senderOrgName: string,
  proposalId: string,
  organizationId?: string
) => {
  try {
    await createNotification({
      userId: recipientUserId,
      organizationId,
      context: 'proposal_received',
      referenceId: proposalId,
      message: `You have received a new proposal from ${senderOrgName}`,
      metadata: {
        senderOrgName,
        proposalId,
        type: 'proposal',
      },
    });
    logger.info(`Proposal notification sent to user ${recipientUserId}`);
  } catch (error) {
    logger.error('Failed to send proposal notification:', error);
  }
};

/**
 * Helper function to send a notification when a proposal status changes
 */
export const notifyProposalStatusChange = async (
  recipientUserId: string,
  proposalTitle: string,
  status: 'accepted' | 'rejected',
  proposalId: string,
  organizationId?: string
) => {
  try {
    const context = status === 'accepted' ? 'proposal_accepted' : 'proposal_rejected';
    const message = status === 'accepted' 
      ? `Your proposal "${proposalTitle}" has been accepted`
      : `Your proposal "${proposalTitle}" has been rejected`;

    await createNotification({
      userId: recipientUserId,
      organizationId,
      context,
      referenceId: proposalId,
      message,
      metadata: {
        proposalTitle,
        status,
        proposalId,
        type: 'proposal_status',
      },
    });
    logger.info(`Proposal status notification sent to user ${recipientUserId}`);
  } catch (error) {
    logger.error('Failed to send proposal status notification:', error);
  }
};

/**
 * Helper function to send a notification when a study is created
 */
export const notifyStudyCreated = async (
  userId: string,
  studyName: string,
  studyId: string,
  organizationId?: string
) => {
  try {
    await createNotification({
      userId,
      organizationId,
      context: 'study_created',
      referenceId: studyId,
      message: `Your study "${studyName}" has been created successfully`,
      metadata: {
        studyName,
        studyId,
        type: 'study',
      },
    });
    logger.info(`Study creation notification sent to user ${userId}`);
  } catch (error) {
    logger.error('Failed to send study creation notification:', error);
  }
};

/**
 * Helper function to send a notification when a document is uploaded
 */
export const notifyDocumentUploaded = async (
  userId: string,
  documentName: string,
  documentId: string,
  entityType: 'study' | 'site',
  entityId: string,
  organizationId?: string
) => {
  try {
    await createNotification({
      userId,
      organizationId,
      context: 'document_uploaded',
      referenceId: documentId,
      message: `A new document "${documentName}" has been uploaded to your ${entityType}`,
      metadata: {
        documentName,
        documentId,
        entityType,
        entityId,
        type: 'document',
      },
    });
    logger.info(`Document upload notification sent to user ${userId}`);
  } catch (error) {
    logger.error('Failed to send document upload notification:', error);
  }
};

/**
 * Helper function to send a system announcement
 */
export const notifySystemAnnouncement = async (
  userIds: string[],
  title: string,
  message: string,
  announcementId?: string
) => {
  try {
    const notifications: NotificationData[] = userIds.map(userId => ({
      userId,
      context: 'system_announcement',
      referenceId: announcementId,
      message: `${title}: ${message}`,
      metadata: {
        title,
        announcementId,
        type: 'system_announcement',
      },
    }));

    // Use bulk notification for efficiency
    const { createBulkNotifications } = await import('../services/notificationService');
    await createBulkNotifications(notifications);
    
    logger.info(`System announcement sent to ${userIds.length} users`);
  } catch (error) {
    logger.error('Failed to send system announcement:', error);
  }
};



