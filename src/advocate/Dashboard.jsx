import React, { useState } from 'react';
import {
  Scale, LayoutDashboard, FileText, MessageSquare,
  Calendar, Users, Bell, Clock, Upload,
  CheckCircle2, Gavel, CalendarDays, MapPin,
  CreditCard, AlertTriangle, Eye,
  Briefcase, ListTodo, Plus, BarChart3
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

export default function DashboardPage() {
  const [activeView, setActiveView] = useState('dashboard');
  const isDark = false;
  const accentColor = '#4772fa';
  
  const colors = getThemeColors(isDark, accentColor);
  const [activeTab, setActiveTab] = useState('personal');
  const userRole = 'admin';

  const canViewFirmDashboard = ['admin', 'partner', 'advocate', 'paralegal'].includes(userRole);
  const canViewFinancials = ['admin', 'partner'].includes(userRole);

  const personalStats = [
    { label: 'My Cases', value: '8', icon: Briefcase, color: '#4772fa', desc: '3 active hearings', action: () => setActiveView('case-summary') },
    { label: 'My Tasks', value: '12', icon: ListTodo, color: '#ff9500', desc: '5 due today', action: () => setActiveView('tasks') },
    { label: 'My Hearings', value: '4', icon: Calendar, color: '#00c853', desc: 'Next: Mar 18', action: () => setActiveView('calendar') },
    { label: 'My Documents', value: '24', icon: FileText, color: '#9c27b0', desc: '3 pending review', action: () => setActiveView('documents') }
  ];

  const firmStats = [
    { label: 'Total Cases', value: '147', icon: Briefcase, color: '#4772fa', desc: '23 active this month' },
    { label: 'Firm Hearings', value: '28', icon: Calendar, color: '#00c853', desc: 'This week' },
    { label: 'Team Members', value: '18', icon: Users, color: '#9c27b0', desc: '12 advocates, 6 staff' },
    { label: canViewFinancials ? 'Revenue' : 'Pending Tasks', value: canViewFinancials ? '$284K' : '89', icon: canViewFinancials ? CreditCard : ListTodo, color: '#ff9500', desc: canViewFinancials ? 'This month' : 'Across firm' }
  ];

  const myUpdates = [
    { icon: Calendar, color: '#4772fa', title: 'Hearing Scheduled', desc: 'Thompson vs. Global Corp - Final Arguments', time: '2 days ago' },
    { icon: FileText, color: '#00c853', title: 'Document Uploaded', desc: 'Evidence_Ex_A.docx uploaded successfully', time: '5 days ago' },
    { icon: Gavel, color: '#9c27b0', title: 'Court Order Received', desc: 'Interim stay granted on Case #WP/2024/102', time: '1 week ago' },
    { icon: Bell, color: '#ff9500', title: 'Deadline Reminder', desc: 'Counter-affidavit due in 3 days', time: '1 week ago' }
  ];

  const firmActivity = [
    { icon: Briefcase, color: '#4772fa', title: 'New Case Filed', desc: 'Miller vs. Tech Corp assigned to Sarah J.', time: '1 hour ago', user: 'System' },
    { icon: FileText, color: '#00c853', title: 'Document Submitted', desc: 'Evidence bundle for Case #441 uploaded', time: '3 hours ago', user: 'David Chen' },
    { icon: Calendar, color: '#ff9500', title: 'Hearing Completed', desc: 'Johnson Estate hearing concluded', time: '5 hours ago', user: 'Michael Brown' },
    { icon: CreditCard, color: '#9c27b0', title: 'Payment Received', desc: '$12,500 from Global Industries', time: 'Yesterday', user: 'Finance' },
    { icon: Users, color: '#4772fa', title: 'Team Update', desc: 'New paralegal Emily W. joined the firm', time: '2 days ago', user: 'HR' }
  ];

  const myTasks = [
    { id: 1, title: 'Review counter-affidavit draft', priority: 3, dueDate: 'Today', case: 'Thompson vs. Global' },
    { id: 2, title: 'Prepare evidence summary', priority: 2, dueDate: 'Tomorrow', case: 'Miller vs. Tech' },
    { id: 3, title: 'Client meeting preparation', priority: 2, dueDate: 'Mar 20', case: 'Johnson Estate' },
    { id: 4, title: 'File motion for extension', priority: 1, dueDate: 'Mar 22', case: 'Smith Litigation' }
  ];

  const myHearings = [
    { date: 'Mar 18', time: '10:30 AM', case: 'Thompson vs. Global Corp', court: 'High Court, Room 302', type: 'Final Arguments' },
    { date: 'Mar 22', time: '2:00 PM', case: 'Miller vs. Tech Solutions', court: 'District Court, Room 105', type: 'Preliminary Hearing' },
    { date: 'Mar 25', time: '11:00 AM', case: 'Johnson Estate Matter', court: 'Probate Court, Room 201', type: 'Status Conference' }
  ];

  const caseDistribution = [
    { stage: 'Filing', count: 12, color: '#4772fa', percent: 8 },
    { stage: 'Discovery', count: 28, color: '#00c853', percent: 19 },
    { stage: 'Pre-Trial', count: 35, color: '#ff9500', percent: 24 },
    { stage: 'Trial', count: 18, color: '#eb4d3d', percent: 12 },
    { stage: 'Appeal', count: 8, color: '#9c27b0', percent: 5 },
    { stage: 'Closed', count: 46, color: '#808080', percent: 32 }
  ];

  const advocateWorkload = [
    { name: 'Sarah Jenkins', cases: 18, tasks: 24, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { name: 'Michael Brown', cases: 15, tasks: 19, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { name: 'Emily Watson', cases: 12, tasks: 16, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    { name: 'James Lee', cases: 14, tasks: 21, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' }
  ];

  const getPriorityColor = (p) => p === 3 ? '#eb4d3d' : p === 2 ? '#ff9500' : '#4772fa';

  const DashboardTab = ({ id, label, active, onClick }) => (
    <button
      onClick={onClick}
      style={{
        padding: '12px 24px',
        fontSize: 15,
        fontWeight: active ? 600 : 400,
        color: active ? accentColor : colors.textSecondary,
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: active ? `2px solid ${accentColor}` : '2px solid transparent',
        cursor: 'pointer',
        transition: 'all 0.2s',
        marginBottom: -1
      }}
    >
      {label}
    </button>
  );

  const StatCard = ({ item, onClick }) => (
    <div
      onClick={onClick}
      style={{ backgroundColor: colors.card, padding: 20, borderRadius: 12, border: `1px solid ${colors.border}`, cursor: onClick ? 'pointer' : 'default', transition: 'all 0.2s' }}
      onMouseEnter={(e) => { if (onClick) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = isDark ? '0 10px 15px -3px rgba(0,0,0,0.3)' : '0 10px 15px -3px rgba(0,0,0,0.05)'; } }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.8px' }}>{item.label}</span>
        <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: `${item.color}${isDark ? '30' : '10'}`, color: item.color }}>
          <item.icon size={20} />
        </div>
      </div>
      <p className="stat-value" style={{ fontSize: 28, fontWeight: 700, color: colors.text, marginBottom: 4, margin: '0 0 4px 0' }}>{item.value}</p>
      <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0 }}>{item.desc}</p>
    </div>
  );

  const PersonalDashboard = () => (
    <>
      <section className="hero-section" style={{ backgroundColor: accentColor, borderRadius: 12, padding: 20, color: '#fff', marginBottom: 24, boxShadow: `0 10px 15px -3px ${accentColor}30` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
              <Calendar size={12} /> Next Hearing
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, margin: '0 0 6px 0' }}>Thompson vs. Global Corp</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 16, margin: '0 0 16px 0' }}>Case #WP/2024/102-B • Final Arguments</p>
            <div className="hero-info" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, color: 'rgba(255,255,255,0.9)', fontSize: 13, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={14} />
                <span>High Court, Room 302</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CalendarDays size={14} />
                <span>March 18, 2024 • 10:30 AM</span>
              </div>
            </div>
            <div className="hero-buttons" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={() => setActiveView('case-summary')} style={{ backgroundColor: '#fff', color: accentColor, padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 44 }}>
                <Eye size={16} /> View Case
              </button>
              <button onClick={() => setActiveView('calendar')} style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 44 }}>
                <Calendar size={16} /> Calendar
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {personalStats.map((item) => <StatCard key={item.label} item={item} onClick={item.action} />)}
      </div>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}` }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: colors.text }}>My Pending Tasks</span>
            <button onClick={() => setActiveView('tasks')} style={{ fontSize: 13, color: accentColor, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>View All</button>
          </div>
          <div style={{ padding: 16 }}>
            {myTasks.map((task, i) => (
              <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < myTasks.length - 1 ? `1px solid ${colors.borderLight}` : 'none' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: getPriorityColor(task.priority), flexShrink: 0 }}></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, color: colors.text, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.title}</p>
                  <p style={{ fontSize: 12, color: colors.textSecondary, margin: '2px 0 0 0' }}>{task.case}</p>
                </div>
                <span style={{ fontSize: 12, color: task.dueDate === 'Today' ? '#eb4d3d' : colors.textSecondary, fontWeight: 500, flexShrink: 0 }}>{task.dueDate}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}` }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: colors.text }}>My Upcoming Hearings</span>
            <button onClick={() => setActiveView('calendar')} style={{ fontSize: 13, color: accentColor, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>View All</button>
          </div>
          <div style={{ padding: 16 }}>
            {myHearings.map((hearing, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderBottom: i < myHearings.length - 1 ? `1px solid ${colors.borderLight}` : 'none' }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: colors.accentLight, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 11, color: accentColor, fontWeight: 600 }}>{hearing.date.split(' ')[0]}</span>
                  <span style={{ fontSize: 14, color: accentColor, fontWeight: 700 }}>{hearing.date.split(' ')[1]}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{hearing.case}</p>
                  <p style={{ fontSize: 12, color: colors.textSecondary, margin: '2px 0 0 0' }}>{hearing.court}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, backgroundColor: colors.bgTertiary, color: colors.textSecondary }}>{hearing.type}</span>
                    <span style={{ fontSize: 11, color: colors.textSecondary }}>{hearing.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}` }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: colors.text }}>My Recent Activity</span>
            <button onClick={() => setActiveView('timeline')} style={{ fontSize: 13, color: accentColor, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>View All</button>
          </div>
          <div style={{ padding: 16 }}>
            {myUpdates.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < myUpdates.length - 1 ? `1px solid ${colors.borderLight}` : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backgroundColor: `${item.color}${isDark ? '30' : '10'}`, color: item.color }}>
                  <item.icon size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <p style={{ fontWeight: 500, fontSize: 14, color: colors.text, margin: 0 }}>{item.title}</p>
                    <span style={{ fontSize: 11, color: colors.textMuted, flexShrink: 0 }}>{item.time}</span>
                  </div>
                  <p style={{ fontSize: 13, color: colors.textSecondary, margin: '2px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 20 }}>
            <span style={{ fontWeight: 600, color: colors.text, fontSize: 15 }}>Quick Actions</span>
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => setActiveView('tasks')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', border: 'none' }}>
                <Plus size={18} /> Add Task
              </button>
              <button onClick={() => setActiveView('documents')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', backgroundColor: colors.bgTertiary, color: colors.text, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', border: 'none' }}>
                <Upload size={18} /> Upload Document
              </button>
              <button onClick={() => setActiveView('messages')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', backgroundColor: colors.bgTertiary, color: colors.text, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', border: 'none' }}>
                <MessageSquare size={18} /> Send Message
              </button>
            </div>
          </div>

          <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Bell size={18} style={{ color: '#ff9500' }} />
              <span style={{ fontWeight: 600, color: colors.text, fontSize: 15 }}>Reminders</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ padding: 12, backgroundColor: isDark ? 'rgba(255,149,0,0.15)' : 'rgba(255,149,0,0.08)', borderRadius: 8, borderLeft: '3px solid #ff9500' }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: colors.text, margin: 0 }}>Counter-affidavit deadline</p>
                <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>Due in 3 days • Thompson Case</p>
              </div>
              <div style={{ padding: 12, backgroundColor: isDark ? `${accentColor}20` : `${accentColor}10`, borderRadius: 8, borderLeft: `3px solid ${accentColor}` }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: colors.text, margin: 0 }}>Client meeting</p>
                <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>Tomorrow at 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const FirmDashboard = () => (
    <>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {firmStats.map((item) => <StatCard key={item.label} item={item} />)}
      </div>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}` }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}` }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: colors.text }}>Case Distribution by Stage</span>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ display: 'flex', height: 24, borderRadius: 6, overflow: 'hidden', marginBottom: 20 }}>
              {caseDistribution.map((item, i) => (
                <div key={i} style={{ width: `${item.percent}%`, backgroundColor: item.color, height: '100%' }} title={`${item.stage}: ${item.count}`}></div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {caseDistribution.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: item.color }}></div>
                  <div>
                    <span style={{ fontSize: 13, color: colors.text }}>{item.stage}</span>
                    <span style={{ fontSize: 12, color: colors.textSecondary, marginLeft: 6 }}>({item.count})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}` }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}` }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: colors.text }}>Advocate Workload</span>
          </div>
          <div style={{ padding: 16 }}>
            {advocateWorkload.map((adv, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < advocateWorkload.length - 1 ? `1px solid ${colors.borderLight}` : 'none' }}>
                <img src={adv.avatar} alt={adv.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>{adv.name}</p>
                  <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                    <span style={{ fontSize: 12, color: colors.textSecondary }}>{adv.cases} cases</span>
                    <span style={{ fontSize: 12, color: colors.textSecondary }}>{adv.tasks} tasks</span>
                  </div>
                </div>
                <div style={{ width: 80, height: 6, backgroundColor: colors.bgTertiary, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(adv.cases / 20 * 100, 100)}%`, height: '100%', backgroundColor: adv.cases > 15 ? '#eb4d3d' : adv.cases > 10 ? '#ff9500' : '#00c853' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
        <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}` }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}` }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: colors.text }}>Firm Activity Timeline</span>
          </div>
          <div style={{ padding: 16 }}>
            {firmActivity.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < firmActivity.length - 1 ? `1px solid ${colors.borderLight}` : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backgroundColor: `${item.color}${isDark ? '30' : '10'}`, color: item.color }}>
                  <item.icon size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <p style={{ fontWeight: 500, fontSize: 14, color: colors.text, margin: 0 }}>{item.title}</p>
                    <span style={{ fontSize: 11, color: colors.textMuted, flexShrink: 0 }}>{item.time}</span>
                  </div>
                  <p style={{ fontSize: 13, color: colors.textSecondary, margin: '2px 0 0 0' }}>{item.desc}</p>
                  <span style={{ fontSize: 11, color: colors.textMuted }}>by {item.user}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {canViewFinancials && (
            <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <CreditCard size={18} style={{ color: '#00c853' }} />
                <span style={{ fontWeight: 600, color: colors.text, fontSize: 15 }}>Financial Summary</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${colors.borderLight}` }}>
                  <span style={{ fontSize: 13, color: colors.textSecondary }}>Monthly Revenue</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#00c853' }}>$284,500</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${colors.borderLight}` }}>
                  <span style={{ fontSize: 13, color: colors.textSecondary }}>Outstanding</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#ff9500' }}>$47,200</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                  <span style={{ fontSize: 13, color: colors.textSecondary }}>Collected (MTD)</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: accentColor }}>$198,300</span>
                </div>
              </div>
            </div>
          )}

          <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <AlertTriangle size={18} style={{ color: '#eb4d3d' }} />
              <span style={{ fontWeight: 600, color: colors.text, fontSize: 15 }}>Urgent Deadlines</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ padding: 12, backgroundColor: isDark ? 'rgba(235,77,61,0.15)' : 'rgba(235,77,61,0.08)', borderRadius: 8, borderLeft: '3px solid #eb4d3d' }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: colors.text, margin: 0 }}>Filing deadline - Miller Case</p>
                <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>Due today • Assigned: Sarah J.</p>
              </div>
              <div style={{ padding: 12, backgroundColor: isDark ? 'rgba(255,149,0,0.15)' : 'rgba(255,149,0,0.08)', borderRadius: 8, borderLeft: '3px solid #ff9500' }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: colors.text, margin: 0 }}>Response due - Johnson Estate</p>
                <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>Due in 2 days • Assigned: Michael B.</p>
              </div>
              <div style={{ padding: 12, backgroundColor: isDark ? `${accentColor}20` : `${accentColor}10`, borderRadius: 8, borderLeft: `3px solid ${accentColor}` }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: colors.text, margin: 0 }}>Court appearance - Tech Corp</p>
                <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>Mar 18 at 10:30 AM</p>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <BarChart3 size={18} style={{ color: '#9c27b0' }} />
              <span style={{ fontWeight: 600, color: colors.text, fontSize: 15 }}>Quick Stats</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ textAlign: 'center', padding: 12, backgroundColor: isDark ? `${accentColor}20` : '#f5f7ff', borderRadius: 8 }}>
                <p style={{ fontSize: 20, fontWeight: 700, color: accentColor, margin: 0 }}>23</p>
                <p style={{ fontSize: 11, color: colors.textSecondary, margin: '4px 0 0 0' }}>New this month</p>
              </div>
              <div style={{ textAlign: 'center', padding: 12, backgroundColor: isDark ? 'rgba(0,200,83,0.15)' : '#f0fff4', borderRadius: 8 }}>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#00c853', margin: 0 }}>12</p>
                <p style={{ fontSize: 11, color: colors.textSecondary, margin: '4px 0 0 0' }}>Closed MTD</p>
              </div>
              <div style={{ textAlign: 'center', padding: 12, backgroundColor: isDark ? 'rgba(255,149,0,0.15)' : '#fff8f0', borderRadius: 8 }}>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#ff9500', margin: 0 }}>89%</p>
                <p style={{ fontSize: 11, color: colors.textSecondary, margin: '4px 0 0 0' }}>On-time rate</p>
              </div>
              <div style={{ textAlign: 'center', padding: 12, backgroundColor: isDark ? 'rgba(156,39,176,0.15)' : '#fdf0ff', borderRadius: 8 }}>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#9c27b0', margin: 0 }}>4.8</p>
                <p style={{ fontSize: 11, color: colors.textSecondary, margin: '4px 0 0 0' }}>Client rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div style={{ padding: '0', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      <div style={{ backgroundColor: colors.card, borderBottom: `1px solid ${colors.border}`, padding: '0 16px', marginBottom: 24, position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <DashboardTab id="personal" label="Personal Dashboard" active={activeTab === 'personal'} onClick={() => setActiveTab('personal')} />
          {canViewFirmDashboard && (
            <DashboardTab id="firm" label="Firm Dashboard" active={activeTab === 'firm'} onClick={() => setActiveTab('firm')} />
          )}
        </div>
      </div>

      <div style={{ padding: '0 16px 24px' }}>
        {activeTab === 'personal' ? <PersonalDashboard /> : <FirmDashboard />}
      </div>
    </div>
  );
}
