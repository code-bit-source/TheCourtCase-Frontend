import api from './api';

const timelineService = {
  // Add timeline event (Advocate/Admin only)
  addEvent: async (caseId, eventData) => {
    try {
      const response = await api.post(`/api/cases/${caseId}/timeline`, eventData);
      return response.data;
    } catch (error) {
      console.log('Add event error:', error);
      throw error;
    }
  },

  // Get timeline for a case
  getTimeline: async (caseId) => {
    try {
      const response = await api.get(`/api/cases/${caseId}/timeline`);
      return response.data;
    } catch (error) {
      console.log('Get timeline error:', error);
      throw error;
    }
  },

  // Get upcoming events for a case
  getUpcomingEvents: async (caseId) => {
    try {
      const response = await api.get(`/api/cases/${caseId}/timeline/upcoming`);
      return response.data;
    } catch (error) {
      console.log('Get upcoming events error:', error);
      throw error;
    }
  },

  // Get milestones for a case
  getMilestones: async (caseId) => {
    try {
      const response = await api.get(`/api/cases/${caseId}/milestones`);
      return response.data;
    } catch (error) {
      console.log('Get milestones error:', error);
      throw error;
    }
  },

  // Get single event by ID
  getEventById: async (eventId) => {
    try {
      const response = await api.get(`/api/timeline/${eventId}`);
      return response.data;
    } catch (error) {
      console.log('Get event by ID error:', error);
      throw error;
    }
  },

  // Update timeline event (Advocate/Admin only)
  updateEvent: async (eventId, eventData) => {
    try {
      const response = await api.put(`/api/timeline/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      console.log('Update event error:', error);
      throw error;
    }
  },

  // Delete timeline event (Advocate/Admin only)
  deleteEvent: async (eventId) => {
    try {
      const response = await api.delete(`/api/timeline/${eventId}`);
      return response.data;
    } catch (error) {
      console.log('Delete event error:', error);
      throw error;
    }
  },

  // Mark event as milestone (Advocate/Admin only)
  markAsMilestone: async (eventId) => {
    try {
      const response = await api.put(`/api/timeline/${eventId}/milestone`);
      return response.data;
    } catch (error) {
      console.log('Mark as milestone error:', error);
      throw error;
    }
  },

  // Add hearing (Advocate/Admin only)
  addHearing: async (caseId, hearingData) => {
    try {
      const response = await api.post(`/api/cases/${caseId}/hearings`, hearingData);
      return response.data;
    } catch (error) {
      console.log('Add hearing error:', error);
      throw error;
    }
  },

  // Get hearings for a case
  getHearings: async (caseId) => {
    try {
      const response = await api.get(`/api/cases/${caseId}/hearings`);
      return response.data;
    } catch (error) {
      console.log('Get hearings error:', error);
      throw error;
    }
  },

  // Mark hearing as completed (Advocate/Admin only)
  completeHearing: async (eventId) => {
    try {
      const response = await api.put(`/api/hearings/${eventId}/complete`);
      return response.data;
    } catch (error) {
      console.log('Complete hearing error:', error);
      throw error;
    }
  },

  // Postpone hearing (Advocate/Admin only)
  postponeHearing: async (eventId, postponeData) => {
    try {
      const response = await api.put(`/api/hearings/${eventId}/postpone`, postponeData);
      return response.data;
    } catch (error) {
      console.log('Postpone hearing error:', error);
      throw error;
    }
  }
};

export default timelineService;
