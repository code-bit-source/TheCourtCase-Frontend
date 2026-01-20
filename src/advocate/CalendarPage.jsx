"use client";

import React, { useState } from 'react';
import {
  Calendar, Clock, ChevronLeft, ChevronRight, Plus, X, MapPin,
  Bell, Tag, Users, Edit3, Trash2,
  Grid3X3, List, CalendarDays, CheckCircle2, Search,
  ExternalLink, AlertCircle
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

const Circle = ({ size, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

export default function CalendarPage({ addNotification, isDark = false, accentColor = '#4772fa' }) {
  const colors = getThemeColors(isDark, accentColor);

  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 2, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 2, 18));
  const [viewMode, setViewMode] = useState('month');
  const [showEventModal, setShowEventModal] = useState(false);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    type: 'meeting',
    location: '',
    description: '',
    matter: '',
    allDay: false,
    reminder: '15 minutes before',
    repeat: 'none'
  });

  const [events, setEvents] = useState([
    { id: 1, title: 'Final Arguments - Thompson vs. Global', date: new Date(2024, 2, 18), time: '10:30 AM', endTime: '12:30 PM', color: '#eb4d3d', type: 'hearing', location: 'High Court, Room 302', matter: 'Thompson vs. Global Corp', matterNumber: 'MAT-2024-001', attendees: ['Sarah Jenkins', 'Alex Thompson'], description: 'Final oral arguments presentation' },
    { id: 2, title: 'Document Deadline - Evidence Submission', date: new Date(2024, 2, 16), time: '5:00 PM', color: '#ff9500', type: 'deadline', matter: 'Thompson vs. Global Corp', matterNumber: 'MAT-2024-001', description: 'Submit all remaining evidence documents' },
    { id: 3, title: 'Client Meeting - James Miller', date: new Date(2024, 2, 22), time: '2:00 PM', endTime: '3:00 PM', color: accentColor, type: 'meeting', location: 'Office Conference Room A', matter: 'Miller Estate Planning', matterNumber: 'MAT-2024-002', attendees: ['Michael Brown', 'James Miller'], description: 'Discuss estate planning options and trust documents' },
    { id: 4, title: 'Filing Due - Motion for Extension', date: new Date(2024, 2, 25), time: '11:59 PM', color: '#ff9500', type: 'deadline', matter: 'Davis Property Acquisition', matterNumber: 'MAT-2024-003', description: 'File motion for deadline extension' },
    { id: 5, title: 'Follow-up Hearing', date: new Date(2024, 3, 5), time: 'TBD', color: '#9c27b0', type: 'tentative', location: 'District Court', matter: 'Thompson vs. Global Corp', matterNumber: 'MAT-2024-001', description: 'Tentative follow-up hearing date' },
    { id: 6, title: 'Mediation Session', date: new Date(2024, 3, 12), time: '9:00 AM', endTime: '12:00 PM', color: '#00c853', type: 'meeting', location: 'Mediation Center, Room 105', matter: 'Johnson Family Trust', matterNumber: 'MAT-2024-005', attendees: ['Emily Watson', 'Patricia Johnson', 'Mediator'], description: 'Court-ordered mediation session' },
    { id: 7, title: 'Team Meeting', date: new Date(2024, 2, 20), time: '3:00 PM', endTime: '4:00 PM', color: accentColor, type: 'meeting', location: 'Main Conference Room', attendees: ['Sarah Jenkins', 'Michael Brown', 'Emily Watson', 'James Lee'], description: 'Weekly team sync and case updates' },
    { id: 8, title: 'Deposition - Tech Solutions', date: new Date(2024, 2, 28), time: '10:00 AM', endTime: '4:00 PM', color: '#eb4d3d', type: 'hearing', location: 'Law Offices', matter: 'Tech Solutions IP Dispute', matterNumber: 'MAT-2024-006', attendees: ['James Lee', 'Tech Solutions Rep'], description: 'Plaintiff deposition' },
    { id: 9, title: 'Contract Review Deadline', date: new Date(2024, 2, 19), time: '6:00 PM', color: '#ff9500', type: 'deadline', matter: 'Davis Property Acquisition', matterNumber: 'MAT-2024-003', description: 'Complete contract review and send comments' },
    { id: 10, title: 'Court Filing', date: new Date(2024, 2, 21), time: '9:00 AM', color: '#eb4d3d', type: 'hearing', location: 'County Courthouse', matter: 'Anderson Divorce Settlement', matterNumber: 'MAT-2024-007', description: 'File divorce settlement documents' },
    { id: 11, title: 'Client Call - Emily Davis', date: new Date(2024, 2, 18), time: '4:00 PM', endTime: '4:30 PM', color: accentColor, type: 'meeting', matter: 'Davis Property Acquisition', matterNumber: 'MAT-2024-003', description: 'Discuss acquisition timeline', attendees: ['Sarah Jenkins', 'Emily Davis'] },
    { id: 12, title: 'Reminder: Prepare Court Documents', date: new Date(2024, 2, 17), time: '9:00 AM', color: '#9c27b0', type: 'reminder', matter: 'Thompson vs. Global Corp', description: 'Prepare all documents for March 18 hearing' }
  ]);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const shortDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const eventTypes = [
    { id: 'all', label: 'All Events', color: colors.textSecondary },
    { id: 'hearing', label: 'Hearings', color: '#eb4d3d' },
    { id: 'deadline', label: 'Deadlines', color: '#ff9500' },
    { id: 'meeting', label: 'Meetings', color: accentColor },
    { id: 'tentative', label: 'Tentative', color: '#9c27b0' },
    { id: 'reminder', label: 'Reminders', color: '#00c853' }
  ];

  const reminderOptions = [
    'None',
    '5 minutes before',
    '15 minutes before',
    '30 minutes before',
    '1 hour before',
    '1 day before',
    '1 week before'
  ];

  const repeatOptions = [
    { value: 'none', label: 'Does not repeat' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Every 2 weeks' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
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

  const getEventsForDate = (date) => {
    return events.filter((e) => {
      const matchesDate = e.date.toDateString() === date.toDateString();
      const matchesFilter = filterType === 'all' || e.type === filterType;
      const matchesSearch = !searchQuery || 
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.matter?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.location?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDate && matchesFilter && matchesSearch;
    });
  };

  const getFilteredEvents = () => {
    return events.filter((e) => {
      const matchesFilter = filterType === 'all' || e.type === filterType;
      const matchesSearch = !searchQuery || 
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.matter?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.location?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const monthDates = getMonthDates(currentMonth);

  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const openEventDetails = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter((e) => e.id !== eventId));
    setShowEventModal(false);
    setSelectedEvent(null);
    addNotification('success', 'Event deleted');
  };

  const createEvent = () => {
    if (!newEvent.title.trim()) {
      addNotification('error', 'Please enter an event title');
      return;
    }

    const eventDate = new Date(newEvent.date);
    const newEventData = {
      id: Date.now(),
      title: newEvent.title,
      date: eventDate,
      time: newEvent.allDay ? 'All Day' : formatTime(newEvent.startTime),
      endTime: newEvent.allDay ? undefined : formatTime(newEvent.endTime),
      color: eventTypes.find((t) => t.id === newEvent.type)?.color || accentColor,
      type: newEvent.type,
      location: newEvent.location || undefined,
      description: newEvent.description || undefined,
      matter: newEvent.matter || undefined,
      reminder: newEvent.reminder !== 'None' ? newEvent.reminder : undefined,
      repeat: newEvent.repeat !== 'none' ? newEvent.repeat : undefined,
      allDay: newEvent.allDay
    };

    setEvents([...events, newEventData]);
    setShowNewEventModal(false);
    setNewEvent({
      title: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00',
      type: 'meeting',
      location: '',
      description: '',
      matter: '',
      allDay: false,
      reminder: '15 minutes before',
      repeat: 'none'
    });
    addNotification('success', 'Event created');
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${minutes} ${ampm}`;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'hearing': return <Calendar size={16} />;
      case 'deadline': return <AlertCircle size={16} />;
      case 'meeting': return <Users size={16} />;
      case 'tentative': return <Clock size={16} />;
      case 'reminder': return <Bell size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  const upcomingEvents = getFilteredEvents().filter((e) => e.date >= new Date()).slice(0, 8);

  return (
    <div className="calendar-container" style={{ display: 'flex', height: '100%', backgroundColor: colors.bg }}>
      <div className="calendar-sidebar" style={{ width: 280, borderRight: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column', backgroundColor: colors.bgSecondary }}>
        <div style={{ padding: 16 }}>
          <button
            onClick={() => setShowNewEventModal(true)}
            style={{ width: '100%', padding: '12px 16px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 44 }}
          >
            <Plus size={18} /> New Event
          </button>
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <button onClick={prevMonth} style={{ padding: 4, cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 4 }}>
              <ChevronLeft size={16} style={{ color: colors.textSecondary }} />
            </button>
            <span style={{ fontSize: 14, fontWeight: 500, color: colors.text }}>{shortMonthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
            <button onClick={nextMonth} style={{ padding: 4, cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 4 }}>
              <ChevronRight size={16} style={{ color: colors.textSecondary }} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
            {shortDays.map((day, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 10, fontWeight: 500, color: colors.textMuted, padding: 4 }}>{day}</div>
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
                    backgroundColor: isSelected(item.date) ? accentColor : isToday(item.date) ? colors.accentLight : 'transparent',
                    color: isSelected(item.date) ? '#fff' : isToday(item.date) ? accentColor : item.isCurrentMonth ? colors.text : colors.textMuted,
                    fontWeight: isToday(item.date) ? 500 : 400
                  }}
                >
                  {item.date.getDate()}
                  {hasEvent && !isSelected(item.date) && (
                    <span style={{ position: 'absolute', bottom: 2, width: 4, height: 4, borderRadius: '50%', backgroundColor: accentColor }}></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ padding: '16px', borderTop: `1px solid ${colors.border}` }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12, margin: '0 0 12px 0' }}>Event Types</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {eventTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 6, cursor: 'pointer', border: 'none',
                  backgroundColor: filterType === type.id ? colors.accentLight : 'transparent',
                  color: filterType === type.id ? accentColor : colors.textSecondary
                }}
              >
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: type.color }}></span>
                <span style={{ fontSize: 13, flex: 1, textAlign: 'left' }}>{type.label}</span>
                {filterType === type.id && <CheckCircle2 size={14} />}
              </button>
            ))}
          </div>
        </div>

        <div className="custom-scrollbar" style={{ flex: 1, padding: 16, borderTop: `1px solid ${colors.border}`, overflowY: 'auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12, margin: '0 0 12px 0' }}>Upcoming Events</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => { setSelectedDate(event.date); openEventDetails(event); }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: 10, borderRadius: 8, cursor: 'pointer', backgroundColor: colors.card, border: `1px solid ${colors.borderLight}` }}
              >
                <div style={{ width: 4, borderRadius: 2, backgroundColor: event.color, alignSelf: 'stretch', minHeight: 32 }}></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: colors.text, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.title}</p>
                  <p style={{ fontSize: 11, color: colors.textSecondary, margin: '4px 0 0 0' }}>
                    {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {event.time}
                  </p>
                </div>
              </div>
            ))}
            {upcomingEvents.length === 0 && (
              <div style={{ textAlign: 'center', padding: 20 }}>
                <Calendar size={24} style={{ color: colors.textMuted, marginBottom: 8 }} />
                <p style={{ fontSize: 12, color: colors.textMuted, margin: 0 }}>No upcoming events</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="calendar-main-header" style={{ minHeight: 56, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${colors.border}`, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button onClick={prevMonth} style={{ padding: 8, cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 4, minWidth: 36, minHeight: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronLeft size={18} style={{ color: colors.textSecondary }} />
              </button>
              <button onClick={nextMonth} style={{ padding: 8, cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 4, minWidth: 36, minHeight: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight size={18} style={{ color: colors.textSecondary }} />
              </button>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.text, margin: 0 }}>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
            <button onClick={goToToday} style={{ padding: '6px 14px', backgroundColor: colors.bgTertiary, color: colors.textSecondary, borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none' }}>
              Today
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary }} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events..."
                style={{ padding: '8px 12px 8px 34px', border: `1px solid ${colors.inputBorder}`, borderRadius: 6, fontSize: 13, outline: 'none', backgroundColor: colors.input, color: colors.text, width: 180 }}
              />
            </div>

            <div style={{ display: 'flex', backgroundColor: colors.bgTertiary, borderRadius: 6, padding: 2 }}>
              {[
                { id: 'month', icon: Grid3X3, label: 'Month' },
                { id: 'week', icon: CalendarDays, label: 'Week' },
                { id: 'agenda', icon: List, label: 'Agenda' }
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setViewMode(view.id)}
                  style={{
                    padding: '6px 12px', borderRadius: 4, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: 'none',
                    backgroundColor: viewMode === view.id ? colors.card : 'transparent',
                    color: viewMode === view.id ? colors.text : colors.textSecondary,
                    display: 'flex', alignItems: 'center', gap: 6,
                    boxShadow: viewMode === view.id ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  <view.icon size={14} />
                  {view.label}
                </button>
              ))}
            </div>

            <div className="calendar-legend" style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: colors.textSecondary }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#eb4d3d' }}></span>Hearing</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ff9500' }}></span>Deadline</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: accentColor }}></span>Meeting</span>
            </div>
          </div>
        </div>

        {viewMode === 'month' && (
          <div className="calendar-main-grid" style={{ flex: 1, overflow: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.bgSecondary }}>
              {daysOfWeek.map((day, i) => (
                <div key={i} style={{ padding: 10, textAlign: 'center', fontSize: 11, fontWeight: 500, color: colors.textSecondary, borderRight: i < 6 ? `1px solid ${colors.border}` : 'none' }}>{day}</div>
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
                      borderRight: (i + 1) % 7 !== 0 ? `1px solid ${colors.border}` : 'none',
                      borderBottom: `1px solid ${colors.border}`,
                      padding: 4,
                      minHeight: 100,
                      cursor: 'pointer',
                      backgroundColor: isSelected(item.date) ? colors.accentLight : item.isCurrentMonth ? colors.card : colors.bgSecondary
                    }}
                  >
                    <div style={{ textAlign: 'right', marginBottom: 4 }}>
                      {isToday(item.date) ? (
                        <span style={{ display: 'inline-flex', width: 26, height: 26, borderRadius: '50%', backgroundColor: accentColor, color: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>{item.date.getDate()}</span>
                      ) : (
                        <span className="calendar-day-number" style={{ fontSize: 14, color: item.isCurrentMonth ? colors.text : colors.textMuted, padding: '4px' }}>{item.date.getDate()}</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          onClick={(e) => { e.stopPropagation(); openEventDetails(event); }}
                          style={{ fontSize: 11, padding: '3px 6px', borderRadius: 4, color: '#fff', backgroundColor: event.color, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}
                        >
                          {event.time !== 'TBD' && event.time !== 'All Day' && <span style={{ opacity: 0.8, marginRight: 4 }}>{event.time.split(' ')[0]}</span>}
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div style={{ fontSize: 10, color: colors.textSecondary, paddingLeft: 4 }}>+{dayEvents.length - 3} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {viewMode === 'agenda' && (
          <div className="custom-scrollbar" style={{ flex: 1, overflow: 'auto', padding: 24 }}>
            {getFilteredEvents().length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {getFilteredEvents().map((event) => (
                  <div
                    key={event.id}
                    onClick={() => openEventDetails(event)}
                    style={{ display: 'flex', gap: 16, padding: 16, backgroundColor: colors.card, borderRadius: 10, border: `1px solid ${colors.border}`, cursor: 'pointer' }}
                  >
                    <div style={{ width: 60, textAlign: 'center', flexShrink: 0 }}>
                      <p style={{ fontSize: 11, color: colors.textSecondary, margin: 0, textTransform: 'uppercase' }}>{event.date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                      <p style={{ fontSize: 24, fontWeight: 700, color: colors.text, margin: '4px 0' }}>{event.date.getDate()}</p>
                      <p style={{ fontSize: 11, color: colors.textSecondary, margin: 0 }}>{shortMonthNames[event.date.getMonth()]}</p>
                    </div>
                    <div style={{ width: 4, borderRadius: 2, backgroundColor: event.color }}></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: 0 }}>{event.title}</h3>
                        <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 10, fontWeight: 500, backgroundColor: `${event.color}20`, color: event.color, textTransform: 'capitalize' }}>{event.type}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: colors.textSecondary }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={14} /> {event.time}{event.endTime && ` - ${event.endTime}`}</span>
                        {event.location && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={14} /> {event.location}</span>}
                      </div>
                      {event.matter && (
                        <p style={{ fontSize: 12, color: colors.textMuted, margin: '8px 0 0 0' }}>Matter: {event.matter}</p>
                      )}
                    </div>
                    <ChevronRight size={20} style={{ color: colors.textMuted, flexShrink: 0 }} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 60 }}>
                <Calendar size={48} style={{ color: colors.textMuted, marginBottom: 16, opacity: 0.3 }} />
                <p style={{ fontSize: 16, color: colors.textSecondary, margin: '0 0 8px 0' }}>No events found</p>
                <p style={{ fontSize: 14, color: colors.textMuted, margin: 0 }}>Try adjusting your filters or create a new event</p>
              </div>
            )}
          </div>
        )}

        {viewMode === 'week' && (
          <div className="custom-scrollbar" style={{ flex: 1, overflow: 'auto', padding: 24 }}>
            <div style={{ textAlign: 'center', padding: 60, backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}` }}>
              <CalendarDays size={48} style={{ color: colors.textMuted, marginBottom: 16, opacity: 0.3 }} />
              <p style={{ fontSize: 16, color: colors.textSecondary, margin: '0 0 8px 0' }}>Week view coming soon</p>
              <p style={{ fontSize: 14, color: colors.textMuted, margin: 0 }}>Use Month or Agenda view for now</p>
            </div>
          </div>
        )}

        <div className="calendar-mobile-view" style={{ display: 'none', flex: 1, overflow: 'auto', padding: 16 }}>
          <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <button onClick={prevMonth} style={{ padding: 8, cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 4 }}>
                <ChevronLeft size={18} style={{ color: colors.textSecondary }} />
              </button>
              <span style={{ fontSize: 16, fontWeight: 600, color: colors.text }}>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
              <button onClick={nextMonth} style={{ padding: 8, cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 4 }}>
                <ChevronRight size={18} style={{ color: colors.textSecondary }} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
              {shortDays.map((day, i) => (
                <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 500, color: colors.textSecondary, padding: 4 }}>{day}</div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {monthDates.slice(0, 42).map((item, i) => {
                const hasEvent = getEventsForDate(item.date).length > 0;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(item.date)}
                    style={{
                      aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, borderRadius: '50%', cursor: 'pointer', position: 'relative', border: 'none', minHeight: 36,
                      backgroundColor: isSelected(item.date) ? accentColor : isToday(item.date) ? colors.accentLight : 'transparent',
                      color: isSelected(item.date) ? '#fff' : isToday(item.date) ? accentColor : item.isCurrentMonth ? colors.text : colors.textMuted,
                      fontWeight: isToday(item.date) || isSelected(item.date) ? 600 : 400
                    }}
                  >
                    {item.date.getDate()}
                    {hasEvent && !isSelected(item.date) && (
                      <span style={{ position: 'absolute', bottom: 4, width: 5, height: 5, borderRadius: '50%', backgroundColor: accentColor }}></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <p style={{ fontSize: 16, fontWeight: 600, color: colors.text, margin: 0 }}>
                  {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}
                </p>
              </div>
              <button
                onClick={() => setShowNewEventModal(true)}
                style={{ padding: '8px 14px', backgroundColor: accentColor, color: '#fff', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Plus size={16} /> Add
              </button>
            </div>

            {selectedDateEvents.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {selectedDateEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => openEventDetails(event)}
                    style={{ padding: 14, borderRadius: 10, backgroundColor: colors.card, border: `1px solid ${colors.border}`, cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ width: 4, height: '100%', minHeight: 44, borderRadius: 2, backgroundColor: event.color, flexShrink: 0 }}></div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600, fontSize: 15, color: colors.text, margin: 0 }}>{event.title}</p>
                        <p style={{ fontSize: 13, color: colors.textSecondary, margin: '6px 0 0 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Clock size={13} /> {event.time}{event.endTime && ` - ${event.endTime}`}
                        </p>
                        {event.location && (
                          <p style={{ fontSize: 12, color: colors.textMuted, margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <MapPin size={12} /> {event.location}
                          </p>
                        )}
                        <span style={{ display: 'inline-block', marginTop: 10, fontSize: 11, padding: '4px 10px', borderRadius: 20, color: '#fff', backgroundColor: event.color, textTransform: 'capitalize' }}>{event.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 40, backgroundColor: colors.card, borderRadius: 10, border: `1px solid ${colors.border}` }}>
                <Calendar size={36} style={{ color: colors.textMuted, marginBottom: 12 }} />
                <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>No events scheduled</p>
              </div>
            )}
          </div>

          <div style={{ marginTop: 24 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12, margin: '0 0 12px 0' }}>All Upcoming</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => { setSelectedDate(event.date); openEventDetails(event); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, backgroundColor: colors.card, borderRadius: 8, border: `1px solid ${colors.border}`, cursor: 'pointer' }}
                >
                  <div style={{ width: 4, borderRadius: 2, backgroundColor: event.color, alignSelf: 'stretch', minHeight: 36 }}></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.title}</p>
                    <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>
                      {event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {event.time}
                    </p>
                  </div>
                  <ChevronRight size={16} style={{ color: colors.textMuted, flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedDate && viewMode === 'month' && (
        <div className="calendar-details-panel" style={{ width: 320, borderLeft: `1px solid ${colors.border}`, backgroundColor: colors.card, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 16, borderBottom: `1px solid ${colors.border}` }}>
            <p style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>{selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}</p>
            <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>{selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
            {selectedDateEvents.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {selectedDateEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => openEventDetails(event)}
                    style={{ padding: 14, borderRadius: 10, border: `1px solid ${colors.border}`, cursor: 'pointer', backgroundColor: colors.bgSecondary }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ width: 4, height: '100%', minHeight: 44, borderRadius: 2, backgroundColor: event.color }}></div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 500, fontSize: 14, color: colors.text, margin: 0 }}>{event.title}</p>
                        <p style={{ fontSize: 13, color: colors.textSecondary, margin: '6px 0 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock size={12} /> {event.time}{event.endTime && ` - ${event.endTime}`}
                        </p>
                        {event.location && (
                          <p style={{ fontSize: 12, color: colors.textMuted, margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <MapPin size={12} /> {event.location}
                          </p>
                        )}
                        <span style={{ display: 'inline-block', marginTop: 8, fontSize: 10, padding: '3px 8px', borderRadius: 20, color: '#fff', backgroundColor: event.color, textTransform: 'capitalize' }}>{event.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 32 }}>
                <Calendar size={32} style={{ color: colors.textMuted, marginBottom: 8 }} />
                <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>No events scheduled</p>
                <button
                  onClick={() => setShowNewEventModal(true)}
                  style={{ marginTop: 12, padding: '8px 16px', backgroundColor: accentColor, color: '#fff', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none' }}
                >
                  Add Event
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showEventModal && selectedEvent && (
        <div onClick={() => setShowEventModal(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 150, padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: colors.card, borderRadius: 16, width: 480, maxWidth: '100%', maxHeight: '90vh', overflow: 'hidden', boxShadow: isDark ? '0 25px 50px rgba(0,0,0,0.5)' : '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ padding: 20, borderBottom: `1px solid ${colors.border}`, background: `linear-gradient(135deg, ${selectedEvent.color}15 0%, transparent 100%)` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: `${selectedEvent.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: selectedEvent.color }}>
                    {getTypeIcon(selectedEvent.type)}
                  </div>
                  <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500, backgroundColor: `${selectedEvent.color}20`, color: selectedEvent.color, textTransform: 'capitalize' }}>{selectedEvent.type}</span>
                </div>
                <button onClick={() => setShowEventModal(false)} style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 8 }}>
                  <X size={20} style={{ color: colors.textSecondary }} />
                </button>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.text, margin: 0 }}>{selectedEvent.title}</h2>
            </div>

            <div className="custom-scrollbar" style={{ padding: 20, maxHeight: 'calc(90vh - 200px)', overflowY: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <Calendar size={18} style={{ color: colors.textSecondary, marginTop: 2 }} />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>
                      {selectedEvent.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p style={{ fontSize: 13, color: colors.textSecondary, margin: '4px 0 0 0' }}>
                      {selectedEvent.time}{selectedEvent.endTime && ` - ${selectedEvent.endTime}`}
                    </p>
                  </div>
                </div>

                {selectedEvent.location && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <MapPin size={18} style={{ color: colors.textSecondary, marginTop: 2 }} />
                    <div>
                      <p style={{ fontSize: 14, color: colors.text, margin: 0 }}>{selectedEvent.location}</p>
                      <button style={{ fontSize: 13, color: accentColor, margin: '4px 0 0 0', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                        Get directions <ExternalLink size={12} />
                      </button>
                    </div>
                  </div>
                )}

                {selectedEvent.matter && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <Tag size={18} style={{ color: colors.textSecondary, marginTop: 2 }} />
                    <div>
                      <p style={{ fontSize: 14, color: colors.text, margin: 0 }}>{selectedEvent.matter}</p>
                      {selectedEvent.matterNumber && (
                        <p style={{ fontSize: 12, color: colors.textMuted, margin: '4px 0 0 0' }}>{selectedEvent.matterNumber}</p>
                      )}
                    </div>
                  </div>
                )}

                {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <Users size={18} style={{ color: colors.textSecondary, marginTop: 2 }} />
                    <div>
                      <p style={{ fontSize: 13, color: colors.textSecondary, margin: '0 0 8px 0' }}>{selectedEvent.attendees.length} attendees</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {selectedEvent.attendees.map((attendee, i) => (
                          <span key={i} style={{ padding: '4px 10px', backgroundColor: colors.bgTertiary, borderRadius: 20, fontSize: 12, color: colors.text }}>{attendee}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedEvent.description && (
                  <div style={{ padding: 16, backgroundColor: colors.bgSecondary, borderRadius: 10, marginTop: 8 }}>
                    <p style={{ fontSize: 14, color: colors.text, margin: 0, lineHeight: 1.6 }}>{selectedEvent.description}</p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ padding: 16, borderTop: `1px solid ${colors.border}`, display: 'flex', gap: 12 }}>
              <button
                onClick={() => deleteEvent(selectedEvent.id)}
                style={{ padding: '10px 16px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', color: colors.error, display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Trash2 size={16} /> Delete
              </button>
              <button
                style={{ flex: 1, padding: '10px 16px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', color: colors.text, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                <Edit3 size={16} /> Edit
              </button>
              <button
                onClick={() => setShowEventModal(false)}
                style={{ padding: '10px 20px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewEventModal && (
        <div onClick={() => setShowNewEventModal(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 150, padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: colors.card, borderRadius: 16, width: 520, maxWidth: '100%', maxHeight: '90vh', overflow: 'hidden', boxShadow: isDark ? '0 25px 50px rgba(0,0,0,0.5)' : '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ padding: 20, borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.text, margin: 0 }}>New Event</h2>
              <button onClick={() => setShowNewEventModal(false)} style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 8 }}>
                <X size={20} style={{ color: colors.textSecondary }} />
              </button>
            </div>

            <div className="custom-scrollbar" style={{ padding: 20, maxHeight: 'calc(90vh - 160px)', overflowY: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Event Title *</label>
                  <input
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Enter event title..."
                    style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: colors.input, color: colors.text, boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Event Type</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {eventTypes.slice(1).map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setNewEvent({ ...newEvent, type: type.id })}
                        style={{
                          padding: '8px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
                          backgroundColor: newEvent.type === type.id ? `${type.color}20` : colors.bgTertiary,
                          border: newEvent.type === type.id ? `2px solid ${type.color}` : `2px solid transparent`,
                          color: newEvent.type === type.id ? type.color : colors.textSecondary,
                          display: 'flex', alignItems: 'center', gap: 6
                        }}
                      >
                        <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: type.color }}></span>
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Date *</label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: colors.input, color: colors.text, boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>All Day</label>
                    <button
                      onClick={() => setNewEvent({ ...newEvent, allDay: !newEvent.allDay })}
                      style={{
                        width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, fontSize: 14, cursor: 'pointer',
                        backgroundColor: newEvent.allDay ? colors.accentLight : colors.input,
                        color: newEvent.allDay ? accentColor : colors.text,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                      }}
                    >
                      {newEvent.allDay ? <CheckCircle2 size={16} /> : <Circle size={16} style={{ color: colors.textMuted }} />}
                      All Day Event
                    </button>
                  </div>
                </div>

                {!newEvent.allDay && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Start Time</label>
                      <input
                        type="time"
                        value={newEvent.startTime}
                        onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                        style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: colors.input, color: colors.text, boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>End Time</label>
                      <input
                        type="time"
                        value={newEvent.endTime}
                        onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                        style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: colors.input, color: colors.text, boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Location</label>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary }} />
                    <input
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      placeholder="Add location..."
                      style={{ width: '100%', padding: '12px 14px 12px 40px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: colors.input, color: colors.text, boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Related Matter</label>
                  <select
                    value={newEvent.matter}
                    onChange={(e) => setNewEvent({ ...newEvent, matter: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: colors.input, color: colors.text }}
                  >
                    <option value="">Select matter (optional)</option>
                    <option value="Thompson vs. Global Corp">Thompson vs. Global Corp</option>
                    <option value="Miller Estate Planning">Miller Estate Planning</option>
                    <option value="Davis Property Acquisition">Davis Property Acquisition</option>
                    <option value="Johnson Family Trust">Johnson Family Trust</option>
                    <option value="Tech Solutions IP Dispute">Tech Solutions IP Dispute</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Reminder</label>
                    <select
                      value={newEvent.reminder}
                      onChange={(e) => setNewEvent({ ...newEvent, reminder: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: colors.input, color: colors.text }}
                    >
                      {reminderOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Repeat</label>
                    <select
                      value={newEvent.repeat}
                      onChange={(e) => setNewEvent({ ...newEvent, repeat: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: colors.input, color: colors.text }}
                    >
                      {repeatOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Description</label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Add description..."
                    style={{ width: '100%', minHeight: 100, padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, fontSize: 14, resize: 'vertical', outline: 'none', backgroundColor: colors.input, color: colors.text, boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ padding: 16, borderTop: `1px solid ${colors.border}`, display: 'flex', gap: 12 }}>
              <button
                onClick={() => setShowNewEventModal(false)}
                style={{ flex: 1, padding: '12px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', color: colors.text }}
              >
                Cancel
              </button>
              <button
                onClick={createEvent}
                style={{ flex: 1, padding: '12px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none' }}
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}