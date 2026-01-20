import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Scale, LayoutDashboard, FileText, MessageSquare,
  Calendar, Settings, Bell,
  ChevronRight, Clock,
  CheckCircle2, X,
  ExternalLink, AlertCircle, Info,
  Briefcase,
  Search, RefreshCw, HelpCircle, ChevronDown, Sparkles, Menu,
  Zap,
  Trash2,
  Plus, ListTodo, CreditCard, ChevronLeft, Star, Filter, Puzzle, ArrowRight
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
  .app-integrations-page * { box-sizing: border-box; }
  .app-integrations-page { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.5; -webkit-font-smoothing: antialiased; }
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

  .app-card { transition: all 0.2s ease; }
  .app-card:hover { transform: translateY(-4px); }

  @media (max-width: 768px) {
    .desktop-sidebar { display: none !important; }
    .mobile-bottom-nav { display: flex; }
    .mobile-menu-btn { display: flex; }
    .header-search { display: none !important; }
    .header-extras { display: none !important; }
    .side-panel { width: 100vw; }
    .apps-grid { grid-template-columns: 1fr !important; }
    .tabs-container { overflow-x: auto; }
    .filter-dropdown { right: 0 !important; left: auto !important; }
  }

  @media (max-width: 640px) {
    .apps-grid { grid-template-columns: 1fr !important; }
    .app-card { padding: 16px !important; }
    .header-controls { flex-wrap: wrap; gap: 8px !important; }
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
    { id: 'messages', icon: MessageSquare, label: 'Messages', href: '/messages' },
    { id: 'app-integrations', icon: Puzzle, label: 'Integrations', href: '/app-integrations' },
    { id: 'settings', icon: Settings, label: 'Settings', href: '/settings' }
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

function MobileSidebarDrawer({ isOpen, onClose }) {
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
    { id: 'messages', icon: MessageSquare, label: 'Messages', href: '/messages' },
    { id: 'app-integrations', icon: Puzzle, label: 'Integrations', href: '/app-integrations' },
    { id: 'settings', icon: Settings, label: 'Settings', href: '/settings' }
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

function AppIntegrationsContent({ addNotification }) {
  const { isDark, accentColor } = useTheme();
  const colors = getThemeColors(isDark, accentColor);
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showAppModal, setShowAppModal] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'DocuSign', category: 'Document Signing', description: 'Send documents for e-signature directly from your matters. Streamline contract signing workflows.', icon: '📝', color: '#FFCC22', installed: true, popular: true, rating: 4.8, reviews: 1250, features: ['One-click signing', 'Auto-save to matter', 'Audit trail', 'Template library'], developer: 'DocuSign Inc.', website: 'docusign.com' },
    { id: 2, name: 'QuickBooks', category: 'Accounting', description: 'Sync your billing, invoices, and payments with QuickBooks for seamless financial management.', icon: '📊', color: '#2CA01C', installed: true, popular: true, rating: 4.7, reviews: 980, features: ['Auto-sync invoices', 'Payment tracking', 'Expense management', 'Financial reports'], developer: 'Intuit', website: 'quickbooks.com' },
    { id: 3, name: 'Zoom', category: 'Communication', description: 'Schedule and launch video meetings with clients directly from calendar events and matters.', icon: '📹', color: '#2D8CFF', installed: false, popular: true, rating: 4.9, reviews: 2340, features: ['One-click meetings', 'Calendar sync', 'Recording storage', 'Virtual backgrounds'], developer: 'Zoom Video Communications', website: 'zoom.us' },
    { id: 4, name: 'Google Workspace', category: 'Productivity', description: 'Connect Gmail, Google Calendar, and Google Drive for unified document management.', icon: '🔵', color: '#4285F4', installed: true, popular: true, rating: 4.8, reviews: 1890, features: ['Email integration', 'Calendar sync', 'Drive storage', 'Contacts sync'], developer: 'Google LLC', website: 'workspace.google.com' },
    { id: 5, name: 'Microsoft 365', category: 'Productivity', description: 'Integrate Outlook, OneDrive, and Microsoft Teams for enhanced productivity.', icon: '🟦', color: '#0078D4', installed: false, popular: true, rating: 4.7, reviews: 1560, features: ['Outlook integration', 'OneDrive sync', 'Teams meetings', 'Word/Excel editing'], developer: 'Microsoft Corporation', website: 'microsoft.com/microsoft-365' },
    { id: 6, name: 'Stripe', category: 'Payments', description: 'Accept credit card payments online. Process retainers and invoice payments securely.', icon: '💳', color: '#635BFF', installed: false, popular: true, rating: 4.9, reviews: 890, features: ['Online payments', 'Recurring billing', 'Payment links', 'Fraud protection'], developer: 'Stripe Inc.', website: 'stripe.com' },
    { id: 7, name: 'LawPay', category: 'Payments', description: 'Legal-specific payment processing with trust account compliance built in.', icon: '⚖️', color: '#1E3A5F', installed: false, popular: false, rating: 4.6, reviews: 670, features: ['Trust accounting', 'IOLTA compliance', 'Card processing', 'eCheck payments'], developer: 'AffiniPay', website: 'lawpay.com' },
    { id: 8, name: 'Dropbox', category: 'Storage', description: 'Cloud storage integration for secure document backup and sharing.', icon: '📦', color: '#0061FF', installed: false, popular: false, rating: 4.5, reviews: 420, features: ['File sync', 'Selective sync', 'Version history', 'Shared folders'], developer: 'Dropbox Inc.', website: 'dropbox.com' },
    { id: 9, name: 'Box', category: 'Storage', description: 'Enterprise-grade cloud storage with advanced security and compliance features.', icon: '📁', color: '#0061D5', installed: false, popular: false, rating: 4.6, reviews: 380, features: ['Enterprise security', 'Compliance tools', 'Workflow automation', 'E-signature integration'], developer: 'Box Inc.', website: 'box.com' },
    { id: 10, name: 'Slack', category: 'Communication', description: 'Team messaging and collaboration. Get notifications and updates in real-time.', icon: '💬', color: '#4A154B', installed: false, popular: true, rating: 4.8, reviews: 1120, features: ['Channel notifications', 'Matter updates', 'File sharing', 'Search integration'], developer: 'Salesforce', website: 'slack.com' },
    { id: 11, name: 'Calendly', category: 'Scheduling', description: 'Allow clients to schedule appointments based on your availability.', icon: '📅', color: '#006BFF', installed: false, popular: false, rating: 4.7, reviews: 560, features: ['Client scheduling', 'Calendar sync', 'Reminders', 'Buffer times'], developer: 'Calendly LLC', website: 'calendly.com' },
    { id: 12, name: 'Zapier', category: 'Automation', description: 'Connect with 5,000+ apps and automate repetitive workflows without code.', icon: '⚡', color: '#FF4A00', installed: false, popular: true, rating: 4.8, reviews: 890, features: ['5000+ apps', 'Custom workflows', 'Multi-step zaps', 'Filters & formatters'], developer: 'Zapier Inc.', website: 'zapier.com' },
    { id: 13, name: 'Casetext', category: 'Legal Research', description: 'AI-powered legal research to find relevant authorities and citations quickly.', icon: '🔍', color: '#00539F', installed: false, popular: false, rating: 4.6, reviews: 340, features: ['AI research', 'Citation analysis', 'Brief analysis', 'Parallel search'], developer: 'Casetext Inc.', website: 'casetext.com' },
    { id: 14, name: 'Westlaw', category: 'Legal Research', description: 'Comprehensive legal research database with case law, statutes, and more.', icon: '📚', color: '#C41230', installed: false, popular: false, rating: 4.5, reviews: 290, features: ['Case law', 'Statutes', 'KeyCite', 'Practical Law'], developer: 'Thomson Reuters', website: 'westlaw.com' },
    { id: 15, name: 'Xero', category: 'Accounting', description: 'Cloud accounting software for small businesses and their advisors.', icon: '📈', color: '#13B5EA', installed: false, popular: false, rating: 4.5, reviews: 450, features: ['Bank reconciliation', 'Invoicing', 'Expense claims', 'Financial reports'], developer: 'Xero Limited', website: 'xero.com' },
    { id: 16, name: 'PandaDoc', category: 'Document Signing', description: 'Create, send, track, and sign documents and proposals with ease.', icon: '🐼', color: '#4DB671', installed: false, popular: false, rating: 4.6, reviews: 380, features: ['Document creation', 'E-signatures', 'Analytics', 'Templates'], developer: 'PandaDoc Inc.', website: 'pandadoc.com' }
  ]);

  const categories = [
    { id: 'all', label: 'All Apps', count: integrations.length },
    { id: 'popular', label: 'Popular', count: integrations.filter((i) => i.popular).length },
    { id: 'installed', label: 'Installed', count: integrations.filter((i) => i.installed).length },
    { id: 'Productivity', label: 'Productivity', count: integrations.filter((i) => i.category === 'Productivity').length },
    { id: 'Communication', label: 'Communication', count: integrations.filter((i) => i.category === 'Communication').length },
    { id: 'Document Signing', label: 'Document Signing', count: integrations.filter((i) => i.category === 'Document Signing').length },
    { id: 'Accounting', label: 'Accounting', count: integrations.filter((i) => i.category === 'Accounting').length },
    { id: 'Payments', label: 'Payments', count: integrations.filter((i) => i.category === 'Payments').length },
    { id: 'Storage', label: 'Storage', count: integrations.filter((i) => i.category === 'Storage').length },
    { id: 'Legal Research', label: 'Legal Research', count: integrations.filter((i) => i.category === 'Legal Research').length },
    { id: 'Automation', label: 'Automation', count: integrations.filter((i) => i.category === 'Automation').length },
    { id: 'Scheduling', label: 'Scheduling', count: integrations.filter((i) => i.category === 'Scheduling').length }
  ];

  const filteredIntegrations = integrations.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesCategory = true;
    if (selectedCategory === 'popular') matchesCategory = app.popular;
    else if (selectedCategory === 'installed') matchesCategory = app.installed;
    else if (selectedCategory !== 'all') matchesCategory = app.category === selectedCategory;

    if (activeTab === 'my-integrations') return app.installed && matchesSearch;
    return matchesSearch && matchesCategory;
  });

  const handleToggleInstall = (appId, e) => {
    if (e) e.stopPropagation();
    setIntegrations((prev) => prev.map((app) => {
      if (app.id === appId) {
        const newInstalled = !app.installed;
        addNotification('success', newInstalled ? `${app.name} connected successfully` : `${app.name} disconnected`);
        return { ...app, installed: newInstalled };
      }
      return app;
    }));
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, installed: !selectedApp.installed });
    }
  };

  const openAppModal = (app) => {
    setSelectedApp(app);
    setShowAppModal(true);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          style={{
            color: i <= Math.floor(rating) ? '#FFB800' : colors.borderLight,
            fill: i <= Math.floor(rating) ? '#FFB800' : 'none'
          }}
        />
      );
    }
    return stars;
  };

  const AppCard = ({ app }) => (
    <div
      onClick={() => openAppModal(app)}
      className="app-card"
      style={{
        backgroundColor: colors.card,
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
        padding: 20,
        cursor: 'pointer',
        position: 'relative',
        boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.04)'
      }}
    >
      {app.popular && (
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '4px 8px',
            backgroundColor: isDark ? 'rgba(255,184,0,0.2)' : '#FFF8E1',
            color: '#F59E0B',
            fontSize: 11,
            fontWeight: 600,
            borderRadius: 6
          }}>
            <Star size={10} style={{ fill: '#F59E0B' }} /> Popular
          </span>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
        <div style={{
          width: 52,
          height: 52,
          borderRadius: 12,
          backgroundColor: `${app.color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 26,
          flexShrink: 0
        }}>
          {app.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>{app.name}</h3>
          <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>{app.category}</p>
        </div>
      </div>

      <p style={{
        fontSize: 13,
        color: colors.textSecondary,
        margin: '0 0 16px 0',
        lineHeight: 1.5,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {app.description}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {renderStars(app.rating)}
          </div>
          <span style={{ fontSize: 12, color: colors.textSecondary }}>{app.rating}</span>
          <span style={{ fontSize: 11, color: colors.textMuted }}>({app.reviews})</span>
        </div>
        <button
          onClick={(e) => handleToggleInstall(app.id, e)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            backgroundColor: app.installed ? colors.bgTertiary : accentColor,
            color: app.installed ? colors.text : '#fff',
            transition: 'all 0.2s'
          }}
        >
          {app.installed ? (
            <>
              <CheckCircle2 size={14} />
              Connected
            </>
          ) : (
            <>
              <Plus size={14} />
              Add
            </>
          )}
        </button>
      </div>
    </div>
  );

  const MyIntegrationCard = ({ app }) => (
    <div
      onClick={() => openAppModal(app)}
      style={{
        backgroundColor: colors.card,
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
        padding: 20,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        transition: 'all 0.2s ease'
      }}
    >
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 10,
        backgroundColor: `${app.color}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        flexShrink: 0
      }}>
        {app.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>{app.name}</h3>
        <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.category} • Connected</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '6px 10px',
          backgroundColor: isDark ? 'rgba(0,200,83,0.15)' : '#E8F5E9',
          color: '#00C853',
          fontSize: 12,
          fontWeight: 500,
          borderRadius: 6
        }}>
          <CheckCircle2 size={12} /> Active
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); openAppModal(app); }}
          style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6 }}
        >
          <Settings size={18} style={{ color: colors.textSecondary }} />
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: colors.bgSecondary }}>
      <div style={{
        padding: '16px 24px',
        backgroundColor: colors.card,
        borderBottom: `1px solid ${colors.border}`
      }}>
        <div className="header-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div className="tabs-container" style={{ display: 'flex', gap: 0, backgroundColor: colors.bgTertiary, borderRadius: 8, padding: 4 }}>
            <button
              onClick={() => setActiveTab('discover')}
              style={{
                padding: '10px 20px',
                fontSize: 14,
                fontWeight: activeTab === 'discover' ? 600 : 400,
                color: activeTab === 'discover' ? colors.text : colors.textSecondary,
                backgroundColor: activeTab === 'discover' ? colors.card : 'transparent',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                boxShadow: activeTab === 'discover' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              Discover Apps
            </button>
            <button
              onClick={() => setActiveTab('my-integrations')}
              style={{
                padding: '10px 20px',
                fontSize: 14,
                fontWeight: activeTab === 'my-integrations' ? 600 : 400,
                color: activeTab === 'my-integrations' ? colors.text : colors.textSecondary,
                backgroundColor: activeTab === 'my-integrations' ? colors.card : 'transparent',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: activeTab === 'my-integrations' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              My Integrations
              {integrations.filter((i) => i.installed).length > 0 && (
                <span style={{
                  backgroundColor: accentColor,
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 10
                }}>
                  {integrations.filter((i) => i.installed).length}
                </span>
              )}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, justifyContent: 'flex-end' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
              <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary }} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search integrations..."
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 42px',
                  border: `1px solid ${colors.border}`,
                  borderRadius: 8,
                  fontSize: 14,
                  outline: 'none',
                  backgroundColor: colors.input,
                  color: colors.text,
                  boxSizing: 'border-box'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <X size={16} style={{ color: colors.textSecondary }} />
                </button>
              )}
            </div>

            {activeTab === 'discover' && (
              <div ref={filterRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                    border: `1px solid ${colors.border}`,
                    backgroundColor: selectedCategory !== 'all' ? colors.accentLight : colors.card,
                    color: selectedCategory !== 'all' ? accentColor : colors.text,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'all 0.15s'
                  }}
                >
                  <Filter size={16} />
                  {selectedCategory === 'all' ? 'Filter' : categories.find(c => c.id === selectedCategory)?.label || 'Filter'}
                  <ChevronDown size={16} style={{ transform: showFilterDropdown ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                </button>

                {showFilterDropdown && (
                  <div className="filter-dropdown" style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: 8,
                    width: 240,
                    backgroundColor: colors.card,
                    borderRadius: 12,
                    boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.4)' : '0 10px 40px rgba(0,0,0,0.15)',
                    border: `1px solid ${colors.border}`,
                    zIndex: 100,
                    overflow: 'hidden'
                  }}>
                    <div style={{ padding: '12px 16px', borderBottom: `1px solid ${colors.border}` }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>Filter by Category</p>
                    </div>
                    <div className="custom-scrollbar" style={{ maxHeight: 320, overflowY: 'auto', padding: '8px 0' }}>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => { setSelectedCategory(cat.id); setShowFilterDropdown(false); }}
                          style={{
                            width: '100%',
                            padding: '10px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: 'none',
                            backgroundColor: selectedCategory === cat.id ? colors.accentLight : 'transparent',
                            color: selectedCategory === cat.id ? accentColor : colors.text,
                            cursor: 'pointer',
                            fontSize: 14,
                            textAlign: 'left',
                            transition: 'all 0.15s'
                          }}
                        >
                          <span>{cat.label}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 12, color: colors.textMuted, backgroundColor: colors.bgTertiary, padding: '2px 8px', borderRadius: 10 }}>{cat.count}</span>
                            {selectedCategory === cat.id && <CheckCircle2 size={16} style={{ color: accentColor }} />}
                          </div>
                        </button>
                      ))}
                    </div>
                    {selectedCategory !== 'all' && (
                      <div style={{ padding: '8px 12px', borderTop: `1px solid ${colors.border}` }}>
                        <button
                          onClick={() => { setSelectedCategory('all'); setShowFilterDropdown(false); }}
                          style={{
                            width: '100%',
                            padding: '8px',
                            backgroundColor: 'transparent',
                            border: `1px solid ${colors.border}`,
                            borderRadius: 6,
                            fontSize: 13,
                            color: colors.textSecondary,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6
                          }}
                        >
                          <X size={14} /> Clear Filter
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: 24, paddingBottom: 100 }}>
        {activeTab === 'discover' && (
          <>
            {selectedCategory === 'all' && !searchQuery && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Star size={18} style={{ color: '#F59E0B', fill: '#F59E0B' }} /> Featured Apps
                  </h2>
                  <button
                    onClick={() => setSelectedCategory('popular')}
                    style={{ fontSize: 13, color: accentColor, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    View all <ArrowRight size={14} />
                  </button>
                </div>
                <div className="apps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
                  {integrations.filter((i) => i.popular).slice(0, 4).map((app) => (
                    <AppCard key={app.id} app={app} />
                  ))}
                </div>
              </div>
            )}

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>
                  {selectedCategory === 'all' ? 'All Apps' :
                    selectedCategory === 'popular' ? 'Popular Apps' :
                      selectedCategory === 'installed' ? 'Installed Apps' :
                        selectedCategory}
                </h2>
                <span style={{ fontSize: 13, color: colors.textSecondary }}>{filteredIntegrations.length} apps</span>
              </div>

              {filteredIntegrations.length > 0 ? (
                <div className="apps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
                  {filteredIntegrations.map((app) => (
                    <AppCard key={app.id} app={app} />
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: 60, backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}` }}>
                  <Search size={48} style={{ color: colors.textMuted, marginBottom: 16, opacity: 0.3 }} />
                  <p style={{ fontSize: 16, color: colors.textSecondary, margin: '0 0 8px 0' }}>No integrations found</p>
                  <p style={{ fontSize: 14, color: colors.textMuted, margin: 0 }}>Try adjusting your search or filters</p>
                </div>
              )}
            </div>

            <div style={{
              marginTop: 40,
              padding: 24,
              background: isDark ?
                `linear-gradient(135deg, ${accentColor}20 0%, rgba(124,58,237,0.15) 100%)` :
                `linear-gradient(135deg, #F5F7FF 0%, #EDE9FE 100%)`,
              borderRadius: 16,
              border: `1px solid ${isDark ? `${accentColor}30` : '#E8EDFF'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 200 }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: `linear-gradient(135deg, ${accentColor} 0%, #7c3aed 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Zap size={28} style={{ color: '#fff' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>Build Your Own Integration</h3>
                  <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>
                    Create custom integrations with our powerful API. Connect any service to your workflow.
                  </p>
                </div>
              </div>
              <button style={{
                padding: '12px 24px',
                backgroundColor: accentColor,
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flexShrink: 0
              }}>
                View API Documentation <ExternalLink size={14} />
              </button>
            </div>
          </>
        )}

        {activeTab === 'my-integrations' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>My Integrations</h2>
                <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>Manage your connected applications</p>
              </div>
            </div>

            {filteredIntegrations.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {filteredIntegrations.map((app) => (
                  <MyIntegrationCard key={app.id} app={app} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 60, backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}` }}>
                <Puzzle size={48} style={{ color: colors.textMuted, marginBottom: 16, opacity: 0.3 }} />
                <p style={{ fontSize: 16, color: colors.textSecondary, margin: '0 0 8px 0' }}>No integrations connected</p>
                <p style={{ fontSize: 14, color: colors.textMuted, margin: '0 0 20px 0' }}>Browse our app directory to connect your favorite tools</p>
                <button
                  onClick={() => setActiveTab('discover')}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: accentColor,
                    color: '#fff',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                    border: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <Search size={16} /> Browse Apps
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showAppModal && selectedApp && (
        <div
          onClick={() => setShowAppModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: 16
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              width: 560,
              maxWidth: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              boxShadow: isDark ? '0 25px 50px rgba(0,0,0,0.5)' : '0 25px 50px rgba(0,0,0,0.25)'
            }}
          >
            <div style={{
              padding: 24,
              borderBottom: `1px solid ${colors.border}`,
              background: `linear-gradient(135deg, ${selectedApp.color}10 0%, transparent 100%)`
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: 14,
                    backgroundColor: `${selectedApp.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 32
                  }}>
                    {selectedApp.icon}
                  </div>
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>{selectedApp.name}</h2>
                    <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>{selectedApp.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAppModal(false)}
                  style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 8 }}
                >
                  <X size={20} style={{ color: colors.textSecondary }} />
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {renderStars(selectedApp.rating)}
                  <span style={{ fontSize: 14, fontWeight: 500, color: colors.text, marginLeft: 4 }}>{selectedApp.rating}</span>
                  <span style={{ fontSize: 13, color: colors.textSecondary }}>({selectedApp.reviews} reviews)</span>
                </div>
                {selectedApp.popular && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '4px 10px',
                    backgroundColor: isDark ? 'rgba(255,184,0,0.2)' : '#FFF8E1',
                    color: '#F59E0B',
                    fontSize: 12,
                    fontWeight: 500,
                    borderRadius: 6
                  }}>
                    <Star size={12} style={{ fill: '#F59E0B' }} /> Popular
                  </span>
                )}
              </div>
            </div>

            <div className="custom-scrollbar" style={{ padding: 24, maxHeight: 'calc(90vh - 280px)', overflowY: 'auto' }}>
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: '0 0 12px 0' }}>About</h3>
                <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0, lineHeight: 1.6 }}>{selectedApp.description}</p>
              </div>

              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: '0 0 12px 0' }}>Features</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {selectedApp.features.map((feature, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', backgroundColor: colors.bgSecondary, borderRadius: 8 }}>
                      <CheckCircle2 size={16} style={{ color: '#00C853', flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: colors.text }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: '0 0 12px 0' }}>Developer</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: colors.bgSecondary, borderRadius: 10 }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: '0 0 4px 0' }}>{selectedApp.developer}</p>
                    <a href={`https://${selectedApp.website}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: accentColor, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                      {selectedApp.website} <ExternalLink size={12} />
                    </a>
                  </div>
                  <button style={{ padding: '8px 16px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 6, fontSize: 13, color: colors.text, cursor: 'pointer' }}>
                    Support
                  </button>
                </div>
              </div>

              {selectedApp.installed && (
                <div style={{
                  padding: 16,
                  backgroundColor: isDark ? 'rgba(0,200,83,0.1)' : '#E8F5E9',
                  borderRadius: 10,
                  border: `1px solid ${isDark ? 'rgba(0,200,83,0.3)' : '#C8E6C9'}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <CheckCircle2 size={18} style={{ color: '#00C853' }} />
                    <span style={{ fontSize: 14, fontWeight: 500, color: '#00C853' }}>Connected</span>
                  </div>
                  <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0 }}>
                    This integration is active and syncing with your account.
                  </p>
                </div>
              )}
            </div>

            <div style={{ padding: '16px 24px', borderTop: `1px solid ${colors.border}`, display: 'flex', gap: 12 }}>
              <button
                onClick={() => setShowAppModal(false)}
                style={{ flex: 1, padding: '12px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', color: colors.text }}
              >
                Close
              </button>
              <button
                onClick={() => handleToggleInstall(selectedApp.id)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: selectedApp.installed ? '#EB4D3D' : accentColor,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8
                }}
              >
                {selectedApp.installed ? (
                  <>
                    <Trash2 size={16} /> Disconnect
                  </>
                ) : (
                  <>
                    <Plus size={16} /> Connect App
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AppIntegrationsPage() {
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
    { id: 1, title: 'Integration Connected', desc: 'DocuSign is now active', read: false },
    { id: 2, title: 'Sync Complete', desc: 'QuickBooks synced successfully', read: true }
  ];

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 3000);
  };

  const removeNotification = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentColor, setAccentColor, isDark }}>
      <div className="app-integrations-page" style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', overflow: 'hidden', backgroundColor: colors.bg, color: colors.text }}>
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
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <AppIntegrationsContent addNotification={addNotification} />
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
          <Link href="/app-integrations" className="active"><Puzzle size={20} /><span>Apps</span></Link>
          <Link href="/settings"><Settings size={20} /><span>Settings</span></Link>
        </nav>

        <Toast notifications={notifications} removeNotification={removeNotification} />
      </div>
    </ThemeContext.Provider>
  );
}
