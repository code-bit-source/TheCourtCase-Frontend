"use client";

import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Scale, LayoutDashboard, FileText, MessageSquare,
  Calendar, Settings, Bell,
  ChevronRight, Clock,
  CheckCircle2, X,
  Download, Send, Paperclip,
  ChevronLeft,
  CreditCard, AlertCircle, Info,
  User, Briefcase,
  Search, RefreshCw, HelpCircle, Sparkles, Menu,
  Palette, Volume2, Keyboard,
  Moon, Sun, Monitor,
  ListTodo, Phone, Mail, Video, Smartphone, Inbox, Crown, Users
} from 'lucide-react';

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  accentColor: '#4772fa',
  setAccentColor: () => {},
  isDark: false
});

const useTheme = () => useContext(ThemeContext);

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

const styles = `
  .messages-page * { box-sizing: border-box; }
  .messages-page { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.5; -webkit-font-smoothing: antialiased; }
  .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #d0d0d0; border-radius: 3px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #b0b0b0; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .fade-in { animation: fadeIn 0.2s ease-out; }
  @keyframes slide-in-from-right { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  .animate-slide-in { animation: slide-in-from-right 0.25s ease-out; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .animate-spin { animation: spin 1s linear infinite; }
  
  .nav-icon-btn { padding: 8px; color: #606060; cursor: pointer; background: transparent; border: none; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; min-width: 44px; min-height: 44px; }
  .nav-icon-btn:hover { background: #f0f0f0; color: #1f1f1f; }
  
  .sidebar-transition { transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
  .sidebar-nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; cursor: pointer; border: none; background: transparent; width: 100%; text-align: left; transition: all 0.15s ease; white-space: nowrap; overflow: hidden; min-height: 44px; position: relative; text-decoration: none; }
  .sidebar-nav-item:hover { background: #f5f5f5; }
  .sidebar-nav-item.active { background: rgba(71, 114, 250, 0.1); color: #4772fa; }
  
  .sidebar-tooltip { position: absolute; left: 100%; top: 50%; transform: translateY(-50%); margin-left: 12px; padding: 6px 12px; background: #1f1f1f; color: #fff; font-size: 12px; border-radius: 6px; white-space: nowrap; opacity: 0; visibility: hidden; transition: opacity 0.2s, visibility 0.2s; z-index: 1000; pointer-events: none; }
  .sidebar-tooltip::before { content: ''; position: absolute; left: -6px; top: 50%; transform: translateY(-50%); border: 6px solid transparent; border-right-color: #1f1f1f; border-left: none; }
  .sidebar-nav-item:hover .sidebar-tooltip { opacity: 1; visibility: visible; }

  .mobile-bottom-nav { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-top: 1px solid #e8e8e8; z-index: 90; padding: 8px 0; padding-bottom: env(safe-area-inset-bottom, 8px); }
  .mobile-bottom-nav a { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 4px; border: none; background: transparent; color: #808080; font-size: 10px; cursor: pointer; min-height: 56px; text-decoration: none; }
  .mobile-bottom-nav a.active { color: #4772fa; }
  
  .mobile-sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 95; opacity: 0; transition: opacity 0.3s ease; }
  .mobile-sidebar-overlay.show { display: block; opacity: 1; }
  .mobile-sidebar-drawer { position: fixed; left: 0; top: 0; bottom: 0; width: 280px; max-width: 85vw; background: #fff; z-index: 96; transform: translateX(-100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 4px 0 20px rgba(0,0,0,0.15); }
  .mobile-sidebar-drawer.open { transform: translateX(0); }
  
  .desktop-sidebar { display: flex; }
  .mobile-menu-btn { display: none; }
  
  .toast-container { position: fixed; bottom: 80px; right: 16px; left: 16px; z-index: 200; display: flex; flex-direction: column; gap: 8px; }
  
  .side-panel { position: fixed; right: 0; top: 0; height: 100vh; width: 320px; max-width: 100vw; background: #fff; box-shadow: -10px 0 30px rgba(0,0,0,0.05); border-left: 1px solid #e8e8e8; z-index: 100; transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .side-panel.open { transform: translateX(0); }

  .comm-channels-scroll::-webkit-scrollbar { height: 0; }

  @media (max-width: 768px) {
    .desktop-sidebar { display: none !important; }
    .mobile-bottom-nav { display: flex; }
    .mobile-menu-btn { display: flex; }
    .header-search { display: none !important; }
    .header-extras { display: none !important; }
    .side-panel { width: 100vw; }
    .messages-sidebar { display: none !important; }
    .contact-info-panel { display: none !important; }
    .comm-list-desktop { display: none !important; }
    .comm-chat-mobile { display: flex !important; }
    .chat-header { padding: 0 12px !important; height: 50px !important; }
    .chat-messages { padding: 12px !important; }
    .chat-input-container { padding: 12px !important; }
    .chat-bubble { max-width: 85% !important; }
  }

  @media (min-width: 769px) {
    .comm-list-mobile-only { display: none !important; }
  }
`;

function Toast({ notifications, removeNotification }) {
  const { isDark } = useTheme();
  return (
    <div className="toast-container">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="animate-slide-in"
          style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8,
            boxShadow: isDark ? '0 10px 15px -3px rgba(0,0,0,0.4)' : '0 10px 15px -3px rgba(0,0,0,0.1)', border: '1px solid',
            backgroundColor: n.type === 'success' ? isDark ? '#052e16' : '#f0fdf4' : n.type === 'error' ? isDark ? '#450a0a' : '#fef2f2' : isDark ? '#172554' : '#eff6ff',
            borderColor: n.type === 'success' ? isDark ? '#166534' : '#bbf7d0' : n.type === 'error' ? isDark ? '#991b1b' : '#fecaca' : isDark ? '#1e40af' : '#bfdbfe',
            color: n.type === 'success' ? isDark ? '#4ade80' : '#15803d' : n.type === 'error' ? isDark ? '#fca5a5' : '#b91c1c' : isDark ? '#93c5fd' : '#1d4ed8'
          }}
        >
          {n.type === 'success' ? <CheckCircle2 size={16} /> : n.type === 'error' ? <AlertCircle size={16} /> : <Info size={16} />}
          <span style={{ fontSize: 14 }}>{n.message}</span>
          <button onClick={() => removeNotification(n.id)} style={{ marginLeft: 8, opacity: 0.6, cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

function HelpPanel({ isOpen, onClose }) {
  const { isDark, accentColor } = useTheme();
  const colors = getThemeColors(isDark, accentColor);
  const items = [
    { icon: Sparkles, label: 'Shortcuts', desc: 'Keyboard commands' },
    { icon: HelpCircle, label: 'Help Center', desc: 'Guides and tutorials' },
    { icon: MessageSquare, label: 'Feedback', desc: 'Suggest improvements' },
    { icon: Clock, label: 'Changelog', desc: "What's new in v2.4" }
  ];

  return (
    <>
      {isOpen && <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.1)', zIndex: 90 }}></div>}
      <div className={`side-panel ${isOpen ? 'open' : ''}`} style={{ background: colors.card, borderLeft: `1px solid ${colors.border}` }}>
        <div style={{ padding: '24px 20px', borderBottom: `1px solid ${colors.borderLight}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>Help & Support</h3>
          <button onClick={onClose} className="nav-icon-btn"><X size={20} /></button>
        </div>
        <div style={{ padding: '12px 0' }}>
          {items.map((item, i) => (
            <div key={i} style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.bgHover} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: colors.accentLight, color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <item.icon size={20} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: colors.text, margin: 0 }}>{item.label}</p>
                <p style={{ fontSize: 12, color: colors.textSecondary, margin: '2px 0 0 0' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, borderTop: `1px solid ${colors.borderLight}`, backgroundColor: colors.bgSecondary }}>
          <p style={{ fontSize: 12, color: colors.textSecondary, textAlign: 'center', margin: 0 }}>Legal Suite Premium v2.4.0</p>
        </div>
      </div>
    </>
  );
}

function SettingsModal({ isOpen, onClose, addNotification }) {
  const { theme, setTheme, accentColor, setAccentColor: setGlobalAccentColor, isDark } = useTheme();
  const colors = getThemeColors(isDark, accentColor);
  const [activeTab, setActiveTab] = useState('account');
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isOpen) return null;

  const tabs = [
    { id: 'account', icon: User, label: 'Account' },
    { id: 'theme', icon: Palette, label: 'Theme' },
    { id: 'sounds', icon: Volume2, label: 'Notifications' },
    { id: 'shortcuts', icon: Keyboard, label: 'Shortcuts' },
    { id: 'about', icon: Info, label: 'About' }
  ];

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    addNotification('success', `Theme changed to ${newTheme}`);
  };

  const handleAccentColorChange = (color, name) => {
    setGlobalAccentColor(color);
    addNotification('success', `Accent color changed to ${name}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 0', borderBottom: `1px solid ${colors.borderLight}`, flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', border: `3px solid ${accentColor}` }}>
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 150 }}>
                <p style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>Alex Thompson</p>
                <p style={{ fontSize: 13, color: colors.textSecondary, margin: '4px 0 0 0' }}>alex.thompson@email.com</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                  <Crown size={14} style={{ color: '#ff9500' }} />
                  <span style={{ fontSize: 12, color: '#ff9500', fontWeight: 500 }}>Premium Member</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'theme':
        return (
          <div>
            <p style={{ fontSize: 13, color: colors.textSecondary, marginBottom: 20, margin: '0 0 20px 0' }}>Choose how Legal Suite looks to you</p>
            <div className="theme-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
              {[
                { id: 'light', label: 'Light', icon: Sun },
                { id: 'dark', label: 'Dark', icon: Moon },
                { id: 'system', label: 'System', icon: Monitor }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id)}
                  style={{
                    padding: isMobileView ? 16 : 20, borderRadius: 12, border: `2px solid ${theme === t.id ? accentColor : colors.inputBorder}`,
                    backgroundColor: theme === t.id ? colors.accentLight : colors.card, cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, transition: 'all 0.2s'
                  }}
                >
                  <div className="theme-icon" style={{ width: isMobileView ? 40 : 48, height: isMobileView ? 40 : 48, borderRadius: '50%', backgroundColor: theme === t.id ? accentColor : colors.bgTertiary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <t.icon size={isMobileView ? 20 : 24} style={{ color: theme === t.id ? '#fff' : colors.textSecondary }} />
                  </div>
                  <span style={{ fontSize: isMobileView ? 12 : 14, fontWeight: theme === t.id ? 600 : 400, color: theme === t.id ? accentColor : colors.text }}>{t.label}</span>
                </button>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${colors.borderLight}`, paddingTop: 24 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, marginBottom: 16, margin: '0 0 16px 0' }}>Accent Color</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { color: '#4772fa', name: 'Blue' },
                  { color: '#00c853', name: 'Green' },
                  { color: '#ff9500', name: 'Orange' },
                  { color: '#eb4d3d', name: 'Red' },
                  { color: '#9c27b0', name: 'Purple' },
                  { color: '#00bcd4', name: 'Cyan' }
                ].map((item) => (
                  <button
                    key={item.color}
                    onClick={() => handleAccentColorChange(item.color, item.name)}
                    style={{
                      width: 40, height: 40, borderRadius: '50%', backgroundColor: item.color,
                      border: accentColor === item.color ? `3px solid ${colors.text}` : '3px solid transparent',
                      cursor: 'pointer',
                      boxShadow: accentColor === item.color ? `0 0 0 2px ${colors.bg}, 0 0 0 4px ${item.color}` : 'none',
                      transition: 'all 0.2s'
                    }}
                    title={item.name}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return <div style={{ color: colors.textSecondary }}>Coming soon...</div>;
    }
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: isMobileView ? 0 : 16 }}>
      <div onClick={(e) => e.stopPropagation()} className="fade-in settings-modal" style={{ backgroundColor: colors.card, borderRadius: isMobileView ? 0 : 16, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', width: '100%', maxWidth: isMobileView ? '100%' : 800, height: isMobileView ? '100%' : '80vh', maxHeight: isMobileView ? '100%' : 600, display: 'flex', flexDirection: isMobileView ? 'column' : 'row', overflow: 'hidden' }}>
        <div className="settings-sidebar" style={{ width: isMobileView ? '100%' : 220, height: isMobileView ? 'auto' : '100%', backgroundColor: colors.bgSecondary, borderRight: isMobileView ? 'none' : `1px solid ${colors.border}`, borderBottom: isMobileView ? `1px solid ${colors.border}` : 'none', display: 'flex', flexDirection: isMobileView ? 'column' : 'column' }}>
          <div style={{ padding: isMobileView ? '16px' : '20px 16px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>Settings</h2>
            {isMobileView && <button onClick={onClose} style={{ padding: 8, cursor: 'pointer', background: 'transparent', border: 'none', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} style={{ color: colors.textSecondary }} /></button>}
          </div>
          <nav className="custom-scrollbar" style={{ flex: isMobileView ? 0 : 1, padding: '8px', overflowY: isMobileView ? 'visible' : 'auto', overflowX: isMobileView ? 'auto' : 'hidden', display: 'flex', flexDirection: isMobileView ? 'row' : 'column', gap: isMobileView ? 4 : 0 }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: isMobileView ? 6 : 12, padding: isMobileView ? '8px 12px' : '10px 12px',
                  border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: isMobileView ? 0 : 2, textAlign: 'left',
                  backgroundColor: activeTab === tab.id ? colors.accentLight : 'transparent',
                  color: activeTab === tab.id ? accentColor : colors.textSecondary,
                  fontWeight: activeTab === tab.id ? 500 : 400, fontSize: 13, transition: 'all 0.15s',
                  whiteSpace: 'nowrap', flexShrink: 0
                }}
              >
                <tab.icon size={18} />
                {!isMobileView && <span>{tab.label}</span>}
              </button>
            ))}
          </nav>
        </div>
        <div className="settings-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, backgroundColor: colors.card }}>
          <div style={{ padding: isMobileView ? '12px 16px' : '16px 24px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, margin: 0 }}>{tabs.find((t) => t.id === activeTab)?.label}</h3>
            {!isMobileView && <button onClick={onClose} style={{ padding: 8, cursor: 'pointer', background: 'transparent', border: 'none', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.bgHover} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}><X size={20} style={{ color: colors.textSecondary }} /></button>}
          </div>
          <div className="custom-scrollbar" style={{ flex: 1, padding: isMobileView ? 16 : 24, overflowY: 'auto', backgroundColor: colors.card }}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

function GlobalSearch({ isOpen, onClose }) {
  const { isDark, accentColor } = useTheme();
  const colors = getThemeColors(isDark, accentColor);
  const [query, setQuery] = useState('');
  const searchResults = [
    { type: 'case', title: 'Thompson vs. Global Corp', desc: '#WP/2024/102-B • High Court' },
    { type: 'task', title: 'Review Counter-Affidavit', desc: 'Due by Mar 15 • Priority: High' },
    { type: 'document', title: 'Evidence_Ex_A.docx', desc: 'Uploaded 5 days ago by Sarah' }
  ];

  const filtered = query ? searchResults.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.desc.toLowerCase().includes(query.toLowerCase())
  ) : [];

  if (!isOpen) return null;

  return (
    <div className="fade-in" style={{ position: 'absolute', left: 0, top: 48, width: 480, backgroundColor: colors.card, borderRadius: 12, boxShadow: isDark ? '0 25px 50px -12px rgba(0,0,0,0.5)' : '0 25px 50px -12px rgba(0,0,0,0.15)', border: `1px solid ${colors.border}`, zIndex: 100, overflow: 'hidden' }}>
      <div style={{ padding: 12, backgroundColor: colors.bgSecondary, borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', backgroundColor: colors.input, borderRadius: 8, border: `1px solid ${colors.inputBorder}` }}>
          <Search size={16} style={{ color: colors.textSecondary }} />
          <input autoFocus placeholder="Search..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, backgroundColor: 'transparent', color: colors.text }} value={query} onChange={(e) => setQuery(e.target.value)} />
          {query && <X size={14} style={{ color: colors.textSecondary, cursor: 'pointer' }} onClick={() => setQuery('')} />}
        </div>
      </div>
      <div className="custom-scrollbar" style={{ maxHeight: 360, overflowY: 'auto' }}>
        {query ? (
          filtered.length > 0 ? (
            <div style={{ padding: '8px 0' }}>
              {filtered.map((res, i) => (
                <div key={i} style={{ padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.accentLight} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <div style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: colors.bgTertiary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textSecondary }}>
                    {res.type === 'case' ? <Briefcase size={16} /> : <FileText size={16} />}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: colors.text, margin: 0 }}>{res.title}</p>
                    <p style={{ fontSize: 12, color: colors.textSecondary, margin: '2px 0 0 0' }}>{res.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: 40, textAlign: 'center', color: colors.textSecondary }}>
              <p>No results found</p>
            </div>
          )
        ) : (
          <div style={{ padding: '20px' }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', marginBottom: 12 }}>Recent Searches</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Thompson Case', 'Affidavit'].map((s) => (
                <span key={s} onClick={() => setQuery(s)} style={{ padding: '6px 12px', borderRadius: 20, backgroundColor: colors.bgTertiary, fontSize: 12, color: colors.textSecondary, cursor: 'pointer' }}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationsPanel({ isOpen, onClose, clientNotifications }) {
  const { isDark, accentColor } = useTheme();
  const colors = getThemeColors(isDark, accentColor);
  if (!isOpen) return null;
  return (
    <div className="fade-in" style={{ position: 'absolute', right: 0, top: 44, width: 320, backgroundColor: colors.card, borderRadius: 8, boxShadow: isDark ? '0 25px 50px -12px rgba(0,0,0,0.5)' : '0 25px 50px -12px rgba(0,0,0,0.25)', border: `1px solid ${colors.border}`, zIndex: 100 }}>
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 500, color: colors.text, fontSize: 14 }}>Notifications</span>
        <button style={{ fontSize: 12, color: accentColor, background: 'none', border: 'none', cursor: 'pointer' }}>Mark all read</button>
      </div>
      <div className="custom-scrollbar" style={{ maxHeight: 320, overflowY: 'auto' }}>
        {clientNotifications.map((n) => (
          <div key={n.id} style={{ padding: '12px 16px', borderBottom: `1px solid ${colors.borderLight}`, cursor: 'pointer', backgroundColor: !n.read ? colors.bgSecondary : 'transparent' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <Bell size={14} style={{ color: accentColor, marginTop: 2 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, color: colors.text, fontWeight: 500, margin: 0 }}>{n.title}</p>
                <p style={{ fontSize: 12, color: colors.textSecondary, marginTop: 2, margin: '2px 0 0 0' }}>{n.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductivityHeader({ addNotification, clientNotifications, onOpenSettings, onOpenMobileMenu }) {
  const { isDark, accentColor } = useTheme();
  const colors = getThemeColors(isDark, accentColor);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const searchRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) setIsSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotificationsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header style={{ height: 56, borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.header, position: 'sticky', top: 0, zIndex: 80, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
        <button onClick={onOpenMobileMenu} className="nav-icon-btn mobile-menu-btn"><Menu size={20} /></button>
        <div ref={searchRef} className="header-search" style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
          <div onClick={() => setIsSearchOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px', backgroundColor: colors.bgTertiary, borderRadius: 8, cursor: 'text' }}>
            <Search size={16} style={{ color: colors.textSecondary }} />
            <span style={{ color: colors.textMuted, fontSize: 13 }}>Search...</span>
          </div>
          <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button onClick={() => { setIsSyncing(true); setTimeout(() => { setIsSyncing(false); addNotification('success', 'Synced'); }, 1000); }} className="nav-icon-btn"><RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} /></button>
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="nav-icon-btn"><Bell size={18} /></button>
          <NotificationsPanel isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} clientNotifications={clientNotifications} />
        </div>
        <button onClick={onOpenSettings} className="nav-icon-btn"><Settings size={18} /></button>
        <button onClick={() => setIsHelpOpen(true)} className="nav-icon-btn"><HelpCircle size={18} /></button>
      </div>
      <HelpPanel isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </header>
  );
}

function Sidebar({ isExpanded, toggleSidebar }) {
  const { isDark, accentColor } = useTheme();
  const colors = getThemeColors(isDark, accentColor);
  const pathname = usePathname();

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { id: 'matters', icon: Scale, label: 'Matters', href: '/matters' },
    { id: 'tasks', icon: ListTodo, label: 'Tasks', href: '/tasks' },
    { id: 'calendar', icon: Calendar, label: 'Calendar', href: '/calendar' },
    { id: 'documents', icon: FileText, label: 'Documents', href: '/documents' },
    { id: 'billing', icon: CreditCard, label: 'Payments', href: '/billing' },
    { id: 'messages', icon: MessageSquare, label: 'Messages', href: '/messages' }
  ];

  const getActiveView = () => {
    if (pathname === '/') return 'dashboard';
    const path = pathname.split('/')[1];
    return path || 'dashboard';
  };

  const activeView = getActiveView();

  return (
    <aside className="sidebar-transition desktop-sidebar" style={{ width: isExpanded ? 240 : 68, borderRight: `1px solid ${colors.border}`, backgroundColor: colors.sidebar, flexDirection: 'column', height: 'calc(100vh - 56px)', overflow: 'hidden' }}>
      <div style={{ padding: isExpanded ? '16px' : '16px 10px', borderBottom: `1px solid ${colors.borderLight}`, display: 'flex', alignItems: 'center', gap: 12, minHeight: 64 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${accentColor} 0%, #7c3aed 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Scale size={20} style={{ color: '#fff' }} /></div>
        {isExpanded && <div><h1 style={{ fontSize: 16, fontWeight: 700, color: colors.text, margin: 0 }}>TheCourtCase</h1></div>}
      </div>
      <nav className="custom-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, padding: isExpanded ? '12px 10px' : '12px 6px', overflowY: 'auto' }}>
        {navItems.map((item) => (
          <Link key={item.id} href={item.href} className={`sidebar-nav-item ${activeView === item.id ? 'active' : ''}`} style={{ justifyContent: isExpanded ? 'flex-start' : 'center', color: activeView === item.id ? accentColor : colors.textSecondary }}>
            <item.icon size={20} style={{ flexShrink: 0 }} />
            {isExpanded && <span className="nav-label">{item.label}</span>}
            {!isExpanded && <span className="sidebar-tooltip">{item.label}</span>}
          </Link>
        ))}
      </nav>
      <div style={{ padding: 10, borderTop: `1px solid ${colors.borderLight}` }}>
        <button onClick={toggleSidebar} style={{ width: '100%', padding: '10px', background: 'transparent', border: `1px solid ${colors.border}`, borderRadius: 8, cursor: 'pointer', color: colors.textSecondary, display: 'flex', alignItems: 'center', justifyContent: isExpanded ? 'flex-start' : 'center', gap: 10 }}>
          {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          {isExpanded && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

function MobileSidebarDrawer({ isOpen, onClose, onOpenSettings }) {
  const { isDark, accentColor } = useTheme();
  const colors = getThemeColors(isDark, accentColor);
  const pathname = usePathname();
  
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { id: 'matters', icon: Scale, label: 'Matters', href: '/matters' },
    { id: 'tasks', icon: ListTodo, label: 'Tasks', href: '/tasks' },
    { id: 'calendar', icon: Calendar, label: 'Calendar', href: '/calendar' },
    { id: 'documents', icon: FileText, label: 'Documents', href: '/documents' },
    { id: 'billing', icon: CreditCard, label: 'Payments', href: '/billing' },
    { id: 'messages', icon: MessageSquare, label: 'Messages', href: '/messages' }
  ];

  const getActiveView = () => {
    if (pathname === '/') return 'dashboard';
    const path = pathname.split('/')[1];
    return path || 'dashboard';
  };

  const activeView = getActiveView();

  return (
    <>
      <div className={`mobile-sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose} />
      <div className={`mobile-sidebar-drawer ${isOpen ? 'open' : ''}`} style={{ background: colors.sidebar }}>
        <div style={{ padding: '16px', borderBottom: `1px solid ${colors.borderLight}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Scale size={20} style={{ color: accentColor }} /> <h1 style={{ fontSize: 16, fontWeight: 700, color: colors.text, margin: 0 }}>TheCourtCase</h1></div>
          <button onClick={onClose} style={{ padding: 8, background: 'transparent', border: 'none' }}><X size={20} style={{ color: colors.textSecondary }} /></button>
        </div>
        <nav style={{ padding: '12px' }}>
          {navItems.map((item) => (
            <Link key={item.id} href={item.href} onClick={onClose} className={`sidebar-nav-item ${activeView === item.id ? 'active' : ''}`} style={{ padding: '12px 14px', color: activeView === item.id ? accentColor : colors.textSecondary, marginBottom: 2 }}>
              <item.icon size={20} />
              <span style={{ fontSize: 15 }}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

function MessagesContent({ addNotification }) {
  const { isDark, accentColor } = useTheme();
  const colors = getThemeColors(isDark, accentColor);
  const [message, setMessage] = useState('');
  const [activeChannel, setActiveChannel] = useState('all');
  const [activeConversation, setActiveConversation] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showMobileConversation, setShowMobileConversation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Lead Advocate',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      status: 'online',
      matter: 'Thompson vs. Global Corp',
      matterNumber: 'MAT-2024-001',
      lastMessage: "Yes, please upload them now. Great work finding those.",
      lastMessageTime: '11:15 AM',
      unread: 2,
      channel: 'portal',
      phone: '+1 (555) 123-4567',
      email: 'sarah.jenkins@lawfirm.com'
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'Paralegal',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      status: 'offline',
      matter: 'Thompson vs. Global Corp',
      matterNumber: 'MAT-2024-001',
      lastMessage: "I've prepared the document summary for your review.",
      lastMessageTime: 'Yesterday',
      unread: 0,
      channel: 'email',
      phone: '+1 (555) 234-5678',
      email: 'david.chen@lawfirm.com'
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'Associate Attorney',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      status: 'away',
      matter: 'Miller Estate Planning',
      matterNumber: 'MAT-2024-002',
      lastMessage: "The trust documents are ready for signing.",
      lastMessageTime: 'Mar 12',
      unread: 0,
      channel: 'sms',
      phone: '+1 (555) 345-6789',
      email: 'emily.watson@lawfirm.com'
    },
    {
      id: 4,
      name: 'Michael Brown',
      role: 'Senior Partner',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      status: 'online',
      matter: 'Davis Property Acquisition',
      matterNumber: 'MAT-2024-003',
      lastMessage: "Let's schedule a call to discuss the acquisition terms.",
      lastMessageTime: 'Mar 10',
      unread: 1,
      channel: 'calls',
      phone: '+1 (555) 456-7890',
      email: 'michael.brown@lawfirm.com'
    }
  ]);

  const [allMessages, setAllMessages] = useState({
    1: [
      { id: 1, from: 'advocate', name: 'Sarah Jenkins', text: "Hello Alex, I hope you're doing well. I wanted to touch base regarding the Thompson case.", time: '10:30 AM', date: 'Today', channel: 'portal', read: true },
      { id: 2, from: 'advocate', name: 'Sarah Jenkins', text: "I've reviewed your documents. The regulatory compliance section is strong, but we need to strengthen the financial disclosures.", time: '10:45 AM', date: 'Today', channel: 'portal', read: true },
      { id: 3, from: 'client', name: 'You', text: 'Thank you Sarah! Should I upload the additional audit reports? I have the 2023 financials ready.', time: '11:02 AM', date: 'Today', channel: 'portal', read: true },
      { id: 4, from: 'advocate', name: 'Sarah Jenkins', text: "Yes, please upload them now. Great work finding those. They'll really strengthen our position.", time: '11:15 AM', date: 'Today', channel: 'portal', read: true },
      { id: 5, from: 'advocate', name: 'Sarah Jenkins', text: "Also, just a reminder - the hearing is scheduled for March 18th at 10:30 AM. Please make sure to be at the courthouse by 10:00 AM.", time: '11:20 AM', date: 'Today', channel: 'portal', read: false, attachment: { name: 'Court_Notice.pdf', size: '245 KB' } },
      { id: 6, from: 'advocate', name: 'Sarah Jenkins', text: "I've attached the court notice for your reference.", time: '11:21 AM', date: 'Today', channel: 'portal', read: false }
    ],
    2: [
      { id: 1, from: 'advocate', name: 'David Chen', text: "Hi Alex, I've been working on organizing all the evidence for the Thompson case.", time: '2:30 PM', date: 'Yesterday', channel: 'email', read: true },
      { id: 2, from: 'advocate', name: 'David Chen', text: "I've prepared the document summary for your review. Would you like me to send it over?", time: '2:45 PM', date: 'Yesterday', channel: 'email', read: true },
      { id: 3, from: 'client', name: 'You', text: 'Yes please, that would be helpful. Also, can you include the timeline of events?', time: '3:00 PM', date: 'Yesterday', channel: 'email', read: true }
    ],
    3: [
      { id: 1, from: 'advocate', name: 'Emily Watson', text: "Hi Alex, quick update on the estate planning documents.", time: '9:00 AM', date: 'Mar 12', channel: 'sms', read: true },
      { id: 2, from: 'advocate', name: 'Emily Watson', text: "The trust documents are ready for signing. When would be a good time to meet?", time: '9:05 AM', date: 'Mar 12', channel: 'sms', read: true }
    ],
    4: [
      { id: 1, from: 'advocate', name: 'Michael Brown', text: "Alex, I wanted to discuss the property acquisition terms with you.", time: '4:00 PM', date: 'Mar 10', channel: 'calls', read: true },
      { id: 2, from: 'advocate', name: 'Michael Brown', text: "Let's schedule a call to discuss the acquisition terms. Are you available tomorrow afternoon?", time: '4:15 PM', date: 'Mar 10', channel: 'calls', read: false }
    ]
  });

  const channels = [
    { id: 'all', label: 'All Messages', icon: Inbox, count: conversations.reduce((sum, c) => sum + c.unread, 0) },
    { id: 'portal', label: 'Client Portal', icon: MessageSquare, count: conversations.filter((c) => c.channel === 'portal').reduce((sum, c) => sum + c.unread, 0) },
    { id: 'sms', label: 'Text Messages', icon: Smartphone, count: conversations.filter((c) => c.channel === 'sms').reduce((sum, c) => sum + c.unread, 0) },
    { id: 'email', label: 'Email', icon: Mail, count: conversations.filter((c) => c.channel === 'email').reduce((sum, c) => sum + c.unread, 0) },
    { id: 'calls', label: 'Call Log', icon: Phone, count: conversations.filter((c) => c.channel === 'calls').reduce((sum, c) => sum + c.unread, 0) }
  ];

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'sms': return Smartphone;
      case 'email': return Mail;
      case 'portal': return MessageSquare;
      case 'calls': return Phone;
      default: return MessageSquare;
    }
  };

  const getChannelColor = (channel) => {
    switch (channel) {
      case 'sms': return '#00c853';
      case 'email': return '#4772fa';
      case 'portal': return '#9c27b0';
      case 'calls': return '#ff9500';
      default: return accentColor;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#00c853';
      case 'away': return '#ff9500';
      case 'offline': return '#808080';
      default: return '#808080';
    }
  };

  const filteredConversations = conversations.filter((conv) => {
    const matchesChannel = activeChannel === 'all' || conv.channel === activeChannel;
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.matter.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  const currentConversation = conversations.find((c) => c.id === activeConversation);
  const currentMessages = allMessages[activeConversation] || [];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMsg = {
        id: currentMessages.length + 1,
        from: 'client',
        name: 'You',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: 'Today',
        channel: currentConversation?.channel || 'portal',
        read: true
      };
      setAllMessages((prev) => ({
        ...prev,
        [activeConversation]: [...(prev[activeConversation] || []), newMsg]
      }));
      setConversations((prev) => prev.map((c) =>
        c.id === activeConversation ? { ...c, lastMessage: message, lastMessageTime: 'Just now' } : c
      ));
      setMessage('');
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newMsg = {
        id: currentMessages.length + 1,
        from: 'client',
        name: 'You',
        text: `Shared a file: ${files[0].name}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: 'Today',
        channel: currentConversation?.channel || 'portal',
        read: true,
        attachment: { name: files[0].name, size: `${(files[0].size / 1024).toFixed(0)} KB` }
      };
      setAllMessages((prev) => ({
        ...prev,
        [activeConversation]: [...(prev[activeConversation] || []), newMsg]
      }));
      addNotification('success', `File "${files[0].name}" sent`);
    }
  };

  const selectConversation = (convId) => {
    setActiveConversation(convId);
    setConversations((prev) => prev.map((c) => c.id === convId ? { ...c, unread: 0 } : c));
    if (isMobile) setShowMobileConversation(true);
  };

  const ConversationList = () => (
    <>
      <div style={{ padding: 16, borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.text, margin: 0 }}>Messages</h2>
          <button
            onClick={() => setShowNewMessageModal(true)}
            style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: accentColor, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Users size={20} />
          </button>
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary }} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            style={{ width: '100%', padding: '10px 12px 10px 38px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: colors.input, color: colors.text, boxSizing: 'border-box' }}
          />
        </div>
      </div>

      <div className="comm-channels-scroll" style={{ display: 'flex', gap: 6, padding: '12px 16px', borderBottom: `1px solid ${colors.border}`, overflowX: 'auto' }}>
        {channels.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setActiveChannel(ch.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', border: 'none', flexShrink: 0,
              backgroundColor: activeChannel === ch.id ? accentColor : colors.bgTertiary,
              color: activeChannel === ch.id ? '#fff' : colors.textSecondary
            }}
          >
            <ch.icon size={14} />
            {ch.label}
            {ch.count > 0 && (
              <span style={{ backgroundColor: activeChannel === ch.id ? 'rgba(255,255,255,0.3)' : '#eb4d3d', color: '#fff', padding: '2px 6px', borderRadius: 10, fontSize: 10, fontWeight: 600 }}>{ch.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto' }}>
        {filteredConversations.length > 0 ? filteredConversations.map((conv) => {
          const ChannelIcon = getChannelIcon(conv.channel);
          return (
            <div
              key={conv.id}
              onClick={() => selectConversation(conv.id)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', cursor: 'pointer', borderBottom: `1px solid ${colors.borderLight}`,
                backgroundColor: activeConversation === conv.id ? colors.accentLight : 'transparent'
              }}
              onMouseEnter={(e) => { if (activeConversation !== conv.id) e.currentTarget.style.backgroundColor = colors.bgHover; }}
              onMouseLeave={(e) => { if (activeConversation !== conv.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img src={conv.avatar} alt={conv.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: '50%', backgroundColor: getStatusColor(conv.status), border: `2px solid ${colors.card}` }}></div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: conv.unread > 0 ? 600 : 500, color: colors.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.name}</span>
                  <span style={{ fontSize: 11, color: conv.unread > 0 ? accentColor : colors.textMuted, fontWeight: conv.unread > 0 ? 600 : 400, flexShrink: 0 }}>{conv.lastMessageTime}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: colors.textSecondary }}>{conv.role}</span>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: colors.textMuted }}></span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <ChannelIcon size={12} style={{ color: getChannelColor(conv.channel) }} />
                    <span style={{ fontSize: 11, color: getChannelColor(conv.channel), textTransform: 'capitalize' }}>{conv.channel}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: 13, color: conv.unread > 0 ? colors.text : colors.textSecondary, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: conv.unread > 0 ? 500 : 400, flex: 1 }}>{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <span style={{ backgroundColor: accentColor, color: '#fff', padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600, marginLeft: 8, flexShrink: 0 }}>{conv.unread}</span>
                  )}
                </div>
                <p style={{ fontSize: 11, color: colors.textMuted, margin: '4px 0 0 0' }}>{conv.matter}</p>
              </div>
            </div>
          );
        }) : (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <MessageSquare size={40} style={{ color: colors.textMuted, marginBottom: 12, opacity: 0.3 }} />
            <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>No conversations found</p>
          </div>
        )}
      </div>
    </>
  );

  const ChatArea = () => (
    <>
      <header className="chat-header" style={{ height: 64, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.card }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isMobile && (
            <button onClick={() => setShowMobileConversation(false)} style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6, marginRight: 4 }}>
              <ChevronLeft size={24} style={{ color: colors.textSecondary }} />
            </button>
          )}
          {currentConversation && (
            <>
              <div style={{ position: 'relative' }}>
                <img src={currentConversation.avatar} alt={currentConversation.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: '50%', backgroundColor: getStatusColor(currentConversation.status), border: `2px solid ${colors.card}` }}></div>
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: 0 }}>{currentConversation.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: colors.textSecondary }}>{currentConversation.role}</span>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: colors.textMuted }}></span>
                  <span style={{ fontSize: 12, color: getStatusColor(currentConversation.status), textTransform: 'capitalize' }}>{currentConversation.status}</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button onClick={() => addNotification('info', 'Starting call...')} style={{ padding: 10, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 8, minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Phone size={20} style={{ color: colors.textSecondary }} />
          </button>
          <button onClick={() => addNotification('info', 'Starting video call...')} style={{ padding: 10, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 8, minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Video size={20} style={{ color: colors.textSecondary }} />
          </button>
          <button onClick={() => setShowContactInfo(!showContactInfo)} style={{ padding: 10, backgroundColor: showContactInfo ? colors.accentLight : 'transparent', border: 'none', cursor: 'pointer', borderRadius: 8, minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Info size={20} style={{ color: showContactInfo ? accentColor : colors.textSecondary }} />
          </button>
        </div>
      </header>

      {currentConversation && (
        <div style={{ padding: '8px 16px', backgroundColor: colors.bgSecondary, borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <Scale size={14} style={{ color: accentColor }} />
          <span style={{ fontSize: 13, color: colors.textSecondary }}>Matter:</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>{currentConversation.matter}</span>
          <span style={{ fontSize: 12, color: colors.textMuted }}>({currentConversation.matterNumber})</span>
        </div>
      )}

      <div className="custom-scrollbar chat-messages" style={{ flex: 1, overflowY: 'auto', padding: 20, backgroundColor: colors.bgSecondary, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {currentMessages.map((msg, i) => {
          const showDateDivider = i === 0 || currentMessages[i - 1]?.date !== msg.date;
          const ChannelIcon = getChannelIcon(msg.channel);
          return (
            <div key={msg.id}>
              {showDateDivider && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0 16px' }}>
                  <span style={{ fontSize: 12, color: colors.textMuted, backgroundColor: colors.bgSecondary, padding: '4px 12px' }}>{msg.date}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: 12, maxWidth: '75%', marginLeft: msg.from === 'client' ? 'auto' : 0, flexDirection: msg.from === 'client' ? 'row-reverse' : 'row' }}>
                {msg.from !== 'client' && (
                  <img src={currentConversation?.avatar} alt={msg.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, marginTop: 4 }} />
                )}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.from === 'client' ? 'flex-end' : 'flex-start', flex: 1, minWidth: 0 }}>
                  {msg.from !== 'client' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>{msg.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <ChannelIcon size={12} style={{ color: getChannelColor(msg.channel) }} />
                      </div>
                    </div>
                  )}
                  <div className="chat-bubble" style={{ padding: '12px 16px', borderRadius: 16, borderBottomRightRadius: msg.from === 'client' ? 4 : 16, borderBottomLeftRadius: msg.from === 'client' ? 16 : 4, backgroundColor: msg.from === 'client' ? accentColor : colors.card, color: msg.from === 'client' ? '#fff' : colors.text, border: msg.from === 'client' ? 'none' : `1px solid ${colors.border}`, maxWidth: '100%', wordWrap: 'break-word' }}>
                    <p style={{ fontSize: 14, margin: 0, lineHeight: 1.5 }}>{msg.text}</p>
                    {msg.attachment && (
                      <div style={{ marginTop: 10, padding: '10px 12px', backgroundColor: msg.from === 'client' ? 'rgba(255,255,255,0.15)' : colors.bgTertiary, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                        <FileText size={20} style={{ color: msg.from === 'client' ? '#fff' : accentColor }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 13, fontWeight: 500, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.attachment.name}</p>
                          <p style={{ fontSize: 11, margin: '2px 0 0 0', opacity: 0.7 }}>{msg.attachment.size}</p>
                        </div>
                        <Download size={16} style={{ opacity: 0.7 }} />
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, padding: '0 4px' }}>
                    <span style={{ fontSize: 11, color: colors.textMuted }}>{msg.time}</span>
                    {msg.from === 'client' && (
                      <CheckCircle2 size={12} style={{ color: msg.read ? '#00c853' : colors.textMuted }} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container" style={{ padding: 16, borderTop: `1px solid ${colors.border}`, backgroundColor: colors.card }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => fileInputRef.current?.click()} style={{ padding: 10, color: colors.textSecondary, cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 8, minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Attach file">
              <Paperclip size={20} />
            </button>
            <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileUpload} />
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
              style={{ width: '100%', minHeight: 44, maxHeight: 120, padding: '12px 16px', border: `1px solid ${colors.border}`, borderRadius: 12, fontSize: 14, outline: 'none', resize: 'none', backgroundColor: colors.input, color: colors.text, boxSizing: 'border-box' }}
              placeholder="Type a message..."
              rows={1}
            />
          </div>
          <button onClick={handleSendMessage} disabled={!message.trim()} style={{ padding: 12, backgroundColor: message.trim() ? accentColor : colors.bgTertiary, color: message.trim() ? '#fff' : colors.textMuted, borderRadius: 12, cursor: message.trim() ? 'pointer' : 'not-allowed', border: 'none', minWidth: 48, minHeight: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
            <Send size={20} />
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: colors.textMuted }}>Sending via</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', backgroundColor: colors.bgTertiary, borderRadius: 12 }}>
              {currentConversation && <>{React.createElement(getChannelIcon(currentConversation.channel), { size: 12, style: { color: getChannelColor(currentConversation.channel) } })}</>}
              <span style={{ fontSize: 11, color: colors.textSecondary, textTransform: 'capitalize' }}>{currentConversation?.channel || 'Portal'}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Sparkles size={12} style={{ color: colors.textMuted }} />
            <span style={{ fontSize: 11, color: colors.textMuted }}>AI assist available</span>
          </div>
        </div>
      </div>
    </>
  );

  const ContactInfoPanel = () => (
    <div className="contact-info-panel" style={{ width: 280, borderLeft: `1px solid ${colors.border}`, backgroundColor: colors.card, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 20, textAlign: 'center', borderBottom: `1px solid ${colors.border}` }}>
        <img src={currentConversation?.avatar} alt={currentConversation?.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: `3px solid ${accentColor}` }} />
        <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>{currentConversation?.name}</h3>
        <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>{currentConversation?.role}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: getStatusColor(currentConversation?.status || 'offline') }}></span>
          <span style={{ fontSize: 13, color: colors.textSecondary, textTransform: 'capitalize' }}>{currentConversation?.status}</span>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <button onClick={() => addNotification('info', 'Starting call...')} style={{ flex: 1, padding: '10px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, color: colors.text }}>
            <Phone size={16} /> Call
          </button>
          <button onClick={() => addNotification('info', 'Composing email...')} style={{ flex: 1, padding: '10px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, color: colors.text }}>
            <Mail size={16} /> Email
          </button>
        </div>

        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px 0' }}>Contact Info</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', backgroundColor: colors.bgTertiary, borderRadius: 8 }}>
              <Phone size={16} style={{ color: colors.textSecondary }} />
              <div>
                <p style={{ fontSize: 12, color: colors.textMuted, margin: 0 }}>Phone</p>
                <p style={{ fontSize: 14, color: colors.text, margin: '2px 0 0 0' }}>{currentConversation?.phone}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', backgroundColor: colors.bgTertiary, borderRadius: 8 }}>
              <Mail size={16} style={{ color: colors.textSecondary }} />
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 12, color: colors.textMuted, margin: 0 }}>Email</p>
                <p style={{ fontSize: 14, color: colors.text, margin: '2px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentConversation?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px 0' }}>Related Matter</p>
          <div style={{ padding: '12px', backgroundColor: colors.bgTertiary, borderRadius: 8, borderLeft: `3px solid ${accentColor}` }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>{currentConversation?.matter}</p>
            <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>{currentConversation?.matterNumber}</p>
          </div>
        </div>

        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px 0' }}>Shared Files</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { name: 'Court_Notice.pdf', size: '245 KB' },
              { name: 'Evidence_Summary.docx', size: '1.2 MB' }
            ].map((file, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', backgroundColor: colors.bgTertiary, borderRadius: 8, cursor: 'pointer' }}>
                <FileText size={18} style={{ color: accentColor }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, color: colors.text, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</p>
                  <p style={{ fontSize: 11, color: colors.textMuted, margin: '2px 0 0 0' }}>{file.size}</p>
                </div>
                <Download size={14} style={{ color: colors.textSecondary }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: colors.bg }}>
      <aside className="comm-list-desktop messages-sidebar" style={{ width: 340, borderRight: `1px solid ${colors.border}`, backgroundColor: colors.card, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <ConversationList />
      </aside>

      {isMobile ? (
        !showMobileConversation ? (
          <div className="comm-list-mobile-only" style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: colors.card }}>
            <ConversationList />
          </div>
        ) : (
          <main className="comm-chat-mobile" style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: colors.card }}>
            <ChatArea />
          </main>
        )
      ) : (
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: colors.card }}>
          <ChatArea />
        </main>
      )}

      {showContactInfo && !isMobile && currentConversation && <ContactInfoPanel />}

      {showNewMessageModal && (
        <div onClick={() => setShowNewMessageModal(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 150, padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: colors.card, borderRadius: 16, padding: 24, width: 480, maxWidth: '100%', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: colors.text, margin: 0 }}>New Message</h3>
              <button onClick={() => setShowNewMessageModal(false)} style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6 }}>
                <X size={20} style={{ color: colors.textSecondary }} />
              </button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: colors.textSecondary, display: 'block', marginBottom: 8 }}>To</label>
              <select style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.input, color: colors.text }}>
                <option value="">Select recipient...</option>
                {conversations.map((c) => <option key={c.id} value={c.id}>{c.name} - {c.role}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: colors.textSecondary, display: 'block', marginBottom: 8 }}>Channel</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  { id: 'portal', label: 'Portal', icon: MessageSquare },
                  { id: 'sms', label: 'SMS', icon: Smartphone },
                  { id: 'email', label: 'Email', icon: Mail }
                ].map((ch) => (
                  <button key={ch.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', border: `1px solid ${colors.border}`, borderRadius: 8, backgroundColor: colors.bgTertiary, cursor: 'pointer', fontSize: 14, color: colors.text }}>
                    <ch.icon size={16} style={{ color: getChannelColor(ch.id) }} />
                    {ch.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: colors.textSecondary, display: 'block', marginBottom: 8 }}>Related Matter (optional)</label>
              <select style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.input, color: colors.text }}>
                <option value="">Select matter...</option>
                <option value="1">Thompson vs. Global Corp (MAT-2024-001)</option>
                <option value="2">Miller Estate Planning (MAT-2024-002)</option>
                <option value="3">Davis Property Acquisition (MAT-2024-003)</option>
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: colors.textSecondary, display: 'block', marginBottom: 8 }}>Message</label>
              <textarea placeholder="Type your message..." style={{ width: '100%', minHeight: 120, padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, resize: 'vertical', backgroundColor: colors.input, color: colors.text, boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowNewMessageModal(false)} style={{ flex: 1, padding: '12px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', color: colors.text }}>
                Cancel
              </button>
              <button onClick={() => { setShowNewMessageModal(false); addNotification('success', 'Message sent!'); }} style={{ flex: 1, padding: '12px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Send size={16} /> Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MessagesPage() {
  const [notifications, setNotifications] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const [theme, setTheme] = useState('light');
  const [accentColor, setAccentColor] = useState('#4772fa');
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) setTheme(savedTheme);
    const savedAccent = localStorage.getItem('appAccentColor');
    if (savedAccent) setAccentColor(savedAccent);
    const savedSidebar = localStorage.getItem('sidebarExpanded');
    if (savedSidebar !== null) setIsSidebarExpanded(JSON.parse(savedSidebar));

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPrefersDark(mediaQuery.matches);
    const handler = (e) => setSystemPrefersDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => { localStorage.setItem('appTheme', theme); }, [theme]);
  useEffect(() => { localStorage.setItem('appAccentColor', accentColor); }, [accentColor]);
  useEffect(() => { localStorage.setItem('sidebarExpanded', JSON.stringify(isSidebarExpanded)); }, [isSidebarExpanded]);

  const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);
  const colors = getThemeColors(isDark, accentColor);

  const clientNotifications = [
    { id: 1, title: 'New Message', desc: 'Sarah Jenkins sent you a message', read: false },
    { id: 2, title: 'File Shared', desc: 'Court notice document received', read: true }
  ];

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 3000);
  };

  const removeNotification = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentColor, setAccentColor, isDark }}>
      <div className="messages-page" style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', overflow: 'hidden', backgroundColor: colors.bg, color: colors.text }}>
        <style>{styles}</style>
        <ProductivityHeader
          addNotification={addNotification}
          clientNotifications={clientNotifications}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
        />

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar
            isExpanded={isSidebarExpanded}
            toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
          />

          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ flex: 1, overflow: 'hidden', paddingBottom: 70 }}>
              <MessagesContent addNotification={addNotification} />
            </div>
          </main>
        </div>

        <MobileSidebarDrawer
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <nav className="mobile-bottom-nav">
          <Link href="/"><LayoutDashboard size={20} /><span>Home</span></Link>
          <Link href="/tasks"><ListTodo size={20} /><span>Tasks</span></Link>
          <Link href="/billing"><CreditCard size={20} /><span>Billing</span></Link>
          <Link href="/messages" className="active"><MessageSquare size={20} /><span>Chat</span></Link>
        </nav>

        <Toast notifications={notifications} removeNotification={removeNotification} />
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} addNotification={addNotification} />
      </div>
    </ThemeContext.Provider>
  );
}