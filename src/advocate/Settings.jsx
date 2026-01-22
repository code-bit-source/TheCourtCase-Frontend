"use client";

import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services';
import { getThemeColors } from '../utils/themeColors';
import {
  Scale, LayoutDashboard, FileText, MessageSquare,
  Calendar, Settings, Bell,
  ChevronRight, Clock,
  CheckCircle2, X,
  ChevronLeft,
  CreditCard, AlertCircle, Info,
  User, Briefcase,
  Search, RefreshCw, HelpCircle, Sparkles, Menu,
  Globe, Palette, Shield, Database, Zap, Crown, Keyboard,
  Trash2, Moon, Sun, Monitor, Link as LinkIcon, Star,
  ListTodo, Camera
} from 'lucide-react';

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  accentColor: '#4772fa',
  setAccentColor: () => {},
  isDark: false
});

const useTheme = () => useContext(ThemeContext);

const styles = `
  .settings-page * { box-sizing: border-box; }
  .settings-page { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.5; -webkit-font-smoothing: antialiased; }
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

  .settings-nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 8px; cursor: pointer; border: none; background: transparent; width: 100%; text-align: left; transition: all 0.15s ease; color: #808080; font-size: 14px; }
  .settings-nav-item:hover { background: #f5f5f5; }
  .settings-nav-item.active { background: rgba(71, 114, 250, 0.1); color: #4772fa; font-weight: 500; }

  @media (max-width: 1024px) {
    .settings-layout { flex-direction: column !important; }
    .settings-sidebar { width: 100% !important; border-right: none !important; border-bottom: 1px solid #e8e8e8 !important; }
    .settings-sidebar-nav { flex-direction: row !important; overflow-x: auto !important; padding: 8px !important; gap: 4px !important; }
    .settings-nav-item { padding: 10px 14px !important; white-space: nowrap !important; flex-shrink: 0 !important; font-size: 12px !important; }
  }

  @media (max-width: 768px) {
    .settings-page { font-size: 13px; }
    .desktop-sidebar { display: none !important; }
    .mobile-bottom-nav { display: flex; }
    .mobile-menu-btn { display: flex; }
    .header-search { display: none !important; }
    .header-extras { display: none !important; }
    .side-panel { width: 100vw; }
    .settings-layout { flex-direction: column !important; position: relative; }
    .settings-sidebar { 
      width: 100% !important; 
      border-right: none !important; 
      border-bottom: 1px solid #e8e8e8 !important; 
      padding: 0 !important;
      position: fixed !important;
      left: 0 !important;
      top: 56px !important;
      bottom: 0 !important;
      z-index: 50 !important;
      transform: translateX(-100%) !important;
      transition: transform 0.3s ease !important;
      max-width: 280px !important;
    }
    .settings-sidebar.open {
      transform: translateX(0) !important;
    }
    .mobile-overlay {
      display: block !important;
    }
    .mobile-close-btn {
      display: flex !important;
    }
    .settings-sidebar-nav { flex-direction: row !important; overflow-x: auto !important; padding: 8px !important; gap: 4px !important; justify-content: flex-start !important; }
    .settings-nav-item { padding: 8px 12px !important; white-space: nowrap !important; flex-shrink: 0 !important; font-size: 12px !important; }
    .settings-content { padding: 16px !important; width: 100% !important; }
    .settings-content h3 { font-size: 16px !important; margin: 0 0 16px 0 !important; }
    .setting-row { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; padding: 12px 0 !important; }
    .setting-row > div:first-child { width: 100% !important; }
    .setting-row > div:last-child { width: 100% !important; }
    .setting-row input, .setting-row button, .setting-row select { width: 100% !important; }
    .theme-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; }
    .theme-grid button { padding: 12px 8px !important; font-size: 12px !important; }
    .shortcut-row { flex-wrap: wrap !important; }
    .accent-color-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 8px !important; }
  }

  @media (max-width: 480px) {
    .settings-page { font-size: 12px; }
    .settings-content { padding: 12px !important; }
    .settings-content h3 { font-size: 14px !important; margin: 0 0 12px 0 !important; }
    .setting-row { padding: 10px 0 !important; }
    .setting-row p { font-size: 12px !important; }
    .setting-row input, .setting-row button, .setting-row select { padding: 8px 10px !important; font-size: 13px !important; }
    .theme-grid { grid-template-columns: 1fr !important; gap: 6px !important; }
    .accent-color-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 6px !important; }
    .modal { width: 95% !important; max-width: 95% !important; }
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

function ProductivityHeader({ addNotification, clientNotifications, onOpenMobileMenu }) {
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
        <button onClick={() => setIsHelpOpen(true)} className="nav-icon-btn"><HelpCircle size={18} /></button>
      </div>
      <HelpPanel isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </header>
  );
}



function SettingsContent({ addNotification, isMobileSidebarOpen, setIsMobileSidebarOpen }) {
  const { user } = useAuth();
  const { theme, setTheme, accentColor, setAccentColor, isDark } = useTheme();
  const colors = getThemeColors(isDark, accentColor);
  const [activeTab, setActiveTab] = useState('account');
  const [displayName, setDisplayName] = useState(user?.name || 'Alex Thompson');
  const [email, setEmail] = useState(user?.email || 'alex.thompson@email.com');
  const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [language, setLanguage] = useState('English');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [timeFormat, setTimeFormat] = useState('12-hour');
  const [startOfWeek, setStartOfWeek] = useState('Sunday');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [desktopNotif, setDesktopNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [syncOnStart, setSyncOnStart] = useState(true);

  const tabs = [
    { id: 'account', icon: User, label: 'Account' },
    { id: 'general', icon: Settings, label: 'General' },
    { id: 'theme', icon: Palette, label: 'Appearance' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'shortcuts', icon: Keyboard, label: 'Shortcuts' },
    { id: 'sync', icon: RefreshCw, label: 'Sync & Backup' },
    { id: 'subscription', icon: Crown, label: 'Subscription' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'about', icon: Info, label: 'About' }
  ];

  const Toggle = ({ checked, onChange }) => (
    <label style={{ position: 'relative', display: 'inline-flex', cursor: 'pointer', flexShrink: 0 }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <div style={{ width: 44, height: 22, backgroundColor: checked ? accentColor : colors.inputBorder, borderRadius: 11, position: 'relative', transition: 'background-color 0.2s' }}>
        <div style={{ position: 'absolute', top: 2, left: checked ? 24 : 2, width: 18, height: 18, backgroundColor: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
      </div>
    </label>
  );

  const SettingRow = ({ label, desc, children }) => (
    <div className="setting-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: `1px solid ${colors.borderLight}`, gap: 16 }}>
      <div style={{ flex: 1, minWidth: 150 }}>
        <p style={{ fontSize: 14, color: colors.text, margin: 0, fontWeight: 500 }}>{label}</p>
        {desc && <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>{desc}</p>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );

  const Select = ({ value, onChange, options }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: '8px 32px 8px 12px', fontSize: 13, border: `1px solid ${colors.inputBorder}`, borderRadius: 6, backgroundColor: colors.input, color: colors.text, cursor: 'pointer', outline: 'none', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(colors.textSecondary)}' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', minWidth: 140 }}
    >
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  );

  const handleSetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      addNotification('error', 'Please fill in all password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      addNotification('error', 'Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      addNotification('error', 'Password must be at least 6 characters');
      return;
    }

    try {
      setPasswordLoading(true);
      const response = await authService.setPassword(newPassword, confirmPassword);
      if (response.success) {
        addNotification('success', 'Password set successfully!');
        setShowSetPasswordModal(false);
        setNewPassword('');
        setConfirmPassword('');
      } else {
        addNotification('error', response.message || 'Failed to set password');
      }
    } catch (error) {
      addNotification('error', 'Error setting password');
      console.error(error);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      addNotification('error', 'Please fill in all password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      addNotification('error', 'New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      addNotification('error', 'Password must be at least 6 characters');
      return;
    }

    try {
      setPasswordLoading(true);
      const response = await authService.changePassword(currentPassword, newPassword, confirmPassword);
      if (response.success) {
        addNotification('success', 'Password changed successfully!');
        setShowChangePasswordModal(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        addNotification('error', response.message || 'Failed to change password');
      }
    } catch (error) {
      addNotification('error', 'Error changing password');
      console.error(error);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    addNotification('success', `Theme changed to ${newTheme}`);
  };

  const handleAccentColorChange = (color, name) => {
    setAccentColor(color);
    addNotification('success', `Accent color changed to ${name}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '24px 0', borderBottom: `1px solid ${colors.borderLight}` }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', border: `3px solid ${accentColor}` }}>
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <button style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', backgroundColor: accentColor, border: `2px solid ${colors.card}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Camera size={14} style={{ color: '#fff' }} />
                </button>
              </div>
              <div>
                <p style={{ fontSize: 20, fontWeight: 600, color: colors.text, margin: 0 }}>Alex Thompson</p>
                <p style={{ fontSize: 14, color: colors.textSecondary, margin: '4px 0 0 0' }}>alex.thompson@email.com</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                  <Crown size={16} style={{ color: '#ff9500' }} />
                  <span style={{ fontSize: 13, color: '#ff9500', fontWeight: 500 }}>Premium Member</span>
                </div>
              </div>
            </div>

            <SettingRow label="Display Name" desc="Your name as shown to others">
              <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} style={{ padding: '10px 14px', fontSize: 14, border: `1px solid ${colors.inputBorder}`, borderRadius: 8, width: 220, outline: 'none', boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }} />
            </SettingRow>

            <SettingRow label="Email Address" desc="Used for login and notifications">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px 14px', fontSize: 14, border: `1px solid ${colors.inputBorder}`, borderRadius: 8, width: 220, outline: 'none', boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }} />
            </SettingRow>

            <SettingRow label="Password" desc={user?.hasPassword ? "Last changed 30 days ago" : "Set a password to secure your account"}>
              {user?.hasPassword ? (
                <button 
                  onClick={() => setShowChangePasswordModal(true)}
                  style={{ padding: '10px 20px', fontSize: 14, border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', color: colors.text, fontWeight: 500 }}
                >
                  Change Password
                </button>
              ) : (
                <button 
                  onClick={() => setShowSetPasswordModal(true)}
                  style={{ padding: '10px 20px', fontSize: 14, border: `1px solid ${accentColor}`, borderRadius: 8, backgroundColor: colors.accentLight, cursor: 'pointer', color: accentColor, fontWeight: 500 }}
                >
                  Set Password
                </button>
              )}
            </SettingRow>

            <SettingRow label="Two-Factor Authentication" desc="Add an extra layer of security">
              <button style={{ padding: '10px 20px', fontSize: 14, border: `1px solid ${accentColor}`, borderRadius: 8, backgroundColor: colors.accentLight, cursor: 'pointer', color: accentColor, fontWeight: 500 }}>
                Enable 2FA
              </button>
            </SettingRow>

            <SettingRow label="Connected Accounts" desc="Sign in faster with connected accounts">
              <button style={{ padding: '8px 14px', fontSize: 13, border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: colors.text }}>
                <Globe size={16} /> Google Connected
              </button>
            </SettingRow>

            <div style={{ marginTop: 32, padding: 20, backgroundColor: isDark ? 'rgba(235,77,61,0.1)' : 'rgba(235,77,61,0.05)', borderRadius: 12, border: '1px solid rgba(235,77,61,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Trash2 size={20} style={{ color: '#eb4d3d', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, fontWeight: 500, color: '#eb4d3d', margin: 0 }}>Delete Account</p>
                  <p style={{ fontSize: 13, color: colors.textSecondary, margin: '4px 0 0 0' }}>Permanently delete your account and all data</p>
                </div>
                <button style={{ padding: '10px 20px', fontSize: 14, border: '1px solid #eb4d3d', borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', color: '#eb4d3d', fontWeight: 500 }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        );

      case 'general':
        return (
          <div>
            <SettingRow label="Language" desc="Select your preferred language">
              <Select value={language} onChange={setLanguage} options={['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese']} />
            </SettingRow>
            <SettingRow label="Date Format" desc="How dates are displayed">
              <Select value={dateFormat} onChange={setDateFormat} options={['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']} />
            </SettingRow>
            <SettingRow label="Time Format" desc="12-hour or 24-hour format">
              <Select value={timeFormat} onChange={setTimeFormat} options={['12-hour', '24-hour']} />
            </SettingRow>
            <SettingRow label="Start of Week" desc="First day of the week">
              <Select value={startOfWeek} onChange={setStartOfWeek} options={['Sunday', 'Monday', 'Saturday']} />
            </SettingRow>
          </div>
        );

      case 'theme':
        return (
          <div>
            <p style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 24, margin: '0 0 24px 0' }}>Choose how Legal Suite looks to you</p>
            
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
                    padding: 24, borderRadius: 12, border: `2px solid ${theme === t.id ? accentColor : colors.inputBorder}`,
                    backgroundColor: theme === t.id ? colors.accentLight : colors.card, cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, transition: 'all 0.2s'
                  }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: theme === t.id ? accentColor : colors.bgTertiary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <t.icon size={26} style={{ color: theme === t.id ? '#fff' : colors.textSecondary }} />
                  </div>
                  <span style={{ fontSize: 15, fontWeight: theme === t.id ? 600 : 400, color: theme === t.id ? accentColor : colors.text }}>{t.label}</span>
                </button>
              ))}
            </div>

            <div style={{ padding: 20, backgroundColor: colors.bgSecondary, borderRadius: 12, border: `1px solid ${colors.border}`, marginBottom: 32 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 16px 0' }}>Preview</p>
              <div style={{ padding: 16, borderRadius: 8, backgroundColor: isDark ? '#1a1a2e' : '#ffffff', border: '1px solid', borderColor: isDark ? '#2d2d44' : '#e8e8e8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Scale size={16} style={{ color: '#fff' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: isDark ? '#fff' : '#1f1f1f', margin: 0 }}>TheCourtCase</p>
                    <p style={{ fontSize: 11, color: isDark ? '#a0a0a0' : '#808080', margin: 0 }}>Legal Suite</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, padding: 12, borderRadius: 6, backgroundColor: isDark ? '#16213e' : '#f5f5f5' }}>
                    <p style={{ fontSize: 11, color: isDark ? '#a0a0a0' : '#808080', margin: '0 0 4px 0' }}>Tasks</p>
                    <p style={{ fontSize: 16, fontWeight: 600, color: isDark ? '#fff' : '#1f1f1f', margin: 0 }}>12</p>
                  </div>
                  <div style={{ flex: 1, padding: 12, borderRadius: 6, backgroundColor: isDark ? '#16213e' : '#f5f5f5' }}>
                    <p style={{ fontSize: 11, color: isDark ? '#a0a0a0' : '#808080', margin: '0 0 4px 0' }}>Cases</p>
                    <p style={{ fontSize: 16, fontWeight: 600, color: isDark ? '#fff' : '#1f1f1f', margin: 0 }}>8</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${colors.borderLight}`, paddingTop: 24 }}>
              <p style={{ fontSize: 15, fontWeight: 500, color: colors.text, marginBottom: 16, margin: '0 0 16px 0' }}>Accent Color</p>
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
                      width: 44, height: 44, borderRadius: '50%', backgroundColor: item.color,
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

      case 'notifications':
        return (
          <div>
            <SettingRow label="Sound Effects" desc="Play sounds for actions and alerts">
              <Toggle checked={soundEnabled} onChange={() => setSoundEnabled(!soundEnabled)} />
            </SettingRow>
            <SettingRow label="Vibration" desc="Vibrate on mobile devices">
              <Toggle checked={vibrationEnabled} onChange={() => setVibrationEnabled(!vibrationEnabled)} />
            </SettingRow>
            <SettingRow label="Desktop Notifications" desc="Show browser notifications">
              <Toggle checked={desktopNotif} onChange={() => setDesktopNotif(!desktopNotif)} />
            </SettingRow>
            <SettingRow label="Email Notifications" desc="Receive updates via email">
              <Toggle checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
            </SettingRow>
            <SettingRow label="Reminder Sound" desc="Sound played for reminders">
              <Select value="Default" onChange={() => {}} options={['Default', 'Chime', 'Bell', 'Alert', 'None']} />
            </SettingRow>
          </div>
        );

      case 'calendar':
        return (
          <div>
            <SettingRow label="Default Calendar View" desc="Initial view when opening calendar">
              <Select value="Month" onChange={() => {}} options={['Day', 'Week', 'Month', 'Year']} />
            </SettingRow>
            <SettingRow label="Start of Week" desc="First day shown in calendar">
              <Select value={startOfWeek} onChange={setStartOfWeek} options={['Sunday', 'Monday', 'Saturday']} />
            </SettingRow>
            <SettingRow label="Show Week Numbers" desc="Display week numbers in calendar">
              <Toggle checked={false} onChange={() => {}} />
            </SettingRow>
            <SettingRow label="Default Event Duration" desc="Duration for new events">
              <Select value="30 minutes" onChange={() => {}} options={['15 minutes', '30 minutes', '1 hour', '2 hours']} />
            </SettingRow>
          </div>
        );

      case 'shortcuts':
        return (
          <div>
            <p style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 24, margin: '0 0 24px 0' }}>Keyboard shortcuts to help you work faster</p>
            {[
              { keys: ['⌘', 'K'], action: 'Open search' },
              { keys: ['⌘', 'N'], action: 'New task' },
              { keys: ['⌘', 'S'], action: 'Save changes' },
              { keys: ['⌘', '/'], action: 'Open shortcuts' },
              { keys: ['⌘', 'B'], action: 'Toggle sidebar' },
              { keys: ['Esc'], action: 'Close modal' },
              { keys: ['↑', '↓'], action: 'Navigate lists' },
              { keys: ['Enter'], action: 'Open selected item' }
            ].map((shortcut, i) => (
              <div key={i} className="shortcut-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: `1px solid ${colors.borderLight}` }}>
                <span style={{ fontSize: 14, color: colors.text }}>{shortcut.action}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {shortcut.keys.map((key, j) => (
                    <span key={j} style={{ padding: '6px 10px', backgroundColor: colors.bgTertiary, border: `1px solid ${colors.inputBorder}`, borderRadius: 6, fontSize: 12, fontWeight: 500, color: colors.textSecondary, minWidth: 32, textAlign: 'center' }}>{key}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'sync':
        return (
          <div>
            <div style={{ padding: 20, backgroundColor: isDark ? 'rgba(0,200,83,0.1)' : 'rgba(0,200,83,0.05)', borderRadius: 12, border: '1px solid rgba(0,200,83,0.2)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
              <CheckCircle2 size={24} style={{ color: '#00c853' }} />
              <div>
                <p style={{ fontSize: 15, fontWeight: 500, color: '#00c853', margin: 0 }}>All data synced</p>
                <p style={{ fontSize: 13, color: colors.textSecondary, margin: '4px 0 0 0' }}>Last synced: 2 minutes ago</p>
              </div>
            </div>

            <SettingRow label="Auto Sync" desc="Automatically sync changes">
              <Toggle checked={syncOnStart} onChange={() => setSyncOnStart(!syncOnStart)} />
            </SettingRow>
            <SettingRow label="Sync on Startup" desc="Sync when app opens">
              <Toggle checked={true} onChange={() => {}} />
            </SettingRow>
            <SettingRow label="Auto Backup" desc="Automatically backup your data">
              <Toggle checked={autoBackup} onChange={() => setAutoBackup(!autoBackup)} />
            </SettingRow>
            <SettingRow label="Backup Frequency" desc="How often to backup">
              <Select value="Daily" onChange={() => {}} options={['Hourly', 'Daily', 'Weekly']} />
            </SettingRow>

            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              <button onClick={() => addNotification('success', 'Sync started')} style={{ flex: 1, padding: '14px', fontSize: 14, border: `1px solid ${accentColor}`, borderRadius: 8, backgroundColor: colors.accentLight, cursor: 'pointer', color: accentColor, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <RefreshCw size={18} /> Sync Now
              </button>
              <button onClick={() => addNotification('success', 'Backup created')} style={{ flex: 1, padding: '14px', fontSize: 14, border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', color: colors.text, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Database size={18} /> Backup Now
              </button>
            </div>
          </div>
        );

      case 'subscription':
        return (
          <div>
            <div style={{ padding: 28, background: 'linear-gradient(135deg, #4772fa 0%, #7c3aed 100%)', borderRadius: 16, color: '#fff', marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <Crown size={28} />
                <span style={{ fontSize: 22, fontWeight: 600 }}>Premium</span>
              </div>
              <p style={{ fontSize: 15, opacity: 0.9, marginBottom: 16, margin: '0 0 16px 0' }}>You have access to all premium features</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 36, fontWeight: 700 }}>$9.99</span>
                <span style={{ fontSize: 15, opacity: 0.7 }}>/month</span>
              </div>
              <p style={{ fontSize: 13, opacity: 0.7, marginTop: 8, margin: '8px 0 0 0' }}>Next billing date: April 15, 2024</p>
            </div>

            <p style={{ fontSize: 15, fontWeight: 500, color: colors.text, marginBottom: 16, margin: '0 0 16px 0' }}>Premium Features</p>
            {[
              { icon: Zap, label: 'Unlimited tasks and projects' },
              { icon: Calendar, label: 'Advanced calendar views' },
              { icon: Shield, label: 'Priority support' },
              { icon: Database, label: 'Cloud backup & sync' },
              { icon: Palette, label: 'Custom themes' }
            ].map((feature, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: `1px solid ${colors.borderLight}` }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: colors.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <feature.icon size={18} style={{ color: accentColor }} />
                </div>
                <span style={{ fontSize: 14, color: colors.text, flex: 1 }}>{feature.label}</span>
                <CheckCircle2 size={18} style={{ color: '#00c853' }} />
              </div>
            ))}

            <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
              <button style={{ flex: 1, padding: '14px', fontSize: 14, border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', color: colors.textSecondary, fontWeight: 500 }}>
                Manage Subscription
              </button>
              <button style={{ flex: 1, padding: '14px', fontSize: 14, border: '1px solid #eb4d3d', borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', color: '#eb4d3d', fontWeight: 500 }}>
                Cancel Subscription
              </button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div>
            <SettingRow label="Two-Factor Authentication" desc="Add an extra layer of security to your account">
              <button style={{ padding: '10px 20px', fontSize: 14, border: `1px solid ${accentColor}`, borderRadius: 8, backgroundColor: colors.accentLight, cursor: 'pointer', color: accentColor, fontWeight: 500 }}>
                Enable 2FA
              </button>
            </SettingRow>
            <SettingRow label="Login Sessions" desc="Manage your active sessions">
              <button style={{ padding: '10px 20px', fontSize: 14, border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', color: colors.text, fontWeight: 500 }}>
                View Sessions
              </button>
            </SettingRow>
            <SettingRow label="Password" desc="Last changed 30 days ago">
              <button onClick={() => addNotification('info', 'Password reset email sent')} style={{ padding: '10px 20px', fontSize: 14, border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', color: colors.text, fontWeight: 500 }}>
                Change Password
              </button>
            </SettingRow>
            <SettingRow label="Login Notifications" desc="Get notified of new sign-ins">
              <Toggle checked={true} onChange={() => {}} />
            </SettingRow>

            <div style={{ marginTop: 24, padding: 20, backgroundColor: colors.bgSecondary, borderRadius: 12, border: `1px solid ${colors.border}` }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: colors.text, margin: '0 0 16px 0' }}>Recent Activity</h4>
              {[
                { device: 'Chrome on MacOS', location: 'San Francisco, CA', time: 'Active now' },
                { device: 'Safari on iPhone', location: 'San Francisco, CA', time: '2 hours ago' }
              ].map((session, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: i > 0 ? `1px solid ${colors.borderLight}` : 'none' }}>
                  <div>
                    <p style={{ fontSize: 14, color: colors.text, margin: 0 }}>{session.device}</p>
                    <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>{session.location}</p>
                  </div>
                  <span style={{ fontSize: 12, color: session.time === 'Active now' ? '#00c853' : colors.textMuted }}>{session.time}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'about':
        return (
          <div>
            <div style={{ textAlign: 'center', padding: '40px 0', borderBottom: `1px solid ${colors.borderLight}` }}>
              <div style={{ width: 88, height: 88, borderRadius: 22, background: 'linear-gradient(135deg, #4772fa 0%, #7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Scale size={44} style={{ color: '#fff' }} />
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>Legal Suite</h3>
              <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>Version 2.4.0</p>
            </div>

            <div style={{ padding: '24px 0' }}>
              {[
                { label: 'Terms of Service', icon: FileText },
                { label: 'Privacy Policy', icon: Shield },
                { label: 'Open Source Licenses', icon: LinkIcon },
                { label: 'Contact Support', icon: MessageSquare },
                { label: 'Rate on App Store', icon: Star }
              ].map((item, i) => (
                <button key={i} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 0', border: 'none', background: 'transparent', cursor: 'pointer', borderBottom: `1px solid ${colors.borderLight}` }}>
                  <item.icon size={20} style={{ color: colors.textSecondary }} />
                  <span style={{ fontSize: 14, color: colors.text, flex: 1, textAlign: 'left' }}>{item.label}</span>
                  <ChevronRight size={18} style={{ color: colors.textMuted }} />
                </button>
              ))}
            </div>

            <p style={{ fontSize: 13, color: colors.textMuted, textAlign: 'center', margin: '24px 0 0 0' }}>
              © 2024 Legal Suite. All rights reserved.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // Set Password Modal
  const SetPasswordModal = () => (
    <>
      {showSetPasswordModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div className="modal" style={{ backgroundColor: colors.card, borderRadius: 12, padding: '24px', width: '100%', maxWidth: 400, boxShadow: '0 20px 25px rgba(0,0,0,0.15)', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button 
              onClick={() => {
                setShowSetPasswordModal(false);
                setNewPassword('');
                setConfirmPassword('');
              }}
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={20} style={{ color: colors.textSecondary }} />
            </button>
            
            <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: '0 0 8px 0', paddingRight: 30 }}>Set Password</h2>
            <p style={{ fontSize: 14, color: colors.textSecondary, margin: '0 0 24px 0' }}>Create a password to secure your account</p>
            
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: colors.text, marginBottom: 6 }}>New Password</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter password"
                style={{ width: '100%', padding: '10px 12px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.input, color: colors.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: colors.text, marginBottom: 6 }}>Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                style={{ width: '100%', padding: '10px 12px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.input, color: colors.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              />
              <p style={{ fontSize: 12, color: colors.textSecondary, margin: '6px 0 0 0' }}>Must be at least 6 characters</p>
            </div>

            <div style={{ display: 'flex', gap: 12, flexDirection: 'row' }}>
              <button
                onClick={() => {
                  setShowSetPasswordModal(false);
                  setNewPassword('');
                  setConfirmPassword('');
                }}
                style={{ flex: 1, padding: '10px 16px', border: `1px solid ${colors.border}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', color: colors.text, fontWeight: 500, fontSize: 14 }}
              >
                Cancel
              </button>
              <button
                onClick={handleSetPassword}
                disabled={passwordLoading}
                style={{ flex: 1, padding: '10px 16px', border: 'none', borderRadius: 8, backgroundColor: accentColor, cursor: passwordLoading ? 'not-allowed' : 'pointer', color: '#fff', fontWeight: 500, fontSize: 14, opacity: passwordLoading ? 0.6 : 1 }}
              >
                {passwordLoading ? 'Setting...' : 'Set Password'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // Change Password Modal
  const ChangePasswordModal = () => (
    <>
      {showChangePasswordModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div className="modal" style={{ backgroundColor: colors.card, borderRadius: 12, padding: '24px', width: '100%', maxWidth: 400, boxShadow: '0 20px 25px rgba(0,0,0,0.15)', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button 
              onClick={() => {
                setShowChangePasswordModal(false);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
              }}
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={20} style={{ color: colors.textSecondary }} />
            </button>
            
            <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: '0 0 8px 0', paddingRight: 30 }}>Change Password</h2>
            <p style={{ fontSize: 14, color: colors.textSecondary, margin: '0 0 24px 0' }}>Enter your current password and a new password</p>
            
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: colors.text, marginBottom: 6 }}>Current Password</label>
              <input 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                style={{ width: '100%', padding: '10px 12px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.input, color: colors.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: colors.text, marginBottom: 6 }}>New Password</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                style={{ width: '100%', padding: '10px 12px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.input, color: colors.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: colors.text, marginBottom: 6 }}>Confirm New Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                style={{ width: '100%', padding: '10px 12px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.input, color: colors.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              />
              <p style={{ fontSize: 12, color: colors.textSecondary, margin: '6px 0 0 0' }}>Must be at least 6 characters</p>
            </div>

            <div style={{ display: 'flex', gap: 12, flexDirection: 'row' }}>
              <button
                onClick={() => {
                  setShowChangePasswordModal(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
                style={{ flex: 1, padding: '10px 16px', border: `1px solid ${colors.border}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', color: colors.text, fontWeight: 500, fontSize: 14 }}
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                disabled={passwordLoading}
                style={{ flex: 1, padding: '10px 16px', border: 'none', borderRadius: 8, backgroundColor: accentColor, cursor: passwordLoading ? 'not-allowed' : 'pointer', color: '#fff', fontWeight: 500, fontSize: 14, opacity: passwordLoading ? 0.6 : 1 }}
              >
                {passwordLoading ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="settings-layout" style={{ display: 'flex', height: '100%', backgroundColor: colors.bg, position: 'relative' }}>
      {/* Mobile sidebar overlay */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40, display: 'none' }}
          className="mobile-overlay"
        />
      )}
      
      {/* Sidebar - shows normally on desktop, shows as drawer on mobile */}
      <div 
        className={`settings-sidebar ${isMobileSidebarOpen ? 'open' : ''}`}
        style={{ 
          width: 260, 
          borderRight: `1px solid ${colors.border}`, 
          backgroundColor: colors.bgSecondary, 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        <div style={{ padding: '20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.text, margin: 0 }}>Settings</h2>
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            className="mobile-close-btn"
          >
            <X size={20} style={{ color: colors.text }} />
          </button>
        </div>
        <nav className="settings-sidebar-nav custom-scrollbar" style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMobileSidebarOpen(false);
              }}
              className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              style={{
                backgroundColor: activeTab === tab.id ? colors.accentLight : 'transparent',
                color: activeTab === tab.id ? accentColor : colors.textSecondary
              }}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div style={{ padding: 16, borderTop: `1px solid ${colors.border}` }}>
          <p style={{ fontSize: 11, color: colors.textMuted, margin: 0, textAlign: 'center' }}>Legal Suite v2.4.0</p>
        </div>
      </div>

      <div className="settings-content custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: 32, minWidth: 0 }}>
        <div style={{ maxWidth: 640, width: '100%' }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.text, marginBottom: 24, margin: '0 0 24px 0' }}>
            {tabs.find((t) => t.id === activeTab)?.label}
          </h3>
          {renderContent()}
        </div>
      </div>
      
      <SetPasswordModal />
      <ChangePasswordModal />
    </div>
  );
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState([]);
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
    { id: 1, title: 'Settings Updated', desc: 'Your preferences have been saved', read: false },
    { id: 2, title: 'Backup Complete', desc: 'All data backed up successfully', read: true }
  ];

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 3000);
  };

  const removeNotification = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentColor, setAccentColor, isDark }}>
      <div className="settings-page" style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', overflow: 'hidden', backgroundColor: colors.bg, color: colors.text }}>
        <style>{styles}</style>
        <ProductivityHeader
          addNotification={addNotification}
          clientNotifications={clientNotifications}
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
        />

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar
            isExpanded={isSidebarExpanded}
            toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
          />

          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ flex: 1, overflow: 'hidden', paddingBottom: 70 }}>
              <SettingsContent addNotification={addNotification} isMobileSidebarOpen={isMobileSidebarOpen} setIsMobileSidebarOpen={setIsMobileSidebarOpen} />
            </div>
          </main>
        </div>

        <MobileSidebarDrawer
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        <nav className="mobile-bottom-nav">
          <Link href="/"><LayoutDashboard size={20} /><span>Home</span></Link>
          <Link href="/tasks"><ListTodo size={20} /><span>Tasks</span></Link>
          <Link href="/billing"><CreditCard size={20} /><span>Billing</span></Link>
          <Link href="/settings" className="active"><Settings size={20} /><span>Settings</span></Link>
        </nav>

        <Toast notifications={notifications} removeNotification={removeNotification} />
      </div>
    </ThemeContext.Provider>
  );
}