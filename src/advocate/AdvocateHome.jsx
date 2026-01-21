import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar, { MobileSidebarDrawer, sidebarStyles } from './Sidebar';
import Header, { headerStyles } from './Header';
import Modal from './Modal';
import Toast from './Toast';

const getThemeColors = (isDark, accentColor) => ({
  bg: isDark ? '#0f0f1a' : '#ffffff',
  bgSecondary: isDark ? '#1a1a2e' : '#fafafa',
  bgTertiary: isDark ? '#16213e' : '#f5f5f5',
  bgHover: isDark ? '#252540' : '#f0f0f0',
  text: isDark ? '#ffffff' : '#1f1f1f',
  textSecondary: isDark ? '#a0a0a0' : '#808080',
  textMuted: isDark ? '#707070' : '#b0b0b0',
  border: isDark ? '#2d2d44' : '#e8e8e8',
  borderLight: isDark ? '#252540' : '#f0f0f0',
  card: isDark ? '#1a1a2e' : '#ffffff',
  cardHover: isDark ? '#252540' : '#fafafa',
  accent: accentColor,
  accentLight: isDark ? `${accentColor}30` : `${accentColor}15`,
  success: '#00c853',
  warning: '#ff9500',
  error: '#eb4d3d',
  sidebar: isDark ? '#0f0f1a' : '#ffffff',
  header: isDark ? '#0f0f1a' : '#ffffff',
  input: isDark ? '#1a1a2e' : '#ffffff',
  inputBorder: isDark ? '#2d2d44' : '#e0e0e0'
});

export default function AdvocateHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  const [isDark, setIsDark] = useState(false);
  const [accentColor, setAccentColor] = useState('#4772fa');

  const colors = getThemeColors(isDark, accentColor);

  // Get current active view from location pathname
  const getActiveView = () => {
    const path = location.pathname.replace('/advocate/', '').split('/')[0];
    return path || 'dashboard';
  };

  const activeView = getActiveView();

  // Get user info from AuthContext or use defaults
  const userInfo = {
    name: user?.name || 'Alex Thompson',
    email: user?.email || 'alex.thompson@email.com',
    profilePic: user?.profilePic || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  };

  const clientNotifications = [
    { id: 1, type: 'hearing', title: 'Hearing Scheduled', desc: 'Thompson vs. Global Corp - Final Arguments', time: '2 days ago', read: false },
    { id: 2, type: 'document', title: 'Document Uploaded', desc: 'Evidence_Ex_A.docx uploaded successfully', time: '5 days ago', read: false },
    { id: 3, type: 'order', title: 'Court Order Received', desc: 'Interim stay granted on Case #WP/2024/102', time: '1 week ago', read: true },
    { id: 4, type: 'payment', title: 'Payment Received', desc: '$12,500 from Global Industries', time: 'Yesterday', read: true }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) setIsDark(savedTheme === 'dark');
    const savedAccent = localStorage.getItem('appAccentColor');
    if (savedAccent) setAccentColor(savedAccent);
    const savedSidebar = localStorage.getItem('sidebarExpanded');
    if (savedSidebar !== null) setIsSidebarExpanded(JSON.parse(savedSidebar));
  }, []);

  useEffect(() => {
    localStorage.setItem('appTheme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('appAccentColor', accentColor);
  }, [accentColor]);

  useEffect(() => {
    localStorage.setItem('sidebarExpanded', JSON.stringify(isSidebarExpanded));
  }, [isSidebarExpanded]);

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleViewChange = (viewId) => {
    navigate(`/advocate/${viewId}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      addNotification('success', 'Logged out successfully');
      navigate('/signin');
    } catch (error) {
      addNotification('error', 'Logout failed');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', overflow: 'hidden', backgroundColor: colors.bg, color: colors.text }}>
      <style>{sidebarStyles}</style>
      <style>{headerStyles}</style>
      
      <Header
        addNotification={addNotification}
        clientNotifications={clientNotifications}
        onOpenSettings={() => setActiveView('settings')}
        onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
        isDark={isDark}
        accentColor={accentColor}
        userInfo={userInfo}
      />

      <div style={{ display: 'flex',  flex: 1, overflow: 'hidden' }}>
        <Sidebar
          activeView={activeView}
          setActiveView={handleViewChange}
          isExpanded={isSidebarExpanded}
          toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
          addNotification={addNotification}
          onOpenSettings={() => handleViewChange('settings')}
          onLogout={handleLogout}
          isDark={isDark}
          accentColor={accentColor}
          userInfo={userInfo}
        />

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: colors.bg }}>
          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: 0 }}>
            <Outlet context={{ isDark, accentColor, setIsDark, setAccentColor, addNotification }} />
          </div>
        </main>
      </div>

      <MobileSidebarDrawer
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeView={activeView}
        setActiveView={(view) => { handleViewChange(view); setIsMobileSidebarOpen(false); }}
        addNotification={addNotification}
        onOpenSettings={() => { handleViewChange('settings'); setIsMobileSidebarOpen(false); }}
        onLogout={handleLogout}
        isDark={isDark}
        accentColor={accentColor}
        userInfo={userInfo}
      />


      {/* <Toast
        notifications={notifications}
        removeNotification={removeNotification}
        isDark={isDark}
        accentColor={accentColor}
      /> */}
    </div>
  );
}
