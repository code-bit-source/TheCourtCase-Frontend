import React, { useState, useRef, useEffect } from 'react';
import { getThemeColors } from '../utils/themeColors';
import {
  Scale, LayoutDashboard, FileText, MessageSquare,
  Calendar, Settings, LogOut, ChevronRight, ChevronLeft,
  ChevronDown, User, Briefcase, ListTodo, History,
  CreditCard, Puzzle, X, Users
} from 'lucide-react';
import Modal from './Modal';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'matters', icon: Scale, label: 'Matters' },
  { id: 'tasks', icon: ListTodo, label: 'Tasks' },
  { id: 'case-summary', icon: Briefcase, label: 'Case Summary' },
  { id: 'timeline', icon: History, label: 'Timeline' },
  { id: 'calendar', icon: Calendar, label: 'Calendar' },
  { id: 'documents', icon: FileText, label: 'Documents' },
  { id: 'connections', icon: Users, label: 'Connections' },
  { id: 'billing', icon: CreditCard, label: 'Payments' },
  { id: 'messages', icon: MessageSquare, label: 'Messages' },
  { id: 'app-integrations', icon: Puzzle, label: 'App Integrations' }
];

export default function Sidebar({ activeView, setActiveView, isExpanded, toggleSidebar, addNotification = () => {}, onOpenSettings = () => {}, onLogout = () => {}, isDark = false, accentColor = '#4772fa', userInfo = {} }) {
  const colors = getThemeColors(isDark, accentColor);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const SidebarContent = ({ isMobile = false }) => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <nav className="custom-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, padding: isExpanded || isMobile ? '0 10px 4px' : '0 6px 4px', overflowY: 'auto', overflowX: 'hidden' }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`sidebar-nav-item ${activeView === item.id ? 'active' : ''}`}
            style={{
              justifyContent: isExpanded || isMobile ? 'flex-start' : 'center',
              padding: isExpanded || isMobile ? '10px 12px' : '10px 8px',
              color: activeView === item.id ? accentColor : colors.textSecondary
            }}
          >
            <item.icon size={20} style={{ flexShrink: 0 }} />
            {(isExpanded || isMobile) && (
              <span className="nav-label" style={{ fontSize: 14, fontWeight: activeView === item.id ? 500 : 400 }}>{item.label}</span>
            )}
            {!isExpanded && !isMobile && <span className="sidebar-tooltip">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div ref={profileRef} style={{ borderTop: `1px solid ${colors.borderLight}`, padding: isExpanded || isMobile ? '12px 10px' : '12px 6px', position: 'relative' }}>
        {showProfileMenu && (
          <div
            className={`profile-menu-popup fade-in ${!isExpanded && !isMobile ? 'collapsed' : ''}`}
            style={{ left: !isExpanded && !isMobile ? '50%' : '8px', transform: !isExpanded && !isMobile ? 'translateX(-50%)' : 'none', background: colors.card, border: `1px solid ${colors.border}` }}
          >
            <div style={{ padding: '12px 16px', borderBottom: `1px solid ${colors.borderLight}`, backgroundColor: colors.bgSecondary }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: colors.text, margin: 0 }}>{userInfo.name  }</p>
              <p style={{ fontSize: 12, color: colors.textSecondary, margin: '2px 0 0 0' }}>Advocate</p>
            </div>
            <div style={{ padding: '6px 0' }}>
              <button
                onClick={() => { setShowProfileMenu(false); setActiveView('settings'); }}
                style={{ width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 13, color: colors.text, textAlign: 'left' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.accentLight}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <User size={16} style={{ color: colors.textSecondary }} /> Profile
              </button>
              <button
                onClick={() => { setShowProfileMenu(false); onOpenSettings(); }}
                style={{ width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 13, color: colors.text, textAlign: 'left' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.accentLight}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Settings size={16} style={{ color: colors.textSecondary }} /> Settings
              </button>
            </div>
            <div style={{ padding: '6px 0', borderTop: `1px solid ${colors.borderLight}` }}>
              <button
                onClick={() => { setShowProfileMenu(false); setShowLogoutConfirm(true); }}
                style={{ width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 13, color: '#eb4d3d', textAlign: 'left' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff1f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: isExpanded || isMobile ? '10px 12px' : '10px 8px',
            backgroundColor: showProfileMenu ? colors.accentLight : 'transparent',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'all 0.15s',
            justifyContent: isExpanded || isMobile ? 'flex-start' : 'center'
          }}
          onMouseEnter={(e) => { if (!showProfileMenu) e.currentTarget.style.backgroundColor = colors.bgHover; }}
          onMouseLeave={(e) => { if (!showProfileMenu) e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <div style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            overflow: 'hidden',
            border: `2px solid ${accentColor}`,
            flexShrink: 0
          }}>
            <img
              src={userInfo.profilePic || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'}
              alt="Profile"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {(isExpanded || isMobile) && (
            <>
              <div style={{ flex: 1, textAlign: 'left', overflow: 'hidden' }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: colors.text, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userInfo.name  }</p>
                <p style={{ fontSize: 11, color: colors.textSecondary, margin: 0 }}>Advocate</p>
              </div>
              <ChevronDown size={16} style={{ color: colors.textSecondary, transform: showProfileMenu ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
            </>
          )}
          {!isExpanded && !isMobile && <span className="sidebar-tooltip">Profile</span>}
        </button>

        {!isMobile && (
          <button
            onClick={toggleSidebar}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: isExpanded ? '10px 12px' : '10px 8px',
              marginTop: 8,
              backgroundColor: 'transparent',
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'all 0.15s',
              justifyContent: isExpanded ? 'flex-start' : 'center',
              color: colors.textSecondary
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.bgHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {isExpanded ? (
              <>
                <ChevronLeft size={18} />
                <span style={{ fontSize: 13, fontWeight: 500 }}>Collapse</span>
              </>
            ) : (
              <ChevronRight size={18} />
            )}
            {!isExpanded && <span className="sidebar-tooltip">Expand</span>}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <aside
        className="sidebar-transition desktop-sidebar"
        style={{
          width: isExpanded ? 240 : 68,
          borderRight: `1px solid ${colors.border}`,
          backgroundColor: colors.sidebar,
          flexDirection: 'column',
          height: 'calc(100vh - 57px)',
          overflow: 'hidden'
        }}
      >
        <SidebarContent />
      </aside>

      <Modal isOpen={showLogoutConfirm} onClose={() => setShowLogoutConfirm(false)} title="Sign Out" isDark={isDark} accentColor={accentColor}>
        <div style={{ textAlign: 'center', padding: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(235,77,61,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <LogOut size={28} style={{ color: '#eb4d3d' }} />
          </div>
          <p style={{ color: colors.text, marginBottom: 8, fontSize: 16, fontWeight: 500 }}>Sign out of TheCourtCase?</p>
          <p style={{ color: colors.textSecondary, marginBottom: 24, fontSize: 14 }}>You'll need to sign in again to access your account.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => setShowLogoutConfirm(false)} style={{ padding: '10px 24px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, cursor: 'pointer', backgroundColor: colors.card, fontWeight: 500, color: colors.text }}>Cancel</button>
            <button onClick={() => { setShowLogoutConfirm(false); onLogout(); }} style={{ padding: '10px 24px', backgroundColor: '#eb4d3d', color: '#fff', borderRadius: 8, fontSize: 14, cursor: 'pointer', border: 'none', fontWeight: 500 }}>Sign Out</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export function MobileSidebarDrawer({ isOpen, onClose, activeView, setActiveView, addNotification = () => {}, onOpenSettings = () => {}, onLogout = () => {}, isDark = false, accentColor = '#4772fa', userInfo = {} }) {
  const colors = getThemeColors(isDark, accentColor);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    onClose();
  };

  return (
    <>
      <div
        className={`mobile-sidebar-overlay ${isOpen ? 'show' : ''}`}
        onClick={onClose}
      />
        <div className={`mobile-sidebar-drawer ${isOpen ? 'open' : ''}`} style={{ background: colors.sidebar }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{
              padding: '12px 16px',
              borderBottom: `1px solid ${colors.borderLight}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: `linear-gradient(135deg, ${accentColor} 0%, #7c3aed 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 2px 6px ${accentColor}40`
                }}>
                  <Scale size={16} style={{ color: '#fff' }} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>TheCourtCase</span>
              </div>
              <button
                onClick={onClose}
                style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 8 }}
              >
                <X size={20} style={{ color: colors.textSecondary }} />
              </button>
            </div>

          <nav className="custom-scrollbar" style={{ flex: 1, padding: '8px 12px', overflowY: 'auto' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`sidebar-nav-item ${activeView === item.id ? 'active' : ''}`}
                style={{
                  justifyContent: 'flex-start',
                  padding: '12px 14px',
                  color: activeView === item.id ? accentColor : colors.textSecondary,
                  marginBottom: 2
                }}
              >
                <item.icon size={20} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 15, fontWeight: activeView === item.id ? 500 : 400 }}>{item.label}</span>
              </button>
            ))}
          </nav>

          <div style={{ borderTop: `1px solid ${colors.borderLight}`, padding: '12px', position: 'relative' }}>
            {showProfileMenu && (
              <div className="profile-menu-popup fade-in" style={{ bottom: '100%', marginBottom: 8, background: colors.card, border: `1px solid ${colors.border}` }}>
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${colors.borderLight}`, backgroundColor: colors.bgSecondary }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: colors.text, margin: 0 }}>{userInfo.name }</p>
                  <p style={{ fontSize: 12, color: colors.textSecondary, margin: '2px 0 0 0' }}>Advocate</p>
                </div>
                <div style={{ padding: '6px 0' }}>
                  <button
                    onClick={() => { setShowProfileMenu(false); handleNavClick('settings'); }}
                    style={{ width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14, color: colors.text, textAlign: 'left' }}
                  >
                    <User size={16} style={{ color: colors.textSecondary }} /> Profile
                  </button>
                  <button
                    onClick={() => { setShowProfileMenu(false); onOpenSettings(); onClose(); }}
                    style={{ width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14, color: colors.text, textAlign: 'left' }}
                  >
                    <Settings size={16} style={{ color: colors.textSecondary }} /> Settings
                  </button>
                </div>
                <div style={{ padding: '6px 0', borderTop: `1px solid ${colors.borderLight}` }}>
                  <button
                    onClick={() => { setShowProfileMenu(false); setShowLogoutConfirm(true); }}
                    style={{ width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14, color: '#eb4d3d', textAlign: 'left' }}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px',
                backgroundColor: showProfileMenu ? colors.accentLight : colors.bgSecondary,
                border: 'none',
                borderRadius: 10,
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                overflow: 'hidden',
                border: `2px solid ${accentColor}`
              }}>
              <img
                src={userInfo.profilePic || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'}
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>{userInfo.name}</p>
                <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>Advocate</p>
              </div>
              <ChevronDown size={18} style={{ color: colors.textSecondary, transform: showProfileMenu ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={showLogoutConfirm} onClose={() => setShowLogoutConfirm(false)} title="Sign Out" isDark={isDark} accentColor={accentColor}>
        <div style={{ textAlign: 'center', padding: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(235,77,61,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <LogOut size={28} style={{ color: '#eb4d3d' }} />
          </div>
          <p style={{ color: '#1f1f1f', marginBottom: 8, fontSize: 16, fontWeight: 500 }}>Sign out of TheCourtCase?</p>
          <p style={{ color: '#808080', marginBottom: 24, fontSize: 14 }}>You'll need to sign in again to access your account.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => setShowLogoutConfirm(false)} style={{ padding: '10px 24px', border: '1px solid #e8e8e8', borderRadius: 8, fontSize: 14, cursor: 'pointer', backgroundColor: '#fff', fontWeight: 500 }}>Cancel</button>
            <button onClick={() => { setShowLogoutConfirm(false); onClose(); onLogout(); }} style={{ padding: '10px 24px', backgroundColor: '#eb4d3d', color: '#fff', borderRadius: 8, fontSize: 14, cursor: 'pointer', border: 'none', fontWeight: 500 }}>Sign Out</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export const sidebarStyles = `
  .sidebar-transition { transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
  .sidebar-nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; cursor: pointer; border: none; background: transparent; width: 100%; text-align: left; transition: all 0.15s ease; white-space: nowrap; overflow: hidden; min-height: 44px; position: relative; }
  .sidebar-nav-item:hover { background: #f5f5f5; }
  .sidebar-nav-item.active { background: rgba(71, 114, 250, 0.1); color: #4772fa; }
  .sidebar-nav-item .nav-label { opacity: 1; transition: opacity 0.2s ease; }
  .sidebar-nav-item.collapsed .nav-label { opacity: 0; width: 0; }
  @media (hover: none) { .sidebar-nav-item:hover { background: transparent; } .sidebar-nav-item:active { background: #f5f5f5; } }
  
  .sidebar-tooltip { position: absolute; left: 100%; top: 50%; transform: translateY(-50%); margin-left: 12px; padding: 6px 12px; background: #1f1f1f; color: #fff; font-size: 12px; border-radius: 6px; white-space: nowrap; opacity: 0; visibility: hidden; transition: opacity 0.2s, visibility 0.2s; z-index: 1000; pointer-events: none; }
  .sidebar-tooltip::before { content: ''; position: absolute; left: -6px; top: 50%; transform: translateY(-50%); border: 6px solid transparent; border-right-color: #1f1f1f; border-left: none; }
  .sidebar-nav-item:hover .sidebar-tooltip { opacity: 1; visibility: visible; }

  .desktop-sidebar { display: flex; }
  
  .mobile-sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 95; opacity: 0; transition: opacity 0.3s ease; }
  .mobile-sidebar-overlay.show { display: block; opacity: 1; }
  .mobile-sidebar-drawer { position: fixed; left: 0; top: 0; bottom: 0; width: 280px; max-width: 85vw; background: #fff; z-index: 96; transform: translateX(-100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 4px 0 20px rgba(0,0,0,0.15); }
  .mobile-sidebar-drawer.open { transform: translateX(0); }
  
  .profile-menu-popup { position: absolute; bottom: 100%; left: 8px; right: 8px; margin-bottom: 8px; background: #fff; border-radius: 12px; box-shadow: 0 -10px 40px rgba(0,0,0,0.15); border: 1px solid #e8e8e8; overflow: hidden; z-index: 100; }
  .profile-menu-popup.collapsed { left: auto; right: auto; width: 200px; }

  @media (max-width: 768px) {
    .desktop-sidebar { display: none !important; }
  }
`;
