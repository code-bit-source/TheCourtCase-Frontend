import api from './api';

const connectionService = {
  // Search advocates (client only)
  searchAdvocates: async (searchParams = {}) => {
    try {
      const response = await api.get('/api/connections/search/advocates', { params: searchParams });
      return response.data;
    } catch (error) {
      console.log('Search advocates error:', error);
      throw error;
    }
  },

  // Search paralegals (client only)
  searchParalegals: async (searchParams = {}) => {
    try {
      const response = await api.get('/api/connections/search/paralegals', { params: searchParams });
      return response.data;
    } catch (error) {
      console.log('Search paralegals error:', error);
      throw error;
    }
  },

  // Send connection request (client only)
  sendConnectionRequest: async (requestData) => {
    try {
      const response = await api.post('/api/connections/request', requestData);
      return response.data;
    } catch (error) {
      console.log('Send connection request error:', error);
      throw error;
    }
  },

  // Get received connection requests (advocate/paralegal only)
  getReceivedRequests: async () => {
    try {
      const response = await api.get('/api/connections/requests/received');
      return response.data;
    } catch (error) {
      console.log('Get received requests error:', error);
      throw error;
    }
  },

  // Get sent connection requests (client only)
  getSentRequests: async () => {
    try {
      const response = await api.get('/api/connections/requests/sent');
      return response.data;
    } catch (error) {
      console.log('Get sent requests error:', error);
      throw error;
    }
  },

  // Accept connection request (advocate/paralegal only)
  acceptConnectionRequest: async (requestId) => {
    try {
      const response = await api.put(`/api/connections/requests/${requestId}/accept`);
      return response.data;
    } catch (error) {
      console.log('Accept connection request error:', error);
      throw error;
    }
  },

  // Reject connection request (advocate/paralegal only)
  rejectConnectionRequest: async (requestId) => {
    try {
      const response = await api.put(`/api/connections/requests/${requestId}/reject`);
      return response.data;
    } catch (error) {
      console.log('Reject connection request error:', error);
      throw error;
    }
  },

  // Get connection statistics
  getConnectionStats: async () => {
    try {
      const response = await api.get('/api/connections/stats');
      return response.data;
    } catch (error) {
      console.log('Get connection stats error:', error);
      throw error;
    }
  },

  // Get my connections
  getMyConnections: async () => {
    try {
      const response = await api.get('/api/connections');
      return response.data;
    } catch (error) {
      console.log('Get my connections error:', error);
      throw error;
    }
  },

  // Get connection details
  getConnectionDetails: async (connectionId) => {
    try {
      const response = await api.get(`/api/connections/${connectionId}`);
      return response.data;
    } catch (error) {
      console.log('Get connection details error:', error);
      throw error;
    }
  },

  // Remove connection
  removeConnection: async (connectionId) => {
    try {
      const response = await api.delete(`/api/connections/${connectionId}`);
      return response.data;
    } catch (error) {
      console.log('Remove connection error:', error);
      throw error;
    }
  }
};

export default connectionService;
