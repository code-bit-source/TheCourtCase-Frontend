import api from './api';

const documentService = {
  // Upload a document
  uploadDocument: async (file, metadata = {}) => {
    try {
      const formData = new FormData();
      formData.append('document', file);
      
      // Add any metadata fields
      Object.keys(metadata).forEach(key => {
        formData.append(key, metadata[key]);
      });
      
      const response = await api.post('/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.log('Upload document error:', error);
      throw error;
    }
  },

  // Get all documents (with filters)
  getDocuments: async (filters = {}) => {
    try {
      const response = await api.get('/api/documents', { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get documents error:', error);
      throw error;
    }
  },

  // Get document statistics
  getDocumentStats: async () => {
    try {
      const response = await api.get('/api/documents/stats');
      return response.data;
    } catch (error) {
      console.log('Get document stats error:', error);
      throw error;
    }
  },

  // Get a single document by ID
  getDocumentById: async (documentId) => {
    try {
      const response = await api.get(`/api/documents/${documentId}`);
      return response.data;
    } catch (error) {
      console.log('Get document by ID error:', error);
      throw error;
    }
  },

  // Download a document
  downloadDocument: async (documentId) => {
    try {
      const response = await api.get(`/api/documents/${documentId}/download`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.log('Download document error:', error);
      throw error;
    }
  },

  // Update document details
  updateDocument: async (documentId, documentData) => {
    try {
      const response = await api.put(`/api/documents/${documentId}`, documentData);
      return response.data;
    } catch (error) {
      console.log('Update document error:', error);
      throw error;
    }
  },

  // Update document access permissions
  updateAccessPermissions: async (documentId, permissions) => {
    try {
      const response = await api.put(`/api/documents/${documentId}/permissions`, { permissions });
      return response.data;
    } catch (error) {
      console.log('Update access permissions error:', error);
      throw error;
    }
  },

  // Delete a document
  deleteDocument: async (documentId) => {
    try {
      const response = await api.delete(`/api/documents/${documentId}`);
      return response.data;
    } catch (error) {
      console.log('Delete document error:', error);
      throw error;
    }
  },

  // Restore a deleted document (admin only)
  restoreDocument: async (documentId) => {
    try {
      const response = await api.put(`/api/documents/${documentId}/restore`);
      return response.data;
    } catch (error) {
      console.log('Restore document error:', error);
      throw error;
    }
  }
};

export default documentService;
