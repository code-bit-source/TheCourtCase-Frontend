import api from './api';

const activityService = {
  // Get all activities for a specific case
  getCaseActivities: async (caseId, filters = {}) => {
    try {
      const response = await api.get(`/api/activities/cases/${caseId}/activities`, { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get case activities error:', error);
      throw error;
    }
  },

  // Get complete timeline for a case
  getCaseTimeline: async (caseId) => {
    try {
      const response = await api.get(`/api/activities/cases/${caseId}/timeline`);
      return response.data;
    } catch (error) {
      console.log('Get case timeline error:', error);
      throw error;
    }
  },

  // Get activity statistics for a case
  getActivityStats: async (caseId) => {
    try {
      const response = await api.get(`/api/activities/cases/${caseId}/stats`);
      return response.data;
    } catch (error) {
      console.log('Get activity stats error:', error);
      throw error;
    }
  },

  // Get current user's activity history
  getUserActivity: async (filters = {}) => {
    try {
      const response = await api.get('/api/activities/my-activity', { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get user activity error:', error);
      throw error;
    }
  },

  // Get recent activities across all accessible cases
  getRecentActivities: async (filters = {}) => {
    try {
      const response = await api.get('/api/activities/recent', { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get recent activities error:', error);
      throw error;
    }
  },

  // Get activities filtered by type
  getActivitiesByType: async (type, filters = {}) => {
    try {
      const response = await api.get(`/api/activities/type/${type}`, { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get activities by type error:', error);
      throw error;
    }
  },

  // Get single activity details
  getActivityById: async (activityId) => {
    try {
      const response = await api.get(`/api/activities/${activityId}`);
      return response.data;
    } catch (error) {
      console.log('Get activity by ID error:', error);
      throw error;
    }
  },

  // Delete activity (admin only)
  deleteActivity: async (activityId) => {
    try {
      const response = await api.delete(`/api/activities/${activityId}`);
      return response.data;
    } catch (error) {
      console.log('Delete activity error:', error);
      throw error;
    }
  }
};

export default activityService;
