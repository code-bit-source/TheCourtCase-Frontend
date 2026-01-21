import React, { useState, useRef, useEffect } from 'react';
import {
  Scale, Bell, Settings, Search, RefreshCw, HelpCircle, X,
  Sparkles, MessageSquare, Clock, Briefcase, CheckCircle2, FileText,
  Calendar, CreditCard, Menu
} from 'lucide-react';

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

function GlobalSearch({ isOpen, onClose, isDark, accentColor }) {
  const colors = getThemeColors(isDark, accentColor);
  const [query, setQuery] = useState('');
  
  const searchResults = [
    { type: 'case', title: 'Thompson vs. Global Corp', desc: '#WP/2024/102-B • High Court' },
    { type: 'task', title: 'Review Counter-Affidavit', desc: 'Due by Mar 15 • Priority: High' },
    { type: 'document', title: 'Evidence_Ex_A.docx', desc: 'Uploaded 5 days ago by Sarah' },
    { type: 'case', title: 'Miller vs. Tech Solutions', desc: '#WP/2023/441 • Pending' }
  ];

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ?
            <span key={i} className="search-highlight">{part}</span> : part
        )}
      </span>
    );
  };

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
          <input
            autoFocus
            placeholder="Search cases, tasks, documents..."
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, backgroundColor: 'transparent', color: colors.text }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
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
                    {res.type === 'case' ? <Briefcase size={16} /> : res.type === 'task' ? <CheckCircle2 size={16} /> : <FileText size={16} />}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: colors.text, margin: 0 }}>{highlightText(res.title, query)}</p>
                    <p style={{ fontSize: 12, color: colors.textSecondary, margin: '2px 0 0 0' }}>{highlightText(res.desc, query)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: 40, textAlign: 'center', color: colors.textSecondary }}>
              <Search size={32} style={{ marginBottom: 12, opacity: 0.2 }} />
              <p style={{ fontSize: 14, margin: 0 }}>No results found for "{query}"</p>
            </div>
          )
        ) : (
          <div style={{ padding: '20px' }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Recent Searches</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Thompson Case', 'Counter-Affidavit', 'March Hearing'].map((s) => (
                <span key={s} onClick={() => setQuery(s)} style={{ padding: '6px 12px', borderRadius: 20, backgroundColor: colors.bgTertiary, fontSize: 12, color: colors.textSecondary, cursor: 'pointer' }}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationsPanel({ isOpen, onClose, clientNotifications, isDark, accentColor }) {
  const colors = getThemeColors(isDark, accentColor);
  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'hearing': return <Calendar size={14} style={{ color: accentColor }} />;
      case 'payment': return <CreditCard size={14} style={{ color: '#ff9500' }} />;
      case 'document': return <FileText size={14} style={{ color: '#00c853' }} />;
      case 'order': return <Scale size={14} style={{ color: '#9c27b0' }} />;
      default: return <Bell size={14} style={{ color: colors.textSecondary }} />;
    }
  };

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
              <div style={{ marginTop: 2 }}>{getIcon(n.type)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, color: colors.text, fontWeight: 500, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.title}</p>
                <p style={{ fontSize: 12, color: colors.textSecondary, marginTop: 2, margin: '2px 0 0 0' }}>{n.desc}</p>
                <p style={{ fontSize: 11, color: colors.textMuted, marginTop: 4, margin: '4px 0 0 0' }}>{n.time}</p>
              </div>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: accentColor, marginTop: 6, flexShrink: 0 }}></div>}
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: 10, textAlign: 'center', borderTop: `1px solid ${colors.border}` }}>
        <button onClick={onClose} style={{ fontSize: 12, color: accentColor, background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
      </div>
    </div>
  );
}

function HelpPanel({ isOpen, onClose, isDark, accentColor }) {
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

export default function Header({ addNotification = () => {}, clientNotifications = [], onOpenSettings = () => {}, onOpenMobileMenu = () => {}, isDark = false, accentColor = '#4772fa', userInfo = {} }) {
  const colors = getThemeColors(isDark, accentColor);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const unreadCount = clientNotifications.filter((n) => !n.read).length;
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

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      addNotification('success', 'Data synchronized successfully');
    }, 1500);
  };

  return (
    <header className="productivity-header" style={{ borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.header, position: 'sticky', top: 0, zIndex: 80, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
        {/* <button onClick={onOpenMobileMenu} className="nav-icon-btn text-black mobile-menu-btn" title="Open menu" style={{ marginRight: 4 }}>
          <Menu size={20} /> 
        </button> */}
        
        {/* <div className="header-branding" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: `linear-gradient(135deg, ${accentColor} 0%, #7c3aed 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: `0 2px 6px ${accentColor}40`
          }}>
            <Scale size={18} style={{ color: '#fff' }} />
          </div>
          <span className=''></span>
        </div>  */}
        <span className='text-black text-3xl uppercase font-bold'>Advocate</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div className="header-extras" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button onClick={handleSync} className="nav-icon-btn" title="Sync">
            <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} style={{ color: isSyncing ? accentColor : colors.textSecondary }} />
          </button>
        </div>

        <div ref={notifRef} style={{ position: 'relative' }}>
          <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="nav-icon-btn" title="Notifications">
            <Bell size={18} />
            {unreadCount > 0 && <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, backgroundColor: '#eb4d3d', borderRadius: '50%', border: `2px solid ${colors.header}` }}></span>}
          </button>
          <NotificationsPanel isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} clientNotifications={clientNotifications} isDark={isDark} accentColor={accentColor} />
        </div>

        <button onClick={onOpenSettings} className="nav-icon-btn" title="Settings">
          <Settings size={18} />
        </button>

        <div className="header-extras" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button onClick={() => setIsHelpOpen(true)} className="nav-icon-btn" title="Help">
            <HelpCircle size={18} />
          </button>
        </div>
      </div>
      <HelpPanel isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} isDark={isDark} accentColor={accentColor} />
    </header>
  );
}

export const headerStyles = `
  .productivity-header { transition: all 0.2s ease; }
  .nav-icon-btn { padding: 8px; color: #606060; cursor: pointer; background: transparent; border: none; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; min-width: 44px; min-height: 44px; }
  .nav-icon-btn:hover { background: #f0f0f0; color: #1f1f1f; }
  @media (hover: none) { .nav-icon-btn:hover { background: transparent; } .nav-icon-btn:active { background: #f0f0f0; } }
  .side-panel { position: fixed; right: 0; top: 0; height: 100vh; width: 320px; max-width: 100vw; background: #fff; box-shadow: -10px 0 30px rgba(0,0,0,0.05); border-left: 1px solid #e8e8e8; z-index: 100; transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .side-panel.open { transform: translateX(0); }
  .search-highlight { background-color: rgba(71, 114, 250, 0.2); font-weight: 600; color: #4772fa; padding: 0 2px; border-radius: 2px; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .fade-in { animation: fadeIn 0.2s ease-out; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .animate-spin { animation: spin 1s linear infinite; }
  .mobile-menu-btn { display: none; }
  @media (max-width: 768px) {
    .mobile-menu-btn { display: flex; }
    .header-extras { display: none !important; }
    .productivity-header { padding: 0 12px !important; }
  }
`;
