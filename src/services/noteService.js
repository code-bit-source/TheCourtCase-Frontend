import api from './api';

const noteService = {
  // Create a new note
  createNote: async (noteData) => {
    try {
      const response = await api.post('/api/notes', noteData);
      return response.data;
    } catch (error) {
      console.log('Create note error:', error);
      throw error;
    }
  },

  // Get current user's notes
  getMyNotes: async (filters = {}) => {
    try {
      const response = await api.get('/api/notes', { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get my notes error:', error);
      throw error;
    }
  },

  // Get all notes (admin only)
  getAllNotes: async (filters = {}) => {
    try {
      const response = await api.get('/api/notes/all', { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get all notes error:', error);
      throw error;
    }
  },

  // Get checklist items for a note
  getChecklistItems: async (noteId) => {
    try {
      const response = await api.get(`/api/notes/${noteId}/checklists`);
      return response.data;
    } catch (error) {
      console.log('Get checklist items error:', error);
      throw error;
    }
  },

  // Add checklist item to a note
  addChecklistItem: async (noteId, itemData) => {
    try {
      const response = await api.post(`/api/notes/${noteId}/checklists`, itemData);
      return response.data;
    } catch (error) {
      console.log('Add checklist item error:', error);
      throw error;
    }
  },

  // Update checklist item
  updateChecklistItem: async (noteId, checklistId, itemData) => {
    try {
      const response = await api.put(`/api/notes/${noteId}/checklists/${checklistId}`, itemData);
      return response.data;
    } catch (error) {
      console.log('Update checklist item error:', error);
      throw error;
    }
  },

  // Toggle checklist item completion
  toggleChecklistItem: async (noteId, checklistId) => {
    try {
      const response = await api.put(`/api/notes/${noteId}/checklists/${checklistId}/toggle`);
      return response.data;
    } catch (error) {
      console.log('Toggle checklist item error:', error);
      throw error;
    }
  },

  // Delete checklist item
  deleteChecklistItem: async (noteId, checklistId) => {
    try {
      const response = await api.delete(`/api/notes/${noteId}/checklists/${checklistId}`);
      return response.data;
    } catch (error) {
      console.log('Delete checklist item error:', error);
      throw error;
    }
  },

  // Upload attachment to note
  uploadAttachment: async (noteId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post(`/api/notes/${noteId}/attachments`, formData, {
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

  // Delete attachment from note
  deleteAttachment: async (noteId, attachmentId) => {
    try {
      const response = await api.delete(`/api/notes/${noteId}/attachments/${attachmentId}`);
      return response.data;
    } catch (error) {
      console.log('Delete attachment error:', error);
      throw error;
    }
  },

  // Download attachment
  downloadAttachment: async (noteId, attachmentId) => {
    try {
      const response = await api.get(`/api/notes/${noteId}/attachments/${attachmentId}/download`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.log('Download attachment error:', error);
      throw error;
    }
  },

  // Archive/Unarchive note
  archiveNote: async (noteId) => {
    try {
      const response = await api.put(`/api/notes/${noteId}/archive`);
      return response.data;
    } catch (error) {
      console.log('Archive note error:', error);
      throw error;
    }
  },

  // Get note by ID
  getNoteById: async (noteId) => {
    try {
      const response = await api.get(`/api/notes/${noteId}`);
      return response.data;
    } catch (error) {
      console.log('Get note by ID error:', error);
      throw error;
    }
  },

  // Update note
  updateNote: async (noteId, noteData) => {
    try {
      const response = await api.put(`/api/notes/${noteId}`, noteData);
      return response.data;
    } catch (error) {
      console.log('Update note error:', error);
      throw error;
    }
  },

  // Delete note
  deleteNote: async (noteId) => {
    try {
      const response = await api.delete(`/api/notes/${noteId}`);
      return response.data;
    } catch (error) {
      console.log('Delete note error:', error);
      throw error;
    }
  }
};

export default noteService;
