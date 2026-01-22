"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  Scale, Search, Plus, Filter, Grid3X3, List, MoreVertical,
  X, User, Briefcase, Phone, Mail, FileText, CheckCircle2,
  ListTodo, History, Edit3, Share2, DollarSign, Timer,
  Upload, Download, Eye, Folder, ChevronDown, Link, Trash2, AlertCircle
} from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

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

export default function MattersPage({ addNotification = () => { }, setActiveView = () => { }, isDark = false, accentColor = '#4772fa' }) {
  const colors = getThemeColors(isDark, accentColor);

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
  const [matterContextMenu, setMatterContextMenu] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [showIdHelper, setShowIdHelper] = useState(false);

  const [newMatterForm, setNewMatterForm] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    clientId: '',
    advocateId: '',
    paralegalId: '',
    courtName: '',
    courtLocation: '',
    judgeAssigned: '',
    filingDate: '',
    nextHearing: '',
    opposingParty: '',
    caseAmount: '',
    priority: 'Medium',
    tags: '',
    status: 'Open'
  });

  const [showEditMatterModal, setShowEditMatterModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAddTimeEntryModal, setShowAddTimeEntryModal] = useState(false);
  const [editMatterForm, setEditMatterForm] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    clientId: '',
    advocateId: '',
    paralegalId: '',
    courtName: '',
    courtLocation: '',
    judgeAssigned: '',
    filingDate: '',
    nextHearing: '',
    opposingParty: '',
    caseAmount: '',
    priority: 'Medium',
    tags: '',
    status: 'Open'
  });
  const [newTimeEntry, setNewTimeEntry] = useState({
    description: '',
    hours: '',
    rate: '250',
    date: new Date().toISOString().split('T')[0]
  });
  const [shareEmail, setShareEmail] = useState('');

  const [matterDocuments, setMatterDocuments] = useState([]);
  const [matterTasks, setMatterTasks] = useState([]);
  const [matterNotes, setMatterNotes] = useState([]);
  const [matterActivities, setMatterActivities] = useState([]);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      const response = await fetch(`${API_BASE_URL}/protected/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        console.log('Could not fetch users list');
        return;
      }
      
      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      console.log('Users list not available - use MongoDB ObjectId manually');
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchCases = async () => {
    try {
      setLoading(prev => ({ ...prev, matters: true }));
      const response = await fetch(`${API_BASE_URL}/cases`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch cases');
      
      const data = await response.json();
      
      // Transform backend cases to frontend format
      const transformedCases = (data.cases || []).map(caseData => ({
        id: caseData._id,
        number: caseData.caseNumber || `CASE-${caseData._id.slice(-6)}`,
        name: caseData.title,
        description: caseData.description || '',
        client: caseData.client?.name || 'Unknown Client',
        clientId: caseData.client?._id,
        clientPhone: caseData.client?.phone || '',
        clientEmail: caseData.client?.email || '',
        category: caseData.category || '',
        subCategory: caseData.subCategory || '',
        practiceArea: caseData.category || '',
        responsible: caseData.advocate?.name || 'Unassigned',
        advocateId: caseData.advocate?._id,
        paralegalId: caseData.paralegals?.[0]?._id,
        courtName: caseData.courtName || '',
        courtLocation: caseData.courtLocation || '',
        judgeAssigned: caseData.judgeAssigned || '',
        filingDate: caseData.filingDate || '',
        nextHearing: caseData.nextHearingDate || '',
        opposingParty: caseData.opposingParty || '',
        caseAmount: caseData.caseValue || 0,
        priority: caseData.priority || 'medium',
        tags: caseData.tags || [],
        status: caseData.status === 'active' ? 'Open' : caseData.status === 'closed' ? 'Closed' : 'Pending',
        openDate: new Date(caseData.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        lastActivity: 'Just added',
        balance: 0,
        createdAt: caseData.createdAt
      }));
      
      setMatters(transformedCases);
      setError(prev => ({ ...prev, matters: null }));
    } catch (err) {
      console.error('Error fetching cases:', err);
      setError(prev => ({ ...prev, matters: err.message }));
      addNotification('error', 'Failed to load cases');
    } finally {
      setLoading(prev => ({ ...prev, matters: false }));
    }
  };

  useEffect(() => {
    if (!selectedMatter) return;

    setMatterDocuments([
      { id: 1, matterId: selectedMatter.id, name: 'Contract_Agreement.pdf', type: 'pdf', size: '2.4 MB', uploadedBy: 'Sarah Jenkins', uploadDate: 'Mar 10, 2024', category: 'Contracts' },
      { id: 2, matterId: selectedMatter.id, name: 'Evidence_Exhibit_A.docx', type: 'doc', size: '840 KB', uploadedBy: 'David Chen', uploadDate: 'Mar 08, 2024', category: 'Evidence' },
      { id: 3, matterId: selectedMatter.id, name: 'Court_Filing_Response.pdf', type: 'pdf', size: '1.1 MB', uploadedBy: 'Sarah Jenkins', uploadDate: 'Mar 05, 2024', category: 'Court Documents' },
      { id: 4, matterId: selectedMatter.id, name: 'Client_Correspondence.pdf', type: 'pdf', size: '320 KB', uploadedBy: 'Alex Thompson', uploadDate: 'Mar 01, 2024', category: 'Correspondence' }
    ]);

    setMatterTasks([
      { id: 1, matterId: selectedMatter.id, title: 'Review counter-affidavit draft', completed: false, priority: 3, dueDate: 'Today', assignee: 'Sarah Jenkins' },
      { id: 2, matterId: selectedMatter.id, title: 'Prepare evidence summary', completed: false, priority: 2, dueDate: 'Tomorrow', assignee: 'David Chen' },
      { id: 3, matterId: selectedMatter.id, title: 'File motion for extension', completed: true, priority: 1, dueDate: 'Mar 15', assignee: 'Sarah Jenkins' }
    ]);

    setMatterNotes([
      { id: 1, matterId: selectedMatter.id, content: 'Client confirmed availability for the hearing on March 18th. Will need to prepare final arguments by March 15th.', author: 'Sarah Jenkins', date: 'Mar 10, 2024' },
      { id: 2, matterId: selectedMatter.id, content: 'Received additional evidence from client. Need to review and categorize.', author: 'David Chen', date: 'Mar 08, 2024' }
    ]);

    setMatterActivities([
      { id: 1, matterId: selectedMatter.id, type: 'document', action: 'Document uploaded', detail: 'Contract_Agreement.pdf', user: 'Sarah Jenkins', time: '2 hours ago' },
      { id: 2, matterId: selectedMatter.id, type: 'task', action: 'Task completed', detail: 'File motion for extension', user: 'Sarah Jenkins', time: '1 day ago' },
      { id: 3, matterId: selectedMatter.id, type: 'note', action: 'Note added', detail: 'Client meeting notes', user: 'David Chen', time: '2 days ago' },
      { id: 4, matterId: selectedMatter.id, type: 'billing', action: 'Time entry added', detail: '2.5 hours - Document review', user: 'Sarah Jenkins', time: '3 days ago' }
    ]);
  }, [selectedMatter]);

  const [newNote, setNewNote] = useState('');
  const fileInputRef = useRef(null);

   
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];
   
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

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0 && selectedMatter) {
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
    }
  };

  const addNote = async () => {
    if (newNote.trim() && selectedMatter) {
      const note = {
        id: Date.now(),
        matterId: selectedMatter.id,
        content: newNote,
        author: 'You',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setMatterNotes([note, ...matterNotes]);
      setNewNote('');
      addNotification('success', 'Note added');
    }
  };

  const createMatter = async () => {
    if (!newMatterForm.title.trim() || !newMatterForm.category) {
      addNotification('error', 'Please fill in all required fields');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, matters: true }));
      
      const payload = {
        title: newMatterForm.title,
        description: newMatterForm.description,
        category: newMatterForm.category,
        subCategory: newMatterForm.subcategory,
        clientId: newMatterForm.clientId,
        advocateId: newMatterForm.advocateId,
        paralegalIds: newMatterForm.paralegalId ? [newMatterForm.paralegalId] : [],
        courtName: newMatterForm.courtName,
        courtLocation: newMatterForm.courtLocation,
        judgeAssigned: newMatterForm.judgeAssigned,
        filingDate: newMatterForm.filingDate,
        nextHearingDate: newMatterForm.nextHearing,
        opposingParty: newMatterForm.opposingParty,
        caseValue: newMatterForm.caseAmount ? parseFloat(newMatterForm.caseAmount) : 0,
        priority: newMatterForm.priority?.toLowerCase() || 'medium',
        tags: newMatterForm.tags ? newMatterForm.tags.split(',').map(t => t.trim()).filter(t => t) : []
      };

      const response = await fetch(`${API_BASE_URL}/cases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create case');
      }

      const data = await response.json();
      
      // Transform response to frontend format
      const newCase = {
        id: data.case._id,
        number: data.case.caseNumber || `CASE-${data.case._id.slice(-6)}`,
        name: data.case.title,
        description: data.case.description,
        client: data.case.client?.name || 'Unknown',
        clientId: data.case.client?._id,
        clientPhone: data.case.client?.phone || '',
        clientEmail: data.case.client?.email || '',
        category: data.case.category,
        subCategory: data.case.subCategory,
        practiceArea: data.case.category,
        responsible: data.case.advocate?.name || 'Unassigned',
        advocateId: data.case.advocate?._id,
        paralegalId: data.case.paralegals?.[0]?._id,
        courtName: data.case.courtName,
        courtLocation: data.case.courtLocation,
        judgeAssigned: data.case.judgeAssigned,
        filingDate: data.case.filingDate,
        nextHearing: data.case.nextHearingDate,
        opposingParty: data.case.opposingParty,
        caseAmount: data.case.caseValue,
        priority: data.case.priority,
        tags: data.case.tags,
        status: 'Open',
        openDate: new Date(data.case.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        lastActivity: 'Just now',
        balance: 0,
        createdAt: data.case.createdAt
      };

      setMatters([newCase, ...matters]);
      setNewMatterForm({
        title: '',
        description: '',
        category: '',
        subcategory: '',
        clientId: '',
        advocateId: '',
        paralegalId: '',
        courtName: '',
        courtLocation: '',
        judgeAssigned: '',
        filingDate: '',
        nextHearing: '',
        opposingParty: '',
        caseAmount: '',
        priority: 'Medium',
        tags: '',
        status: 'Open'
      });
      setShowNewMatterModal(false);
      addNotification('success', `Case "${newCase.name}" created successfully`);
    } catch (err) {
      console.error('Error creating case:', err);
      addNotification('error', err.message || 'Failed to create case');
    } finally {
      setLoading(prev => ({ ...prev, matters: false }));
    }
  };

  const updateMatter = async () => {
    if (!editMatterForm.title.trim() || !editMatterForm.category || !selectedMatter) {
      addNotification('error', 'Please fill in all required fields');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, matters: true }));
      
      const payload = {
        title: editMatterForm.title,
        description: editMatterForm.description,
        category: editMatterForm.category,
        subCategory: editMatterForm.subcategory,
        clientId: editMatterForm.clientId,
        advocateId: editMatterForm.advocateId,
        paralegalIds: editMatterForm.paralegalId ? [editMatterForm.paralegalId] : [],
        courtName: editMatterForm.courtName,
        courtLocation: editMatterForm.courtLocation,
        judgeAssigned: editMatterForm.judgeAssigned,
        filingDate: editMatterForm.filingDate,
        nextHearingDate: editMatterForm.nextHearing,
        opposingParty: editMatterForm.opposingParty,
        caseValue: editMatterForm.caseAmount ? parseFloat(editMatterForm.caseAmount) : 0,
        priority: editMatterForm.priority?.toLowerCase() || 'medium',
        tags: editMatterForm.tags ? editMatterForm.tags.split(',').map(t => t.trim()).filter(t => t) : []
      };

      const response = await fetch(`${API_BASE_URL}/cases/${selectedMatter.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update case');
      }

      const data = await response.json();
      
      const updatedCase = {
        ...selectedMatter,
        name: data.case.title,
        description: data.case.description,
        category: data.case.category,
        practiceArea: data.case.category,
        subCategory: data.case.subCategory,
        client: data.case.client?.name || selectedMatter.client,
        clientId: data.case.client?._id,
        clientPhone: data.case.client?.phone || '',
        clientEmail: data.case.client?.email || '',
        responsible: data.case.advocate?.name || selectedMatter.responsible,
        advocateId: data.case.advocate?._id,
        paralegalId: data.case.paralegals?.[0]?._id,
        courtName: data.case.courtName,
        courtLocation: data.case.courtLocation,
        judgeAssigned: data.case.judgeAssigned,
        filingDate: data.case.filingDate,
        nextHearing: data.case.nextHearingDate,
        opposingParty: data.case.opposingParty,
        caseAmount: data.case.caseValue,
        priority: data.case.priority,
        tags: data.case.tags,
        lastActivity: 'Just now'
      };

      setMatters(matters.map(m => m.id === selectedMatter.id ? updatedCase : m));
      setSelectedMatter(updatedCase);
      setShowEditMatterModal(false);
      addNotification('success', 'Case updated successfully');
    } catch (err) {
      console.error('Error updating case:', err);
      addNotification('error', err.message || 'Failed to update case');
    } finally {
      setLoading(prev => ({ ...prev, matters: false }));
    }
  };

  const deleteMatter = async (matterId) => {
    if (!window.confirm('Are you sure you want to delete this case? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(prev => ({ ...prev, matters: true }));
      
      const response = await fetch(`${API_BASE_URL}/cases/${matterId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete case');
      }

      setMatters(matters.filter(m => m.id !== matterId));
      if (selectedMatter?.id === matterId) {
        setSelectedMatter(null);
      }
      addNotification('success', 'Case deleted successfully');
    } catch (err) {
      console.error('Error deleting case:', err);
      addNotification('error', err.message || 'Failed to delete case');
    } finally {
      setLoading(prev => ({ ...prev, matters: false }));
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
        <div style={{ position: 'relative' }}>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              setMatterContextMenu(matterContextMenu === matter.id ? null : matter.id);
            }} 
            style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 4 }}
          >
            <MoreVertical size={18} style={{ color: colors.textSecondary }} />
          </button>
          {matterContextMenu === matter.id && (
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                backgroundColor: colors.card,
                borderRadius: 8,
                border: `1px solid ${colors.border}`,
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                zIndex: 1000,
                minWidth: 180
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditMatterForm({
                    title: matter.name,
                    description: matter.description || '',
                    category: matter.category || matter.practiceArea || '',
                    subcategory: matter.subCategory || '',
                    clientId: matter.clientId || '',
                    advocateId: matter.advocateId || '',
                    paralegalId: matter.paralegalId || '',
                    courtName: matter.courtName || '',
                    courtLocation: matter.courtLocation || '',
                    judgeAssigned: matter.judgeAssigned || '',
                    filingDate: matter.filingDate || '',
                    nextHearing: matter.nextHearing || '',
                    opposingParty: matter.opposingParty || '',
                    caseAmount: matter.caseAmount ? String(matter.caseAmount) : '',
                    priority: matter.priority || 'medium',
                    tags: matter.tags?.join(', ') || '',
                    status: matter.status || 'Open'
                  });
                  setShowEditMatterModal(true);
                  setMatterContextMenu(null);
                }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: colors.text,
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: 13,
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = colors.bgHover}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Edit Matter
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMatter(matter.id);
                  setMatterContextMenu(null);
                }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#ef4444',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: 13,
                  transition: 'background-color 0.2s',
                  borderRadius: '0 0 8px 8px'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#fef2f2'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Delete
              </button>
            </div>
          )}
        </div>
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
    <div style={{ display: 'flex', height: '100vh', backgroundColor: colors.bgSecondary }}>
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

        <div style={{ flex: 1, overflowY: 'auto', padding: viewMode === 'grid' ? 24 : 0 }}>
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

      {showNewMatterModal && (
  <div
    onClick={() => setShowNewMatterModal(false)}
    className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white dark:bg-gray-900 rounded-2xl w-[640px] max-w-[95%] max-h-[85vh] overflow-hidden shadow-2xl flex flex-col"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Create New Matter</h3>
          <p className="text-sm text-gray-500">Fill in the details below</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (!usersLoading && users.length === 0) {
                fetchUsers();
                setShowIdHelper(!showIdHelper);
              }
            }}
            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600"
            title="Help with IDs"
          >
            ?
          </button>
          <button
            onClick={() => setShowNewMatterModal(false)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

        {/* Basic Information */}
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase mb-3">Basic Information</p>
          <div className="space-y-3">
            <div className="relative">
              <input
                value={newMatterForm.title}
                onChange={(e) => setNewMatterForm({ ...newMatterForm, title: e.target.value })}
                placeholder="Matter Title"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">*</span>
            </div>

            <textarea
              value={newMatterForm.description}
              onChange={(e) => setNewMatterForm({ ...newMatterForm, description: e.target.value })}
              placeholder="Description (optional)"
              rows={2}
              className="w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Enter Category"
                value={newMatterForm.category}
                onChange={(e) => setNewMatterForm({ ...newMatterForm, category: e.target.value })}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Enter SubCategory"
                value={newMatterForm.subcategory}
                onChange={(e) => setNewMatterForm({ ...newMatterForm, subcategory: e.target.value })}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Team Assignment */}
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase mb-3">Team Assignment</p>
          <div className="grid grid-cols-3 gap-3">
            {users.length > 0 ? (
              <>
                <select
                  value={newMatterForm.clientId}
                  onChange={(e) => setNewMatterForm({ ...newMatterForm, clientId: e.target.value })}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Client</option>
                  {users.filter(u => u.role === 'client').map(u => (
                    <option key={u._id} value={u._id}>{u.name} ({u._id.slice(-6)})</option>
                  ))}
                </select>
                <select
                  value={newMatterForm.advocateId}
                  onChange={(e) => setNewMatterForm({ ...newMatterForm, advocateId: e.target.value })}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Advocate</option>
                  {users.filter(u => u.role === 'advocate').map(u => (
                    <option key={u._id} value={u._id}>{u.name} ({u._id.slice(-6)})</option>
                  ))}
                </select>
                <select
                  value={newMatterForm.paralegalId}
                  onChange={(e) => setNewMatterForm({ ...newMatterForm, paralegalId: e.target.value })}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Paralegal (optional)</option>
                  {users.filter(u => u.role === 'paralegal').map(u => (
                    <option key={u._id} value={u._id}>{u.name} ({u._id.slice(-6)})</option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <input
                  placeholder="Client ID"
                  value={newMatterForm.clientId}
                  onChange={(e) => setNewMatterForm({ ...newMatterForm, clientId: e.target.value })}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  title="MongoDB ObjectId for Client user"
                />
                <input
                  placeholder="Advocate ID"
                  value={newMatterForm.advocateId}
                  onChange={(e) => setNewMatterForm({ ...newMatterForm, advocateId: e.target.value })}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  title="MongoDB ObjectId for Advocate user"
                />
                <input
                  placeholder="Paralegal ID (optional)"
                  value={newMatterForm.paralegalId}
                  onChange={(e) => setNewMatterForm({ ...newMatterForm, paralegalId: e.target.value })}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  title="MongoDB ObjectId for Paralegal user"
                />
              </>
            )}
          </div>
          {users.length === 0 && (
            <p className="text-xs text-amber-600 mt-2">💡 Click ? button to load user list</p>
          )}
        </div>

        {/* ID Helper Info */}
        {showIdHelper && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">📋 User List</h4>
            {usersLoading ? (
              <p className="text-sm text-blue-700">Loading users...</p>
            ) : users.length > 0 ? (
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold text-blue-900">Clients:</p>
                  {users.filter(u => u.role === 'client').map(u => (
                    <div key={u._id} className="text-xs text-blue-700 ml-2">
                      {u.name}: <code className="bg-white px-2 py-1 rounded">{u._id}</code>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-900">Advocates:</p>
                  {users.filter(u => u.role === 'advocate').map(u => (
                    <div key={u._id} className="text-xs text-blue-700 ml-2">
                      {u.name}: <code className="bg-white px-2 py-1 rounded">{u._id}</code>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-900">Paralegals:</p>
                  {users.filter(u => u.role === 'paralegal').map(u => (
                    <div key={u._id} className="text-xs text-blue-700 ml-2">
                      {u.name}: <code className="bg-white px-2 py-1 rounded">{u._id}</code>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-amber-700">Could not load user list. Please enter MongoDB ObjectId manually.</p>
            )}
          </div>
        )}

        {/* Court Details */}
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase mb-3">Court Details</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input 
              placeholder="Court Name" 
              value={newMatterForm.courtName}
              onChange={(e) => setNewMatterForm({ ...newMatterForm, courtName: e.target.value })}
              className="px-4 py-2 border rounded-lg" 
            />
            <input 
              placeholder="Court Location" 
              value={newMatterForm.courtLocation}
              onChange={(e) => setNewMatterForm({ ...newMatterForm, courtLocation: e.target.value })}
              className="px-4 py-2 border rounded-lg" 
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input 
              placeholder="Judge Assigned" 
              value={newMatterForm.judgeAssigned}
              onChange={(e) => setNewMatterForm({ ...newMatterForm, judgeAssigned: e.target.value })}
              className="px-4 py-2 border rounded-lg" 
            />
            <input 
              placeholder="Opposing Party" 
              value={newMatterForm.opposingParty}
              onChange={(e) => setNewMatterForm({ ...newMatterForm, opposingParty: e.target.value })}
              className="px-4 py-2 border rounded-lg" 
            />
          </div>
        </div>

        {/* Dates */}
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase mb-3">Dates & Schedule</p>
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="date" 
              value={newMatterForm.filingDate}
              onChange={(e) => setNewMatterForm({ ...newMatterForm, filingDate: e.target.value })}
              placeholder="Filing Date"
              className="px-4 py-2 border rounded-lg" 
            />
            <input 
              type="date" 
              value={newMatterForm.nextHearing}
              onChange={(e) => setNewMatterForm({ ...newMatterForm, nextHearing: e.target.value })}
              placeholder="Next Hearing"
              className="px-4 py-2 border rounded-lg" 
            />
          </div>
        </div>

        {/* Case Settings */}
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase mb-3">Case Settings</p>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <input 
              type="number" 
              placeholder="Amount" 
              value={newMatterForm.caseAmount}
              onChange={(e) => setNewMatterForm({ ...newMatterForm, caseAmount: e.target.value })}
              className="px-4 py-2 border rounded-lg" 
            />
            <select 
              value={newMatterForm.priority}
              onChange={(e) => setNewMatterForm({ ...newMatterForm, priority: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            >
              {priorities.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select 
              value={newMatterForm.status}
              onChange={(e) => setNewMatterForm({ ...newMatterForm, status: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            >
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <input 
            placeholder="Tags (comma separated)" 
            value={newMatterForm.tags}
            onChange={(e) => setNewMatterForm({ ...newMatterForm, tags: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg" 
          />
        </div>

      </div>

      {/* Connection Warning for Advocates */}
      <div className="px-6 py-3 bg-amber-50 border-t border-amber-200">
        <p className="text-xs text-amber-700">
          <strong>⚠️ Note:</strong> Advocate ko client ke saath pehle connection establish hona chahiye case create karne se pehle.
          Agar connection error aaye to "Connections" page par jao aur client ko accept karo.
        </p>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t flex gap-3 bg-gray-50">
        <button
          onClick={() => setShowNewMatterModal(false)}
          className="flex-1 py-2 border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={createMatter}
          disabled={!newMatterForm.title || !newMatterForm.category || !newMatterForm.clientId || !newMatterForm.advocateId}
          className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Matter
        </button>
      </div>
    </div>
  </div>
)}


      {/* {selectedMatter && (
        <div style={{ width: 420, backgroundColor: colors.card, borderLeft: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '20px 24px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 500, backgroundColor: getStatusColor(selectedMatter.status).bg, color: getStatusColor(selectedMatter.status).color }}>{selectedMatter.status}</span>
                {selectedMatter.tags?.map((tag, i) => (
                  <span key={i} style={{ padding: '3px 8px', borderRadius: 10, fontSize: 10, fontWeight: 500, backgroundColor: tag === 'Priority' ? '#fef3f2' : tag === 'VIP' ? '#fef9c3' : colors.bgTertiary, color: tag === 'Priority' ? '#b91c1c' : tag === 'VIP' ? '#a16207' : colors.textSecondary }}>{tag}</span>
                ))}
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: '8px 0 4px 0' }}>{selectedMatter.name}</h2>
              <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0 }}>{selectedMatter.number}</p>
            </div>
            <button onClick={() => setSelectedMatter(null)} style={{ padding: 8, backgroundColor: colors.bgTertiary, border: 'none', cursor: 'pointer', borderRadius: 8 }}>
              <X size={18} style={{ color: colors.textSecondary }} />
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Client Information</div>
              <div style={{ backgroundColor: colors.bgSecondary, borderRadius: 10, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: colors.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor }}>
                    <User size={20} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>{selectedMatter.client}</p>
                    <p style={{ fontSize: 12, color: colors.textSecondary, margin: '2px 0 0 0' }}>Client</p>
                  </div>
                </div>
                {selectedMatter.clientPhone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: colors.textSecondary, marginBottom: 6 }}>
                    <Phone size={14} />
                    <span>{selectedMatter.clientPhone}</span>
                  </div>
                )}
                {selectedMatter.clientEmail && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: colors.textSecondary }}>
                    <Mail size={14} />
                    <span>{selectedMatter.clientEmail}</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Case Details</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: colors.textSecondary }}>Practice Area</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>{selectedMatter.practiceArea || selectedMatter.category || '-'}</span>
                </div>
                {selectedMatter.subcategory && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: colors.textSecondary }}>Subcategory</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>{selectedMatter.subcategory}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: colors.textSecondary }}>Responsible</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>{selectedMatter.responsible}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: colors.textSecondary }}>Open Date</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>{selectedMatter.openDate}</span>
                </div>
                {selectedMatter.priority && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: colors.textSecondary }}>Priority</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: selectedMatter.priority === 'Urgent' ? '#ef4444' : selectedMatter.priority === 'High' ? '#f97316' : colors.text }}>{selectedMatter.priority}</span>
                  </div>
                )}
                {selectedMatter.caseAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: colors.textSecondary }}>Case Amount</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>${selectedMatter.caseAmount.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {(selectedMatter.courtName || selectedMatter.courtLocation || selectedMatter.judgeAssigned || selectedMatter.opposingParty) && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Court Information</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {selectedMatter.courtName && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: colors.textSecondary }}>Court Name</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>{selectedMatter.courtName}</span>
                    </div>
                  )}
                  {selectedMatter.courtLocation && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: colors.textSecondary }}>Location</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>{selectedMatter.courtLocation}</span>
                    </div>
                  )}
                  {selectedMatter.judgeAssigned && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: colors.textSecondary }}>Judge</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>{selectedMatter.judgeAssigned}</span>
                    </div>
                  )}
                  {selectedMatter.opposingParty && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: colors.textSecondary }}>Opposing Party</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>{selectedMatter.opposingParty}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {(selectedMatter.filingDate || selectedMatter.nextHearing) && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Important Dates</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {selectedMatter.filingDate && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: colors.textSecondary }}>Filing Date</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>{new Date(selectedMatter.filingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  )}
                  {selectedMatter.nextHearing && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: colors.textSecondary }}>Next Hearing</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: accentColor }}>{new Date(selectedMatter.nextHearing).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedMatter.description && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Description</div>
                <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0, lineHeight: 1.6 }}>{selectedMatter.description}</p>
              </div>
            )}

            {selectedMatter.balance > 0 && (
              <div style={{ backgroundColor: colors.bgSecondary, borderRadius: 10, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: 12, color: colors.textSecondary, margin: '0 0 4px 0' }}>Outstanding Balance</p>
                    <p style={{ fontSize: 20, fontWeight: 600, color: '#ff9500', margin: 0 }}>${selectedMatter.balance.toLocaleString()}</p>
                  </div>
                  <DollarSign size={24} style={{ color: '#ff9500' }} />
                </div>
              </div>
            )}
          </div>

          <div style={{ padding: '16px 24px', borderTop: `1px solid ${colors.border}`, display: 'flex', gap: 10 }}>
            <button
              onClick={() => {
                const clientMatch = clients.find(c => c.name === selectedMatter.client);
                const advocateMatch = advocates.find(a => a.name === selectedMatter.responsible);
                const paralegalMatch = paralegals.find(p => p.name === selectedMatter.paralegal);
                setEditMatterForm({
                  title: selectedMatter.name,
                  description: selectedMatter.description || '',
                  category: selectedMatter.category || selectedMatter.practiceArea || '',
                  subcategory: selectedMatter.subcategory || '',
                  clientId: clientMatch?.id || '',
                  advocateId: advocateMatch?.id || '',
                  paralegalId: paralegalMatch?.id || '',
                  courtName: selectedMatter.courtName || '',
                  courtLocation: selectedMatter.courtLocation || '',
                  judgeAssigned: selectedMatter.judgeAssigned || '',
                  filingDate: selectedMatter.filingDate || '',
                  nextHearing: selectedMatter.nextHearing || '',
                  opposingParty: selectedMatter.opposingParty || '',
                  caseAmount: selectedMatter.caseAmount ? String(selectedMatter.caseAmount) : '',
                  priority: selectedMatter.priority || 'Medium',
                  tags: selectedMatter.tags?.filter(t => t !== 'Priority').join(', ') || '',
                  status: selectedMatter.status || 'Open'
                });
                setShowEditMatterModal(true);
              }}
              style={{ flex: 1, padding: '10px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', color: colors.text, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              <Edit3 size={16} /> Edit
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              style={{ flex: 1, padding: '10px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', color: colors.text, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>
      )} */}

      {showEditMatterModal && selectedMatter && (
        <div onClick={() => setShowEditMatterModal(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 150, backdropFilter: 'blur(4px)' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: colors.card, borderRadius: 16, width: 640, maxWidth: '95%', maxHeight: '85vh', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px 24px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>Edit Matter</h3>
                <p style={{ fontSize: 13, color: colors.textSecondary, margin: '4px 0 0 0' }}>{selectedMatter.number}</p>
              </div>
              <button onClick={() => setShowEditMatterModal(false)} style={{ padding: 8, backgroundColor: colors.bgTertiary, border: 'none', cursor: 'pointer', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} style={{ color: colors.textSecondary }} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Basic Information</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ position: 'relative' }}>
                    <input value={editMatterForm.title} onChange={(e) => setEditMatterForm({ ...editMatterForm, title: e.target.value })} placeholder="Matter Title" style={{ width: '100%', padding: '11px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }} />
                    <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#ef4444', fontWeight: 600 }}>*</span>
                  </div>
                  <textarea value={editMatterForm.description} onChange={(e) => setEditMatterForm({ ...editMatterForm, description: e.target.value })} placeholder="Description (optional)" rows={2} style={{ width: '100%', padding: '11px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, resize: 'none', boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ position: 'relative' }}>
                      <input 
                        value={editMatterForm.category} 
                        onChange={(e) => setEditMatterForm({ ...editMatterForm, category: e.target.value, subcategory: '' })} 
                        placeholder="Category" 
                        style={{ width: '100%', padding: '11px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.input, color: colors.text }} 
                      />
                      <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#ef4444', fontWeight: 600 }}>*</span>
                    </div>
                    <input 
                      value={editMatterForm.subcategory} 
                      onChange={(e) => setEditMatterForm({ ...editMatterForm, subcategory: e.target.value })} 
                      placeholder="Subcategory" 
                      style={{ padding: '11px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.input, color: colors.text }} 
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Team Assignment</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  <div style={{ position: 'relative' }}>
                    <input value={editMatterForm.clientId} onChange={(e) => setEditMatterForm({ ...editMatterForm, clientId: e.target.value })} placeholder="Client ID" style={{ width: '100%', padding: '11px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.input, color: colors.text }} />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input value={editMatterForm.advocateId} onChange={(e) => setEditMatterForm({ ...editMatterForm, advocateId: e.target.value })} placeholder="Advocate ID" style={{ width: '100%', padding: '11px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.input, color: colors.text }} />
                  </div>
                  <input value={editMatterForm.paralegalId} onChange={(e) => setEditMatterForm({ ...editMatterForm, paralegalId: e.target.value })} placeholder="Paralegal ID (optional)" style={{ padding: '11px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.input, color: colors.text }} />
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Court Details</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                  <input value={editMatterForm.courtName} onChange={(e) => setEditMatterForm({ ...editMatterForm, courtName: e.target.value })} placeholder="Court Name" style={{ padding: '11px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }} />
                  <input value={editMatterForm.courtLocation} onChange={(e) => setEditMatterForm({ ...editMatterForm, courtLocation: e.target.value })} placeholder="Court Location" style={{ padding: '11px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <input value={editMatterForm.judgeAssigned} onChange={(e) => setEditMatterForm({ ...editMatterForm, judgeAssigned: e.target.value })} placeholder="Judge Assigned" style={{ padding: '11px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }} />
                  <input value={editMatterForm.opposingParty} onChange={(e) => setEditMatterForm({ ...editMatterForm, opposingParty: e.target.value })} placeholder="Opposing Party" style={{ padding: '11px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }} />
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Dates & Schedule</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div style={{ position: 'relative' }}>
                    <label style={{ position: 'absolute', top: -8, left: 10, fontSize: 10, color: colors.textSecondary, backgroundColor: colors.input, padding: '0 4px' }}>Filing Date</label>
                    <input type="date" value={editMatterForm.filingDate} onChange={(e) => setEditMatterForm({ ...editMatterForm, filingDate: e.target.value })} style={{ width: '100%', padding: '11px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }} />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <label style={{ position: 'absolute', top: -8, left: 10, fontSize: 10, color: colors.textSecondary, backgroundColor: colors.input, padding: '0 4px' }}>Next Hearing</label>
                    <input type="date" value={editMatterForm.nextHearing} onChange={(e) => setEditMatterForm({ ...editMatterForm, nextHearing: e.target.value })} style={{ width: '100%', padding: '11px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }} />
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Case Settings</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: colors.textMuted, fontSize: 14 }}>$</span>
                    <input type="number" value={editMatterForm.caseAmount} onChange={(e) => setEditMatterForm({ ...editMatterForm, caseAmount: e.target.value })} placeholder="Amount" style={{ width: '100%', padding: '11px 14px 11px 26px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }} />
                  </div>
                  <select value={editMatterForm.priority} onChange={(e) => setEditMatterForm({ ...editMatterForm, priority: e.target.value })} style={{ padding: '11px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.input, color: colors.text }}>
                    {priorities.map((p) => <option key={p} value={p}>{p} Priority</option>)}
                  </select>
                  <select value={editMatterForm.status} onChange={(e) => setEditMatterForm({ ...editMatterForm, status: e.target.value })} style={{ padding: '11px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, backgroundColor: colors.input, color: colors.text }}>
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <input value={editMatterForm.tags} onChange={(e) => setEditMatterForm({ ...editMatterForm, tags: e.target.value })} placeholder="Tags (comma separated, e.g., VIP, Urgent)" style={{ width: '100%', padding: '11px 14px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', backgroundColor: colors.input, color: colors.text }} />
              </div>
            </div>

            <div style={{ padding: '16px 24px', borderTop: `1px solid ${colors.border}`, display: 'flex', gap: 12, backgroundColor: colors.bgSecondary }}>
              <button onClick={() => setShowEditMatterModal(false)} style={{ flex: 1, padding: '12px', backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', color: colors.text }}>
                Cancel
              </button>
              <button
                onClick={updateMatter}
                disabled={!editMatterForm.title.trim() || !editMatterForm.category}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: accentColor,
                  color: '#fff',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: (!editMatterForm.title.trim() || !editMatterForm.category) ? 'not-allowed' : 'pointer',
                  border: 'none',
                  opacity: (!editMatterForm.title.trim() || !editMatterForm.category) ? 0.5 : 1,
                  transition: 'opacity 0.2s'
                }}
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
