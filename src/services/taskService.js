import api from './api';

const taskService = {
  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await api.post('/api/tasks', taskData);
      return response.data;
    } catch (error) {
      console.log('Create task error:', error);
      throw error;
    }
  },

  // Get all tasks (with filters)
  getTasks: async (filters = {}) => {
    try {
      const response = await api.get('/api/tasks', { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get tasks error:', error);
      throw error;
    }
  },

  // Get task statistics
  getTaskStats: async () => {
    try {
      const response = await api.get('/api/tasks/stats');
      return response.data;
    } catch (error) {
      console.log('Get task stats error:', error);
      throw error;
    }
  },

  // Get overdue tasks
  getOverdueTasks: async () => {
    try {
      const response = await api.get('/api/tasks/overdue');
      return response.data;
    } catch (error) {
      console.log('Get overdue tasks error:', error);
      throw error;
    }
  },

  // Get tasks for a specific case
  getCaseTasks: async (caseId, filters = {}) => {
    try {
      const response = await api.get(`/api/tasks/cases/${caseId}`, { params: filters });
      return response.data;
    } catch (error) {
      console.log('Get case tasks error:', error);
      throw error;
    }
  },

  // Get a single task by ID
  getTaskById: async (taskId) => {
    try {
      const response = await api.get(`/api/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.log('Get task by ID error:', error);
      throw error;
    }
  },

  // Update a task
  updateTask: async (taskId, taskData) => {
    try {
      const response = await api.put(`/api/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      console.log('Update task error:', error);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (taskId) => {
    try {
      const response = await api.delete(`/api/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.log('Delete task error:', error);
      throw error;
    }
  },

  // Update task status
  updateTaskStatus: async (taskId, status) => {
    try {
      const response = await api.put(`/api/tasks/${taskId}/status`, { status });
      return response.data;
    } catch (error) {
      console.log('Update task status error:', error);
      throw error;
    }
  },

  // Update task progress
  updateTaskProgress: async (taskId, progress) => {
    try {
      const response = await api.put(`/api/tasks/${taskId}/progress`, { progress });
      return response.data;
    } catch (error) {
      console.log('Update task progress error:', error);
      throw error;
    }
  },

  // Add comment to task
  addComment: async (taskId, comment) => {
    try {
      const response = await api.post(`/api/tasks/${taskId}/comments`, { comment });
      return response.data;
    } catch (error) {
      console.log('Add comment error:', error);
      throw error;
    }
  },

  // Add attachment to task
  addAttachment: async (taskId, file) => {
    try {
      const formData = new FormData();
      formData.append('attachment', file);
      
      const response = await api.post(`/api/tasks/${taskId}/attachments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.log('Add attachment error:', error);
      throw error;
    }
  }
};

export default taskService;
