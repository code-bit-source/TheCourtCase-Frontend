import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Scale, LayoutDashboard, FileText, MessageSquare,
  Calendar, Settings, Bell,
  ChevronRight, Clock,
  CheckCircle2, X,
  Download,
  ChevronLeft,
  CreditCard, Receipt, AlertCircle, Info,
  User, Briefcase,
  Search, RefreshCw, HelpCircle, Sparkles, Menu,
  Palette, Volume2, Shield, Keyboard,
  Moon, Sun, Monitor,
  ListTodo, Crown
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
  .billing-page * { box-sizing: border-box; }
  .billing-page { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.5; -webkit-font-smoothing: antialiased; }
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

  @media (max-width: 768px) {
    .desktop-sidebar { display: none !important; }
    .mobile-bottom-nav { display: flex; }
    .mobile-menu-btn { display: flex; }
    .header-search { display: none !important; }
    .header-extras { display: none !important; }
    .side-panel { width: 100vw; }
    .billing-stats { grid-template-columns: 1fr !important; }
    .invoice-table { display: none !important; }
    .invoice-cards { display: block !important; }
    .payment-grid { grid-template-columns: 1fr !important; }
  }

  @media (max-width: 640px) {
    .billing-stats { grid-template-columns: 1fr !important; }
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

function BillingContent({ addNotification }) {
  const { isDark, accentColor } = useTheme();
  const colors = getThemeColors(isDark, accentColor);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const invoices = [
    { id: 'INV-2024-003', date: 'Mar 01, 2024', amount: '$2,750', status: 'pending', desc: 'Document preparation and court filing fees' },
    { id: 'INV-2024-002', date: 'Feb 15, 2024', amount: '$5,200', status: 'paid', desc: 'Court filing + legal representation services' },
    { id: 'INV-2024-001', date: 'Jan 20, 2024', amount: '$3,500', status: 'paid', desc: 'Initial consultation and case assessment' }
  ];

  const stats = [
    { label: 'Total Billed', value: '$11,450', icon: CreditCard, color: '#4772fa', desc: 'Year to date' },
    { label: 'Amount Due', value: '$2,750', icon: Receipt, color: '#ff9500', desc: '1 pending invoice' },
    { label: 'Amount Paid', value: '$8,700', icon: CheckCircle2, color: '#00c853', desc: '2 invoices paid' }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: 1000, margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>Payments & Billing</h1>
        <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>View your financial summary and pay invoices</p>
      </div>

      <div className="billing-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {stats.map((item) => (
          <div key={item.label} style={{ backgroundColor: colors.card, padding: 20, borderRadius: 12, border: `1px solid ${colors.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase' }}>{item.label}</span>
              <item.icon size={18} style={{ color: item.color }} />
            </div>
            <p style={{ fontSize: 28, fontWeight: 700, color: colors.text, margin: '0 0 4px 0' }}>{item.value}</p>
            <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, color: colors.text, fontSize: 15 }}>Invoice History</span>
          <button style={{ fontSize: 13, color: accentColor, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Download All</button>
        </div>
        
        <div className="invoice-table custom-scrollbar" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: colors.bgSecondary, borderBottom: `1px solid ${colors.border}` }}>
                <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase' }}>Invoice</th>
                <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase' }}>Description</th>
                <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase' }}>Amount</th>
                <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <tr key={inv.id} style={{ borderBottom: i < invoices.length - 1 ? `1px solid ${colors.borderLight}` : 'none' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>{inv.id}</p>
                    <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>{inv.date}</p>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: 14, color: colors.textSecondary }}>{inv.desc}</td>
                  <td style={{ padding: '16px 20px', fontSize: 14, fontWeight: 600, color: colors.text }}>{inv.amount}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, backgroundColor: inv.status === 'paid' ? 'rgba(0,200,83,0.1)' : 'rgba(255,149,0,0.1)', color: inv.status === 'paid' ? '#00a344' : '#cc7700', textTransform: 'capitalize' }}>{inv.status}</span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => addNotification('info', `Downloading ${inv.id}`)} style={{ padding: 8, background: colors.bgTertiary, border: 'none', borderRadius: 6, cursor: 'pointer' }}><Download size={16} style={{ color: colors.textSecondary }} /></button>
                      {inv.status === 'pending' && <button onClick={() => { setSelectedInvoice(inv); setShowPayModal(true); }} style={{ padding: '8px 16px', background: accentColor, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>Pay Now</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="invoice-cards" style={{ display: 'none' }}>
          {invoices.map((inv) => (
            <div key={inv.id} style={{ padding: 16, borderBottom: `1px solid ${colors.borderLight}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: colors.text, margin: 0 }}>{inv.id}</p>
                  <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>{inv.date}</p>
                </div>
                <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, backgroundColor: inv.status === 'paid' ? 'rgba(0,200,83,0.1)' : 'rgba(255,149,0,0.1)', color: inv.status === 'paid' ? '#00a344' : '#cc7700', textTransform: 'capitalize' }}>{inv.status}</span>
              </div>
              <p style={{ fontSize: 13, color: colors.textSecondary, margin: '0 0 12px 0' }}>{inv.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>{inv.amount}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => addNotification('info', `Downloading ${inv.id}`)} style={{ padding: 8, background: colors.bgTertiary, border: 'none', borderRadius: 6, cursor: 'pointer' }}><Download size={16} style={{ color: colors.textSecondary }} /></button>
                  {inv.status === 'pending' && <button onClick={() => { setSelectedInvoice(inv); setShowPayModal(true); }} style={{ padding: '8px 16px', background: accentColor, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>Pay Now</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="payment-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ backgroundColor: colors.card, padding: 24, borderRadius: 12, border: `1px solid ${colors.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}><CreditCard size={18} /> Payment Methods</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ padding: 16, border: `1px solid ${colors.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 24, backgroundColor: colors.bgTertiary, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: colors.textSecondary }}>VISA</div>
              <div style={{ flex: 1 }}><p style={{ fontSize: 14, color: colors.text, margin: 0 }}>•••• 4242</p><p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>Expires 12/25</p></div>
              <span style={{ fontSize: 11, color: colors.textSecondary, padding: '2px 6px', backgroundColor: colors.bgSecondary, borderRadius: 4 }}>Default</span>
            </div>
            <button style={{ padding: 12, border: `1px dashed ${colors.border}`, background: 'transparent', borderRadius: 8, cursor: 'pointer', color: colors.textSecondary, fontSize: 14, fontWeight: 500 }}>+ Add New Method</button>
          </div>
        </div>
        <div style={{ backgroundColor: colors.card, padding: 24, borderRadius: 12, border: `1px solid ${colors.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}><Shield size={18} /> Auto-Pay</h3>
          <p style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 20 }}>Automatically pay invoices when they are generated using your default payment method.</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: colors.bgSecondary, borderRadius: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: colors.text }}>Enable Auto-Pay</span>
            <div style={{ width: 44, height: 22, backgroundColor: colors.border, borderRadius: 11, position: 'relative', cursor: 'pointer' }}><div style={{ position: 'absolute', top: 2, left: 2, width: 18, height: 18, backgroundColor: '#fff', borderRadius: '50%', transition: 'left 0.2s' }} /></div>
          </div>
        </div>
      </div>

      <Modal isOpen={showPayModal} onClose={() => setShowPayModal(false)} title="Make Payment">
        {selectedInvoice && (
          <div>
            <div style={{ padding: 16, backgroundColor: colors.bgSecondary, borderRadius: 8, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span style={{ fontSize: 14, color: colors.textSecondary }}>Invoice ID</span><span style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>{selectedInvoice.id}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: `1px solid ${colors.border}` }}><span style={{ fontSize: 16, fontWeight: 600, color: colors.text }}>Total Amount</span><span style={{ fontSize: 20, fontWeight: 700, color: accentColor }}>{selectedInvoice.amount}</span></div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', marginBottom: 12 }}>Pay with</p>
              <div style={{ padding: 16, border: `2px solid ${accentColor}`, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: colors.accentLight }}>
                <CreditCard size={20} style={{ color: accentColor }} /><div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 600, color: colors.text, margin: 0 }}>Visa ending in 4242</p></div><CheckCircle2 size={18} style={{ color: accentColor }} />
              </div>
            </div>
            <button onClick={() => { setShowPayModal(false); addNotification('success', 'Payment successful!'); }} style={{ width: '100%', padding: '14px', backgroundColor: accentColor, color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Confirm Payment of {selectedInvoice.amount}</button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default function BillingPage() {
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
    { id: 1, title: 'Invoice Ready', desc: 'INV-2024-003 for $2,750', read: false },
    { id: 2, title: 'Payment Received', desc: 'Thank you for your payment', read: true }
  ];

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 3000);
  };

  const removeNotification = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentColor, setAccentColor, isDark }}>
      <div className="billing-page" style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', overflow: 'hidden', backgroundColor: colors.bg, color: colors.text }}>
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
              <BillingContent addNotification={addNotification} />
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
          <Link href="/billing" className="active"><CreditCard size={20} /><span>Billing</span></Link>
          <Link href="/messages"><MessageSquare size={20} /><span>Chat</span></Link>
        </nav>

        <Toast notifications={notifications} removeNotification={removeNotification} />
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} addNotification={addNotification} />
      </div>
    </ThemeContext.Provider>
  );
}
