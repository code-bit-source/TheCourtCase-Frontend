"use client";

import React, { useState, useRef } from 'react';
import { 
  Scale, LayoutDashboard, FileText, MessageSquare, 
  Calendar, Users, Settings, LogOut, Bell, 
  ChevronRight, Clock, Upload, 
  CheckCircle2, X, 
  Download, Eye, Send, Paperclip,
  Gavel, Building2, MapPin,
  CalendarDays, ChevronLeft,
  CreditCard, Receipt, FileUp, ExternalLink, AlertCircle, Info,
  User, Briefcase, FileCheck, AlertTriangle
} from 'lucide-react';

const styles = `
  .client-home * { box-sizing: border-box; }
  .client-home { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.5; -webkit-font-smoothing: antialiased; color: #1f1f1f; }
  .active-nav { background: rgba(71, 114, 250, 0.08); color: #4772fa; font-weight: 500; }
  .active-nav::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 20px; background: #4772fa; border-radius: 0 2px 2px 0; }
  .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #d0d0d0; border-radius: 3px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #b0b0b0; }
  @keyframes slide-in-from-right { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  .animate-slide-in { animation: slide-in-from-right 0.25s ease-out; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .fade-in { animation: fadeIn 0.2s ease-out; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
`;

function Toast({ notifications, removeNotification }) {
  return (
    <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 50, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {notifications.map(n => (
        <div 
          key={n.id} 
          className="animate-slide-in"
          style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, 
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '1px solid',
            backgroundColor: n.type === 'success' ? '#f0fdf4' : n.type === 'error' ? '#fef2f2' : '#eff6ff',
            borderColor: n.type === 'success' ? '#bbf7d0' : n.type === 'error' ? '#fecaca' : '#bfdbfe',
            color: n.type === 'success' ? '#15803d' : n.type === 'error' ? '#b91c1c' : '#1d4ed8'
          }}
        >
          {n.type === 'success' ? <CheckCircle2 size={16} /> : n.type === 'error' ? <AlertCircle size={16} /> : <Info size={16} />}
          <span style={{ fontSize: 14 }}>{n.message}</span>
          <button onClick={() => removeNotification(n.id)} style={{ marginLeft: 8, opacity: 0.6, cursor: 'pointer', background: 'none', border: 'none' }}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor: '#fff', borderRadius: 8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', maxWidth: 512, width: '100%', maxHeight: '90vh', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #e8e8e8' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f1f1f', margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ padding: 4, cursor: 'pointer', background: 'none', border: 'none', borderRadius: 4 }}>
            <X size={18} style={{ color: '#808080' }} />
          </button>
        </div>
        <div style={{ padding: 20, overflowY: 'auto', maxHeight: 'calc(90vh - 80px)' }}>{children}</div>
      </div>
    </div>
  );
}

function NotificationsPanel({ isOpen, onClose, clientNotifications }) {
  if (!isOpen) return null;
  
  const getIcon = (type) => {
    switch(type) {
      case 'hearing': return <Calendar size={14} style={{ color: '#4772fa' }} />;
      case 'payment': return <CreditCard size={14} style={{ color: '#ff9500' }} />;
      case 'document': return <FileText size={14} style={{ color: '#00c853' }} />;
      case 'order': return <Gavel size={14} style={{ color: '#9c27b0' }} />;
      default: return <Bell size={14} style={{ color: '#808080' }} />;
    }
  };

  return (
    <div className="fade-in" style={{ position: 'absolute', right: 0, top: 44, width: 320, backgroundColor: '#fff', borderRadius: 8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #e8e8e8', zIndex: 50 }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 500, color: '#1f1f1f', fontSize: 14 }}>Notifications</span>
        <button style={{ fontSize: 12, color: '#4772fa', background: 'none', border: 'none', cursor: 'pointer' }}>Mark all read</button>
      </div>
      <div className="custom-scrollbar" style={{ maxHeight: 320, overflowY: 'auto' }}>
        {clientNotifications.map(n => (
          <div key={n.id} style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', backgroundColor: !n.read ? '#fafafa' : 'transparent' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ marginTop: 2 }}>{getIcon(n.type)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, color: '#1f1f1f', fontWeight: 500, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.title}</p>
                <p style={{ fontSize: 12, color: '#808080', marginTop: 2, margin: '2px 0 0 0' }}>{n.desc}</p>
                <p style={{ fontSize: 11, color: '#b0b0b0', marginTop: 4, margin: '4px 0 0 0' }}>{n.time}</p>
              </div>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4772fa', marginTop: 6, flexShrink: 0 }}></div>}
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: 10, textAlign: 'center', borderTop: '1px solid #e8e8e8' }}>
        <button onClick={onClose} style={{ fontSize: 12, color: '#4772fa', background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
      </div>
    </div>
  );
}

function Sidebar({ activeView, setActiveView, addNotification }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'case-summary', icon: Briefcase, label: 'Case Summary' },
    { id: 'timeline', icon: Clock, label: 'Timeline' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'documents', icon: FileText, label: 'Documents' },
    { id: 'billing', icon: CreditCard, label: 'Payments' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
  ];

  return (
    <>
      <aside style={{ width: 224, borderRight: '1px solid #e8e8e8', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #e8e8e8' }}>
          <div style={{ width: 28, height: 28, backgroundColor: '#4772fa', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Scale size={15} style={{ color: '#fff' }} />
          </div>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#1f1f1f' }}>CourtCase</span>
        </div>
        <nav style={{ flex: 1, padding: 12 }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={activeView === item.id ? 'active-nav' : ''}
              style={{
                position: 'relative', width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 6, 
                border: 'none', cursor: 'pointer', fontSize: 13, marginBottom: 2,
                backgroundColor: activeView === item.id ? 'rgba(71, 114, 250, 0.08)' : 'transparent',
                color: activeView === item.id ? '#4772fa' : '#1f1f1f'
              }}
            >
              <item.icon size={17} />
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: 12, borderTop: '1px solid #e8e8e8' }}>
          <button 
            onClick={() => setActiveView('settings')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, backgroundColor: 'transparent', color: '#1f1f1f', marginBottom: 2 }}
          >
            <Settings size={17} />
            Settings
          </button>
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, backgroundColor: 'transparent', color: '#eb4d3d' }}
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      <Modal isOpen={showLogoutConfirm} onClose={() => setShowLogoutConfirm(false)} title="Logout">
        <div style={{ textAlign: 'center', padding: 16 }}>
          <LogOut size={40} style={{ color: '#808080', marginBottom: 16 }} />
          <p style={{ color: '#1f1f1f', marginBottom: 24, fontSize: 14 }}>Are you sure you want to logout?</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button 
              onClick={() => setShowLogoutConfirm(false)}
              style={{ padding: '8px 20px', border: '1px solid #e8e8e8', borderRadius: 6, fontSize: 14, cursor: 'pointer', backgroundColor: '#fff' }}
            >
              Cancel
            </button>
            <button 
              onClick={() => { setShowLogoutConfirm(false); addNotification('info', 'Logged out successfully'); }}
              style={{ padding: '8px 20px', backgroundColor: '#eb4d3d', color: '#fff', borderRadius: 6, fontSize: 14, cursor: 'pointer', border: 'none' }}
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

function Header({ title, addNotification, clientNotifications }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = clientNotifications.filter(n => !n.read).length;

  return (
    <header style={{ height: 56, borderBottom: '1px solid #e8e8e8', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 10, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1f1f1f', margin: 0 }}>{title}</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            style={{ position: 'relative', padding: 8, color: '#808080', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 6 }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{ position: 'absolute', top: 4, right: 4, minWidth: 16, height: 16, backgroundColor: '#eb4d3d', borderRadius: 8, fontSize: 10, fontWeight: 500, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>
                {unreadCount}
              </span>
            )}
          </button>
          <NotificationsPanel 
            isOpen={showNotifications} 
            onClose={() => setShowNotifications(false)} 
            clientNotifications={clientNotifications}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 12, borderLeft: '1px solid #e8e8e8' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#e8e8e8', overflow: 'hidden' }}>
            <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="User" />
          </div>
          <span style={{ fontSize: 14, color: '#1f1f1f' }}>Alex Thompson</span>
        </div>
      </div>
    </header>
  );
}

function ClientDashboard({ setActiveView, addNotification }) {
  const statsData = [
    { label: 'Status', value: 'Ongoing', icon: Briefcase, color: '#ff9500', desc: 'Hearing Scheduled', action: () => setActiveView('case-summary') },
    { label: 'Documents', value: '12', icon: FileText, color: '#4772fa', desc: 'View files', action: () => setActiveView('documents') },
    { label: 'Due', value: '$2,750', icon: CreditCard, color: '#eb4d3d', desc: '1 pending', action: () => setActiveView('billing') },
    { label: 'Next Date', value: 'Mar 18', icon: Calendar, color: '#00c853', desc: 'In 4 days', action: () => setActiveView('calendar') },
  ];

  const updates = [
    { icon: Calendar, color: '#4772fa', title: 'Hearing Scheduled', desc: 'March 18, 2024 - Final Arguments', time: '2 days ago' },
    { icon: FileText, color: '#00c853', title: 'Document Uploaded', desc: 'Evidence_Ex_A.docx by advocate', time: '5 days ago' },
    { icon: Gavel, color: '#9c27b0', title: 'Court Order', desc: 'Interim stay granted', time: '1 week ago' },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      <section style={{ backgroundColor: '#4772fa', borderRadius: 8, padding: 24, color: '#fff', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
              <Calendar size={12} /> Next Hearing
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4, margin: '0 0 4px 0' }}>Thompson vs. Global Corp</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 16, margin: '0 0 16px 0' }}>Case #WP/2024/102-B</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, color: 'rgba(255,255,255,0.9)', fontSize: 14, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={15} />
                <span>High Court, Room 302</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CalendarDays size={15} />
                <span>March 18, 2024 • 10:30 AM</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setActiveView('case-summary')} style={{ backgroundColor: '#fff', color: '#4772fa', padding: '8px 16px', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Eye size={15} /> View Details
              </button>
              <button onClick={() => setActiveView('calendar')} style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: '8px 16px', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Calendar size={15} /> Calendar
              </button>
            </div>
          </div>
          <Scale size={120} style={{ color: 'rgba(255,255,255,0.1)' }} />
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {statsData.map(item => (
          <div 
            key={item.label} 
            onClick={item.action}
            style={{ backgroundColor: '#fff', padding: 16, borderRadius: 8, border: '1px solid #e8e8e8', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: '#808080', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</span>
              <div style={{ width: 32, height: 32, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: `${item.color}15`, color: item.color }}>
                <item.icon size={16} />
              </div>
            </div>
            <p style={{ fontSize: 24, fontWeight: 600, color: '#1f1f1f', marginBottom: 2, margin: '0 0 2px 0' }}>{item.value}</p>
            <p style={{ fontSize: 12, color: '#808080', margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e8e8e8' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 500, color: '#1f1f1f' }}>Recent Updates</span>
            <button onClick={() => setActiveView('timeline')} style={{ fontSize: 14, color: '#4772fa', background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
          </div>
          <div style={{ padding: 20 }}>
            {updates.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < updates.length - 1 ? 16 : 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backgroundColor: `${item.color}15`, color: item.color }}>
                  <item.icon size={15} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <p style={{ fontWeight: 500, fontSize: 14, color: '#1f1f1f', margin: 0 }}>{item.title}</p>
                    <span style={{ fontSize: 11, color: '#b0b0b0', flexShrink: 0 }}>{item.time}</span>
                  </div>
                  <p style={{ fontSize: 14, color: '#808080', margin: '2px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e8e8e8', padding: 20, marginBottom: 16 }}>
            <span style={{ fontWeight: 500, color: '#1f1f1f', fontSize: 14 }}>Quick Actions</span>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button onClick={() => setActiveView('documents')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: 12, backgroundColor: '#4772fa', color: '#fff', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none' }}>
                <Upload size={16} /> Upload Document
              </button>
              <button onClick={() => setActiveView('billing')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: 12, backgroundColor: '#f5f5f5', color: '#1f1f1f', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none' }}>
                <CreditCard size={16} /> Pay Invoice
              </button>
              <button onClick={() => setActiveView('messages')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: 12, backgroundColor: '#f5f5f5', color: '#1f1f1f', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none' }}>
                <MessageSquare size={16} /> Contact Advocate
              </button>
            </div>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e8e8e8', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Users size={16} style={{ color: '#4772fa' }} />
              <span style={{ fontWeight: 500, color: '#1f1f1f', fontSize: 14 }}>Your Legal Team</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Advocate" />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f', margin: 0 }}>Sarah Jenkins, Esq.</p>
                  <p style={{ fontSize: 11, color: '#808080', margin: 0 }}>Lead Advocate</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Paralegal" />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f', margin: 0 }}>David Chen</p>
                  <p style={{ fontSize: 11, color: '#808080', margin: 0 }}>Paralegal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseSummary({ addNotification }) {
  const caseInfo = [
    { label: 'Case Title', value: 'Thompson vs. Global Corp' },
    { label: 'Case Number', value: 'WP/2024/102-B' },
    { label: 'CNR Number', value: 'DLCT01-002451-2024' },
    { label: 'Filing Date', value: 'January 12, 2024' },
  ];

  const courtInfo = [
    { label: 'Court', value: 'High Court of Judicature' },
    { label: 'Bench', value: 'Bench III' },
    { label: 'Judge', value: 'Hon. Justice A.K. Singh' },
    { label: 'Room', value: '302' },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 896, margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: '#1f1f1f', marginBottom: 4, margin: '0 0 4px 0' }}>Case Summary</h1>
        <p style={{ fontSize: 14, color: '#808080', margin: 0 }}>View case details, parties, and current status</p>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e8e8e8', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', backgroundColor: '#fafafa', borderBottom: '1px solid #e8e8e8', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 8px', borderRadius: 4, backgroundColor: 'rgba(255,149,0,0.15)', color: '#cc7700', fontSize: 11, fontWeight: 500, marginBottom: 8 }}>
              <span className="animate-pulse" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#ff9500' }}></span>
              Ongoing
            </span>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f', margin: '8px 0 0 0' }}>Thompson vs. Global Corp</h2>
            <p style={{ fontSize: 14, color: '#808080', margin: '4px 0 0 0' }}>Corporate Litigation</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 10, color: '#808080', textTransform: 'uppercase', fontWeight: 500, marginBottom: 2, margin: '0 0 2px 0' }}>Case Number</p>
            <p style={{ fontSize: 14, fontFamily: 'monospace', fontWeight: 600, color: '#4772fa', margin: 0 }}>WP/2024/102-B</p>
          </div>
        </div>

        <div style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 500, color: '#808080', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6, margin: '0 0 12px 0' }}>
              <Briefcase size={13} /> Case Information
            </h3>
            {caseInfo.map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ fontSize: 14, color: '#808080' }}>{item.label}</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f' }}>{item.value}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 500, color: '#808080', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6, margin: '0 0 12px 0' }}>
              <Building2 size={13} /> Court Information
            </h3>
            {courtInfo.map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ fontSize: 14, color: '#808080' }}>{item.label}</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 20px', borderTop: '1px solid #e8e8e8' }}>
          <h3 style={{ fontSize: 11, fontWeight: 500, color: '#808080', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6, margin: '0 0 12px 0' }}>
            <Users size={13} /> Parties
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ padding: 12, borderRadius: 6, backgroundColor: 'rgba(71,114,250,0.05)', borderLeft: '3px solid #4772fa' }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: '#4772fa', textTransform: 'uppercase', marginBottom: 4, margin: '0 0 4px 0' }}>Petitioner (You)</p>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f', margin: 0 }}>Alex Thompson</p>
              <p style={{ fontSize: 12, color: '#808080', margin: '2px 0 0 0' }}>Rep: Sarah Jenkins, Esq.</p>
            </div>
            <div style={{ padding: 12, borderRadius: 6, backgroundColor: '#f5f5f5', borderLeft: '3px solid #808080' }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: '#808080', textTransform: 'uppercase', marginBottom: 4, margin: '0 0 4px 0' }}>Respondent</p>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f', margin: 0 }}>Global Corporation Ltd.</p>
              <p style={{ fontSize: 12, color: '#808080', margin: '2px 0 0 0' }}>Rep: Corporate Counsel</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 20px', borderTop: '1px solid #e8e8e8' }}>
          <h3 style={{ fontSize: 11, fontWeight: 500, color: '#808080', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6, margin: '0 0 12px 0' }}>
            <User size={13} /> Legal Team
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Advocate" />
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f', margin: 0 }}>Sarah Jenkins, Esq.</p>
                <p style={{ fontSize: 11, color: '#808080', margin: 0 }}>Lead Advocate</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Paralegal" />
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f', margin: 0 }}>David Chen</p>
                <p style={{ fontSize: 11, color: '#808080', margin: 0 }}>Paralegal</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 20px', borderTop: '1px solid #e8e8e8', backgroundColor: 'rgba(255,149,0,0.05)' }}>
          <h3 style={{ fontSize: 11, fontWeight: 600, color: '#cc7700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6, margin: '0 0 8px 0' }}>
            <AlertTriangle size={13} /> Current Stage
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(255,149,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Gavel size={18} style={{ color: '#cc7700' }} />
            </div>
            <div>
              <p style={{ fontWeight: 600, color: '#1f1f1f', margin: 0 }}>Hearing Scheduled</p>
              <p style={{ fontSize: 14, color: '#808080', margin: '2px 0 0 0' }}>Final arguments on March 18, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseTimeline({ addNotification }) {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const timelineEvents = [
    { type: 'upcoming', icon: Calendar, color: '#ff9500', title: 'Final Oral Arguments', date: 'MAR 18, 2024', time: '10:30 AM', desc: 'Both parties to present final arguments.', purpose: 'Final Hearing' },
    { type: 'order', icon: Gavel, color: '#9c27b0', title: 'Interim Stay Granted', date: 'FEB 02, 2024', desc: 'Temporary stay on recovery proceedings.', simple: 'The court has paused the other party\'s attempts to collect money until the next hearing.' },
    { type: 'filing', icon: FileText, color: '#4772fa', title: 'Counter-Affidavit Filed', date: 'JAN 28, 2024', desc: 'Response to preliminary objections submitted.' },
    { type: 'hearing', icon: Calendar, color: '#4772fa', title: 'Preliminary Hearing', date: 'JAN 20, 2024', desc: 'Initial hearing completed.' },
    { type: 'filing', icon: Upload, color: '#808080', title: 'Evidence Submitted', date: 'JAN 15, 2024', desc: 'Documentary evidence filed.' },
    { type: 'origin', icon: FileCheck, color: '#00c853', title: 'Case Registered', date: 'JAN 12, 2024', desc: 'Writ petition admitted.' },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 768, margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: '#1f1f1f', marginBottom: 4, margin: '0 0 4px 0' }}>Timeline</h1>
        <p style={{ fontSize: 14, color: '#808080', margin: 0 }}>Chronological case updates</p>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, #4772fa 0%, rgba(71,114,250,0.3) 50%, #e8e8e8 100%)' }}></div>
        
        {timelineEvents.map((event, i) => (
          <div key={i} style={{ position: 'relative', paddingLeft: 56, marginBottom: 16 }}>
            <div style={{ position: 'absolute', left: 0, width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, backgroundColor: '#fff', border: `2px solid ${event.color}`, color: event.color }}>
              <event.icon size={16} />
            </div>
            
            <div style={{ padding: 16, borderRadius: 8, border: '1px solid', backgroundColor: event.type === 'upcoming' ? 'rgba(255,149,0,0.05)' : '#fff', borderColor: event.type === 'upcoming' ? 'rgba(255,149,0,0.3)' : '#e8e8e8' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 4 }}>
                {event.type === 'upcoming' && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 6px', borderRadius: 4, backgroundColor: 'rgba(255,149,0,0.15)', color: '#cc7700', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', width: 'fit-content' }}>
                    <Clock size={10} /> Upcoming
                  </span>
                )}
                {event.type === 'order' && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 6px', borderRadius: 4, backgroundColor: 'rgba(156,39,176,0.1)', color: '#9c27b0', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', width: 'fit-content' }}>
                    <Gavel size={10} /> Order
                  </span>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ fontWeight: 600, color: '#1f1f1f', margin: 0 }}>{event.title}</h4>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: event.type === 'upcoming' ? '#cc7700' : '#1f1f1f', margin: 0 }}>{event.date}</p>
                    {event.time && <p style={{ fontSize: 12, color: '#808080', margin: 0 }}>{event.time}</p>}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: '#808080', margin: '4px 0 0 0' }}>{event.desc}</p>
              {event.purpose && (
                <span style={{ display: 'inline-block', marginTop: 8, padding: '4px 8px', borderRadius: 4, backgroundColor: '#f5f5f5', fontSize: 12, color: '#808080' }}>
                  Purpose: {event.purpose}
                </span>
              )}
              {event.simple && (
                <button 
                  onClick={() => { setSelectedOrder({ title: event.title, date: event.date, simple: event.simple }); setShowOrderModal(true); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, color: '#4772fa', cursor: 'pointer', marginTop: 8, background: 'none', border: 'none', padding: 0 }}
                >
                  <Info size={13} /> Simplified Explanation
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showOrderModal} onClose={() => setShowOrderModal(false)} title="Court Order Explained">
        {selectedOrder && (
          <div>
            <div style={{ padding: 12, backgroundColor: 'rgba(156,39,176,0.05)', borderRadius: 6, border: '1px solid rgba(156,39,176,0.2)', marginBottom: 16 }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: '#9c27b0', textTransform: 'uppercase', marginBottom: 4, margin: '0 0 4px 0' }}>Order</p>
              <p style={{ fontWeight: 600, color: '#1f1f1f', margin: 0 }}>{selectedOrder.title}</p>
              <p style={{ fontSize: 14, color: '#808080', margin: '2px 0 0 0' }}>{selectedOrder.date}</p>
            </div>
            <div style={{ padding: 12, backgroundColor: 'rgba(71,114,250,0.05)', borderRadius: 6, border: '1px solid rgba(71,114,250,0.2)', marginBottom: 16 }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: '#4772fa', textTransform: 'uppercase', marginBottom: 4, margin: '0 0 4px 0' }}>What This Means</p>
              <p style={{ fontSize: 14, color: '#1f1f1f', margin: 0 }}>{selectedOrder.simple}</p>
            </div>
            <p style={{ fontSize: 12, color: '#808080', fontStyle: 'italic', margin: 0 }}>Simplified explanation. Consult your advocate for legal advice.</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

function HearingCalendar({ addNotification }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 2, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 2, 18));
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const shortDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const events = [
    { date: new Date(2024, 2, 18), title: 'Final Arguments', time: '10:30 AM', color: '#eb4d3d', type: 'hearing' },
    { date: new Date(2024, 2, 16), title: 'Document Deadline', time: '5:00 PM', color: '#ff9500', type: 'deadline' },
    { date: new Date(2024, 2, 22), title: 'Client Meeting', time: '2:00 PM', color: '#4772fa', type: 'meeting' },
    { date: new Date(2024, 2, 25), title: 'Filing Due', time: '11:59 PM', color: '#ff9500', type: 'deadline' },
    { date: new Date(2024, 3, 5), title: 'Follow-up Hearing', time: 'TBD', color: '#9c27b0', type: 'tentative' },
    { date: new Date(2024, 3, 12), title: 'Mediation Session', time: '9:00 AM', color: '#00c853', type: 'meeting' },
  ];

  const getMonthDates = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const dates = [];
    const startPad = firstDay.getDay();
    for (let i = startPad - 1; i >= 0; i--) dates.push({ date: new Date(year, month, -i), isCurrentMonth: false });
    for (let i = 1; i <= lastDay.getDate(); i++) dates.push({ date: new Date(year, month, i), isCurrentMonth: true });
    const endPad = 42 - dates.length;
    for (let i = 1; i <= endPad; i++) dates.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    return dates;
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };
  const isSelected = (date) => selectedDate && date.toDateString() === selectedDate.toDateString();
  const getEventsForDate = (date) => events.filter(e => e.date.toDateString() === date.toDateString());
  const monthDates = getMonthDates(currentMonth);
  const goToToday = () => { setCurrentMonth(new Date()); setSelectedDate(new Date()); };
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: '#fff' }}>
      <div style={{ width: 256, borderRight: '1px solid #e8e8e8', display: 'flex', flexDirection: 'column', backgroundColor: '#fafafa' }}>
        <div style={{ padding: 16, borderBottom: '1px solid #e8e8e8' }}>
          <button onClick={goToToday} style={{ width: '100%', padding: '8px 16px', backgroundColor: '#4772fa', color: '#fff', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none' }}>
            Today
          </button>
        </div>
        
        <div style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} style={{ padding: 4, cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 4 }}>
              <ChevronLeft size={16} style={{ color: '#808080' }} />
            </button>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f' }}>{shortMonthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} style={{ padding: 4, cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 4 }}>
              <ChevronRight size={16} style={{ color: '#808080' }} />
            </button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
            {shortDays.map((day, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 10, fontWeight: 500, color: '#b0b0b0', padding: 4 }}>{day}</div>
            ))}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {monthDates.slice(0, 42).map((item, i) => {
              const hasEvent = getEventsForDate(item.date).length > 0;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(item.date)}
                  style={{
                    aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, borderRadius: '50%', cursor: 'pointer', position: 'relative', border: 'none',
                    backgroundColor: isSelected(item.date) ? '#4772fa' : isToday(item.date) ? 'rgba(71,114,250,0.1)' : 'transparent',
                    color: isSelected(item.date) ? '#fff' : isToday(item.date) ? '#4772fa' : item.isCurrentMonth ? '#1f1f1f' : '#c0c0c0',
                    fontWeight: isToday(item.date) ? 500 : 400
                  }}
                >
                  {item.date.getDate()}
                  {hasEvent && !isSelected(item.date) && (
                    <span style={{ position: 'absolute', bottom: 2, width: 4, height: 4, borderRadius: '50%', backgroundColor: '#4772fa' }}></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="custom-scrollbar" style={{ flex: 1, padding: 16, borderTop: '1px solid #e8e8e8', overflowY: 'auto' }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: '#808080', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12, margin: '0 0 12px 0' }}>Upcoming Events</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {events.slice(0, 5).map((event, i) => (
              <div key={i} onClick={() => setSelectedDate(event.date)} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: 8, borderRadius: 6, cursor: 'pointer' }}>
                <div style={{ width: 3, height: '100%', minHeight: 32, borderRadius: 2, backgroundColor: event.color }}></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, color: '#1f1f1f', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.title}</p>
                  <p style={{ fontSize: 11, color: '#808080', margin: 0 }}>{event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 56, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e8e8e8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} style={{ padding: 6, cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 4 }}>
                <ChevronLeft size={18} style={{ color: '#808080' }} />
              </button>
              <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} style={{ padding: 6, cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 4 }}>
                <ChevronRight size={18} style={{ color: '#808080' }} />
              </button>
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f', margin: 0 }}>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#808080' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#eb4d3d' }}></span>Hearing</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ff9500' }}></span>Deadline</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4772fa' }}></span>Meeting</span>
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #e8e8e8', backgroundColor: '#fafafa' }}>
            {daysOfWeek.map((day, i) => (
              <div key={i} style={{ padding: 8, textAlign: 'center', fontSize: 11, fontWeight: 500, color: '#808080', borderRight: i < 6 ? '1px solid #e8e8e8' : 'none' }}>{day}</div>
            ))}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridAutoRows: 'minmax(100px, 1fr)' }}>
            {monthDates.map((item, i) => {
              const dayEvents = getEventsForDate(item.date);
              return (
                <div
                  key={i}
                  onClick={() => setSelectedDate(item.date)}
                  style={{
                    borderRight: (i + 1) % 7 !== 0 ? '1px solid #e8e8e8' : 'none', borderBottom: '1px solid #e8e8e8', padding: 4, minHeight: 100, cursor: 'pointer',
                    backgroundColor: isSelected(item.date) ? 'rgba(71,114,250,0.05)' : item.isCurrentMonth ? '#fff' : '#fafafa'
                  }}
                >
                  <div style={{ textAlign: 'right', marginBottom: 4 }}>
                    {isToday(item.date) ? (
                      <span style={{ display: 'inline-flex', width: 24, height: 24, borderRadius: '50%', backgroundColor: '#4772fa', color: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500 }}>{item.date.getDate()}</span>
                    ) : (
                      <span style={{ fontSize: 14, color: item.isCurrentMonth ? '#1f1f1f' : '#c0c0c0' }}>{item.date.getDate()}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {dayEvents.slice(0, 3).map((event, j) => (
                      <div key={j} style={{ fontSize: 11, padding: '2px 6px', borderRadius: 4, color: '#fff', backgroundColor: event.color, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {event.time !== 'TBD' && <span style={{ opacity: 0.8, marginRight: 4 }}>{event.time.split(' ')[0]}</span>}
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div style={{ fontSize: 10, color: '#808080', paddingLeft: 4 }}>+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedDate && (
        <div style={{ width: 288, borderLeft: '1px solid #e8e8e8', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 16, borderBottom: '1px solid #e8e8e8' }}>
            <p style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f', margin: 0 }}>{selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}</p>
            <p style={{ fontSize: 14, color: '#808080', margin: 0 }}>{selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
            {selectedDateEvents.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {selectedDateEvents.map((event, i) => (
                  <div key={i} style={{ padding: 12, borderRadius: 8, border: '1px solid #e8e8e8' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ width: 3, height: '100%', minHeight: 40, borderRadius: 2, backgroundColor: event.color }}></div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 500, color: '#1f1f1f', margin: 0 }}>{event.title}</p>
                        <p style={{ fontSize: 14, color: '#808080', margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock size={12} /> {event.time}
                        </p>
                        <span style={{ display: 'inline-block', marginTop: 8, fontSize: 10, padding: '2px 8px', borderRadius: 20, color: '#fff', backgroundColor: event.color }}>{event.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 32 }}>
                <Calendar size={32} style={{ color: '#e8e8e8', marginBottom: 8 }} />
                <p style={{ fontSize: 14, color: '#808080', margin: 0 }}>No events scheduled</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DocumentsSection({ addNotification }) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const fileInputRef = useRef(null);
  
  const [files, setFiles] = useState([
    { id: 1, name: 'Court_Order_Feb2024.pdf', date: 'Feb 02, 2024', size: '1.2 MB', type: 'pdf', category: 'court-order', canDownload: true },
    { id: 2, name: 'Writ_Petition_Final.pdf', date: 'Jan 12, 2024', size: '2.4 MB', type: 'pdf', category: 'filing', canDownload: true },
    { id: 3, name: 'Evidence_Ex_A.docx', date: 'Jan 15, 2024', size: '840 KB', type: 'doc', category: 'evidence', canDownload: true },
    { id: 4, name: 'Settlement_Agreement.pdf', date: 'Jan 28, 2024', size: '560 KB', type: 'pdf', category: 'agreement', canDownload: true },
    { id: 5, name: 'Counter_Affidavit.pdf', date: 'Jan 28, 2024', size: '1.8 MB', type: 'pdf', category: 'advocate-uploaded', canDownload: true },
  ]);

  const requestedDocuments = [
    { id: 1, name: 'Bank Statements (2023)', deadline: 'Mar 15, 2024' },
    { id: 2, name: 'Original Contract Copy', deadline: 'Mar 16, 2024' },
  ];

  const categories = [
    { id: 'all', label: 'All', count: files.length },
    { id: 'court-order', label: 'Orders', count: files.filter(f => f.category === 'court-order').length },
    { id: 'filing', label: 'Filings', count: files.filter(f => f.category === 'filing').length },
    { id: 'evidence', label: 'Evidence', count: files.filter(f => f.category === 'evidence').length },
  ];

  const filteredFiles = activeCategory === 'all' ? files : files.filter(f => f.category === activeCategory);

  const handleFileUpload = (e) => {
    const uploadedFiles = e.target.files;
    if (uploadedFiles && uploadedFiles.length > 0) {
      const newFile = {
        id: Date.now(),
        name: uploadedFiles[0].name,
        size: `${(uploadedFiles[0].size / (1024 * 1024)).toFixed(2)} MB`,
        type: uploadedFiles[0].name.split('.').pop() || 'file',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        category: 'client-uploaded',
        canDownload: true
      };
      setFiles([newFile, ...files]);
      setShowUploadModal(false);
      addNotification('success', 'Document uploaded');
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 1024, margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#1f1f1f', marginBottom: 4, margin: '0 0 4px 0' }}>Documents</h1>
          <p style={{ fontSize: 14, color: '#808080', margin: 0 }}>View and upload case files</p>
        </div>
        <button onClick={() => setShowUploadModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', backgroundColor: '#4772fa', color: '#fff', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none' }}>
          <Upload size={15} /> Upload
        </button>
      </div>

      {requestedDocuments.length > 0 && (
        <div style={{ backgroundColor: 'rgba(255,149,0,0.05)', border: '1px solid rgba(255,149,0,0.2)', borderRadius: 8, padding: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <AlertTriangle size={15} style={{ color: '#cc7700' }} />
            <span style={{ fontWeight: 500, color: '#cc7700', fontSize: 14 }}>Documents Requested</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {requestedDocuments.map(doc => (
              <div key={doc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, backgroundColor: '#fff', borderRadius: 6, border: '1px solid rgba(255,149,0,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <FileUp size={15} style={{ color: '#cc7700' }} />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f', margin: 0 }}>{doc.name}</p>
                    <p style={{ fontSize: 11, color: '#808080', margin: 0 }}>Due: {doc.deadline}</p>
                  </div>
                </div>
                <button onClick={() => setShowUploadModal(true)} style={{ padding: '6px 12px', backgroundColor: '#ff9500', color: '#fff', borderRadius: 4, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: 'none' }}>
                  Upload
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '6px 12px', borderRadius: 6, fontSize: 14, cursor: 'pointer', border: 'none',
              backgroundColor: activeCategory === cat.id ? '#4772fa' : '#f5f5f5',
              color: activeCategory === cat.id ? '#fff' : '#808080'
            }}
          >
            {cat.label} ({cat.count})
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e8e8e8', overflow: 'hidden' }}>
        {filteredFiles.map((file, i) => (
          <div key={file.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderBottom: i < filteredFiles.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: file.type === 'pdf' ? 'rgba(235,77,61,0.1)' : 'rgba(71,114,250,0.1)', color: file.type === 'pdf' ? '#eb4d3d' : '#4772fa' }}>
              <FileText size={16} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                <span style={{ fontSize: 12, color: '#808080' }}>{file.date}</span>
                <span style={{ fontSize: 12, color: '#b0b0b0' }}>•</span>
                <span style={{ fontSize: 12, color: '#808080' }}>{file.size}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button style={{ padding: 6, color: '#808080', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 4 }}>
                <Eye size={16} />
              </button>
              {file.canDownload && (
                <button onClick={() => addNotification('success', `Downloading ${file.name}`)} style={{ padding: 6, color: '#808080', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 4 }}>
                  <Download size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload Document">
        <div>
          <div 
            onClick={() => fileInputRef.current?.click()}
            style={{ border: '2px dashed #e8e8e8', borderRadius: 8, padding: 32, textAlign: 'center', cursor: 'pointer' }}
          >
            <FileUp size={36} style={{ color: '#808080', marginBottom: 12 }} />
            <p style={{ fontSize: 14, color: '#1f1f1f', marginBottom: 4, margin: '0 0 4px 0' }}>Click to upload</p>
            <p style={{ fontSize: 12, color: '#808080', margin: 0 }}>PDF, DOC, JPG, PNG (max 25MB)</p>
            <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileUpload} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
          </div>
          <p style={{ fontSize: 12, color: '#808080', marginTop: 16, margin: '16px 0 0 0' }}>Your advocate will be notified.</p>
        </div>
      </Modal>
    </div>
  );
}

function BillingSection({ addNotification }) {
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const invoices = [
    { id: 'INV-2024-003', date: 'Mar 01, 2024', amount: '$2,750', status: 'pending', desc: 'Document preparation' },
    { id: 'INV-2024-002', date: 'Feb 15, 2024', amount: '$5,200', status: 'paid', desc: 'Court filing + representation' },
    { id: 'INV-2024-001', date: 'Jan 20, 2024', amount: '$3,500', status: 'paid', desc: 'Initial consultation' },
  ];

  const transactions = [
    { id: 1, date: 'Feb 18, 2024', amount: '$5,200', method: 'Card ****4242' },
    { id: 2, date: 'Jan 25, 2024', amount: '$3,500', method: 'Bank Transfer' },
  ];

  const stats = [
    { label: 'Total Billed', value: '$11,450', icon: CreditCard, color: '#4772fa', desc: 'Year to date' },
    { label: 'Due', value: '$2,750', icon: Receipt, color: '#ff9500', desc: '1 pending' },
    { label: 'Paid', value: '$8,700', icon: CheckCircle2, color: '#00c853', desc: '2 invoices' },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 896, margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: '#1f1f1f', marginBottom: 4, margin: '0 0 4px 0' }}>Payments</h1>
        <p style={{ fontSize: 14, color: '#808080', margin: 0 }}>Invoices and transaction history</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {stats.map(item => (
          <div key={item.label} style={{ backgroundColor: '#fff', padding: 16, borderRadius: 8, border: '1px solid #e8e8e8' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: '#808080', textTransform: 'uppercase' }}>{item.label}</span>
              <item.icon size={16} style={{ color: item.color }} />
            </div>
            <p style={{ fontSize: 24, fontWeight: 600, color: item.color, margin: '0 0 2px 0' }}>{item.value}</p>
            <p style={{ fontSize: 12, color: '#808080', margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e8e8e8', marginBottom: 24 }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8e8e8' }}>
          <span style={{ fontWeight: 500, color: '#1f1f1f', fontSize: 14 }}>Invoices</span>
        </div>
        {invoices.map((inv, i) => (
          <div key={inv.id} style={{ padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: i < invoices.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 4, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Receipt size={16} style={{ color: '#808080' }} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f', margin: 0 }}>{inv.id}</p>
                <p style={{ fontSize: 12, color: '#808080', margin: 0 }}>{inv.desc}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f', margin: 0 }}>{inv.amount}</p>
                <p style={{ fontSize: 12, color: '#808080', margin: 0 }}>{inv.date}</p>
              </div>
              <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 500, backgroundColor: inv.status === 'paid' ? 'rgba(0,200,83,0.1)' : 'rgba(255,149,0,0.1)', color: inv.status === 'paid' ? '#00a344' : '#cc7700' }}>
                {inv.status}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <button onClick={() => addNotification('success', `Downloading ${inv.id}`)} style={{ padding: 6, color: '#808080', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 4 }}>
                  <Download size={15} />
                </button>
                {inv.status === 'pending' && (
                  <button onClick={() => { setSelectedInvoice(inv); setShowPayModal(true); }} style={{ padding: '6px 12px', backgroundColor: '#4772fa', color: '#fff', borderRadius: 4, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: 'none' }}>
                    Pay
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e8e8e8' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8e8e8' }}>
          <span style={{ fontWeight: 500, color: '#1f1f1f', fontSize: 14 }}>Transactions</span>
        </div>
        {transactions.map((txn, i) => (
          <div key={txn.id} style={{ padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: i < transactions.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'rgba(0,200,83,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={16} style={{ color: '#00c853' }} />
              </div>
              <div>
                <p style={{ fontSize: 14, color: '#1f1f1f', margin: 0 }}>Payment completed</p>
                <p style={{ fontSize: 12, color: '#808080', margin: 0 }}>{txn.method}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#00c853', margin: 0 }}>-{txn.amount}</p>
                <p style={{ fontSize: 12, color: '#808080', margin: 0 }}>{txn.date}</p>
              </div>
              <button style={{ padding: 6, color: '#808080', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 4 }}>
                <ExternalLink size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showPayModal} onClose={() => setShowPayModal(false)} title="Make Payment">
        {selectedInvoice && (
          <div>
            <div style={{ padding: 12, backgroundColor: '#fafafa', borderRadius: 6, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 14, color: '#808080' }}>Invoice</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{selectedInvoice.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid #e8e8e8' }}>
                <span style={{ fontWeight: 500 }}>Amount</span>
                <span style={{ fontSize: 18, fontWeight: 600, color: '#4772fa' }}>{selectedInvoice.amount}</span>
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#808080', textTransform: 'uppercase', marginBottom: 8 }}>Payment Method</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, border: '1px solid #e8e8e8', borderRadius: 6, cursor: 'pointer' }}>
                  <input type="radio" name="payment" defaultChecked />
                  <CreditCard size={16} style={{ color: '#808080' }} />
                  <span style={{ fontSize: 14 }}>Credit/Debit Card</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, border: '1px solid #e8e8e8', borderRadius: 6, cursor: 'pointer' }}>
                  <input type="radio" name="payment" />
                  <Building2 size={16} style={{ color: '#808080' }} />
                  <span style={{ fontSize: 14 }}>Bank Transfer</span>
                </label>
              </div>
            </div>
            <button onClick={() => { setShowPayModal(false); addNotification('success', 'Redirecting to payment...'); }} style={{ width: '100%', padding: 10, backgroundColor: '#4772fa', color: '#fff', borderRadius: 6, fontWeight: 500, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              Pay {selectedInvoice.amount}
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

function CommunicationSection({ addNotification }) {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { from: 'advocate', name: 'Sarah Jenkins', text: "Hello Alex, I've reviewed your documents. The regulatory compliance section is strong.", time: '10:45 AM' },
    { from: 'client', name: 'You', text: 'Thank you! Should I upload the audit reports?', time: '11:02 AM' },
    { from: 'advocate', name: 'Sarah Jenkins', text: "Yes, please upload them now. Great work finding those.", time: '11:15 AM' },
  ]);
  const fileInputRef = useRef(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { from: 'client', name: 'You', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setMessage('');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <aside style={{ width: 256, borderRight: '1px solid #e8e8e8', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: 16, borderBottom: '1px solid #e8e8e8' }}>
          <span style={{ fontWeight: 500, color: '#1f1f1f', fontSize: 14 }}>Legal Team</span>
        </div>
        <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ padding: 12, backgroundColor: '#fff', borderRadius: 8, border: '1px solid rgba(71,114,250,0.3)', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ position: 'relative' }}>
                <img style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Advocate" />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', backgroundColor: '#00c853', border: '2px solid #fff' }}></div>
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f', margin: 0 }}>Sarah Jenkins</p>
                <p style={{ fontSize: 11, color: '#808080', margin: 0 }}>Lead Advocate</p>
              </div>
            </div>
          </div>
          <div style={{ padding: 12, backgroundColor: '#fff', borderRadius: 8, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ position: 'relative' }}>
                <img style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Paralegal" />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', backgroundColor: '#808080', border: '2px solid #fff' }}></div>
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f', margin: 0 }}>David Chen</p>
                <p style={{ fontSize: 11, color: '#808080', margin: 0 }}>Paralegal</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
        <header style={{ height: 56, padding: '0 20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #e8e8e8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Advocate" />
            <div>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f', margin: 0 }}>Sarah Jenkins</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#00c853' }}></span>
                <span style={{ fontSize: 11, color: '#808080' }}>Online</span>
              </div>
            </div>
          </div>
        </header>

        <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: 20, backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {chatMessages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, maxWidth: 400, marginLeft: msg.from === 'client' ? 'auto' : 0, flexDirection: msg.from === 'client' ? 'row-reverse' : 'row' }}>
              <img style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} src={msg.from === 'advocate' ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'} alt={msg.name} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.from === 'client' ? 'flex-end' : 'flex-start' }}>
                <div style={{ padding: '8px 12px', borderRadius: 12, borderBottomRightRadius: msg.from === 'client' ? 4 : 12, borderBottomLeftRadius: msg.from === 'client' ? 12 : 4, backgroundColor: msg.from === 'client' ? '#4772fa' : '#fff', color: msg.from === 'client' ? '#fff' : '#1f1f1f', border: msg.from === 'client' ? 'none' : '1px solid #e8e8e8' }}>
                  <p style={{ fontSize: 14, margin: 0 }}>{msg.text}</p>
                </div>
                <span style={{ fontSize: 10, color: '#b0b0b0', marginTop: 4, padding: '0 4px' }}>{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: 16, borderTop: '1px solid #e8e8e8', backgroundColor: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => fileInputRef.current?.click()} style={{ padding: 8, color: '#808080', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 6 }}>
              <Paperclip size={18} />
            </button>
            <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
            <input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
              style={{ flex: 1, border: '1px solid #e8e8e8', borderRadius: 6, padding: '8px 12px', fontSize: 14, outline: 'none' }}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage} disabled={!message.trim()} style={{ padding: 8, backgroundColor: '#4772fa', color: '#fff', borderRadius: 6, cursor: 'pointer', border: 'none', opacity: message.trim() ? 1 : 0.5 }}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function SettingsView({ addNotification }) {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);

  return (
    <div style={{ padding: 24, maxWidth: 640, margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: '#1f1f1f', marginBottom: 4, margin: '0 0 4px 0' }}>Settings</h1>
        <p style={{ fontSize: 14, color: '#808080', margin: 0 }}>Manage preferences</p>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e8e8e8' }}>
        <div style={{ padding: 20, borderBottom: '1px solid #f0f0f0' }}>
          <span style={{ fontWeight: 500, color: '#1f1f1f', fontSize: 14 }}>Profile</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p style={{ fontWeight: 500, color: '#1f1f1f', margin: 0 }}>Alex Thompson</p>
              <p style={{ fontSize: 14, color: '#808080', margin: '2px 0 0 0' }}>alex.thompson@email.com</p>
            </div>
          </div>
        </div>

        <div style={{ padding: 20, borderBottom: '1px solid #f0f0f0' }}>
          <span style={{ fontWeight: 500, color: '#1f1f1f', fontSize: 14 }}>Notifications</span>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: '#fafafa', borderRadius: 6 }}>
              <div>
                <p style={{ fontSize: 14, color: '#1f1f1f', margin: 0 }}>Email Notifications</p>
                <p style={{ fontSize: 12, color: '#808080', margin: '2px 0 0 0' }}>Hearing dates, documents, payments</p>
              </div>
              <label style={{ position: 'relative', display: 'inline-flex', cursor: 'pointer' }}>
                <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
                <div style={{ width: 40, height: 20, backgroundColor: emailNotif ? '#4772fa' : '#e8e8e8', borderRadius: 10, position: 'relative', transition: 'background-color 0.2s' }}>
                  <div style={{ position: 'absolute', top: 2, left: emailNotif ? 22 : 2, width: 16, height: 16, backgroundColor: '#fff', borderRadius: '50%', transition: 'left 0.2s' }}></div>
                </div>
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: '#fafafa', borderRadius: 6 }}>
              <div>
                <p style={{ fontSize: 14, color: '#1f1f1f', margin: 0 }}>SMS Notifications</p>
                <p style={{ fontSize: 12, color: '#808080', margin: '2px 0 0 0' }}>Urgent updates</p>
              </div>
              <label style={{ position: 'relative', display: 'inline-flex', cursor: 'pointer' }}>
                <input type="checkbox" checked={smsNotif} onChange={() => setSmsNotif(!smsNotif)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
                <div style={{ width: 40, height: 20, backgroundColor: smsNotif ? '#4772fa' : '#e8e8e8', borderRadius: 10, position: 'relative', transition: 'background-color 0.2s' }}>
                  <div style={{ position: 'absolute', top: 2, left: smsNotif ? 22 : 2, width: 16, height: 16, backgroundColor: '#fff', borderRadius: '50%', transition: 'left 0.2s' }}></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div style={{ padding: 20 }}>
          <span style={{ fontWeight: 500, color: '#1f1f1f', fontSize: 14 }}>Security</span>
          <button onClick={() => addNotification('info', 'Password reset link sent')} style={{ marginTop: 12, width: '100%', padding: 10, border: '1px solid #e8e8e8', borderRadius: 6, fontSize: 14, cursor: 'pointer', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            Change Password
            <ChevronRight size={16} style={{ color: '#808080' }} />
          </button>
        </div>
      </div>

      <button onClick={() => addNotification('success', 'Settings saved')} style={{ width: '100%', marginTop: 24, padding: 10, backgroundColor: '#4772fa', color: '#fff', borderRadius: 6, fontWeight: 500, cursor: 'pointer', border: 'none' }}>
        Save Changes
      </button>
    </div>
  );
}

export default function ClientHome() {
  const [activeView, setActiveView] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);

  const clientNotifications = [
    { id: 1, title: 'Hearing Confirmed', desc: 'March 18, 2024 at 10:30 AM', time: '2 days ago', read: false, type: 'hearing' },
    { id: 2, title: 'Payment Reminder', desc: 'INV-2024-003 for $2,750 pending', time: '3 days ago', read: false, type: 'payment' },
    { id: 3, title: 'Document Uploaded', desc: 'Evidence_Ex_A.docx by advocate', time: '5 days ago', read: false, type: 'document' },
    { id: 4, title: 'Court Order', desc: 'Interim stay granted', time: '1 week ago', read: true, type: 'order' },
  ];

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
  };

  const removeNotification = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <ClientDashboard setActiveView={setActiveView} addNotification={addNotification} />;
      case 'case-summary': return <CaseSummary addNotification={addNotification} />;
      case 'timeline': return <CaseTimeline addNotification={addNotification} />;
      case 'calendar': return <HearingCalendar addNotification={addNotification} />;
      case 'documents': return <DocumentsSection addNotification={addNotification} />;
      case 'billing': return <BillingSection addNotification={addNotification} />;
      case 'messages': return <CommunicationSection addNotification={addNotification} />;
      case 'settings': return <SettingsView addNotification={addNotification} />;
      default: return <ClientDashboard setActiveView={setActiveView} addNotification={addNotification} />;
    }
  };

  const titles = {
    'dashboard': 'Dashboard',
    'case-summary': 'Case Summary',
    'timeline': 'Timeline',
    'calendar': 'Calendar',
    'documents': 'Documents',
    'billing': 'Payments',
    'messages': 'Messages',
    'settings': 'Settings',
  };

  return (
    <div className="client-home" style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden', backgroundColor: '#fff' }}>
      <style>{styles}</style>
      <Sidebar activeView={activeView} setActiveView={setActiveView} addNotification={addNotification} />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {activeView !== 'messages' && activeView !== 'calendar' && (
          <Header title={titles[activeView] || 'CourtCase'} addNotification={addNotification} clientNotifications={clientNotifications} />
        )}
        <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', backgroundColor: '#fafafa' }}>
          {renderView()}
        </div>
      </main>
      <Toast notifications={notifications} removeNotification={removeNotification} />
    </div>
  );
}
