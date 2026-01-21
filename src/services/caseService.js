import api from './api';

const caseService = {
  // Create a new case
  createCase: async (caseData) => {
    try {
      const response = await api.post('/api/cases', caseData);
      return response.data;
    } catch (error) {
      console.log('Create case error:', error);
      throw error;
    }
  },

  // Get all cases (with filters)
  getCases: async (filters = {}) => {
    try {
      const response = await api.get('/api/cases', { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get cases error:', error);
      throw error;
    }
  },

  // Get case statistics
  getCaseStats: async () => {
    try {
      const response = await api.get('/api/cases/stats');
      return response.data;
    } catch (error) {
      console.log('Get case stats error:', error);
      throw error;
    }
  },

  // Get a single case by ID
  getCaseById: async (caseId) => {
    try {
      const response = await api.get(`/api/cases/${caseId}`);
      return response.data;
    } catch (error) {
      console.log('Get case by ID error:', error);
      throw error;
    }
  },

  // Update a case
  updateCase: async (caseId, caseData) => {
    try {
      const response = await api.put(`/api/cases/${caseId}`, caseData);
      return response.data;
    } catch (error) {
      console.log('Update case error:', error);
      throw error;
    }
  },

  // Delete a case (admin only)
  deleteCase: async (caseId) => {
    try {
      const response = await api.delete(`/api/cases/${caseId}`);
      return response.data;
    } catch (error) {
      console.log('Delete case error:', error);
      throw error;
    }
  },

  // Assign paralegal to case
  assignParalegal: async (caseId, paralegalData) => {
    try {
      const response = await api.post(`/api/cases/${caseId}/assign-paralegal`, paralegalData);
      return response.data;
    } catch (error) {
      console.log('Assign paralegal error:', error);
      throw error;
    }
  },

  // Remove paralegal from case
  removeParalegal: async (caseId, paralegalId) => {
    try {
      const response = await api.delete(`/api/cases/${caseId}/paralegals/${paralegalId}`);
      return response.data;
    } catch (error) {
      console.log('Remove paralegal error:', error);
      throw error;
    }
  },

  // Close case
  closeCase: async (caseId) => {
    try {
      const response = await api.put(`/api/cases/${caseId}/close`);
      return response.data;
    } catch (error) {
      console.log('Close case error:', error);
      throw error;
    }
  },

  // Archive case
  archiveCase: async (caseId) => {
    try {
      const response = await api.put(`/api/cases/${caseId}/archive`);
      return response.data;
    } catch (error) {
      console.log('Archive case error:', error);
      throw error;
    }
  }
};

export default caseService;
