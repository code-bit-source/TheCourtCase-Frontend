import React, { useState, useRef, useEffect } from 'react';
import { 
  caseService, 
  documentService, 
  taskService, 
  noteService, 
  activityService 
} from '../services';
import {
  Scale, Search, Plus, Filter, Grid3X3, List, MoreVertical,
  X, User, Briefcase, Phone, Mail, FileText, CheckCircle2,
  ListTodo, History, Edit3, Share2, DollarSign, Timer,
  Upload, Download, Eye, Folder, ChevronDown, Link, Trash2
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

export default function MattersPage({ addNotification = () => {}, setActiveView = () => {}, isDark = false, accentColor = '#4772fa' }) {
  const colors = getThemeColors(isDark, accentColor);
  
  // State for data from API
  const [matters, setMatters] = useState([]);
  const [loading, setLoading] = useState({
    matters: false,
    documents: false,
    tasks: false,
    notes: false,
    activities: false
  });
  const [error, setError] = useState({
    matters: null,
    documents: null,
    tasks: null,
    notes: null,
    activities: null
  });

  const [selectedMatter, setSelectedMatter] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [practiceAreaFilter, setPracticeAreaFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showNewMatterModal, setShowNewMatterModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [sortBy, setSortBy] = useState('lastActivity');
  const [sortOrder, setSortOrder] = useState('desc');

  const [newMatterForm, setNewMatterForm] = useState({
    name: '',
    client: '',
    practiceArea: '',
    responsible: '',
    status: 'Open',
    description: ''
  });

  const [showEditMatterModal, setShowEditMatterModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAddTimeEntryModal, setShowAddTimeEntryModal] = useState(false);
  const [editMatterForm, setEditMatterForm] = useState({
    name: '',
    client: '',
    clientPhone: '',
    clientEmail: '',
    practiceArea: '',
    responsible: '',
    status: '',
    description: ''
  });
  const [newTimeEntry, setNewTimeEntry] = useState({
    description: '',
    hours: '',
    rate: '250',
    date: new Date().toISOString().split('T')[0]
  });
  const [shareEmail, setShareEmail] = useState('');

  // State for matter-related data
  const [matterDocuments, setMatterDocuments] = useState([]);
  const [matterTasks, setMatterTasks] = useState([]);
  const [matterNotes, setMatterNotes] = useState([]);
  const [matterActivities, setMatterActivities] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchMatters = async () => {
      setLoading(prev => ({ ...prev, matters: true }));
      try {
        const response = await caseService.getCases();
        // Transform the data to match the expected format
        const formattedMatters = response.data.map(matter => ({
          id: matter.id,
          number: matter.caseNumber || `MAT-${new Date().getFullYear()}-${String(matter.id).padStart(3, '0')}`,
          name: matter.name,
          client: matter.client?.name || 'Unknown Client',
          clientPhone: matter.client?.phone || '',
          clientEmail: matter.client?.email || '',
          status: matter.status || 'Open',
          practiceArea: matter.practiceArea || 'General',
          responsible: matter.assignedTo?.name || 'Unassigned',
          openDate: new Date(matter.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          lastActivity: matter.lastActivity || 'No recent activity',
          balance: matter.balance || 0,
          description: matter.description || 'No description provided',
          tags: matter.tags || []
        }));
        setMatters(formattedMatters);
        setError(prev => ({ ...prev, matters: null }));
      } catch (err) {
        console.error('Error fetching matters:', err);
        setError(prev => ({ ...prev, matters: 'Failed to load matters' }));
        // Use sample data if API fails
        setMatters([
          { id: 1, number: 'MAT-2024-001', name: 'Thompson vs. Global Corp', client: 'Alex Thompson', clientPhone: '+1 (555) 123-4567', clientEmail: 'alex.thompson@email.com', status: 'Open', practiceArea: 'Corporate Litigation', responsible: 'Sarah Jenkins', openDate: 'Jan 12, 2024', lastActivity: '2 hours ago', balance: 2750, description: 'Contract dispute regarding breach of service agreement', tags: ['Priority', 'Trial'] },
          { id: 2, number: 'MAT-2024-002', name: 'Miller Estate Planning', client: 'James Miller', clientPhone: '+1 (555) 234-5678', clientEmail: 'james.miller@email.com', status: 'Open', practiceArea: 'Estate Planning', responsible: 'Michael Brown', openDate: 'Feb 05, 2024', lastActivity: '1 day ago', balance: 5200, description: 'Comprehensive estate planning including will and trust', tags: ['VIP'] },
          { id: 3, number: 'MAT-2024-003', name: 'Davis Property Acquisition', client: 'Emily Davis', clientPhone: '+1 (555) 345-6789', clientEmail: 'emily.davis@email.com', status: 'Open', practiceArea: 'Real Estate', responsible: 'Sarah Jenkins', openDate: 'Feb 18, 2024', lastActivity: '3 days ago', balance: 0, description: 'Commercial property acquisition and due diligence', tags: [] },
          { id: 4, number: 'MAT-2023-089', name: 'Wilson Trademark Registration', client: 'Robert Wilson', clientPhone: '+1 (555) 456-7890', clientEmail: 'robert.wilson@email.com', status: 'Closed', practiceArea: 'Intellectual Property', responsible: 'Emily Watson', openDate: 'Nov 20, 2023', lastActivity: '2 weeks ago', balance: 0, description: 'Trademark registration for tech startup brand', tags: ['Completed'] },
          { id: 5, number: 'MAT-2024-004', name: 'Johnson Family Trust', client: 'Patricia Johnson', clientPhone: '+1 (555) 567-8901', clientEmail: 'patricia.johnson@email.com', status: 'Pending', practiceArea: 'Estate Planning', responsible: 'Michael Brown', openDate: 'Mar 01, 2024', lastActivity: '5 days ago', balance: 3500, description: 'Family trust establishment and asset transfer', tags: ['Review'] },
          { id: 6, number: 'MAT-2024-005', name: 'Tech Solutions IP Dispute', client: 'Tech Solutions Inc.', clientPhone: '+1 (555) 678-9012', clientEmail: 'legal@techsolutions.com', status: 'Open', practiceArea: 'Intellectual Property', responsible: 'James Lee', openDate: 'Mar 10, 2024', lastActivity: '1 hour ago', balance: 8500, description: 'Patent infringement case against competitor', tags: ['Priority', 'Litigation'] },
          { id: 7, number: 'MAT-2024-006', name: 'Anderson Divorce Settlement', client: 'Lisa Anderson', clientPhone: '+1 (555) 789-0123', clientEmail: 'lisa.anderson@email.com', status: 'Open', practiceArea: 'Family Law', responsible: 'Emily Watson', openDate: 'Mar 12, 2024', lastActivity: '4 hours ago', balance: 1200, description: 'Uncontested divorce with asset division', tags: [] },
          { id: 8, number: 'MAT-2023-045', name: 'Brown Construction Contract', client: 'Brown & Sons LLC', clientPhone: '+1 (555) 890-1234', clientEmail: 'contact@brownsons.com', status: 'Closed', practiceArea: 'Corporate', responsible: 'Sarah Jenkins', openDate: 'Aug 15, 2023', lastActivity: '1 month ago', balance: 0, description: 'Construction contract review and negotiation', tags: ['Completed'] }
        ]);
      } finally {
        setLoading(prev => ({ ...prev, matters: false }));
      }
    };

    fetchMatters();
  }, []);

  // Fetch matter-specific data when a matter is selected
  useEffect(() => {
    if (!selectedMatter) return;

    const fetchMatterDocuments = async () => {
      setLoading(prev => ({ ...prev, documents: true }));
      try {
        const response = await documentService.getDocuments({ caseId: selectedMatter.id });
        // Transform the data to match the expected format
        const formattedDocs = response.data.map(doc => ({
          id: doc.id,
          matterId: doc.caseId,
          name: doc.name,
          type: doc.fileType || 'pdf',
          size: doc.size || '0 KB',
          uploadedBy: doc.uploadedBy?.name || 'Unknown',
          uploadDate: new Date(doc.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          category: doc.category || 'Uncategorized'
        }));
        setMatterDocuments(formattedDocs);
        setError(prev => ({ ...prev, documents: null }));
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError(prev => ({ ...prev, documents: 'Failed to load documents' }));
        // Use sample data if API fails
        setMatterDocuments([
          { id: 1, matterId: selectedMatter.id, name: 'Contract_Agreement.pdf', type: 'pdf', size: '2.4 MB', uploadedBy: 'Sarah Jenkins', uploadDate: 'Mar 10, 2024', category: 'Contracts' },
          { id: 2, matterId: selectedMatter.id, name: 'Evidence_Exhibit_A.docx', type: 'doc', size: '840 KB', uploadedBy: 'David Chen', uploadDate: 'Mar 08, 2024', category: 'Evidence' },
          { id: 3, matterId: selectedMatter.id, name: 'Court_Filing_Response.pdf', type: 'pdf', size: '1.1 MB', uploadedBy: 'Sarah Jenkins', uploadDate: 'Mar 05, 2024', category: 'Court Documents' },
          { id: 4, matterId: selectedMatter.id, name: 'Client_Correspondence.pdf', type: 'pdf', size: '320 KB', uploadedBy: 'Alex Thompson', uploadDate: 'Mar 01, 2024', category: 'Correspondence' }
        ]);
      } finally {
        setLoading(prev => ({ ...prev, documents: false }));
      }
    };

    const fetchMatterTasks = async () => {
      setLoading(prev => ({ ...prev, tasks: true }));
      try {
        const response = await taskService.getCaseTasks(selectedMatter.id);
        // Transform the data to match the expected format
        const formattedTasks = response.data.map(task => ({
          id: task.id,
          matterId: task.caseId,
          title: task.title,
          completed: task.status === 'completed',
          priority: task.priority || 2,
          dueDate: new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          assignee: task.assignedTo?.name || 'Unassigned'
        }));
        setMatterTasks(formattedTasks);
        setError(prev => ({ ...prev, tasks: null }));
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError(prev => ({ ...prev, tasks: 'Failed to load tasks' }));
        // Use sample data if API fails
        setMatterTasks([
          { id: 1, matterId: selectedMatter.id, title: 'Review counter-affidavit draft', completed: false, priority: 3, dueDate: 'Today', assignee: 'Sarah Jenkins' },
          { id: 2, matterId: selectedMatter.id, title: 'Prepare evidence summary', completed: false, priority: 2, dueDate: 'Tomorrow', assignee: 'David Chen' },
          { id: 3, matterId: selectedMatter.id, title: 'File motion for extension', completed: true, priority: 1, dueDate: 'Mar 15', assignee: 'Sarah Jenkins' }
        ]);
      } finally {
        setLoading(prev => ({ ...prev, tasks: false }));
      }
    };

    const fetchMatterNotes = async () => {
      setLoading(prev => ({ ...prev, notes: true }));
      try {
        const response = await noteService.getMyNotes({ caseId: selectedMatter.id });
        // Transform the data to match the expected format
        const formattedNotes = response.data.map(note => ({
          id: note.id,
          matterId: note.caseId,
          content: note.content,
          author: note.author?.name || 'Unknown',
          date: new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }));
        setMatterNotes(formattedNotes);
        setError(prev => ({ ...prev, notes: null }));
      } catch (err) {
        console.error('Error fetching notes:', err);
        setError(prev => ({ ...prev, notes: 'Failed to load notes' }));
        // Use sample data if API fails
        setMatterNotes([
          { id: 1, matterId: selectedMatter.id, content: 'Client confirmed availability for the hearing on March 18th. Will need to prepare final arguments by March 15th.', author: 'Sarah Jenkins', date: 'Mar 10, 2024' },
          { id: 2, matterId: selectedMatter.id, content: 'Received additional evidence from client. Need to review and categorize.', author: 'David Chen', date: 'Mar 08, 2024' }
        ]);
      } finally {
        setLoading(prev => ({ ...prev, notes: false }));
      }
    };

    const fetchMatterActivities = async () => {
      setLoading(prev => ({ ...prev, activities: true }));
      try {
        const response = await activityService.getCaseActivities(selectedMatter.id);
        // Transform the data to match the expected format
        const formattedActivities = response.data.map(activity => ({
          id: activity.id,
          matterId: activity.caseId,
          type: activity.type || 'document',
          action: activity.action || 'Activity recorded',
          detail: activity.detail || '',
          user: activity.user?.name || 'System',
          time: activity.createdAt || 'Recently'
        }));
        setMatterActivities(formattedActivities);
        setError(prev => ({ ...prev, activities: null }));
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(prev => ({ ...prev, activities: 'Failed to load activities' }));
        // Use sample data if API fails
        setMatterActivities([
          { id: 1, matterId: selectedMatter.id, type: 'document', action: 'Document uploaded', detail: 'Contract_Agreement.pdf', user: 'Sarah Jenkins', time: '2 hours ago' },
          { id: 2, matterId: selectedMatter.id, type: 'task', action: 'Task completed', detail: 'File motion for extension', user: 'Sarah Jenkins', time: '1 day ago' },
          { id: 3, matterId: selectedMatter.id, type: 'note', action: 'Note added', detail: 'Client meeting notes', user: 'David Chen', time: '2 days ago' },
          { id: 4, matterId: selectedMatter.id, type: 'billing', action: 'Time entry added', detail: '2.5 hours - Document review', user: 'Sarah Jenkins', time: '3 days ago' }
        ]);
      } finally {
        setLoading(prev => ({ ...prev, activities: false }));
      }
    };

    fetchMatterDocuments();
    fetchMatterTasks();
    fetchMatterNotes();
    fetchMatterActivities();
  }, [selectedMatter]);

  const [newNote, setNewNote] = useState('');
  const fileInputRef = useRef(null);

  const practiceAreas = ['Corporate Litigation', 'Estate Planning', 'Real Estate', 'Intellectual Property', 'Family Law', 'Corporate', 'Criminal Defense', 'Immigration'];
  const statuses = ['Open', 'Pending', 'Closed', 'On Hold'];

  const filteredMatters = matters.filter((matter) => {
    const matchesSearch = matter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      matter.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      matter.number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || matter.status === statusFilter;
    const matchesPracticeArea = practiceAreaFilter === 'all' || matter.practiceArea === practiceAreaFilter;
    return matchesSearch && matchesStatus && matchesPracticeArea;
  }).sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'name') comparison = a.name.localeCompare(b.name);
    else if (sortBy === 'client') comparison = a.client.localeCompare(b.client);
    else if (sortBy === 'openDate') comparison = new Date(a.openDate).getTime() - new Date(b.openDate).getTime();
    else if (sortBy === 'balance') comparison = a.balance - b.balance;
    else comparison = 0;
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return { bg: '#e8f5e9', color: '#2e7d32' };
      case 'Pending': return { bg: '#fff3e0', color: '#ef6c00' };
      case 'Closed': return { bg: '#f5f5f5', color: '#757575' };
      case 'On Hold': return { bg: '#fce4ec', color: '#c2185b' };
      default: return { bg: '#f5f5f5', color: '#757575' };
    }
  };

  const getPriorityColor = (p) => p === 3 ? '#eb4d3d' : p === 2 ? '#ff9500' : '#4772fa';

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return { icon: FileText, color: '#eb4d3d' };
      case 'doc': return { icon: FileText, color: '#4772fa' };
      case 'excel': return { icon: FileText, color: '#00c853' };
      default: return { icon: FileText, color: '#808080' };
    }
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0 && selectedMatter) {
      try {
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('document', files[0]);
        
        const response = await documentService.uploadDocument(formData);
        
        // Add the new document to the list
        const newDoc = {
          id: Date.now(),
          matterId: selectedMatter.id,
          name: files[0].name,
          type: files[0].type || 'pdf',
          size: `${(files[0].size / 1024).toFixed(1)} KB`,
          uploadedBy: 'You',
          uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          category: 'Uncategorized'
        };
        
        setMatterDocuments([newDoc, ...matterDocuments]);
        addNotification('success', 'Document uploaded successfully');
        setShowUploadModal(false);
      } catch (error) {
        console.error('Error uploading document:', error);
        addNotification('error', 'Failed to upload document');
      }
    }
  };

  const addNote = async () => {
    if (newNote.trim() && selectedMatter) {
      try {
        // Create a new note via the API
        const noteData = {
          caseId: selectedMatter.id,
          content: newNote
        };
        
        const response = await noteService.createNote(noteData);
        
        // Format the response to match our UI format
        const newNoteFormatted = {
          id: response.data.id,
          matterId: selectedMatter.id,
          content: newNote,
          author: response.data.author?.name || 'You',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        
        setMatterNotes([newNoteFormatted, ...matterNotes]);
        setNewNote('');
        addNotification('success', 'Note added');
      } catch (error) {
        console.error('Error adding note:', error);
        addNotification('error', 'Failed to add note');
        
        // Fallback to client-side note creation if API fails
        const note = {
          id: Date.now(),
          matterId: selectedMatter.id,
          content: newNote,
          author: 'You',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        setMatterNotes([note, ...matterNotes]);
        setNewNote('');
      }
    }
  };

  const createMatter = async () => {
    if (!newMatterForm.name.trim() || !newMatterForm.client || !newMatterForm.practiceArea) {
      addNotification('error', 'Please fill in all required fields');
      return;
    }

    try {
      // Create a new matter via the API
      const matterData = {
        name: newMatterForm.name,
        client: newMatterForm.client,
        practiceArea: newMatterForm.practiceArea,
        assignedTo: newMatterForm.responsible,
        status: newMatterForm.status || 'Open',
        description: newMatterForm.description || 'No description provided'
      };
      
      const response = await caseService.createCase(matterData);
      
      // Format the response to match our UI format
      const newMatter = {
        id: response.data.id,
        number: response.data.caseNumber || `MAT-2024-${String(matters.length + 1).padStart(3, '0')}`,
        name: newMatterForm.name,
        client: newMatterForm.client,
        status: newMatterForm.status || 'Open',
        practiceArea: newMatterForm.practiceArea,
        responsible: newMatterForm.responsible || 'Unassigned',
        openDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        lastActivity: 'Just now',
        balance: 0,
        description: newMatterForm.description || 'No description provided',
        tags: []
      };

      setMatters([newMatter, ...matters]);
      setNewMatterForm({ name: '', client: '', practiceArea: '', responsible: '', status: 'Open', description: '' });
      setShowNewMatterModal(false);
      addNotification('success', `Matter "${newMatter.name}" created successfully`);
    } catch (error) {
      console.error('Error creating matter:', error);
      addNotification('error', 'Failed to create matter');
      
      // Fallback to client-side matter creation if API fails
      const newMatter = {
        id: Date.now(),
        number: `MAT-2024-${String(matters.length + 1).padStart(3, '0')}`,
        name: newMatterForm.name,
        client: newMatterForm.client,
        status: newMatterForm.status || 'Open',
        practiceArea: newMatterForm.practiceArea,
        responsible: newMatterForm.responsible || 'Unassigned',
        openDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        lastActivity: 'Just now',
        balance: 0,
        description: newMatterForm.description || 'No description provided',
        tags: []
      };

      setMatters([newMatter, ...matters]);
      setNewMatterForm({ name: '', client: '', practiceArea: '', responsible: '', status: 'Open', description: '' });
      setShowNewMatterModal(false);
    }
  };

  const selectedMatterDocs = selectedMatter ? matterDocuments.filter((d) => d.matterId === selectedMatter.id) : [];
  const selectedMatterTasks = selectedMatter ? matterTasks.filter((t) => t.matterId === selectedMatter.id) : [];
  const selectedMatterNotes = selectedMatter ? matterNotes.filter((n) => n.matterId === selectedMatter.id) : [];
  const selectedMatterActivities = selectedMatter ? matterActivities.filter((a) => a.matterId === selectedMatter.id) : [];

  const openMattersCount = matters.filter((m) => m.status === 'Open').length;

  const MatterListItem = ({ matter }) => {
    const statusStyle = getStatusColor(matter.status);
    return (
      <div
        onClick={() => setSelectedMatter(matter)}
        style={{
          display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
          backgroundColor: selectedMatter?.id === matter.id ? colors.accentLight : colors.card,
          borderBottom: `1px solid ${colors.borderLight}`, cursor: 'pointer', transition: 'all 0.15s'
        }}
        onMouseEnter={(e) => { if (selectedMatter?.id !== matter.id) e.currentTarget.style.backgroundColor = colors.bgHover; }}
        onMouseLeave={(e) => { if (selectedMatter?.id !== matter.id) e.currentTarget.style.backgroundColor = colors.card; }}
      >
        <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: colors.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, flexShrink: 0 }}>
          <Scale size={20} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: colors.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{matter.name}</span>
            {matter.tags.map((tag, i) => (
              <span key={i} style={{ padding: '2px 8px', borderRadius: 10, fontSize: 10, fontWeight: 500, backgroundColor: tag === 'Priority' ? '#fef3f2' : tag === 'VIP' ? '#fef9c3' : tag === 'Trial' ? '#dbeafe' : colors.bgTertiary, color: tag === 'Priority' ? '#b91c1c' : tag === 'VIP' ? '#a16207' : tag === 'Trial' ? '#1d4ed8' : colors.textSecondary }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: colors.textSecondary }}>
            <span>{matter.number}</span>
            <span>•</span>
            <span>{matter.client}</span>
            <span>•</span>
            <span>{matter.practiceArea}</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 500, backgroundColor: statusStyle.bg, color: statusStyle.color }}>{matter.status}</span>
          <p style={{ fontSize: 12, color: colors.textMuted, margin: '6px 0 0 0' }}>{matter.lastActivity}</p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); }} style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 4 }}>
          <MoreVertical size={18} style={{ color: colors.textSecondary }} />
        </button>
      </div>
    );
  };

  const MatterGridItem = ({ matter }) => {
    const statusStyle = getStatusColor(matter.status);
    return (
      <div
        onClick={() => setSelectedMatter(matter)}
        style={{
          padding: 20, backgroundColor: colors.card, borderRadius: 12, border: selectedMatter?.id === matter.id ? `2px solid ${accentColor}` : `1px solid ${colors.border}`,
          cursor: 'pointer', transition: 'all 0.15s', boxShadow: selectedMatter?.id === matter.id ? `0 0 0 4px ${colors.accentLight}` : 'none'
        }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.08)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = selectedMatter?.id === matter.id ? `0 0 0 4px ${colors.accentLight}` : 'none'}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: colors.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor }}>
            <Scale size={20} />
          </div>
          <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 500, backgroundColor: statusStyle.bg, color: statusStyle.color }}>{matter.status}</span>
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: '0 0 6px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{matter.name}</h3>
        <p style={{ fontSize: 13, color: colors.textSecondary, margin: '0 0 12px 0' }}>{matter.number}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <User size={14} style={{ color: colors.textSecondary }} />
          <span style={{ fontSize: 13, color: colors.textSecondary }}>{matter.client}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 12, borderTop: `1px solid ${colors.borderLight}` }}>
          <span style={{ fontSize: 12, color: colors.textMuted }}>{matter.lastActivity}</span>
          {matter.balance > 0 && (
            <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 500, color: '#ff9500' }}>${matter.balance.toLocaleString()}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: colors.bgSecondary }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ padding: '16px 24px', backgroundColor: colors.card, borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>Matters</h1>
              <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>{filteredMatters.length} matters • {openMattersCount} open</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', backgroundColor: colors.bgTertiary, borderRadius: 8, padding: 4 }}>
                <button
                  onClick={() => setViewMode('list')}
                  style={{ padding: '6px 12px', backgroundColor: viewMode === 'list' ? colors.card : 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: viewMode === 'list' ? colors.text : colors.textSecondary, boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
                >
                  <List size={16} /> List
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{ padding: '6px 12px', backgroundColor: viewMode === 'grid' ? colors.card : 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: viewMode === 'grid' ? colors.text : colors.textSecondary, boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
                >
                  <Grid3X3 size={16} /> Grid
                </button>
              </div>
              <button
                onClick={() => setShowNewMatterModal(true)}
                style={{ padding: '10px 20px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <Plus size={18} /> New Matter
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary }} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search matters by name, client, or number..."
                style={{ width: '100%', padding: '10px 14px 10px 42px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: colors.input, color: colors.text, boxSizing: 'border-box' }}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '10px 36px 10px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.card, cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23808080' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', color: colors.text }}
            >
              <option value="all">All Status</option>
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={practiceAreaFilter}
              onChange={(e) => setPracticeAreaFilter(e.target.value)}
              style={{ padding: '10px 36px 10px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.card, cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23808080' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', color: colors.text }}
            >
              <option value="all">All Practice Areas</option>
              {practiceAreas.map((pa) => <option key={pa} value={pa}>{pa}</option>)}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{ padding: '10px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, backgroundColor: showFilters ? colors.accentLight : colors.card, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: showFilters ? accentColor : colors.textSecondary }}
            >
              <Filter size={16} /> Filters
            </button>
          </div>

          {showFilters && (
            <div style={{ marginTop: 16, padding: 16, backgroundColor: colors.bgTertiary, borderRadius: 8, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: colors.textSecondary, display: 'block', marginBottom: 6 }}>Sort by</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '8px 12px', border: `1px solid ${colors.border}`, borderRadius: 6, fontSize: 13, backgroundColor: colors.card, color: colors.text }}>
                  <option value="lastActivity">Last Activity</option>
                  <option value="name">Matter Name</option>
                  <option value="client">Client Name</option>
                  <option value="openDate">Open Date</option>
                  <option value="balance">Balance</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: colors.textSecondary, display: 'block', marginBottom: 6 }}>Order</label>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '8px 12px', border: `1px solid ${colors.border}`, borderRadius: 6, fontSize: 13, backgroundColor: colors.card, color: colors.text }}>
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: viewMode === 'grid' ? 24 : 0 }}>
          {viewMode === 'list' ? (
            <div style={{ backgroundColor: colors.card }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: colors.bgSecondary, borderBottom: `1px solid ${colors.border}`, fontSize: 12, fontWeight: 500, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <div style={{ width: 56 }}></div>
                <div style={{ flex: 1 }}>Matter</div>
                <div style={{ width: 120, textAlign: 'right' }}>Status</div>
                <div style={{ width: 48 }}></div>
              </div>
              {filteredMatters.map((matter) => <MatterListItem key={matter.id} matter={matter} />)}
              {filteredMatters.length === 0 && (
                <div style={{ textAlign: 'center', padding: 60 }}>
                  <Scale size={48} style={{ color: colors.textMuted, marginBottom: 16 }} />
                  <p style={{ fontSize: 16, color: colors.textSecondary, margin: '0 0 4px 0' }}>No matters found</p>
                  <p style={{ fontSize: 14, color: colors.textMuted, margin: 0 }}>Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {filteredMatters.map((matter) => <MatterGridItem key={matter.id} matter={matter} />)}
            </div>
          )}
        </div>
      </div>

      {/* {selectedMatter && (
        <div className="matter-detail-panel" style={{ width: 480, borderLeft: `1px solid ${colors.border}`, backgroundColor: colors.card, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 20, borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: colors.textSecondary }}>{selectedMatter.number}</span>
                  <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 500, backgroundColor: getStatusColor(selectedMatter.status).bg, color: getStatusColor(selectedMatter.status).color }}>{selectedMatter.status}</span>
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>{selectedMatter.name}</h2>
              </div>
              <button onClick={() => setSelectedMatter(null)} style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6 }}>
                <X size={20} style={{ color: colors.textSecondary }} />
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: colors.textSecondary }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <User size={14} />
                <span>{selectedMatter.client}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Briefcase size={14} />
                <span>{selectedMatter.practiceArea}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.bgSecondary }}>
            {['overview', 'documents', 'tasks', 'notes', 'billing', 'activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1, padding: '12px 8px', fontSize: 13, fontWeight: activeTab === tab ? 500 : 400,
                  color: activeTab === tab ? accentColor : colors.textSecondary, backgroundColor: 'transparent', border: 'none',
                  borderBottom: activeTab === tab ? `2px solid ${accentColor}` : '2px solid transparent', cursor: 'pointer', textTransform: 'capitalize'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto' }}>
            {activeTab === 'overview' && (
              <div style={{ padding: 20 }}>
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px 0' }}>Description</h3>
                  <p style={{ fontSize: 14, color: colors.text, lineHeight: 1.6, margin: 0 }}>{selectedMatter.description}</p>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px 0' }}>Details</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div style={{ padding: 12, backgroundColor: colors.bgSecondary, borderRadius: 8 }}>
                      <p style={{ fontSize: 11, color: colors.textSecondary, margin: '0 0 4px 0' }}>Responsible Attorney</p>
                      <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>{selectedMatter.responsible}</p>
                    </div>
                    <div style={{ padding: 12, backgroundColor: colors.bgSecondary, borderRadius: 8 }}>
                      <p style={{ fontSize: 11, color: colors.textSecondary, margin: '0 0 4px 0' }}>Open Date</p>
                      <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>{selectedMatter.openDate}</p>
                    </div>
                    <div style={{ padding: 12, backgroundColor: colors.bgSecondary, borderRadius: 8 }}>
                      <p style={{ fontSize: 11, color: colors.textSecondary, margin: '0 0 4px 0' }}>Practice Area</p>
                      <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>{selectedMatter.practiceArea}</p>
                    </div>
                    <div style={{ padding: 12, backgroundColor: colors.bgSecondary, borderRadius: 8 }}>
                      <p style={{ fontSize: 11, color: colors.textSecondary, margin: '0 0 4px 0' }}>Outstanding Balance</p>
                      <p style={{ fontSize: 14, fontWeight: 500, color: selectedMatter.balance > 0 ? '#ff9500' : '#00c853', margin: 0 }}>${selectedMatter.balance.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px 0' }}>Contact</h3>
                  <div style={{ padding: 16, backgroundColor: colors.bgSecondary, borderRadius: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600 }}>
                        {selectedMatter.client.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>{selectedMatter.client}</p>
                        <p style={{ fontSize: 12, color: colors.textSecondary, margin: '2px 0 0 0' }}>Primary Contact</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <a href={`tel:${selectedMatter.clientPhone || '+15551234567'}`} style={{ flex: 1, padding: '8px 12px', backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: 6, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, textDecoration: 'none', color: colors.text }}>
                        <Phone size={14} /> Call
                      </a>
                      <a href={`mailto:${selectedMatter.clientEmail || 'client@email.com'}`} style={{ flex: 1, padding: '8px 12px', backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: 6, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, textDecoration: 'none', color: colors.text }}>
                        <Mail size={14} /> Email
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px 0' }}>Quick Stats</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                    <div style={{ padding: 12, backgroundColor: colors.accentLight, borderRadius: 8, textAlign: 'center' }}>
                      <p style={{ fontSize: 20, fontWeight: 700, color: accentColor, margin: 0 }}>{selectedMatterDocs.length}</p>
                      <p style={{ fontSize: 11, color: colors.textSecondary, margin: '4px 0 0 0' }}>Documents</p>
                    </div>
                    <div style={{ padding: 12, backgroundColor: isDark ? 'rgba(0,200,83,0.15)' : '#f0fff4', borderRadius: 8, textAlign: 'center' }}>
                      <p style={{ fontSize: 20, fontWeight: 700, color: '#00c853', margin: 0 }}>{selectedMatterTasks.filter((t) => t.completed).length}/{selectedMatterTasks.length}</p>
                      <p style={{ fontSize: 11, color: colors.textSecondary, margin: '4px 0 0 0' }}>Tasks Done</p>
                    </div>
                    <div style={{ padding: 12, backgroundColor: isDark ? 'rgba(255,149,0,0.15)' : '#fff8f0', borderRadius: 8, textAlign: 'center' }}>
                      <p style={{ fontSize: 20, fontWeight: 700, color: '#ff9500', margin: 0 }}>{selectedMatterNotes.length}</p>
                      <p style={{ fontSize: 11, color: colors.textSecondary, margin: '4px 0 0 0' }}>Notes</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: 0 }}>Documents</h3>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    style={{ padding: '8px 16px', backgroundColor: accentColor, color: '#fff', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <Upload size={14} /> Upload
                  </button>
                </div>

                {selectedMatterDocs.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {selectedMatterDocs.map((doc) => {
                      const fileStyle = getFileIcon(doc.type);
                      return (
                        <div key={doc.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, backgroundColor: colors.bgSecondary, borderRadius: 8 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: `${fileStyle.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: fileStyle.color }}>
                            <fileStyle.icon size={20} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: colors.textSecondary, marginTop: 2 }}>
                              <span>{doc.size}</span>
                              <span>•</span>
                              <span>{doc.uploadDate}</span>
                              <span>•</span>
                              <span>{doc.uploadedBy}</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: 4 }}>
                            <button style={{ padding: 6, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 4 }}>
                              <Eye size={16} style={{ color: colors.textSecondary }} />
                            </button>
                            <button onClick={() => addNotification('success', `Downloading ${doc.name}`)} style={{ padding: 6, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 4 }}>
                              <Download size={16} style={{ color: colors.textSecondary }} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: 40, backgroundColor: colors.bgSecondary, borderRadius: 8 }}>
                    <Folder size={36} style={{ color: colors.textMuted, marginBottom: 12 }} />
                    <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>No documents yet</p>
                    <button
                      onClick={() => setShowUploadModal(true)}
                      style={{ marginTop: 12, padding: '8px 16px', backgroundColor: accentColor, color: '#fff', borderRadius: 6, fontSize: 13, cursor: 'pointer', border: 'none' }}
                    >
                      Upload First Document
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tasks' && (
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: 0 }}>Tasks</h3>
                  <button
                    onClick={() => { setActiveView('tasks'); }}
                    style={{ padding: '8px 16px', backgroundColor: accentColor, color: '#fff', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <Plus size={14} /> Add Task
                  </button>
                </div>

                {selectedMatterTasks.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {selectedMatterTasks.map((task) => (
                      <div key={task.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 12, backgroundColor: colors.bgSecondary, borderRadius: 8 }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${task.completed ? '#00c853' : getPriorityColor(task.priority)}`, backgroundColor: task.completed ? '#00c853' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2, flexShrink: 0 }}>
                          {task.completed && <CheckCircle2 size={12} style={{ color: '#fff' }} />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 14, color: task.completed ? colors.textSecondary : colors.text, margin: 0, textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, fontSize: 12, color: colors.textSecondary }}>
                            <span style={{ color: task.dueDate === 'Today' ? '#eb4d3d' : colors.textSecondary }}>{task.dueDate}</span>
                            <span>•</span>
                            <span>{task.assignee}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: 40, backgroundColor: colors.bgSecondary, borderRadius: 8 }}>
                    <ListTodo size={36} style={{ color: colors.textMuted, marginBottom: 12 }} />
                    <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>No tasks yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'notes' && (
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: '0 0 16px 0' }}>Notes</h3>

                <div style={{ marginBottom: 20 }}>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    style={{ width: '100%', minHeight: 80, padding: 12, border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, resize: 'vertical', outline: 'none', boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                    <button
                      onClick={addNote}
                      disabled={!newNote.trim()}
                      style={{ padding: '8px 16px', backgroundColor: newNote.trim() ? accentColor : colors.bgTertiary, color: newNote.trim() ? '#fff' : colors.textSecondary, borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: newNote.trim() ? 'pointer' : 'not-allowed', border: 'none' }}
                    >
                      Add Note
                    </button>
                  </div>
                </div>

                {selectedMatterNotes.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {selectedMatterNotes.map((note) => (
                      <div key={note.id} style={{ padding: 16, backgroundColor: colors.bgSecondary, borderRadius: 8, borderLeft: `3px solid ${accentColor}` }}>
                        <p style={{ fontSize: 14, color: colors.text, lineHeight: 1.6, margin: 0 }}>{note.content}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, fontSize: 12, color: colors.textSecondary }}>
                          <span style={{ fontWeight: 500 }}>{note.author}</span>
                          <span>•</span>
                          <span>{note.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: 40, backgroundColor: colors.bgSecondary, borderRadius: 8 }}>
                    <FileText size={36} style={{ color: colors.textMuted, marginBottom: 12 }} />
                    <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>No notes yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'billing' && (
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: '0 0 16px 0' }}>Billing</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                  <div style={{ padding: 16, backgroundColor: isDark ? 'rgba(255,149,0,0.15)' : '#fff8f0', borderRadius: 8, textAlign: 'center' }}>
                    <p style={{ fontSize: 24, fontWeight: 700, color: '#ff9500', margin: 0 }}>${selectedMatter.balance.toLocaleString()}</p>
                    <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>Outstanding</p>
                  </div>
                  <div style={{ padding: 16, backgroundColor: isDark ? 'rgba(0,200,83,0.15)' : '#f0fff4', borderRadius: 8, textAlign: 'center' }}>
                    <p style={{ fontSize: 24, fontWeight: 700, color: '#00c853', margin: 0 }}>$8,500</p>
                    <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>Total Billed</p>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 600, color: colors.textSecondary, margin: '0 0 12px 0' }}>Recent Time Entries</h4>
                  {[
                    { date: 'Mar 10, 2024', desc: 'Document review and analysis', hours: 2.5, rate: 250 },
                    { date: 'Mar 08, 2024', desc: 'Client call and preparation', hours: 1.0, rate: 250 },
                    { date: 'Mar 05, 2024', desc: 'Court filing preparation', hours: 3.0, rate: 250 }
                  ].map((entry, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: colors.bgSecondary, borderRadius: 8, marginBottom: 8 }}>
                      <div>
                        <p style={{ fontSize: 14, color: colors.text, margin: 0 }}>{entry.desc}</p>
                        <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>{entry.date}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>${(entry.hours * entry.rate).toFixed(2)}</p>
                        <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>{entry.hours}h @ ${entry.rate}/hr</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowAddTimeEntryModal(true)}
                  style={{ width: '100%', padding: '12px', backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: colors.text }}
                >
                  <Timer size={16} /> Add Time Entry
                </button>
              </div>
            )}

            {activeTab === 'activity' && (
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: '0 0 16px 0' }}>Activity</h3>

                {selectedMatterActivities.length > 0 ? (
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 11, top: 0, bottom: 0, width: 2, backgroundColor: colors.border }}></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {selectedMatterActivities.map((activity) => (
                        <div key={activity.id} style={{ display: 'flex', gap: 12, position: 'relative' }}>
                          <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: colors.card, border: `2px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                            {activity.type === 'document' && <FileText size={12} style={{ color: accentColor }} />}
                            {activity.type === 'task' && <CheckCircle2 size={12} style={{ color: '#00c853' }} />}
                            {activity.type === 'note' && <Edit3 size={12} style={{ color: '#9c27b0' }} />}
                            {activity.type === 'billing' && <DollarSign size={12} style={{ color: '#ff9500' }} />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 14, color: colors.text, margin: 0 }}>
                              <span style={{ fontWeight: 500 }}>{activity.action}</span>
                              <span style={{ color: colors.textSecondary }}> - {activity.detail}</span>
                            </p>
                            <p style={{ fontSize: 12, color: colors.textMuted, margin: '4px 0 0 0' }}>{activity.user} • {activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: 40, backgroundColor: colors.bgSecondary, borderRadius: 8 }}>
                    <History size={36} style={{ color: colors.textMuted, marginBottom: 12 }} />
                    <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>No activity yet</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ padding: 16, borderTop: `1px solid ${colors.border}`, display: 'flex', gap: 8 }}>
            <button
              onClick={() => {
                setEditMatterForm({
                  name: selectedMatter.name,
                  client: selectedMatter.client,
                  clientPhone: selectedMatter.clientPhone || '',
                  clientEmail: selectedMatter.clientEmail || '',
                  practiceArea: selectedMatter.practiceArea,
                  responsible: selectedMatter.responsible,
                  status: selectedMatter.status,
                  description: selectedMatter.description
                });
                setShowEditMatterModal(true);
              }}
              style={{ flex: 1, padding: '10px', backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: colors.text }}
            >
              <Edit3 size={16} /> Edit
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              style={{ flex: 1, padding: '10px', backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: colors.text }}
            >
              <Share2 size={16} /> Share
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              style={{ padding: '10px', backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: 8, cursor: 'pointer' }}
              title="View Billing"
            >
              <DollarSign size={16} style={{ color: colors.textSecondary }} />
            </button>
          </div>
        </div>
      )} */}

      {/* {showUploadModal && (
        <div onClick={() => setShowUploadModal(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 150 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: colors.card, borderRadius: 12, padding: 24, width: 420, maxWidth: '90%', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>Upload Document</h3>
              <button onClick={() => setShowUploadModal(false)} style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6 }}>
                <X size={20} style={{ color: colors.textSecondary }} />
              </button>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              style={{ border: `2px dashed ${colors.border}`, borderRadius: 12, padding: 40, textAlign: 'center', cursor: 'pointer', marginBottom: 20 }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = accentColor}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.border}
            >
              <Upload size={40} style={{ color: colors.textSecondary, marginBottom: 12 }} />
              <p style={{ fontSize: 15, fontWeight: 500, color: colors.text, margin: '0 0 4px 0' }}>Click to upload or drag and drop</p>
              <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0 }}>PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (max 50MB)</p>
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                multiple
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowUploadModal(false)} style={{ flex: 1, padding: '12px', backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', color: colors.text }}>
                Cancel
              </button>
              <button onClick={() => fileInputRef.current?.click()} style={{ flex: 1, padding: '12px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none' }}>
                Browse Files
              </button>
            </div>
          </div>
        </div>
      )} */}

      {showNewMatterModal && (
        <div onClick={() => setShowNewMatterModal(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 150 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: colors.card, borderRadius: 12, padding: 24, width: 500, maxWidth: '90%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: colors.text, margin: 0 }}>New Matter</h3>
              <button onClick={() => setShowNewMatterModal(false)} style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6 }}>
                <X size={20} style={{ color: colors.textSecondary }} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Matter Name *</label>
                <input
                  value={newMatterForm.name}
                  onChange={(e) => setNewMatterForm({ ...newMatterForm, name: e.target.value })}
                  placeholder="e.g., Smith vs. Johnson Corp"
                  style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Client *</label>
                  <select
                    value={newMatterForm.client}
                    onChange={(e) => setNewMatterForm({ ...newMatterForm, client: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.input, color: colors.text }}
                  >
                    <option value="">Select client</option>
                    <option value="Alex Thompson">Alex Thompson</option>
                    <option value="James Miller">James Miller</option>
                    <option value="Emily Davis">Emily Davis</option>
                    <option value="Robert Wilson">Robert Wilson</option>
                    <option value="Patricia Johnson">Patricia Johnson</option>
                    <option value="Lisa Anderson">Lisa Anderson</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Practice Area *</label>
                  <select
                    value={newMatterForm.practiceArea}
                    onChange={(e) => setNewMatterForm({ ...newMatterForm, practiceArea: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.input, color: colors.text }}
                  >
                    <option value="">Select practice area</option>
                    {practiceAreas.map((pa) => <option key={pa} value={pa}>{pa}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Responsible Attorney</label>
                  <select
                    value={newMatterForm.responsible}
                    onChange={(e) => setNewMatterForm({ ...newMatterForm, responsible: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.input, color: colors.text }}
                  >
                    <option value="">Select attorney</option>
                    <option value="Sarah Jenkins">Sarah Jenkins</option>
                    <option value="Michael Brown">Michael Brown</option>
                    <option value="Emily Watson">Emily Watson</option>
                    <option value="James Lee">James Lee</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Status</label>
                  <select
                    value={newMatterForm.status}
                    onChange={(e) => setNewMatterForm({ ...newMatterForm, status: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.input, color: colors.text }}
                  >
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Description</label>
                <textarea
                  value={newMatterForm.description}
                  onChange={(e) => setNewMatterForm({ ...newMatterForm, description: e.target.value })}
                  placeholder="Brief description of the matter..."
                  style={{ width: '100%', minHeight: 100, padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, resize: 'vertical', boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={() => setShowNewMatterModal(false)} style={{ flex: 1, padding: '12px', backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', color: colors.text }}>
                Cancel
              </button>
              <button
                onClick={createMatter}
                style={{ flex: 1, padding: '12px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none' }}
              >
                Create Matter
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditMatterModal && selectedMatter && (
        <div onClick={() => setShowEditMatterModal(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 150, padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: colors.card, borderRadius: 12, padding: 24, width: 500, maxWidth: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: colors.text, margin: 0 }}>Edit Matter</h3>
              <button onClick={() => setShowEditMatterModal(false)} style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6 }}>
                <X size={20} style={{ color: colors.textSecondary }} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Matter Name *</label>
                <input
                  value={editMatterForm.name}
                  onChange={(e) => setEditMatterForm({ ...editMatterForm, name: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Client Name</label>
                  <input
                    value={editMatterForm.client}
                    onChange={(e) => setEditMatterForm({ ...editMatterForm, client: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Practice Area</label>
                  <select
                    value={editMatterForm.practiceArea}
                    onChange={(e) => setEditMatterForm({ ...editMatterForm, practiceArea: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.input, color: colors.text }}
                  >
                    {practiceAreas.map((pa) => <option key={pa} value={pa}>{pa}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Responsible Attorney</label>
                  <select
                    value={editMatterForm.responsible}
                    onChange={(e) => setEditMatterForm({ ...editMatterForm, responsible: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.input, color: colors.text }}
                  >
                    <option value="Sarah Jenkins">Sarah Jenkins</option>
                    <option value="Michael Brown">Michael Brown</option>
                    <option value="Emily Watson">Emily Watson</option>
                    <option value="James Lee">James Lee</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Status</label>
                  <select
                    value={editMatterForm.status}
                    onChange={(e) => setEditMatterForm({ ...editMatterForm, status: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.input, color: colors.text }}
                  >
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Description</label>
                <textarea
                  value={editMatterForm.description}
                  onChange={(e) => setEditMatterForm({ ...editMatterForm, description: e.target.value })}
                  style={{ width: '100%', minHeight: 100, padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, resize: 'vertical', boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={() => setShowEditMatterModal(false)} style={{ flex: 1, padding: '12px', backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', color: colors.text }}>
                Cancel
              </button>
              <button
                onClick={() => {
                  setMatters(matters.map((m) => m.id === selectedMatter.id ? {
                    ...m,
                    name: editMatterForm.name,
                    client: editMatterForm.client,
                    clientPhone: editMatterForm.clientPhone,
                    clientEmail: editMatterForm.clientEmail,
                    practiceArea: editMatterForm.practiceArea,
                    responsible: editMatterForm.responsible,
                    status: editMatterForm.status,
                    description: editMatterForm.description,
                    lastActivity: 'Just now'
                  } : m));
                  setSelectedMatter({
                    ...selectedMatter,
                    name: editMatterForm.name,
                    client: editMatterForm.client,
                    clientPhone: editMatterForm.clientPhone,
                    clientEmail: editMatterForm.clientEmail,
                    practiceArea: editMatterForm.practiceArea,
                    responsible: editMatterForm.responsible,
                    status: editMatterForm.status,
                    description: editMatterForm.description
                  });
                  setShowEditMatterModal(false);
                  addNotification('success', 'Matter updated successfully');
                }}
                style={{ flex: 1, padding: '12px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showShareModal && selectedMatter && (
        <div onClick={() => setShowShareModal(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 150, padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: colors.card, borderRadius: 12, padding: 24, width: 420, maxWidth: '100%', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>Share Matter</h3>
              <button onClick={() => setShowShareModal(false)} style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6 }}>
                <X size={20} style={{ color: colors.textSecondary }} />
              </button>
            </div>

            <div style={{ padding: 16, backgroundColor: colors.bgSecondary, borderRadius: 8, marginBottom: 20 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: '0 0 4px 0' }}>{selectedMatter.name}</p>
              <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>{selectedMatter.number}</p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Share with (email)</label>
              <input
                type="email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                placeholder="colleague@lawfirm.com"
                style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }}
              />
            </div>

            <div style={{ padding: 16, backgroundColor: colors.accentLight, borderRadius: 8, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Link size={16} style={{ color: accentColor }} />
                <span style={{ fontSize: 13, fontWeight: 500, color: accentColor }}>Or copy link</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  readOnly
                  value={`https://legalapp.com/matters/${selectedMatter.id}`}
                  style={{ flex: 1, padding: '8px 12px', border: `1px solid ${colors.border}`, borderRadius: 6, fontSize: 12, backgroundColor: colors.card, color: colors.textSecondary }}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://legalapp.com/matters/${selectedMatter.id}`);
                    addNotification('success', 'Link copied to clipboard');
                  }}
                  style={{ padding: '8px 12px', backgroundColor: accentColor, color: '#fff', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: 'none' }}
                >
                  Copy
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowShareModal(false)} style={{ flex: 1, padding: '12px', backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', color: colors.text }}>
                Cancel
              </button>
              <button
                onClick={() => {
                  if (shareEmail) {
                    addNotification('success', `Invitation sent to ${shareEmail}`);
                    setShareEmail('');
                    setShowShareModal(false);
                  } else {
                    addNotification('error', 'Please enter an email address');
                  }
                }}
                style={{ flex: 1, padding: '12px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none' }}
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddTimeEntryModal && selectedMatter && (
        <div onClick={() => setShowAddTimeEntryModal(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 150, padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: colors.card, borderRadius: 12, padding: 24, width: 420, maxWidth: '100%', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>Add Time Entry</h3>
              <button onClick={() => setShowAddTimeEntryModal(false)} style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6 }}>
                <X size={20} style={{ color: colors.textSecondary }} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Description</label>
                <textarea
                  value={newTimeEntry.description}
                  onChange={(e) => setNewTimeEntry({ ...newTimeEntry, description: e.target.value })}
                  placeholder="What did you work on?"
                  style={{ width: '100%', minHeight: 80, padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, resize: 'vertical', boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Hours</label>
                  <input
                    type="number"
                    step="0.25"
                    value={newTimeEntry.hours}
                    onChange={(e) => setNewTimeEntry({ ...newTimeEntry, hours: e.target.value })}
                    placeholder="0.00"
                    style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Rate ($/hr)</label>
                  <input
                    type="number"
                    value={newTimeEntry.rate}
                    onChange={(e) => setNewTimeEntry({ ...newTimeEntry, rate: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Date</label>
                <input
                  type="date"
                  value={newTimeEntry.date}
                  onChange={(e) => setNewTimeEntry({ ...newTimeEntry, date: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }}
                />
              </div>

              {newTimeEntry.hours && newTimeEntry.rate && (
                <div style={{ padding: 16, backgroundColor: colors.accentLight, borderRadius: 8, textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color: colors.textSecondary, margin: '0 0 4px 0' }}>Total Amount</p>
                  <p style={{ fontSize: 24, fontWeight: 700, color: accentColor, margin: 0 }}>${(parseFloat(newTimeEntry.hours) * parseFloat(newTimeEntry.rate)).toFixed(2)}</p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={() => setShowAddTimeEntryModal(false)} style={{ flex: 1, padding: '12px', backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', color: colors.text }}>
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newTimeEntry.description && newTimeEntry.hours) {
                    addNotification('success', 'Time entry added successfully');
                    setNewTimeEntry({ description: '', hours: '', rate: '250', date: new Date().toISOString().split('T')[0] });
                    setShowAddTimeEntryModal(false);
                  } else {
                    addNotification('error', 'Please fill in description and hours');
                  }
                }}
                style={{ flex: 1, padding: '12px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none' }}
              >
                Add Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
