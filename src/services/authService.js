import api from './api';

const authService = {
  // Check authentication status
  checkAuthStatus: async () => {
    try {
      const response = await api.get('/api/protected/me');
      return response.data;
    } catch (error) {
      console.log('User not authenticated');
      throw error;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      // Save token to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.log('Login error:', error);
      throw error;
    }
  },

  // Register user
  signup: async (name, email, password, role) => {
    try {
      const response = await api.post('/api/auth/signup', { name, email, password, role });
      // Save token to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.log('Signup error:', error);
      throw error;
    }
  },

  // Google login
  googleLogin: async (credential) => {
    try {
      const response = await api.post('/api/auth/google/login', { credential });
      // Save token to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.log('Google login error:', error);
      throw error;
    }
  },

  // Google signup
  googleSignup: async (credential, role) => {
    try {
      const response = await api.post('/api/auth/google/signup', { credential, role });
      // Save token to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.log('Google signup error:', error);
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.post('/api/auth/logout', {});
      // Remove token from localStorage
      localStorage.removeItem('token');
      return response.data;
    } catch (error) {
      console.log('Logout error:', error);
      throw error;
    }
  },

  // Set password (for Google users)
  setPassword: async (password, confirmPassword) => {
    try {
      const response = await api.post('/api/auth/set-password', { password, confirmPassword });
      return response.data;
    } catch (error) {
      console.log('Set password error:', error);
      throw error;
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword, confirmPassword) => {
    try {
      const response = await api.post('/api/auth/change-password', { 
        currentPassword, 
        newPassword, 
        confirmPassword 
      });
      return response.data;
    } catch (error) {
      console.log('Change password error:', error);
      throw error;
    }
  }
};

export default authService;
