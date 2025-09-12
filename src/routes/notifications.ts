import express from 'express';
import { logger } from '../utils/logger';
import {
  createNotification,
  createBulkNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUserNotifications,
  getUnreadNotificationCount,
  NotificationData,
} from '../services/notificationService';

const router = express.Router();

/**
 * POST /notifications
 * Create a new notification
 */
router.post('/', async (req, res) => {
  try {
    const notificationData: NotificationData = req.body;

    // Validate required fields
    if (!notificationData.userId || !notificationData.message || !notificationData.context) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userId, message, context',
      });
    }

    const result = await createNotification(notificationData);

    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(500).json(result);
    }
  } catch (error) {
    logger.error('Error in POST /notifications:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

/**
 * POST /notifications/bulk
 * Create multiple notifications
 */
router.post('/bulk', async (req, res) => {
  try {
    const notifications: NotificationData[] = req.body;

    if (!Array.isArray(notifications) || notifications.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Request body must be a non-empty array of notifications',
      });
    }

    // Validate each notification
    for (const notification of notifications) {
      if (!notification.userId || !notification.message || !notification.context) {
        return res.status(400).json({
          success: false,
          error: 'Each notification must have userId, message, and context',
        });
      }
    }

    const results = await createBulkNotifications(notifications);
    return res.status(201).json({ results });
  } catch (error) {
    logger.error('Error in POST /notifications/bulk:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

/**
 * GET /notifications/user/:userId
 * Get notifications for a specific user
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const result = await getUserNotifications(userId, limit, offset);

    if (result.error) {
      return res.status(500).json({
        success: false,
        error: result.error,
      });
    } else {
      return res.json({
        success: true,
        data: result.data,
        pagination: {
          limit,
          offset,
          hasMore: result.data.length === limit,
        },
      });
    }
  } catch (error) {
    logger.error('Error in GET /notifications/user/:userId:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

/**
 * GET /notifications/user/:userId/unread-count
 * Get unread notification count for a user
 */
router.get('/user/:userId/unread-count', async (req, res) => {
  try {
    const { userId } = req.params;
    const count = await getUnreadNotificationCount(userId);

    return res.json({
      success: true,
      count,
    });
  } catch (error) {
    logger.error('Error in GET /notifications/user/:userId/unread-count:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

/**
 * PUT /notifications/:notificationId/read
 * Mark a specific notification as read
 */
router.put('/:notificationId/read', async (req, res) => {
  try {
    const { notificationId } = req.params;
    const success = await markNotificationAsRead(notificationId);

    if (success) {
      return res.json({ success: true });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Failed to mark notification as read',
      });
    }
  } catch (error) {
    logger.error('Error in PUT /notifications/:notificationId/read:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

/**
 * PUT /notifications/user/:userId/read-all
 * Mark all notifications for a user as read
 */
router.put('/user/:userId/read-all', async (req, res) => {
  try {
    const { userId } = req.params;
    const success = await markAllNotificationsAsRead(userId);

    if (success) {
      return res.json({ success: true });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Failed to mark all notifications as read',
      });
    }
  } catch (error) {
    logger.error('Error in PUT /notifications/user/:userId/read-all:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

export default router;
