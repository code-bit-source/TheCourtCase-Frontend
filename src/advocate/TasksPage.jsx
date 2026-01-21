import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { taskService } from '../services';
import {
  Plus, Search, Filter, Calendar, CheckCircle2, Circle,
  Clock, AlertCircle, Edit2, Trash2, X, ChevronDown,
  ListTodo, Briefcase, User, Flag
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
  input: isDark ? '#1a1a2e' : '#ffffff',
  inputBorder: isDark ? '#2d2d44' : '#e0e0e0'
});

export default function TasksPage() {
  const context = useOutletContext();
  const isDark = context?.isDark || false;
  const accentColor = context?.accentColor || '#4772fa';
  const addNotification = context?.addNotification || (() => {});

  const colors = getThemeColors(isDark, accentColor);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 2,
    dueDate: '',
    caseId: '',
    assignedTo: '',
    checklist: []
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await taskService.getTasks();
      const formattedTasks = response.data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description || '',
        completed: task.status === 'completed',
        priority: task.priority || 2,
        dueDate: task.dueDate,
        case: task.case?.name || 'No Case',
        caseId: task.caseId,
        assignedTo: task.assignedTo?.name || 'Unassigned',
        checklist: task.checklist || [],
        createdAt: task.createdAt
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      addNotification('error', 'Failed to load tasks');
      setTasks([
        { id: 1, title: 'Review counter-affidavit draft', description: 'Review and provide feedback on the draft', completed: false, priority: 3, dueDate: new Date().toISOString(), case: 'Thompson vs. Global', caseId: 1, assignedTo: 'Sarah Jenkins', checklist: [{ id: 1, text: 'Read draft', completed: true }, { id: 2, text: 'Add comments', completed: false }] },
        { id: 2, title: 'Prepare evidence summary', description: 'Compile all evidence documents', completed: false, priority: 2, dueDate: new Date(Date.now() + 86400000).toISOString(), case: 'Miller vs. Tech', caseId: 2, assignedTo: 'David Chen', checklist: [] },
        { id: 3, title: 'Client meeting preparation', description: 'Prepare agenda and documents', completed: true, priority: 2, dueDate: new Date(Date.now() - 86400000).toISOString(), case: 'Johnson Estate', caseId: 3, assignedTo: 'You', checklist: [{ id: 1, text: 'Create agenda', completed: true }, { id: 2, text: 'Print documents', completed: true }] },
        { id: 4, title: 'File motion for extension', description: 'Draft and file motion', completed: false, priority: 1, dueDate: new Date(Date.now() + 172800000).toISOString(), case: 'Smith Litigation', caseId: 4, assignedTo: 'You', checklist: [] },
        { id: 5, title: 'Research case law precedents', description: 'Find relevant precedents', completed: false, priority: 2, dueDate: new Date(Date.now() + 259200000).toISOString(), case: 'Thompson vs. Global', caseId: 1, assignedTo: 'Michael Brown', checklist: [] }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    try {
      const taskData = {
        ...formData,
        status: 'pending'
      };
      await taskService.createTask(taskData);
      addNotification('success', 'Task created successfully');
      fetchTasks();
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating task:', error);
      addNotification('error', 'Failed to create task');
    }
  };

  const handleEditTask = async () => {
    try {
      await taskService.updateTask(selectedTask.id, formData);
      addNotification('success', 'Task updated successfully');
      fetchTasks();
      setShowEditModal(false);
      setSelectedTask(null);
      resetForm();
    } catch (error) {
      console.error('Error updating task:', error);
      addNotification('error', 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await taskService.deleteTask(taskId);
      addNotification('success', 'Task deleted successfully');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      addNotification('error', 'Failed to delete task');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const newStatus = task.completed ? 'pending' : 'completed';
      await taskService.updateTask(task.id, { status: newStatus });
      setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
      addNotification('success', `Task marked as ${newStatus}`);
    } catch (error) {
      console.error('Error updating task:', error);
      addNotification('error', 'Failed to update task');
    }
  };

  const handleChecklistToggle = (taskId, checklistItemId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          checklist: task.checklist.map(item =>
            item.id === checklistItemId ? { ...item, completed: !item.completed } : item
          )
        };
      }
      return task;
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 2,
      dueDate: '',
      caseId: '',
      assignedTo: '',
      checklist: []
    });
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate.split('T')[0],
      caseId: task.caseId,
      assignedTo: task.assignedTo,
      checklist: task.checklist
    });
    setShowEditModal(true);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 3: return '#eb4d3d';
      case 2: return '#ff9500';
      case 1: return '#4772fa';
      default: return colors.textSecondary;
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 3: return 'High';
      case 2: return 'Medium';
      case 1: return 'Low';
      default: return 'Normal';
    }
  };

  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.case.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'completed' && task.completed) ||
                         (filterStatus === 'pending' && !task.completed);
    const matchesPriority = filterPriority === 'all' || task.priority === parseInt(filterPriority);
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => !t.completed && new Date(t.dueDate) < new Date()).length,
    dueToday: tasks.filter(t => !t.completed && formatDueDate(t.dueDate) === 'Today').length
  };

  const TaskModal = ({ isOpen, onClose, onSubmit, title, isEdit = false }) => {
    if (!isOpen) return null;

    return (
      <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
        <div style={{ backgroundColor: colors.card, borderRadius: 16, maxWidth: 600, width: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '20px 24px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>{title}</h3>
            <button onClick={onClose} style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6, color: colors.textSecondary }}>
              <X size={20} />
            </button>
          </div>

          <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: colors.text, marginBottom: 8 }}>Task Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter task title"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${colors.inputBorder}`, fontSize: 14, backgroundColor: colors.input, color: colors.text }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: colors.text, marginBottom: 8 }}>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter task description"
                rows={3}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${colors.inputBorder}`, fontSize: 14, backgroundColor: colors.input, color: colors.text, resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: colors.text, marginBottom: 8 }}>Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${colors.inputBorder}`, fontSize: 14, backgroundColor: colors.input, color: colors.text }}
                >
                  <option value={1}>Low</option>
                  <option value={2}>Medium</option>
                  <option value={3}>High</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: colors.text, marginBottom: 8 }}>Due Date *</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${colors.inputBorder}`, fontSize: 14, backgroundColor: colors.input, color: colors.text }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
              <button
                onClick={onClose}
                style={{ padding: '10px 20px', borderRadius: 8, border: `1px solid ${colors.border}`, backgroundColor: 'transparent', color: colors.text, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={!formData.title || !formData.dueDate}
                style={{ padding: '10px 20px', borderRadius: 8, border: 'none', backgroundColor: accentColor, color: '#fff', fontSize: 14, fontWeight: 500, cursor: formData.title && formData.dueDate ? 'pointer' : 'not-allowed', opacity: formData.title && formData.dueDate ? 1 : 0.5 }}
              >
                {isEdit ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: colors.text, margin: '0 0 4px 0' }}>Tasks</h1>
            <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>Manage and track your tasks</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{ padding: '12px 20px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Plus size={18} /> Add Task
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
          <div style={{ backgroundColor: colors.card, padding: 16, borderRadius: 12, border: `1px solid ${colors.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: colors.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ListTodo size={18} style={{ color: accentColor }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase' }}>Total Tasks</span>
            </div>
            <p style={{ fontSize: 24, fontWeight: 700, color: colors.text, margin: 0 }}>{stats.total}</p>
          </div>

          <div style={{ backgroundColor: colors.card, padding: 16, borderRadius: 12, border: `1px solid ${colors.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(0,200,83,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={18} style={{ color: '#00c853' }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase' }}>Completed</span>
            </div>
            <p style={{ fontSize: 24, fontWeight: 700, color: colors.text, margin: 0 }}>{stats.completed}</p>
          </div>

          <div style={{ backgroundColor: colors.card, padding: 16, borderRadius: 12, border: `1px solid ${colors.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(255,149,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={18} style={{ color: '#ff9500' }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase' }}>Pending</span>
            </div>
            <p style={{ fontSize: 24, fontWeight: 700, color: colors.text, margin: 0 }}>{stats.pending}</p>
          </div>

          <div style={{ backgroundColor: colors.card, padding: 16, borderRadius: 12, border: `1px solid ${colors.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(235,77,61,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={18} style={{ color: '#eb4d3d' }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase' }}>Overdue</span>
            </div>
            <p style={{ fontSize: 24, fontWeight: 700, color: colors.text, margin: 0 }}>{stats.overdue}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 250, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary }} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '10px 12px 10px 40px', borderRadius: 8, border: `1px solid ${colors.inputBorder}`, fontSize: 14, backgroundColor: colors.input, color: colors.text }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              style={{ padding: '10px 16px', borderRadius: 8, border: `1px solid ${colors.border}`, backgroundColor: colors.card, color: colors.text, fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Filter size={18} /> Filters <ChevronDown size={16} />
            </button>

            {showFilterMenu && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, backgroundColor: colors.card, borderRadius: 8, border: `1px solid ${colors.border}`, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 10, minWidth: 200 }}>
                <div style={{ padding: 12 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: colors.textSecondary, margin: '0 0 8px 0', textTransform: 'uppercase' }}>Status</p>
                  {['all', 'pending', 'completed'].map(status => (
                    <button
                      key={status}
                      onClick={() => { setFilterStatus(status); setShowFilterMenu(false); }}
                      style={{ width: '100%', padding: '8px 12px', textAlign: 'left', border: 'none', backgroundColor: filterStatus === status ? colors.accentLight : 'transparent', color: colors.text, borderRadius: 6, cursor: 'pointer', fontSize: 14, marginBottom: 4 }}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
                <div style={{ padding: 12, borderTop: `1px solid ${colors.border}` }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: colors.textSecondary, margin: '0 0 8px 0', textTransform: 'uppercase' }}>Priority</p>
                  {[{ value: 'all', label: 'All' }, { value: '3', label: 'High' }, { value: '2', label: 'Medium' }, { value: '1', label: 'Low' }].map(priority => (
                    <button
                      key={priority.value}
                      onClick={() => { setFilterPriority(priority.value); setShowFilterMenu(false); }}
                      style={{ width: '100%', padding: '8px 12px', textAlign: 'left', border: 'none', backgroundColor: filterPriority === priority.value ? colors.accentLight : 'transparent', color: colors.text, borderRadius: 6, cursor: 'pointer', fontSize: 14, marginBottom: 4 }}
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}` }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <p style={{ color: colors.textSecondary }}>Loading tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <ListTodo size={48} style={{ color: colors.textMuted, marginBottom: 16 }} />
            <p style={{ fontSize: 16, fontWeight: 500, color: colors.text, marginBottom: 8 }}>No tasks found</p>
            <p style={{ fontSize: 14, color: colors.textSecondary }}>
              {searchQuery || filterStatus !== 'all' || filterPriority !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Create your first task to get started'}
            </p>
          </div>
        ) : (
          <div>
            {filteredTasks.map((task, index) => (
              <div
                key={task.id}
                style={{
                  padding: 20,
                  borderBottom: index < filteredTasks.length - 1 ? `1px solid ${colors.border}` : 'none',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.bgHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', gap: 16 }}>
                  <button
                    onClick={() => handleToggleComplete(task)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      border: `2px solid ${task.completed ? colors.success : getPriorityColor(task.priority)}`,
                      backgroundColor: task.completed ? colors.success : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                      marginTop: 2
                    }}
                  >
                    {task.completed && <CheckCircle2 size={14} style={{ color: '#fff' }} />}
                  </button>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                      <h3
                        style={{
                          fontSize: 15,
                          fontWeight: 500,
                          color: task.completed ? colors.textSecondary : colors.text,
                          margin: 0,
                          textDecoration: task.completed ? 'line-through' : 'none'
                        }}
                      >
                        {task.title}
                      </h3>

                      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                        <button
                          onClick={() => openEditModal(task)}
                          style={{ padding: 6, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6, color: colors.textSecondary }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.bgTertiary}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          style={{ padding: 6, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6, color: colors.error }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(235,77,61,0.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {task.description && (
                      <p style={{ fontSize: 13, color: colors.textSecondary, margin: '0 0 12px 0' }}>
                        {task.description}
                      </p>
                    )}

                    {task.checklist && task.checklist.length > 0 && (
                      <div style={{ marginBottom: 12 }}>
                        {task.checklist.map(item => (
                          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                            <button
                              onClick={() => handleChecklistToggle(task.id, item.id)}
                              style={{
                                width: 16,
                                height: 16,
                                borderRadius: 4,
                                border: `2px solid ${item.completed ? colors.success : colors.border}`,
                                backgroundColor: item.completed ? colors.success : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                padding: 0
                              }}
                            >
                              {item.completed && <CheckCircle2 size={10} style={{ color: '#fff' }} />}
                            </button>
                            <span style={{ fontSize: 13, color: item.completed ? colors.textSecondary : colors.text, textDecoration: item.completed ? 'line-through' : 'none' }}>
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Flag size={14} style={{ color: getPriorityColor(task.priority) }} />
                        <span style={{ fontSize: 12, color: colors.textSecondary }}>{getPriorityLabel(task.priority)}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Calendar size={14} style={{ color: colors.textSecondary }} />
                        <span style={{ fontSize: 12, color: formatDueDate(task.dueDate) === 'Today' ? colors.error : colors.textSecondary }}>
                          {formatDueDate(task.dueDate)}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Briefcase size={14} style={{ color: colors.textSecondary }} />
                        <span style={{ fontSize: 12, color: colors.textSecondary }}>{task.case}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <User size={14} style={{ color: colors.textSecondary }} />
                        <span style={{ fontSize: 12, color: colors.textSecondary }}>{task.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <TaskModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddTask}
        title="Add New Task"
        isEdit={false}
      />

      <TaskModal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); setSelectedTask(null); resetForm(); }}
        onSubmit={handleEditTask}
        title="Edit Task"
        isEdit={true}
      />
    </div>
  );
}
