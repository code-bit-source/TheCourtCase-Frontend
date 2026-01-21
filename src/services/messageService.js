import api from './api';

const messageService = {
  // Send a message
  sendMessage: async (messageData) => {
    try {
      const response = await api.post('/api/messages', messageData);
      return response.data;
    } catch (error) {
      console.log('Send message error:', error);
      throw error;
    }
  },

  // Get all messages
  getMessages: async (filters = {}) => {
    try {
      const response = await api.get('/api/messages', { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get messages error:', error);
      throw error;
    }
  },

  // Get unread count
  getUnreadCount: async () => {
    try {
      const response = await api.get('/api/messages/unread-count');
      return response.data;
    } catch (error) {
      console.log('Get unread count error:', error);
      throw error;
    }
  },

  // Search messages
  searchMessages: async (query) => {
    try {
      const response = await api.get('/api/messages/search', { params: { query } });
      return response.data;
    } catch (error) {
      console.log('Search messages error:', error);
      throw error;
    }
  },

  // Get conversation with specific user
  getConversation: async (userId) => {
    try {
      const response = await api.get(`/api/messages/conversation/${userId}`);
      return response.data;
    } catch (error) {
      console.log('Get conversation error:', error);
      throw error;
    }
  },

  // Mark all messages as read
  markAllAsRead: async () => {
    try {
      const response = await api.put('/api/messages/read-all');
      return response.data;
    } catch (error) {
      console.log('Mark all as read error:', error);
      throw error;
    }
  },

  // Get single message by ID
  getMessageById: async (messageId) => {
    try {
      const response = await api.get(`/api/messages/${messageId}`);
      return response.data;
    } catch (error) {
      console.log('Get message by ID error:', error);
      throw error;
    }
  },

  // Mark message as read
  markAsRead: async (messageId) => {
    try {
      const response = await api.put(`/api/messages/${messageId}/read`);
      return response.data;
    } catch (error) {
      console.log('Mark as read error:', error);
      throw error;
    }
  },

  // Delete message
  deleteMessage: async (messageId) => {
    try {
      const response = await api.delete(`/api/messages/${messageId}`);
      return response.data;
    } catch (error) {
      console.log('Delete message error:', error);
      throw error;
    }
  },

  // Upload attachment to message
  uploadAttachment: async (messageId, files) => {
    try {
      const formData = new FormData();
      
      // Handle multiple files
      if (Array.isArray(files)) {
        files.forEach((file, index) => {
          formData.append('attachments', file);
        });
      } else {
        formData.append('attachments', files);
      }
      
      const response = await api.post(`/api/messages/${messageId}/attachments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.log('Upload attachment error:', error);
      throw error;
    }
  },

  // Get case messages
  getCaseMessages: async (caseId, filters = {}) => {
    try {
      const response = await api.get(`/api/messages/cases/${caseId}/messages`, { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get case messages error:', error);
      throw error;
    }
  },

  // Get connection messages
  getConnectionMessages: async (connectionId, filters = {}) => {
    try {
      const response = await api.get(`/api/messages/connections/${connectionId}/messages`, { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get connection messages error:', error);
      throw error;
    }
  }
};

export default messageService;
