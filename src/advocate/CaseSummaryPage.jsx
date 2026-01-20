"use client";

import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Scale, LayoutDashboard, FileText, MessageSquare,
  Calendar, Users, Settings, Bell,
  ChevronRight, Clock, Upload,
  CheckCircle2, X,
  Download, Eye,
  Gavel, Building2, MapPin,
  CalendarDays, ChevronLeft,
  CreditCard, AlertCircle, Info,
  User, Briefcase, FileCheck,
  Search, RefreshCw, HelpCircle, Sparkles, Menu,
  Palette, Volume2, Keyboard,
  Moon, Sun, Monitor,
  Plus, ListTodo, Phone, Mail, History, Edit3, Share2, MoreVertical, Crown
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
  .case-summary-page * { box-sizing: border-box; }
  .case-summary-page { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.5; -webkit-font-smoothing: antialiased; }
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
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  
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

  @media (max-width: 768px) {
    .desktop-sidebar { display: none !important; }
    .mobile-bottom-nav { display: flex; }
    .mobile-menu-btn { display: flex; }
    .header-search { display: none !important; }
    .header-extras { display: none !important; }
    .side-panel { width: 100vw; }
    .case-info-grid { grid-template-columns: 1fr !important; }
    .parties-grid { grid-template-columns: 1fr !important; }
    .case-header { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
    .case-number { text-align: left !important; }
    .timeline-event { padding-left: 44px !important; }
    .timeline-icon { width: 32px !important; height: 32px !important; left: 0 !important; }
    .timeline-line { left: 16px !important; }
  }

  @media (max-width: 640px) {
    .case-info-grid { grid-template-columns: 1fr !important; }
    .parties-grid { grid-template-columns: 1fr !important; }
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

function Modal({ isOpen, onClose, title, children }) {
  const { isDark, accentColor } = useTheme();
  const colors = getThemeColors(isDark, accentColor);
  if (!isOpen) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 150, padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: colors.card, borderRadius: 12, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', maxWidth: 512, width: '100%', maxHeight: '90vh', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${colors.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ padding: 4, cursor: 'pointer', background: 'none', border: 'none', borderRadius: 4 }}>
            <X size={18} style={{ color: colors.textSecondary }} />
          </button>
        </div>
        <div style={{ padding: 20, overflowY: 'auto', maxHeight: 'calc(90vh - 80px)', color: colors.text }}>{children}</div>
      </div>
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
    { id: 'case-summary', icon: Briefcase, label: 'Case Summary', href: '/case-summary' },
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
    { id: 'case-summary', icon: Briefcase, label: 'Case Summary', href: '/case-summary' },
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

function CaseSummaryContent({ addNotification }) {
  const { isDark, accentColor } = useTheme();
  const colors = getThemeColors(isDark, accentColor);
  const [activeTab, setActiveTab] = useState('overview');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const caseInfo = [
    { label: 'Case Title', value: 'Thompson vs. Global Corp' },
    { label: 'Case Number', value: 'WP/2024/102-B' },
    { label: 'CNR Number', value: 'DLCT01-002451-2024' },
    { label: 'Filing Date', value: 'January 12, 2024' },
    { label: 'Case Type', value: 'Corporate Litigation' },
    { label: 'Court Fee', value: '$2,500' }
  ];

  const courtInfo = [
    { label: 'Court', value: 'High Court of Judicature' },
    { label: 'Bench', value: 'Bench III' },
    { label: 'Judge', value: 'Hon. Justice A.K. Singh' },
    { label: 'Room', value: '302' },
    { label: 'Location', value: 'City Courthouse, Block A' }
  ];

  const timelineEvents = [
    { type: 'upcoming', icon: Calendar, color: '#ff9500', title: 'Final Oral Arguments', date: 'MAR 18, 2024', time: '10:30 AM', desc: 'Both parties to present final arguments.', purpose: 'Final Hearing' },
    { type: 'order', icon: Gavel, color: '#9c27b0', title: 'Interim Stay Granted', date: 'FEB 02, 2024', desc: 'Temporary stay on recovery proceedings.', simple: 'The court has paused the other party\'s attempts to collect money until the next hearing.' },
    { type: 'filing', icon: FileText, color: '#4772fa', title: 'Counter-Affidavit Filed', date: 'JAN 28, 2024', desc: 'Response to preliminary objections submitted.' },
    { type: 'hearing', icon: Calendar, color: '#4772fa', title: 'Preliminary Hearing', date: 'JAN 20, 2024', desc: 'Initial hearing completed.' },
    { type: 'filing', icon: Upload, color: '#808080', title: 'Evidence Submitted', date: 'JAN 15, 2024', desc: 'Documentary evidence filed.' },
    { type: 'origin', icon: FileCheck, color: '#00c853', title: 'Case Registered', date: 'JAN 12, 2024', desc: 'Writ petition admitted.' }
  ];

  const documents = [
    { id: 1, name: 'Court_Order_Feb2024.pdf', date: 'Feb 02, 2024', size: '1.2 MB', type: 'pdf', category: 'Court Order' },
    { id: 2, name: 'Writ_Petition_Final.pdf', date: 'Jan 12, 2024', size: '2.4 MB', type: 'pdf', category: 'Filing' },
    { id: 3, name: 'Evidence_Ex_A.docx', date: 'Jan 15, 2024', size: '840 KB', type: 'doc', category: 'Evidence' },
    { id: 4, name: 'Counter_Affidavit.pdf', date: 'Jan 28, 2024', size: '1.8 MB', type: 'pdf', category: 'Filing' }
  ];

  const tasks = [
    { id: 1, title: 'Review counter-affidavit draft', completed: false, priority: 3, dueDate: 'Today', assignee: 'Sarah Jenkins' },
    { id: 2, title: 'Prepare evidence summary', completed: false, priority: 2, dueDate: 'Tomorrow', assignee: 'David Chen' },
    { id: 3, title: 'File motion for extension', completed: true, priority: 1, dueDate: 'Mar 15', assignee: 'Sarah Jenkins' }
  ];

  const getPriorityColor = (p) => p === 3 ? '#eb4d3d' : p === 2 ? '#ff9500' : '#4772fa';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Briefcase },
    { id: 'timeline', label: 'Timeline', icon: History },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'tasks', label: 'Tasks', icon: ListTodo }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: 1000, margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 6, backgroundColor: 'rgba(255,149,0,0.15)', color: '#cc7700', fontSize: 12, fontWeight: 500 }}>
                <span className="animate-pulse" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#ff9500' }}></span>
                Ongoing
              </span>
              <span style={{ fontSize: 12, color: colors.textSecondary }}>WP/2024/102-B</span>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>Thompson vs. Global Corp</h1>
            <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>Corporate Litigation • High Court of Judicature</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => addNotification('info', 'Sharing case...')} style={{ padding: '10px 16px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: colors.text }}>
              <Share2 size={16} /> Share
            </button>
            <button onClick={() => addNotification('info', 'Opening editor...')} style={{ padding: '10px 16px', backgroundColor: accentColor, color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500 }}>
              <Edit3 size={16} /> Edit Case
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', borderBottom: `1px solid ${colors.border}`, marginBottom: 24, overflowX: 'auto' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 20px', fontSize: 14, fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? accentColor : colors.textSecondary,
              backgroundColor: 'transparent', border: 'none',
              borderBottom: activeTab === tab.id ? `2px solid ${accentColor}` : '2px solid transparent',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap'
            }}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div>
          <div style={{ backgroundColor: accentColor, borderRadius: 12, padding: 20, color: '#fff', marginBottom: 24, boxShadow: `0 10px 15px -3px ${accentColor}30` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Calendar size={16} />
              <span style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Next Hearing</span>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, margin: '0 0 6px 0' }}>Final Oral Arguments</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={14} />
                <span>High Court, Room 302</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CalendarDays size={14} />
                <span>March 18, 2024 • 10:30 AM</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }} className="case-info-grid">
            <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 20 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 16px 0' }}>
                <Briefcase size={16} /> Case Information
              </h3>
              {caseInfo.map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${colors.borderLight}` }}>
                  <span style={{ fontSize: 14, color: colors.textSecondary }}>{item.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: colors.text }}>{item.value}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 20 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 16px 0' }}>
                <Building2 size={16} /> Court Information
              </h3>
              {courtInfo.map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${colors.borderLight}` }}>
                  <span style={{ fontSize: 14, color: colors.textSecondary }}>{item.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: colors.text }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 20, marginBottom: 24 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 16px 0' }}>
              <Users size={16} /> Parties Involved
            </h3>
            <div className="parties-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ padding: 16, borderRadius: 10, backgroundColor: colors.accentLight, borderLeft: `4px solid ${accentColor}` }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: accentColor, textTransform: 'uppercase', marginBottom: 8, margin: '0 0 8px 0' }}>Petitioner (You)</p>
                <p style={{ fontSize: 16, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>Alex Thompson</p>
                <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0 }}>Represented by: Sarah Jenkins, Esq.</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button style={{ padding: '6px 12px', fontSize: 12, backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: colors.text }}>
                    <Phone size={12} /> Call
                  </button>
                  <button style={{ padding: '6px 12px', fontSize: 12, backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: colors.text }}>
                    <Mail size={12} /> Email
                  </button>
                </div>
              </div>
              <div style={{ padding: 16, borderRadius: 10, backgroundColor: colors.bgTertiary, borderLeft: `4px solid ${colors.textSecondary}` }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', marginBottom: 8, margin: '0 0 8px 0' }}>Respondent</p>
                <p style={{ fontSize: 16, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>Global Corporation Ltd.</p>
                <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0 }}>Represented by: Corporate Legal Counsel</p>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 16px 0' }}>
              <User size={16} /> Legal Team
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accentColor}` }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Advocate" />
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: 0 }}>Sarah Jenkins, Esq.</p>
                  <p style={{ fontSize: 12, color: colors.textSecondary, margin: '2px 0 0 0' }}>Lead Advocate</p>
                  <p style={{ fontSize: 11, color: accentColor, margin: '2px 0 0 0' }}>15 years experience</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${colors.border}` }} src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Paralegal" />
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: 0 }}>David Chen</p>
                  <p style={{ fontSize: 12, color: colors.textSecondary, margin: '2px 0 0 0' }}>Paralegal</p>
                  <p style={{ fontSize: 11, color: colors.textMuted, margin: '2px 0 0 0' }}>Case Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 2, background: `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}50 50%, ${colors.border} 100%)` }} className="timeline-line"></div>
          
          {timelineEvents.map((event, i) => (
            <div key={i} style={{ position: 'relative', paddingLeft: 56, marginBottom: 16 }} className="timeline-event">
              <div className="timeline-icon" style={{ position: 'absolute', left: 0, width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, backgroundColor: colors.card, border: `2px solid ${event.color}`, color: event.color }}>
                <event.icon size={16} />
              </div>
              
              <div style={{ padding: 16, borderRadius: 10, border: '1px solid', backgroundColor: event.type === 'upcoming' ? isDark ? 'rgba(255,149,0,0.1)' : 'rgba(255,149,0,0.05)' : colors.card, borderColor: event.type === 'upcoming' ? 'rgba(255,149,0,0.3)' : colors.border }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 4 }}>
                  {event.type === 'upcoming' && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 4, backgroundColor: 'rgba(255,149,0,0.15)', color: '#cc7700', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', width: 'fit-content' }}>
                      <Clock size={10} /> Upcoming
                    </span>
                  )}
                  {event.type === 'order' && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 4, backgroundColor: 'rgba(156,39,176,0.1)', color: '#9c27b0', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', width: 'fit-content' }}>
                      <Gavel size={10} /> Order
                    </span>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ fontWeight: 600, color: colors.text, margin: 0 }}>{event.title}</h4>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 500, color: event.type === 'upcoming' ? '#cc7700' : colors.text, margin: 0 }}>{event.date}</p>
                      {event.time && <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>{event.time}</p>}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: colors.textSecondary, margin: '4px 0 0 0' }}>{event.desc}</p>
                {event.purpose && (
                  <span style={{ display: 'inline-block', marginTop: 8, padding: '4px 10px', borderRadius: 6, backgroundColor: colors.bgTertiary, fontSize: 12, color: colors.textSecondary }}>
                    Purpose: {event.purpose}
                  </span>
                )}
                {event.simple && (
                  <button
                    onClick={() => { setSelectedOrder({ title: event.title, date: event.date, simple: event.simple }); setShowOrderModal(true); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: accentColor, cursor: 'pointer', marginTop: 10, background: 'none', border: 'none', padding: 0, fontWeight: 500 }}
                  >
                    <Info size={14} /> View Simplified Explanation
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'documents' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>{documents.length} documents</p>
            <button onClick={() => addNotification('info', 'Upload modal opening...')} style={{ padding: '10px 16px', backgroundColor: accentColor, color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500 }}>
              <Upload size={16} /> Upload
            </button>
          </div>
          <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
            {documents.map((doc, i) => (
              <div key={doc.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: i < documents.length - 1 ? `1px solid ${colors.borderLight}` : 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: doc.type === 'pdf' ? 'rgba(235,77,61,0.1)' : 'rgba(71,114,250,0.1)', color: doc.type === 'pdf' ? '#eb4d3d' : '#4772fa' }}>
                  <FileText size={20} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <span style={{ fontSize: 12, color: colors.textSecondary }}>{doc.date}</span>
                    <span style={{ fontSize: 12, color: colors.textMuted }}>•</span>
                    <span style={{ fontSize: 12, color: colors.textSecondary }}>{doc.size}</span>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, backgroundColor: colors.bgTertiary, color: colors.textSecondary }}>{doc.category}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <button style={{ padding: 8, color: colors.textSecondary, cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 6 }}>
                    <Eye size={18} />
                  </button>
                  <button onClick={() => addNotification('success', `Downloading ${doc.name}`)} style={{ padding: 8, color: colors.textSecondary, cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 6 }}>
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>{tasks.filter(t => !t.completed).length} pending tasks</p>
            <button onClick={() => addNotification('info', 'Add task modal...')} style={{ padding: '10px 16px', backgroundColor: accentColor, color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500 }}>
              <Plus size={16} /> Add Task
            </button>
          </div>
          <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
            {tasks.map((task, i) => (
              <div key={task.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px', borderBottom: i < tasks.length - 1 ? `1px solid ${colors.borderLight}` : 'none' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${task.completed ? '#00c853' : getPriorityColor(task.priority)}`, backgroundColor: task.completed ? '#00c853' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2, flexShrink: 0, cursor: 'pointer' }}>
                  {task.completed && <CheckCircle2 size={14} style={{ color: '#fff' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, color: task.completed ? colors.textSecondary : colors.text, margin: 0, textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6, fontSize: 13, color: colors.textSecondary }}>
                    <span style={{ color: task.dueDate === 'Today' ? '#eb4d3d' : colors.textSecondary, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={12} /> {task.dueDate}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <User size={12} /> {task.assignee}
                    </span>
                  </div>
                </div>
                <button style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6 }}>
                  <MoreVertical size={18} style={{ color: colors.textSecondary }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal isOpen={showOrderModal} onClose={() => setShowOrderModal(false)} title="Court Order Explained">
        {selectedOrder && (
          <div>
            <div style={{ padding: 14, backgroundColor: isDark ? 'rgba(156,39,176,0.15)' : 'rgba(156,39,176,0.05)', borderRadius: 8, border: '1px solid rgba(156,39,176,0.2)', marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#9c27b0', textTransform: 'uppercase', marginBottom: 6, margin: '0 0 6px 0' }}>Order</p>
              <p style={{ fontWeight: 600, color: colors.text, fontSize: 16, margin: 0 }}>{selectedOrder.title}</p>
              <p style={{ fontSize: 14, color: colors.textSecondary, margin: '4px 0 0 0' }}>{selectedOrder.date}</p>
            </div>
            <div style={{ padding: 14, backgroundColor: isDark ? `${accentColor}20` : `${accentColor}10`, borderRadius: 8, border: `1px solid ${accentColor}30`, marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: accentColor, textTransform: 'uppercase', marginBottom: 6, margin: '0 0 6px 0' }}>What This Means For You</p>
              <p style={{ fontSize: 15, color: colors.text, margin: 0, lineHeight: 1.6 }}>{selectedOrder.simple}</p>
            </div>
            <p style={{ fontSize: 12, color: colors.textSecondary, fontStyle: 'italic', margin: 0 }}>This is a simplified explanation. Please consult your advocate for legal advice.</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default function CaseSummaryPage() {
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
    { id: 1, title: 'Hearing Reminder', desc: 'March 18, 2024 at 10:30 AM', read: false },
    { id: 2, title: 'Document Uploaded', desc: 'Evidence submitted by advocate', read: true }
  ];

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 3000);
  };

  const removeNotification = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentColor, setAccentColor, isDark }}>
      <div className="case-summary-page" style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', overflow: 'hidden', backgroundColor: colors.bg, color: colors.text }}>
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
            <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', backgroundColor: colors.bgSecondary, paddingBottom: 80 }}>
              <CaseSummaryContent addNotification={addNotification} />
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
          <Link href="/case-summary" className="active"><Briefcase size={20} /><span>Case</span></Link>
          <Link href="/messages"><MessageSquare size={20} /><span>Chat</span></Link>
        </nav>

        <Toast notifications={notifications} removeNotification={removeNotification} />
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} addNotification={addNotification} />
      </div>
    </ThemeContext.Provider>
  );
}