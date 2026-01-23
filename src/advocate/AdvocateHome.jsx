import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getThemeColors } from '../utils/themeColors';
import Sidebar, { MobileSidebarDrawer, sidebarStyles } from './Sidebar';
import Header, { headerStyles } from './Header';
import Modal from './Modal';
import Toast from './Toast';
import { Settings } from 'lucide-react';

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

  const getActiveView = () => {
    const path = location.pathname.replace('/advocate/', '').split('/')[0];
    return path || 'dashboard';
  };

  const activeView = getActiveView();

  const userInfo = {
    name: user?.name || '',
    email: user?.email || '',
    profilePic: user?.profilePicture || ''
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
    <div
      className="flex flex-col h-screen w-full overflow-hidden"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      <style>{sidebarStyles}</style>
      <style>{headerStyles}</style>
      
      <Header
        addNotification={addNotification}
        clientNotifications={clientNotifications}
        onOpenSettings={() => handleViewChange('settings')}
        onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
        isDark={isDark}
        accentColor={accentColor}
        userInfo={userInfo}
      />

      <div className="flex flex-1 overflow-hidden">
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
          isMobileSidebarOpen={isMobileSidebarOpen}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        />

        <main
          className="flex flex-col flex-1 overflow-hidden"
          style={{ backgroundColor: colors.bg }}
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-0">
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

      {/* Floating Action Button */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
        <button
          onClick={() => handleViewChange('settings')}
          className="w-14 h-14 rounded-full text-white border-none cursor-pointer flex items-center justify-center shadow-lg transition-all hover:scale-105"
          style={{ backgroundColor: accentColor }}
        >
          <Settings size={24} />
        </button>
      </div>

      {/* <Toast
        notifications={notifications}
        removeNotification={removeNotification}
        isDark={isDark}
        accentColor={accentColor}
      /> */}
    </div>
  );
}
