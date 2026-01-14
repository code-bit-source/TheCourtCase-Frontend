import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Set axios defaults
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/api/protected/me', { withCredentials: true });
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log('User not authenticated');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
      if (response.data.success) {
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      console.log('Login error from backend:', error);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      const response = await axios.post('/api/auth/signup', { name, email, password, role }, { withCredentials: true });
      if (response.data.success) {
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      console.log('Signup error from backend:', error);
      return { success: false, message: error.response?.data?.message || 'Signup failed' };
    }
  };

  const googleLogin = async (credential) => {
    try {
      const response = await axios.post('/api/auth/google/login', { credential }, { withCredentials: true });
      if (response.data.success) {
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      console.log('Google login error from backend:', error);
      return { success: false, message: error.response?.data?.message || 'Google login failed' };
    }
  };

  const googleSignup = async (credential, role) => {
    try {
      const response = await axios.post('/api/auth/google/signup', { credential, role }, { withCredentials: true });
      if (response.data.success) {
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      console.log('Google signup error from backend:', error);
      return { success: false, message: error.response?.data?.message || 'Google signup failed' };
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.log('Logout error from backend:', error);
    }
  };

  const getRoleHomePath = (role) => {
    switch (role) {
      case 'admin': return '/admin';
      case 'advocate': return '/advocate';
      case 'client': return '/client';
      case 'paralegal': return '/paralegal';
      default: return '/';
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    googleLogin,
    googleSignup,
    logout,
    getRoleHomePath,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
