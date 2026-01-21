import React, { useState, useEffect } from 'react';
import {
  caseService,
  taskService,
  documentService,
  timelineService,
  activityService,
  reminderService
} from '../services';
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

  // State for data from API
  const [loading, setLoading] = useState({
    cases: false,
    tasks: false,
    documents: false,
    hearings: false,
    activities: false,
    reminders: false
  });
  const [error, setError] = useState({
    cases: null,
    tasks: null,
    documents: null,
    hearings: null,
    activities: null,
    reminders: null
  });

  // State for data
  const [cases, setCases] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [hearings, setHearings] = useState([]);
  const [activities, setActivities] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [caseStats, setCaseStats] = useState(null);
  const [taskStats, setTaskStats] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchCases = async () => {
      setLoading(prev => ({ ...prev, cases: true }));
      try {
        const response = await caseService.getCases();
        setCases(response.data || []);
        setError(prev => ({ ...prev, cases: null }));
      } catch (err) {
        console.error('Error fetching cases:', err);
        setError(prev => ({ ...prev, cases: 'Failed to load cases' }));
      } finally {
        setLoading(prev => ({ ...prev, cases: false }));
      }
    };

    const fetchTasks = async () => {
      setLoading(prev => ({ ...prev, tasks: true }));
      try {
        const response = await taskService.getTasks();
        setTasks(response.data || []);
        setError(prev => ({ ...prev, tasks: null }));
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError(prev => ({ ...prev, tasks: 'Failed to load tasks' }));
      } finally {
        setLoading(prev => ({ ...prev, tasks: false }));
      }
    };

    const fetchDocuments = async () => {
      setLoading(prev => ({ ...prev, documents: true }));
      try {
        const response = await documentService.getDocuments();
        setDocuments(response.data || []);
        setError(prev => ({ ...prev, documents: null }));
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError(prev => ({ ...prev, documents: 'Failed to load documents' }));
      } finally {
        setLoading(prev => ({ ...prev, documents: false }));
      }
    };

    const fetchHearings = async () => {
      setLoading(prev => ({ ...prev, hearings: true }));
      try {
        // Assuming we're getting hearings for all cases the user has access to
        const response = await timelineService.getHearings('all');
        setHearings(response.data || []);
        setError(prev => ({ ...prev, hearings: null }));
      } catch (err) {
        console.error('Error fetching hearings:', err);
        setError(prev => ({ ...prev, hearings: 'Failed to load hearings' }));
      } finally {
        setLoading(prev => ({ ...prev, hearings: false }));
      }
    };

    const fetchActivities = async () => {
      setLoading(prev => ({ ...prev, activities: true }));
      try {
        const response = await activityService.getRecentActivities();
        setActivities(response.data || []);
        setError(prev => ({ ...prev, activities: null }));
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(prev => ({ ...prev, activities: 'Failed to load activities' }));
      } finally {
        setLoading(prev => ({ ...prev, activities: false }));
      }
    };

    const fetchReminders = async () => {
      setLoading(prev => ({ ...prev, reminders: true }));
      try {
        const response = await reminderService.getUpcomingReminders();
        setReminders(response.data || []);
        setError(prev => ({ ...prev, reminders: null }));
      } catch (err) {
        console.error('Error fetching reminders:', err);
        setError(prev => ({ ...prev, reminders: 'Failed to load reminders' }));
      } finally {
        setLoading(prev => ({ ...prev, reminders: false }));
      }
    };

    const fetchCaseStats = async () => {
      try {
        const response = await caseService.getCaseStats();
        setCaseStats(response.data || null);
      } catch (err) {
        console.error('Error fetching case stats:', err);
      }
    };

    const fetchTaskStats = async () => {
      try {
        const response = await taskService.getTaskStats();
        setTaskStats(response.data || null);
      } catch (err) {
        console.error('Error fetching task stats:', err);
      }
    };

    // Call all fetch functions
    fetchCases();
    fetchTasks();
    fetchDocuments();
    fetchHearings();
    fetchActivities();
    fetchReminders();
    fetchCaseStats();
    fetchTaskStats();
  }, []);

  // Prepare data for UI
  const personalStats = [
    {
      label: 'My Cases',
      value: loading.cases ? '...' : (cases.length || '0'),
      icon: Briefcase,
      color: '#4772fa',
      desc: caseStats ? `${caseStats.activeHearings || 0} active hearings` : 'Loading...',
      action: () => setActiveView('case-summary')
    },
    {
      label: 'My Tasks',
      value: loading.tasks ? '...' : (tasks.length || '0'),
      icon: ListTodo,
      color: '#ff9500',
      desc: taskStats ? `${taskStats.dueToday || 0} due today` : 'Loading...',
      action: () => setActiveView('tasks')
    },
    {
      label: 'My Hearings',
      value: loading.hearings ? '...' : (hearings.length || '0'),
      icon: Calendar,
      color: '#00c853',
      desc: hearings.length > 0 ? `Next: ${new Date(hearings[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : 'None scheduled',
      action: () => setActiveView('calendar')
    },
    {
      label: 'My Documents',
      value: loading.documents ? '...' : (documents.length || '0'),
      icon: FileText,
      color: '#9c27b0',
      desc: documents.filter(d => d.status === 'pending_review').length + ' pending review',
      action: () => setActiveView('documents')
    }
  ];

  // Use case stats for firm stats if available, otherwise use hardcoded data
  const firmStats = [
    {
      label: 'Total Cases',
      value: caseStats ? caseStats.totalCases : '...',
      icon: Briefcase,
      color: '#4772fa',
      desc: caseStats ? `${caseStats.activeThisMonth} active this month` : 'Loading...'
    },
    {
      label: 'Firm Hearings',
      value: caseStats ? caseStats.totalHearings : '...',
      icon: Calendar,
      color: '#00c853',
      desc: 'This week'
    },
    {
      label: 'Team Members',
      value: caseStats ? caseStats.teamMembers : '...',
      icon: Users,
      color: '#9c27b0',
      desc: caseStats ? `${caseStats.advocates} advocates, ${caseStats.staff} staff` : 'Loading...'
    },
    {
      label: canViewFinancials ? 'Revenue' : 'Pending Tasks',
      value: canViewFinancials ? (caseStats ? `$${caseStats.revenue / 1000}K` : '...') : (taskStats ? taskStats.pendingTasks : '...'),
      icon: canViewFinancials ? CreditCard : ListTodo,
      color: '#ff9500',
      desc: canViewFinancials ? 'This month' : 'Across firm'
    }
  ];

  // Map activities to myUpdates format
  const myUpdates = activities.slice(0, 4).map(activity => {
    let icon, color;
    switch (activity.type) {
      case 'hearing':
        icon = Calendar;
        color = '#4772fa';
        break;
      case 'document':
        icon = FileText;
        color = '#00c853';
        break;
      case 'order':
        icon = Gavel;
        color = '#9c27b0';
        break;
      case 'reminder':
        icon = Bell;
        color = '#ff9500';
        break;
      default:
        icon = FileText;
        color = '#4772fa';
    }

    return {
      icon,
      color,
      title: activity.title,
      desc: activity.description,
      time: activity.createdAt // Format this as needed
    };
  });

  // If no activities yet, use hardcoded data
  // if (myUpdates.length === 0) {
  //   myUpdates.push(
  //     { icon: Calendar, color: '#4772fa', title: 'Hearing Scheduled', desc: 'Thompson vs. Global Corp - Final Arguments', time: '2 days ago' },
  //     { icon: FileText, color: '#00c853', title: 'Document Uploaded', desc: 'Evidence_Ex_A.docx uploaded successfully', time: '5 days ago' },
  //     { icon: Gavel, color: '#9c27b0', title: 'Court Order Received', desc: 'Interim stay granted on Case #WP/2024/102', time: '1 week ago' },
  //     { icon: Bell, color: '#ff9500', title: 'Deadline Reminder', desc: 'Counter-affidavit due in 3 days', time: '1 week ago' }
  //   );
  // }

  // Map firm activities (using the same activities for now)
  const firmActivity = activities.slice(0, 5).map(activity => {
    let icon, color;
    switch (activity.type) {
      case 'case':
        icon = Briefcase;
        color = '#4772fa';
        break;
      case 'document':
        icon = FileText;
        color = '#00c853';
        break;
      case 'hearing':
        icon = Calendar;
        color = '#ff9500';
        break;
      case 'payment':
        icon = CreditCard;
        color = '#9c27b0';
        break;
      case 'team':
        icon = Users;
        color = '#4772fa';
        break;
      default:
        icon = FileText;
        color = '#4772fa';
    }

    return {
      icon,
      color,
      title: activity.title,
      desc: activity.description,
      time: activity.createdAt, // Format this as needed
      user: activity.user?.name || 'System'
    };
  });

  // If no firm activities yet, use hardcoded data
  // if (firmActivity.length === 0) {
  //   firmActivity.push(
  //     { icon: Briefcase, color: '#4772fa', title: 'New Case Filed', desc: 'Miller vs. Tech Corp assigned to Sarah J.', time: '1 hour ago', user: 'System' },
  //     { icon: FileText, color: '#00c853', title: 'Document Submitted', desc: 'Evidence bundle for Case #441 uploaded', time: '3 hours ago', user: 'David Chen' },
  //     { icon: Calendar, color: '#ff9500', title: 'Hearing Completed', desc: 'Johnson Estate hearing concluded', time: '5 hours ago', user: 'Michael Brown' },
  //     { icon: CreditCard, color: '#9c27b0', title: 'Payment Received', desc: '$12,500 from Global Industries', time: 'Yesterday', user: 'Finance' },
  //     { icon: Users, color: '#4772fa', title: 'Team Update', desc: 'New paralegal Emily W. joined the firm', time: '2 days ago', user: 'HR' }
  //   );
  // }

  // Map tasks
  const myTasks = tasks.slice(0, 4).map(task => ({
    id: task.id,
    title: task.title,
    priority: task.priority,
    dueDate: new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    case: task.case?.name || 'Unknown Case'
  }));

  // If no tasks yet, use hardcoded data
  // if (myTasks.length === 0) {
  //   myTasks.push(
  //     { id: 1, title: 'Review counter-affidavit draft', priority: 3, dueDate: 'Today', case: 'Thompson vs. Global' },
  //     { id: 2, title: 'Prepare evidence summary', priority: 2, dueDate: 'Tomorrow', case: 'Miller vs. Tech' },
  //     { id: 3, title: 'Client meeting preparation', priority: 2, dueDate: 'Mar 20', case: 'Johnson Estate' },
  //     { id: 4, title: 'File motion for extension', priority: 1, dueDate: 'Mar 22', case: 'Smith Litigation' }
  //   );
  // }

  // Map hearings
  const myHearings = hearings.slice(0, 3).map(hearing => ({
    date: new Date(hearing.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    time: new Date(hearing.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    case: hearing.case?.name || 'Unknown Case',
    court: hearing.location || 'Court Location Not Specified',
    type: hearing.type || 'Hearing'
  }));

  // If no hearings yet, use hardcoded data
  // if (myHearings.length === 0) {
  //   myHearings.push(
  //     { date: 'Mar 18', time: '10:30 AM', case: 'Thompson vs. Global Corp', court: 'High Court, Room 302', type: 'Final Arguments' },
  //     { date: 'Mar 22', time: '2:00 PM', case: 'Miller vs. Tech Solutions', court: 'District Court, Room 105', type: 'Preliminary Hearing' },
  //     { date: 'Mar 25', time: '11:00 AM', case: 'Johnson Estate Matter', court: 'Probate Court, Room 201', type: 'Status Conference' }
  //   );
  // }

  // Use case stats for case distribution if available, otherwise use hardcoded data
  const caseDistribution = caseStats?.distribution || [
    { stage: 'Filing', count: 12, color: '#4772fa', percent: 8 },
    { stage: 'Discovery', count: 28, color: '#00c853', percent: 19 },
    { stage: 'Pre-Trial', count: 35, color: '#ff9500', percent: 24 },
    { stage: 'Trial', count: 18, color: '#eb4d3d', percent: 12 },
    { stage: 'Appeal', count: 8, color: '#9c27b0', percent: 5 },
    { stage: 'Closed', count: 46, color: '#808080', percent: 32 }
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

      <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 overflow-x-hidden">
  {personalStats.map((item) => (
    <StatCard
      key={item.label}
      item={item}
      onClick={item.action}
    />
  ))}
</div>


     <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 overflow-x-hidden">
  
  {/* My Pending Tasks Card */}
  <div className="rounded-xl border" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
    
    <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: colors.border }}>
      <span className="text-[15px] font-semibold" style={{ color: colors.text }}>
        My Pending Tasks
      </span>
      <button
        onClick={() => setActiveView('tasks')}
        className="text-[13px] font-medium"
        style={{ color: accentColor }}
      >
        View All
      </button>
    </div>

    <div className="p-4">
      {myTasks.map((task, i) => (
        <div
          key={task.id}
          className="flex items-center gap-3 py-3"
          style={{ borderBottom: i < myTasks.length - 1 ? `1px solid ${colors.borderLight}` : 'none' }}
        >
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          />

          <div className="flex-1 min-w-0">
            <p
              className="text-sm truncate"
              style={{ color: colors.text }}
            >
              {task.title}
            </p>
            <p
              className="text-xs mt-[2px]"
              style={{ color: colors.textSecondary }}
            >
              {task.case}
            </p>
          </div>

          <span
            className="text-xs font-medium flex-shrink-0"
            style={{ color: task.dueDate === 'Today' ? '#eb4d3d' : colors.textSecondary }}
          >
            {task.dueDate}
          </span>
        </div>
      ))}
    </div>
  </div>

  {/* My Upcoming Hearings Card */}
  <div className="rounded-xl border" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
    
    <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: colors.border }}>
      <span className="text-[15px] font-semibold" style={{ color: colors.text }}>
        My Upcoming Hearings
      </span>
      <button
        onClick={() => setActiveView('calendar')}
        className="text-[13px] font-medium"
        style={{ color: accentColor }}
      >
        View All
      </button>
    </div>

    <div className="p-4">
      {myHearings.map((hearing, i) => (
        <div
          key={i}
          className="flex items-start gap-3 py-3"
          style={{ borderBottom: i < myHearings.length - 1 ? `1px solid ${colors.borderLight}` : 'none' }}
        >
          <div
            className="w-12 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0"
            style={{ backgroundColor: colors.accentLight }}
          >
            <span className="text-[11px] font-semibold" style={{ color: accentColor }}>
              {hearing.date.split(' ')[0]}
            </span>
            <span className="text-sm font-bold" style={{ color: accentColor }}>
              {hearing.date.split(' ')[1]}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-medium truncate"
              style={{ color: colors.text }}
            >
              {hearing.case}
            </p>
            <p
              className="text-xs mt-[2px]"
              style={{ color: colors.textSecondary }}
            >
              {hearing.court}
            </p>

            <div className="flex items-center gap-2 mt-1">
              <span
                className="text-[11px] px-2 py-[2px] rounded"
                style={{ backgroundColor: colors.bgTertiary, color: colors.textSecondary }}
              >
                {hearing.type}
              </span>
              <span
                className="text-[11px]"
                style={{ color: colors.textSecondary }}
              >
                {hearing.time}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

</div>


     <div className="dashboard-grid grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 overflow-x-hidden">

  {/* Left: My Recent Activity */}
  <div
    className="rounded-xl border"
    style={{ backgroundColor: colors.card, borderColor: colors.border }}
  >
    <div
      className="px-5 py-4 border-b flex items-center justify-between"
      style={{ borderColor: colors.border }}
    >
      <span className="text-[15px] font-semibold" style={{ color: colors.text }}>
        My Recent Activity
      </span>
      <button
        onClick={() => setActiveView('timeline')}
        className="text-[13px] font-medium"
        style={{ color: accentColor }}
      >
        View All
      </button>
    </div>

    <div className="p-4">
      {myUpdates.map((item, i) => (
        <div
          key={i}
          className="flex gap-3 py-3"
          style={{ borderBottom: i < myUpdates.length - 1 ? `1px solid ${colors.borderLight}` : 'none' }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: `${item.color}${isDark ? '30' : '10'}`,
              color: item.color
            }}
          >
            <item.icon size={16} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <p className="text-sm font-medium" style={{ color: colors.text }}>
                {item.title}
              </p>
              <span
                className="text-[11px] flex-shrink-0"
                style={{ color: colors.textMuted }}
              >
                {item.time}
              </span>
            </div>

            <p
              className="text-[13px] mt-[2px] truncate"
              style={{ color: colors.textSecondary }}
            >
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Right Column */}
  <div className="flex flex-col gap-4">

    {/* Quick Actions */}
    <div
      className="rounded-xl border p-5"
      style={{ backgroundColor: colors.card, borderColor: colors.border }}
    >
      <span className="text-[15px] font-semibold" style={{ color: colors.text }}>
        Quick Actions
      </span>

      <div className="mt-4 flex flex-col gap-3">
        <button
          onClick={() => setActiveView('tasks')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: accentColor, color: '#fff' }}
        >
          <Plus size={18} /> Add Task
        </button>

        <button
          onClick={() => setActiveView('documents')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: colors.bgTertiary, color: colors.text }}
        >
          <Upload size={18} /> Upload Document
        </button>

        <button
          onClick={() => setActiveView('messages')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: colors.bgTertiary, color: colors.text }}
        >
          <MessageSquare size={18} /> Send Message
        </button>
      </div>
    </div>

    {/* Reminders */}
    <div
      className="rounded-xl border p-5"
      style={{ backgroundColor: colors.card, borderColor: colors.border }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Bell size={18} className="text-[#ff9500]" />
        <span className="text-[15px] font-semibold" style={{ color: colors.text }}>
          Reminders
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div
          className="p-3 rounded-lg border-l-4"
          style={{
            backgroundColor: isDark ? 'rgba(255,149,0,0.15)' : 'rgba(255,149,0,0.08)',
            borderLeftColor: '#ff9500'
          }}
        >
          <p className="text-[13px] font-medium" style={{ color: colors.text }}>
            Counter-affidavit deadline
          </p>
          <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
            Due in 3 days • Thompson Case
          </p>
        </div>

        <div
          className="p-3 rounded-lg border-l-4"
          style={{
            backgroundColor: isDark ? `${accentColor}20` : `${accentColor}10`,
            borderLeftColor: accentColor
          }}
        >
          <p className="text-[13px] font-medium" style={{ color: colors.text }}>
            Client meeting
          </p>
          <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
            Tomorrow at 2:00 PM
          </p>
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

      {/* <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
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
            {firmActivity.map((adv, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < firmActivity.length - 1 ? `1px solid ${colors.borderLight}` : 'none' }}>
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
      </div> */}

     <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mb-6">

  {/* LEFT: Firm Activity Timeline */}
  <div
    className="rounded-xl border"
    style={{ backgroundColor: colors.card, borderColor: colors.border }}
  >
    <div
      className="px-5 py-4 border-b"
      style={{ borderColor: colors.border }}
    >
      <span className="text-[15px] font-semibold" style={{ color: colors.text }}>
        Firm Activity Timeline
      </span>
    </div>

    <div className="p-4">
      {firmActivity.map((item, i) => (
        <div
          key={i}
          className={`flex gap-3 py-3 ${
            i < firmActivity.length - 1 ? "border-b" : ""
          }`}
          style={{ borderColor: colors.borderLight }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{
              backgroundColor: `${item.color}${isDark ? "30" : "10"}`,
              color: item.color,
            }}
          >
            <item.icon size={16} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <p
                className="font-medium text-sm truncate"
                style={{ color: colors.text }}
              >
                {item.title}
              </p>
              <span
                className="text-[11px] shrink-0"
                style={{ color: colors.textMuted }}
              >
                {item.time}
              </span>
            </div>

            <p
              className="text-[13px] mt-[2px]"
              style={{ color: colors.textSecondary }}
            >
              {item.desc}
            </p>

            <span
              className="text-[11px]"
              style={{ color: colors.textMuted }}
            >
              by {item.user}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* RIGHT COLUMN */}
  <div className="flex flex-col gap-4">

    {/* Financial Summary */}
    {canViewFinancials && (
      <div
        className="rounded-xl border p-5"
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
      >
        <div className="flex items-center gap-2 mb-4">
          <CreditCard size={18} className="text-green-500" />
          <span
            className="font-semibold text-[15px]"
            style={{ color: colors.text }}
          >
            Financial Summary
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <div
            className="flex justify-between py-2 border-b text-sm"
            style={{ borderColor: colors.borderLight }}
          >
            <span style={{ color: colors.textSecondary }}>
              Monthly Revenue
            </span>
            <span className="font-semibold text-green-500">
              $284,500
            </span>
          </div>

          <div
            className="flex justify-between py-2 border-b text-sm"
            style={{ borderColor: colors.borderLight }}
          >
            <span style={{ color: colors.textSecondary }}>
              Outstanding
            </span>
            <span className="font-semibold text-orange-500">
              $47,200
            </span>
          </div>

          <div className="flex justify-between py-2 text-sm">
            <span style={{ color: colors.textSecondary }}>
              Collected (MTD)
            </span>
            <span className="font-semibold" style={{ color: accentColor }}>
              $198,300
            </span>
          </div>
        </div>
      </div>
    )}

    {/* Urgent Deadlines */}
    <div
      className="rounded-xl border p-5"
      style={{ backgroundColor: colors.card, borderColor: colors.border }}
    >
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={18} className="text-red-500" />
        <span
          className="font-semibold text-[15px]"
          style={{ color: colors.text }}
        >
          Urgent Deadlines
        </span>
      </div>

      <div className="flex flex-col gap-3">

        <div
          className="p-3 rounded-lg border-l-[3px]"
          style={{
            backgroundColor: isDark ? "rgba(235,77,61,0.15)" : "rgba(235,77,61,0.08)",
            borderLeftColor: "#eb4d3d",
          }}
        >
          <p className="text-[13px] font-medium" style={{ color: colors.text }}>
            Filing deadline - Miller Case
          </p>
          <p className="text-[12px] mt-1" style={{ color: colors.textSecondary }}>
            Due today • Assigned: Sarah J.
          </p>
        </div>

        <div
          className="p-3 rounded-lg border-l-[3px]"
          style={{
            backgroundColor: isDark ? "rgba(255,149,0,0.15)" : "rgba(255,149,0,0.08)",
            borderLeftColor: "#ff9500",
          }}
        >
          <p className="text-[13px] font-medium" style={{ color: colors.text }}>
            Response due - Johnson Estate
          </p>
          <p className="text-[12px] mt-1" style={{ color: colors.textSecondary }}>
            Due in 2 days • Assigned: Michael B.
          </p>
        </div>

        <div
          className="p-3 rounded-lg border-l-[3px]"
          style={{
            backgroundColor: isDark ? `${accentColor}20` : `${accentColor}10`,
            borderLeftColor: accentColor,
          }}
        >
          <p className="text-[13px] font-medium" style={{ color: colors.text }}>
            Court appearance - Tech Corp
          </p>
          <p className="text-[12px] mt-1" style={{ color: colors.textSecondary }}>
            Mar 18 at 10:30 AM
          </p>
        </div>
      </div>
    </div>

    {/* Quick Stats */}
    <div
      className="rounded-xl border p-5"
      style={{ backgroundColor: colors.card, borderColor: colors.border }}
    >
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={18} className="text-purple-500" />
        <span
          className="font-semibold text-[15px]"
          style={{ color: colors.text }}
        >
          Quick Stats
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div
          className="text-center p-3 rounded-lg"
          style={{ backgroundColor: isDark ? `${accentColor}20` : "#f5f7ff" }}
        >
          <p className="text-xl font-bold" style={{ color: accentColor }}>23</p>
          <p className="text-[11px]" style={{ color: colors.textSecondary }}>
            New this month
          </p>
        </div>

        <div
          className="text-center p-3 rounded-lg"
          style={{ backgroundColor: isDark ? "rgba(0,200,83,0.15)" : "#f0fff4" }}
        >
          <p className="text-xl font-bold text-green-500">12</p>
          <p className="text-[11px]" style={{ color: colors.textSecondary }}>
            Closed MTD
          </p>
        </div>

        <div
          className="text-center p-3 rounded-lg"
          style={{ backgroundColor: isDark ? "rgba(255,149,0,0.15)" : "#fff8f0" }}
        >
          <p className="text-xl font-bold text-orange-500">89%</p>
          <p className="text-[11px]" style={{ color: colors.textSecondary }}>
            On-time rate
          </p>
        </div>

        <div
          className="text-center p-3 rounded-lg"
          style={{ backgroundColor: isDark ? "rgba(156,39,176,0.15)" : "#fdf0ff" }}
        >
          <p className="text-xl font-bold text-purple-600">4.8</p>
          <p className="text-[11px]" style={{ color: colors.textSecondary }}>
            Client rating
          </p>
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

