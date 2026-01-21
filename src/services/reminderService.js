import api from './api';

const reminderService = {
  // Create a new reminder
  createReminder: async (reminderData) => {
    try {
      const response = await api.post('/api/reminders', reminderData);
      return response.data;
    } catch (error) {
      console.log('Create reminder error:', error);
      throw error;
    }
  },

  // Get all reminders
  getReminders: async (filters = {}) => {
    try {
      const response = await api.get('/api/reminders', { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get reminders error:', error);
      throw error;
    }
  },

  // Get upcoming reminders
  getUpcomingReminders: async (days = 7) => {
    try {
      const response = await api.get('/api/reminders/upcoming', { params: { days } });
      return response.data;
    } catch (error) {
      console.log('Get upcoming reminders error:', error);
      throw error;
    }
  },

  // Delete old reminders (admin only)
  deleteOldReminders: async (days = 90) => {
    try {
      const response = await api.delete('/api/reminders/cleanup', { params: { days } });
      return response.data;
    } catch (error) {
      console.log('Delete old reminders error:', error);
      throw error;
    }
  },

  // Get reminders for a specific case
  getCaseReminders: async (caseId, filters = {}) => {
    try {
      const response = await api.get(`/api/reminders/cases/${caseId}`, { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get case reminders error:', error);
      throw error;
    }
  },

  // Get a single reminder by ID
  getReminderById: async (reminderId) => {
    try {
      const response = await api.get(`/api/reminders/${reminderId}`);
      return response.data;
    } catch (error) {
      console.log('Get reminder by ID error:', error);
      throw error;
    }
  },

  // Update a reminder
  updateReminder: async (reminderId, reminderData) => {
    try {
      const response = await api.put(`/api/reminders/${reminderId}`, reminderData);
      return response.data;
    } catch (error) {
      console.log('Update reminder error:', error);
      throw error;
    }
  },

  // Cancel a reminder
  cancelReminder: async (reminderId) => {
    try {
      const response = await api.delete(`/api/reminders/${reminderId}`);
      return response.data;
    } catch (error) {
      console.log('Cancel reminder error:', error);
      throw error;
    }
  },

  // Snooze a reminder
  snoozeReminder: async (reminderId, duration) => {
    try {
      const response = await api.put(`/api/reminders/${reminderId}/snooze`, { duration });
      return response.data;
    } catch (error) {
      console.log('Snooze reminder error:', error);
      throw error;
    }
  },

  // Dismiss a reminder
  dismissReminder: async (reminderId) => {
    try {
      const response = await api.put(`/api/reminders/${reminderId}/dismiss`);
      return response.data;
    } catch (error) {
      console.log('Dismiss reminder error:', error);
      throw error;
    }
  }
};

export default reminderService;
