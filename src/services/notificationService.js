import api from './api';

const notificationService = {
  // Get all notifications
  getNotifications: async (filters = {}) => {
    try {
      const response = await api.get('/api/notifications', { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get notifications error:', error);
      throw error;
    }
  },

  // Get unread count
  getUnreadCount: async (type = null) => {
    try {
      const params = type ? { type } : {};
      const response = await api.get('/api/notifications/unread-count', { params });
      return response.data;
    } catch (error) {
      console.log('Get unread count error:', error);
      throw error;
    }
  },

  // Get notifications by type
  getNotificationsByType: async (type, filters = {}) => {
    try {
      const response = await api.get(`/api/notifications/type/${type}`, { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get notifications by type error:', error);
      throw error;
    }
  },

  // Get notifications by priority
  getNotificationsByPriority: async (priority, filters = {}) => {
    try {
      const response = await api.get(`/api/notifications/priority/${priority}`, { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get notifications by priority error:', error);
      throw error;
    }
  },

  // Mark all notifications as read
  markAllAsRead: async (type = null) => {
    try {
      const params = type ? { type } : {};
      const response = await api.put('/api/notifications/read-all', {}, { params });
      return response.data;
    } catch (error) {
      console.log('Mark all as read error:', error);
      throw error;
    }
  },

  // Delete all read notifications
  deleteAllRead: async () => {
    try {
      const response = await api.delete('/api/notifications/read');
      return response.data;
    } catch (error) {
      console.log('Delete all read error:', error);
      throw error;
    }
  },

  // Delete old notifications (admin only)
  deleteOldNotifications: async (days = 30) => {
    try {
      const response = await api.delete('/api/notifications/cleanup/old', { params: { days } });
      return response.data;
    } catch (error) {
      console.log('Delete old notifications error:', error);
      throw error;
    }
  },

  // Delete expired notifications (admin only)
  deleteExpiredNotifications: async () => {
    try {
      const response = await api.delete('/api/notifications/cleanup/expired');
      return response.data;
    } catch (error) {
      console.log('Delete expired notifications error:', error);
      throw error;
    }
  },

  // Get notification by ID
  getNotificationById: async (notificationId) => {
    try {
      const response = await api.get(`/api/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      console.log('Get notification by ID error:', error);
      throw error;
    }
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    try {
      const response = await api.put(`/api/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      console.log('Mark as read error:', error);
      throw error;
    }
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    try {
      const response = await api.delete(`/api/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      console.log('Delete notification error:', error);
      throw error;
    }
  }
};

export default notificationService;
