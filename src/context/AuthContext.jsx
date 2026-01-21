import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services';
import SetPasswordModal from '../components/auth/SetPasswordModal';

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
  const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);
  const [pendingPasswordUser, setPendingPasswordUser] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const data = await authService.checkAuthStatus();
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log('User not authenticated');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      if (data.success) {
        setUser(data.user);
        return { success: true, user: data.user };
      }
    } catch (error) {
      console.log('Login error from backend:', error);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      const data = await authService.signup(name, email, password, role);
      if (data.success) {
        setUser(data.user);
        return { success: true, user: data.user };
      }
    } catch (error) {
      console.log('Signup error from backend:', error);
      return { success: false, message: error.response?.data?.message || 'Signup failed' };
    }
  };

  const googleLogin = async (credential) => {
    try {
      const data = await authService.googleLogin(credential);
      if (data.success) {
        setUser(data.user);
        return { success: true, user: data.user };
      }
    } catch (error) {
      console.log('Google login error from backend:', error);
      return { success: false, message: error.response?.data?.message || 'Google login failed' };
    }
  };

  const googleSignup = async (credential, role) => {
    try {
      const data = await authService.googleSignup(credential, role);
      if (data.success) {
        setUser(data.user);
        
        // Check if user needs to set password
        if (data.user && !data.user.hasPassword) {
          setPendingPasswordUser(data.user);
          setShowSetPasswordModal(true);
        }
        
        return { success: true, user: data.user };
      }
    } catch (error) {
      console.log('Google signup error from backend:', error);
      return { success: false, message: error.response?.data?.message || 'Google signup failed' };
    }
  };

  const setPassword = async (password, confirmPassword) => {
    try {
      const data = await authService.setPassword(password, confirmPassword);
      if (data.success) {
        // Update user with hasPassword flag
        setUser(prevUser => ({
          ...prevUser,
          hasPassword: true
        }));
        setShowSetPasswordModal(false);
        setPendingPasswordUser(null);
        return { success: true, message: data.message };
      }
    } catch (error) {
      console.log('Set password error:', error);
      throw error;
    }
  };

  const changePassword = async (currentPassword, newPassword, confirmPassword) => {
    try {
      const data = await authService.changePassword(currentPassword, newPassword, confirmPassword);
      if (data.success) {
        return { success: true, message: data.message };
      }
    } catch (error) {
      console.log('Change password error:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to change password' };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setShowSetPasswordModal(false);
      setPendingPasswordUser(null);
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

  const openSetPasswordModal = () => {
    setShowSetPasswordModal(true);
  };

  const closeSetPasswordModal = () => {
    setShowSetPasswordModal(false);
    setPendingPasswordUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    googleLogin,
    googleSignup,
    logout,
    setPassword,
    changePassword,
    getRoleHomePath,
    checkAuthStatus,
    openSetPasswordModal,
    showSetPasswordModal
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      
      {/* Set Password Modal */}
      <SetPasswordModal
        isOpen={showSetPasswordModal}
        onClose={closeSetPasswordModal}
        onSetPassword={setPassword}
        userEmail={pendingPasswordUser?.email || user?.email}
        canSkip={true}
      />
    </AuthContext.Provider>
  );
};
