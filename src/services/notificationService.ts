import { supabase } from '../config/database';
import { logger } from '../utils/logger';

export interface NotificationData {
  userId: string;
  organizationId?: string;
  context: string;
  referenceId?: string;
  message: string;
  metadata?: Record<string, any>;
}

export interface NotificationResult {
  success: boolean;
  notificationId?: string;
  error?: string;
}

/**
 * Create a new notification in the database
 * This will trigger the postgres_changes event that the frontend subscribes to
 */
export const createNotification = async (data: NotificationData): Promise<NotificationResult> => {
  try {
    logger.info(`Creating notification for user ${data.userId}: ${data.message}`);

    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({
        user_id: data.userId,
        org_id: data.organizationId,
        context: data.context,
        reference_id: data.referenceId,
        message: data.message,
        metadata: data.metadata,
        is_read: false,
      })
      .select('id')
      .single();

    if (error) {
      logger.error('Failed to create notification:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    logger.info(`Notification created successfully with ID: ${notification.id}`);
    return {
      success: true,
      notificationId: notification.id,
    };
  } catch (error) {
    logger.error('Error creating notification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Create notifications for multiple users
 */
export const createBulkNotifications = async (
  notifications: NotificationData[]
): Promise<NotificationResult[]> => {
  try {
    logger.info(`Creating ${notifications.length} notifications`);

    const notificationInserts = notifications.map(notification => ({
      user_id: notification.userId,
      org_id: notification.organizationId,
      context: notification.context,
      reference_id: notification.referenceId,
      message: notification.message,
      metadata: notification.metadata,
      is_read: false,
    }));

    const { data, error } = await supabase
      .from('notifications')
      .insert(notificationInserts)
      .select('id, user_id');

    if (error) {
      logger.error('Failed to create bulk notifications:', error);
      return notifications.map(() => ({
        success: false,
        error: error.message,
      }));
    }

    logger.info(`Successfully created ${data.length} notifications`);
    return data.map(notification => ({
      success: true,
      notificationId: notification.id,
    }));
  } catch (error) {
    logger.error('Error creating bulk notifications:', error);
    return notifications.map(() => ({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }));
  }
};

/**
 * Mark a notification as read
 */
export const markNotificationAsRead = async (notificationId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) {
      logger.error('Failed to mark notification as read:', error);
      return false;
    }

    return true;
  } catch (error) {
    logger.error('Error marking notification as read:', error);
    return false;
  }
};

/**
 * Mark all notifications for a user as read
 */
export const markAllNotificationsAsRead = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
        .eq('is_read', false);

    if (error) {
      logger.error('Failed to mark all notifications as read:', error);
      return false;
    }

    return true;
  } catch (error) {
    logger.error('Error marking all notifications as read:', error);
    return false;
  }
};

/**
 * Get notifications for a user
 */
export const getUserNotifications = async (
  userId: string,
  limit: number = 50,
  offset: number = 0
) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      logger.error('Failed to get user notifications:', error);
      return { data: [], error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    logger.error('Error getting user notifications:', error);
    return { data: [], error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * Get unread notification count for a user
 */
export const getUnreadNotificationCount = async (userId: string): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
        .eq('is_read', false);

    if (error) {
      logger.error('Failed to get unread notification count:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    logger.error('Error getting unread notification count:', error);
    return 0;
  }
};
