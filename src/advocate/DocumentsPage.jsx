"use client";

import React, { useState, useRef } from 'react';
import {
  FileText, Upload, Download, Eye, Search, Filter, Plus, X, MoreVertical,
  Folder, File, Image, Video, FileSpreadsheet, FileCode,
  Clock, Star, Trash2, Share2,
  ChevronDown, Grid3X3, List, SortAsc, CheckCircle2,
  AlertTriangle, FileUp, HardDrive, Cloud
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

export default function DocumentsPage({ addNotification, isDark = false, accentColor = '#4772fa' }) {
  const colors = getThemeColors(isDark, accentColor);
  
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFolder, setActiveFolder] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef(null);
  const filterRef = useRef(null);
  const sortRef = useRef(null);

  const [files, setFiles] = useState([
    { id: 1, name: 'Court_Order_Feb2024.pdf', type: 'pdf', size: '1.2 MB', category: 'Court Documents', folder: 'Legal', uploadedBy: 'Sarah Jenkins', uploadDate: 'Feb 02, 2024', modifiedDate: 'Feb 02, 2024', matter: 'Thompson vs. Global Corp', matterNumber: 'MAT-2024-001', starred: true, shared: true, tags: ['Important', 'Court'], version: 1, canDownload: true },
    { id: 2, name: 'Writ_Petition_Final.pdf', type: 'pdf', size: '2.4 MB', category: 'Filings', folder: 'Legal', uploadedBy: 'Sarah Jenkins', uploadDate: 'Jan 12, 2024', modifiedDate: 'Jan 15, 2024', matter: 'Thompson vs. Global Corp', matterNumber: 'MAT-2024-001', starred: false, shared: false, tags: ['Filing'], version: 2, canDownload: true },
    { id: 3, name: 'Evidence_Ex_A.docx', type: 'doc', size: '840 KB', category: 'Evidence', folder: 'Evidence', uploadedBy: 'David Chen', uploadDate: 'Jan 15, 2024', modifiedDate: 'Jan 20, 2024', matter: 'Thompson vs. Global Corp', matterNumber: 'MAT-2024-001', starred: false, shared: true, tags: ['Evidence', 'Exhibit'], version: 1, canDownload: true },
    { id: 4, name: 'Settlement_Agreement.pdf', type: 'pdf', size: '560 KB', category: 'Contracts', folder: 'Contracts', uploadedBy: 'Michael Brown', uploadDate: 'Jan 28, 2024', modifiedDate: 'Jan 28, 2024', matter: 'Miller Estate Planning', matterNumber: 'MAT-2024-002', starred: true, shared: false, tags: ['Contract', 'Agreement'], version: 3, canDownload: true },
    { id: 5, name: 'Counter_Affidavit.pdf', type: 'pdf', size: '1.8 MB', category: 'Filings', folder: 'Legal', uploadedBy: 'Sarah Jenkins', uploadDate: 'Jan 28, 2024', modifiedDate: 'Feb 01, 2024', matter: 'Thompson vs. Global Corp', matterNumber: 'MAT-2024-001', starred: false, shared: true, tags: ['Affidavit'], version: 1, canDownload: true },
    { id: 6, name: 'Financial_Report_2023.xlsx', type: 'excel', size: '3.2 MB', category: 'Financial', folder: 'Financial', uploadedBy: 'Emily Watson', uploadDate: 'Feb 10, 2024', modifiedDate: 'Feb 10, 2024', matter: 'Davis Property Acquisition', matterNumber: 'MAT-2024-003', starred: false, shared: false, tags: ['Financial', 'Report'], version: 1, canDownload: true },
    { id: 7, name: 'Property_Photos.zip', type: 'image', size: '45.6 MB', category: 'Media', folder: 'Evidence', uploadedBy: 'Alex Thompson', uploadDate: 'Feb 15, 2024', modifiedDate: 'Feb 15, 2024', matter: 'Davis Property Acquisition', matterNumber: 'MAT-2024-003', starred: false, shared: true, tags: ['Photos', 'Property'], version: 1, canDownload: true },
    { id: 8, name: 'Client_Interview_Notes.docx', type: 'doc', size: '125 KB', category: 'Notes', folder: 'Correspondence', uploadedBy: 'Sarah Jenkins', uploadDate: 'Mar 01, 2024', modifiedDate: 'Mar 05, 2024', matter: 'Thompson vs. Global Corp', matterNumber: 'MAT-2024-001', starred: false, shared: false, tags: ['Notes', 'Client'], version: 2, canDownload: true },
    { id: 9, name: 'Trust_Document_Draft.pdf', type: 'pdf', size: '980 KB', category: 'Drafts', folder: 'Legal', uploadedBy: 'Michael Brown', uploadDate: 'Mar 05, 2024', modifiedDate: 'Mar 08, 2024', matter: 'Miller Estate Planning', matterNumber: 'MAT-2024-002', starred: true, shared: false, tags: ['Draft', 'Trust'], version: 4, canDownload: true },
    { id: 10, name: 'Deposition_Video.mp4', type: 'video', size: '256 MB', category: 'Media', folder: 'Evidence', uploadedBy: 'James Lee', uploadDate: 'Mar 10, 2024', modifiedDate: 'Mar 10, 2024', matter: 'Tech Solutions IP Dispute', matterNumber: 'MAT-2024-006', starred: false, shared: true, tags: ['Video', 'Deposition'], version: 1, canDownload: true },
    { id: 11, name: 'Contract_Template.docx', type: 'doc', size: '89 KB', category: 'Templates', folder: 'Templates', uploadedBy: 'Sarah Jenkins', uploadDate: 'Jan 05, 2024', modifiedDate: 'Mar 01, 2024', starred: true, shared: true, tags: ['Template', 'Contract'], version: 5, canDownload: true },
    { id: 12, name: 'Invoice_March_2024.pdf', type: 'pdf', size: '145 KB', category: 'Financial', folder: 'Financial', uploadedBy: 'Finance Dept', uploadDate: 'Mar 15, 2024', modifiedDate: 'Mar 15, 2024', matter: 'Thompson vs. Global Corp', matterNumber: 'MAT-2024-001', starred: false, shared: false, tags: ['Invoice', 'Billing'], version: 1, canDownload: true }
  ]);

  const [folders, setFolders] = useState([
    { id: 'legal', name: 'Legal', count: 4, color: accentColor },
    { id: 'evidence', name: 'Evidence', count: 3, color: '#00c853' },
    { id: 'contracts', name: 'Contracts', count: 1, color: '#ff9500' },
    { id: 'financial', name: 'Financial', count: 2, color: '#9c27b0' },
    { id: 'correspondence', name: 'Correspondence', count: 1, color: '#00bcd4' },
    { id: 'templates', name: 'Templates', count: 1, color: '#795548' }
  ]);

  const categories = [
    { id: 'all', label: 'All Files', count: files.length },
    { id: 'starred', label: 'Starred', count: files.filter(f => f.starred).length },
    { id: 'shared', label: 'Shared', count: files.filter(f => f.shared).length },
    { id: 'recent', label: 'Recent', count: 5 },
    { id: 'Court Documents', label: 'Court Documents', count: files.filter(f => f.category === 'Court Documents').length },
    { id: 'Filings', label: 'Filings', count: files.filter(f => f.category === 'Filings').length },
    { id: 'Evidence', label: 'Evidence', count: files.filter(f => f.category === 'Evidence').length },
    { id: 'Contracts', label: 'Contracts', count: files.filter(f => f.category === 'Contracts').length },
    { id: 'Financial', label: 'Financial', count: files.filter(f => f.category === 'Financial').length }
  ];

  const requestedDocuments = [
    { id: 1, name: 'Bank Statements (2023)', deadline: 'Mar 15, 2024', priority: 'high' },
    { id: 2, name: 'Original Contract Copy', deadline: 'Mar 16, 2024', priority: 'medium' }
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return { icon: FileText, color: '#eb4d3d' };
      case 'doc': return { icon: FileText, color: accentColor };
      case 'excel': return { icon: FileSpreadsheet, color: '#00c853' };
      case 'image': return { icon: Image, color: '#9c27b0' };
      case 'video': return { icon: Video, color: '#ff9500' };
      case 'code': return { icon: FileCode, color: '#00bcd4' };
      default: return { icon: File, color: colors.textSecondary };
    }
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.matter?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    let matchesCategory = true;
    if (activeCategory === 'starred') matchesCategory = file.starred;
    else if (activeCategory === 'shared') matchesCategory = file.shared;
    else if (activeCategory === 'recent') matchesCategory = true;
    else if (activeCategory !== 'all') matchesCategory = file.category === activeCategory;
    
    const matchesFolder = !activeFolder || file.folder?.toLowerCase() === activeFolder.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesFolder;
  }).sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'name') comparison = a.name.localeCompare(b.name);
    else if (sortBy === 'size') comparison = parseFloat(a.size) - parseFloat(b.size);
    else if (sortBy === 'date') comparison = new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
    else if (sortBy === 'type') comparison = a.type.localeCompare(b.type);
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleFileUpload = (e) => {
    const uploadedFiles = e.target.files;
    if (uploadedFiles && uploadedFiles.length > 0) {
      Array.from(uploadedFiles).forEach((file) => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        let fileType = 'other';
        if (extension === 'pdf') fileType = 'pdf';
        else if (['doc', 'docx'].includes(extension || '')) fileType = 'doc';
        else if (['xls', 'xlsx'].includes(extension || '')) fileType = 'excel';
        else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) fileType = 'image';
        else if (['mp4', 'mov', 'avi'].includes(extension || '')) fileType = 'video';

        const newFile = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: fileType,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          category: 'Uncategorized',
          folder: activeFolder || undefined,
          uploadedBy: 'Alex Thompson',
          uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          modifiedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          starred: false,
          shared: false,
          tags: [],
          version: 1,
          canDownload: true
        };
        setFiles(prev => [newFile, ...prev]);
      });
      setShowUploadModal(false);
      addNotification('success', `${uploadedFiles.length} file(s) uploaded successfully`);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const input = fileInputRef.current;
      if (input) {
        const dataTransfer = new DataTransfer();
        Array.from(droppedFiles).forEach(f => dataTransfer.items.add(f));
        input.files = dataTransfer.files;
        handleFileUpload({ target: input });
      }
    }
  };

  const toggleStar = (fileId) => {
    setFiles(files.map(f => f.id === fileId ? { ...f, starred: !f.starred } : f));
    const file = files.find(f => f.id === fileId);
    if (file) {
      addNotification('success', file.starred ? 'Removed from starred' : 'Added to starred');
    }
  };

  const deleteFile = (fileId) => {
    const file = files.find(f => f.id === fileId);
    setFiles(files.filter(f => f.id !== fileId));
    setShowDocumentModal(false);
    setSelectedDocument(null);
    if (file) {
      addNotification('info', `${file.name} deleted`);
    }
  };

  const openDocument = (doc) => {
    setSelectedDocument(doc);
    setShowDocumentModal(true);
  };

  const createFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: newFolderName.toLowerCase().replace(/\s+/g, '-'),
        name: newFolderName,
        count: 0,
        color: accentColor
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
      setShowNewFolderModal(false);
      addNotification('success', `Folder "${newFolderName}" created`);
    }
  };

  const toggleFileSelection = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) ? prev.filter(id => id !== fileId) : [...prev, fileId]
    );
  };

  const selectAllFiles = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map(f => f.id));
    }
  };

  const storageUsed = 1.2;
  const storageTotal = 10;
  const storagePercent = (storageUsed / storageTotal) * 100;

  return (
    <div 
      style={{ display: 'flex', height: '100%', backgroundColor: colors.bg }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            padding: 40, backgroundColor: colors.card, borderRadius: 16,
            border: `3px dashed ${accentColor}`, textAlign: 'center'
          }}>
            <Upload size={48} style={{ color: accentColor, marginBottom: 16 }} />
            <p style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>Drop files here to upload</p>
          </div>
        </div>
      )}

      <div className="documents-sidebar" style={{ width: 260, borderRight: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column', backgroundColor: colors.bgSecondary }}>
        <div style={{ padding: 16 }}>
          <button
            onClick={() => setShowUploadModal(true)}
            style={{ width: '100%', padding: '12px 16px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 44 }}
          >
            <Upload size={18} /> Upload Files
          </button>
        </div>

        <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', padding: '8px 12px', margin: 0 }}>Quick Access</p>
            {categories.slice(0, 4).map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setActiveFolder(null); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                  border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 2, textAlign: 'left',
                  backgroundColor: activeCategory === cat.id && !activeFolder ? colors.accentLight : 'transparent',
                  color: activeCategory === cat.id && !activeFolder ? accentColor : colors.textSecondary
                }}
              >
                {cat.id === 'all' && <HardDrive size={18} />}
                {cat.id === 'starred' && <Star size={18} style={{ fill: cat.id === activeCategory ? accentColor : 'none' }} />}
                {cat.id === 'shared' && <Share2 size={18} />}
                {cat.id === 'recent' && <Clock size={18} />}
                <span style={{ flex: 1, fontSize: 14, fontWeight: activeCategory === cat.id ? 500 : 400 }}>{cat.label}</span>
                <span style={{ fontSize: 12, color: colors.textMuted, backgroundColor: colors.bgTertiary, padding: '2px 8px', borderRadius: 10 }}>{cat.count}</span>
              </button>
            ))}
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>Folders</p>
              <button
                onClick={() => setShowNewFolderModal(true)}
                style={{ padding: 4, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 4 }}
              >
                <Plus size={16} style={{ color: colors.textSecondary }} />
              </button>
            </div>
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => { setActiveFolder(folder.name); setActiveCategory('all'); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                  border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 2, textAlign: 'left',
                  backgroundColor: activeFolder === folder.name ? colors.accentLight : 'transparent',
                  color: activeFolder === folder.name ? accentColor : colors.textSecondary
                }}
              >
                <Folder size={18} style={{ color: folder.color }} />
                <span style={{ flex: 1, fontSize: 14, fontWeight: activeFolder === folder.name ? 500 : 400 }}>{folder.name}</span>
                <span style={{ fontSize: 12, color: colors.textMuted, backgroundColor: colors.bgTertiary, padding: '2px 8px', borderRadius: 10 }}>{folder.count}</span>
              </button>
            ))}
          </div>

          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', padding: '8px 12px', margin: 0 }}>Categories</p>
            {categories.slice(4).map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setActiveFolder(null); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                  border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 2, textAlign: 'left',
                  backgroundColor: activeCategory === cat.id && !activeFolder ? colors.accentLight : 'transparent',
                  color: activeCategory === cat.id && !activeFolder ? accentColor : colors.textSecondary
                }}
              >
                <FileText size={18} />
                <span style={{ flex: 1, fontSize: 14, fontWeight: activeCategory === cat.id ? 500 : 400 }}>{cat.label}</span>
                <span style={{ fontSize: 12, color: colors.textMuted, backgroundColor: colors.bgTertiary, padding: '2px 8px', borderRadius: 10 }}>{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: 16, borderTop: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Cloud size={18} style={{ color: colors.textSecondary }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>Storage</span>
          </div>
          <div style={{ height: 6, backgroundColor: colors.bgTertiary, borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ height: '100%', width: `${storagePercent}%`, backgroundColor: accentColor, borderRadius: 3 }}></div>
          </div>
          <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>{storageUsed} GB of {storageTotal} GB used</p>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 24px', backgroundColor: colors.card, borderBottom: `1px solid ${colors.border}` }}>
          {requestedDocuments.length > 0 && (
            <div style={{ 
              backgroundColor: isDark ? 'rgba(255,149,0,0.1)' : 'rgba(255,149,0,0.05)', 
              border: '1px solid rgba(255,149,0,0.2)', 
              borderRadius: 8, 
              padding: 16, 
              marginBottom: 16 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <AlertTriangle size={16} style={{ color: '#cc7700' }} />
                <span style={{ fontWeight: 500, color: '#cc7700', fontSize: 14 }}>Documents Requested</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {requestedDocuments.map((doc) => (
                  <div key={doc.id} style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                    padding: 12, backgroundColor: colors.card, borderRadius: 6, 
                    border: '1px solid rgba(255,149,0,0.2)' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <FileUp size={16} style={{ color: '#cc7700' }} />
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>{doc.name}</p>
                        <p style={{ fontSize: 12, color: colors.textSecondary, margin: '2px 0 0 0' }}>Due: {doc.deadline}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowUploadModal(true)}
                      style={{ padding: '6px 14px', backgroundColor: '#ff9500', color: '#fff', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: 'none' }}
                    >
                      Upload
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>
                {activeFolder || (activeCategory === 'all' ? 'All Documents' : 
                  activeCategory === 'starred' ? 'Starred' :
                  activeCategory === 'shared' ? 'Shared with me' :
                  activeCategory === 'recent' ? 'Recent' : activeCategory)}
              </h1>
              <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>
                {filteredFiles.length} files {selectedFiles.length > 0 && `• ${selectedFiles.length} selected`}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', backgroundColor: colors.bgTertiary, borderRadius: 8, padding: 4 }}>
                <button
                  onClick={() => setViewMode('list')}
                  style={{ padding: '6px 12px', backgroundColor: viewMode === 'list' ? colors.card : 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: viewMode === 'list' ? colors.text : colors.textSecondary, boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{ padding: '6px 12px', backgroundColor: viewMode === 'grid' ? colors.card : 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: viewMode === 'grid' ? colors.text : colors.textSecondary, boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
                >
                  <Grid3X3 size={16} />
                </button>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                style={{ padding: '10px 20px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <Upload size={16} /> Upload
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary }} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files by name, matter, or tags..."
                style={{ width: '100%', padding: '10px 14px 10px 42px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: colors.input, color: colors.text, boxSizing: 'border-box' }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <X size={16} style={{ color: colors.textSecondary }} />
                </button>
              )}
            </div>

            <div ref={sortRef} style={{ position: 'relative' }}>
              <button
                onClick={() => { setShowSortDropdown(!showSortDropdown); setShowFilterDropdown(false); }}
                style={{ padding: '10px 14px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: colors.text }}
              >
                <SortAsc size={16} /> Sort
                <ChevronDown size={14} style={{ color: colors.textMuted }} />
              </button>
              {showSortDropdown && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 4, width: 180, backgroundColor: colors.card, borderRadius: 8, boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.4)' : '0 10px 40px rgba(0,0,0,0.15)', border: `1px solid ${colors.border}`, zIndex: 50, overflow: 'hidden' }}>
                  {[
                    { id: 'date', label: 'Date' },
                    { id: 'name', label: 'Name' },
                    { id: 'size', label: 'Size' },
                    { id: 'type', label: 'Type' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => { setSortBy(opt.id); setShowSortDropdown(false); }}
                      style={{ width: '100%', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 'none', backgroundColor: sortBy === opt.id ? colors.accentLight : 'transparent', color: sortBy === opt.id ? accentColor : colors.text, cursor: 'pointer', fontSize: 14 }}
                    >
                      {opt.label}
                      {sortBy === opt.id && <CheckCircle2 size={14} />}
                    </button>
                  ))}
                  <div style={{ borderTop: `1px solid ${colors.border}`, padding: '8px 14px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => setSortOrder('asc')}
                        style={{ flex: 1, padding: '6px', fontSize: 12, border: `1px solid ${sortOrder === 'asc' ? accentColor : colors.border}`, borderRadius: 4, backgroundColor: sortOrder === 'asc' ? colors.accentLight : 'transparent', color: sortOrder === 'asc' ? accentColor : colors.textSecondary, cursor: 'pointer' }}
                      >
                        Ascending
                      </button>
                      <button
                        onClick={() => setSortOrder('desc')}
                        style={{ flex: 1, padding: '6px', fontSize: 12, border: `1px solid ${sortOrder === 'desc' ? accentColor : colors.border}`, borderRadius: 4, backgroundColor: sortOrder === 'desc' ? colors.accentLight : 'transparent', color: sortOrder === 'desc' ? accentColor : colors.textSecondary, cursor: 'pointer' }}
                      >
                        Descending
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div ref={filterRef} style={{ position: 'relative' }}>
              <button
                onClick={() => { setShowFilterDropdown(!showFilterDropdown); setShowSortDropdown(false); }}
                style={{ padding: '10px 14px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: colors.text }}
              >
                <Filter size={16} /> Filter
                <ChevronDown size={14} style={{ color: colors.textMuted }} />
              </button>
              {showFilterDropdown && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 4, width: 200, backgroundColor: colors.card, borderRadius: 8, boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.4)' : '0 10px 40px rgba(0,0,0,0.15)', border: `1px solid ${colors.border}`, zIndex: 50, overflow: 'hidden' }}>
                  <div style={{ padding: '8px 0' }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted, padding: '8px 14px', margin: 0, textTransform: 'uppercase' }}>File Type</p>
                    {['pdf', 'doc', 'excel', 'image', 'video'].map((type) => {
                      const fileIcon = getFileIcon(type);
                      return (
                        <button
                          key={type}
                          style={{ width: '100%', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, border: 'none', backgroundColor: 'transparent', color: colors.text, cursor: 'pointer', fontSize: 14 }}
                        >
                          <fileIcon.icon size={16} style={{ color: fileIcon.color }} />
                          <span style={{ textTransform: 'capitalize' }}>{type}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: viewMode === 'grid' ? 24 : 0 }}>
          {viewMode === 'list' ? (
            <div style={{ backgroundColor: colors.card }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: colors.bgSecondary, borderBottom: `1px solid ${colors.border}`, fontSize: 12, fontWeight: 500, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <div style={{ width: 40 }}>
                  <input
                    type="checkbox"
                    checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                    onChange={selectAllFiles}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>Name</div>
                <div style={{ width: 120 }}>Size</div>
                <div style={{ width: 150 }}>Modified</div>
                <div style={{ width: 120 }}>Uploaded By</div>
                <div style={{ width: 80 }}></div>
              </div>

              {filteredFiles.map((file) => {
                const fileStyle = getFileIcon(file.type);
                return (
                  <div
                    key={file.id}
                    onClick={() => openDocument(file)}
                    style={{
                      display: 'flex', alignItems: 'center', padding: '14px 20px',
                      borderBottom: `1px solid ${colors.borderLight}`, cursor: 'pointer',
                      backgroundColor: selectedFiles.includes(file.id) ? colors.accentLight : 'transparent'
                    }}
                  >
                    <div style={{ width: 40 }} onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => toggleFileSelection(file.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: `${fileStyle.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: fileStyle.color, flexShrink: 0 }}>
                        <fileStyle.icon size={18} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</p>
                          {file.starred && <Star size={14} style={{ color: '#ff9500', fill: '#ff9500', flexShrink: 0 }} />}
                          {file.shared && <Share2 size={12} style={{ color: colors.textMuted, flexShrink: 0 }} />}
                        </div>
                        {file.matter && (
                          <p style={{ fontSize: 12, color: colors.textSecondary, margin: '2px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.matter}</p>
                        )}
                      </div>
                    </div>
                    <div style={{ width: 120, fontSize: 13, color: colors.textSecondary }}>{file.size}</div>
                    <div style={{ width: 150, fontSize: 13, color: colors.textSecondary }}>{file.modifiedDate}</div>
                    <div style={{ width: 120, fontSize: 13, color: colors.textSecondary }}>{file.uploadedBy}</div>
                    <div style={{ width: 80, display: 'flex', justifyContent: 'flex-end', gap: 4 }} onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleStar(file.id)}
                        style={{ padding: 6, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 4 }}
                      >
                        <Star size={16} style={{ color: file.starred ? '#ff9500' : colors.textMuted, fill: file.starred ? '#ff9500' : 'none' }} />
                      </button>
                      <button
                        onClick={() => addNotification('success', `Downloading ${file.name}`)}
                        style={{ padding: 6, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 4 }}
                      >
                        <Download size={16} style={{ color: colors.textSecondary }} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredFiles.length === 0 && (
                <div style={{ textAlign: 'center', padding: 60 }}>
                  <FileText size={48} style={{ color: colors.textMuted, marginBottom: 16, opacity: 0.3 }} />
                  <p style={{ fontSize: 16, color: colors.textSecondary, margin: '0 0 8px 0' }}>No files found</p>
                  <p style={{ fontSize: 14, color: colors.textMuted, margin: 0 }}>Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {filteredFiles.map((file) => {
                const fileStyle = getFileIcon(file.type);
                return (
                  <div
                    key={file.id}
                    onClick={() => openDocument(file)}
                    style={{
                      padding: 16, backgroundColor: colors.card, borderRadius: 12,
                      border: selectedFiles.includes(file.id) ? `2px solid ${accentColor}` : `1px solid ${colors.border}`,
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: `${fileStyle.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: fileStyle.color }}>
                        <fileStyle.icon size={24} />
                      </div>
                      <div style={{ display: 'flex', gap: 4 }} onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleStar(file.id)}
                          style={{ padding: 4, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 4 }}
                        >
                          <Star size={14} style={{ color: file.starred ? '#ff9500' : colors.textMuted, fill: file.starred ? '#ff9500' : 'none' }} />
                        </button>
                        <button style={{ padding: 4, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 4 }}>
                          <MoreVertical size={14} style={{ color: colors.textMuted }} />
                        </button>
                      </div>
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: '0 0 4px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</p>
                    <p style={{ fontSize: 12, color: colors.textSecondary, margin: '0 0 8px 0' }}>{file.size} • {file.modifiedDate}</p>
                    {file.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {file.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} style={{ padding: '2px 8px', borderRadius: 10, fontSize: 10, backgroundColor: colors.bgTertiary, color: colors.textSecondary }}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredFiles.length === 0 && (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 60 }}>
                  <FileText size={48} style={{ color: colors.textMuted, marginBottom: 16, opacity: 0.3 }} />
                  <p style={{ fontSize: 16, color: colors.textSecondary, margin: '0 0 8px 0' }}>No files found</p>
                  <p style={{ fontSize: 14, color: colors.textMuted, margin: 0 }}>Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          )}
        </div>

        {selectedFiles.length > 0 && (
          <div style={{ padding: '12px 24px', backgroundColor: colors.card, borderTop: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, color: colors.text }}>{selectedFiles.length} file(s) selected</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => { addNotification('success', 'Downloading selected files'); setSelectedFiles([]); }}
                style={{ padding: '8px 16px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: colors.text }}
              >
                <Download size={14} /> Download
              </button>
              <button
                onClick={() => { addNotification('info', 'Sharing selected files'); }}
                style={{ padding: '8px 16px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: colors.text }}
              >
                <Share2 size={14} /> Share
              </button>
              <button
                onClick={() => { setFiles(files.filter(f => !selectedFiles.includes(f.id))); addNotification('info', 'Files deleted'); setSelectedFiles([]); }}
                style={{ padding: '8px 16px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: colors.error }}
              >
                <Trash2 size={14} /> Delete
              </button>
              <button
                onClick={() => setSelectedFiles([])}
                style={{ padding: '8px 16px', backgroundColor: 'transparent', border: `1px solid ${colors.border}`, borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', color: colors.textSecondary }}
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>

      {showUploadModal && (
        <div onClick={() => setShowUploadModal(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 150, padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: colors.card, borderRadius: 16, padding: 24, width: 500, maxWidth: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: isDark ? '0 25px 50px rgba(0,0,0,0.5)' : '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: colors.text, margin: 0 }}>Upload Documents</h3>
              <button onClick={() => setShowUploadModal(false)} style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 8 }}>
                <X size={20} style={{ color: colors.textSecondary }} />
              </button>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              style={{ 
                border: `2px dashed ${colors.border}`, 
                borderRadius: 12, 
                padding: 40, 
                textAlign: 'center', 
                cursor: 'pointer',
                marginBottom: 24,
                transition: 'all 0.2s'
              }}
            >
              <Upload size={40} style={{ color: colors.textSecondary, marginBottom: 12 }} />
              <p style={{ fontSize: 16, fontWeight: 500, color: colors.text, margin: '0 0 4px 0' }}>Click to upload or drag and drop</p>
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

            {activeFolder && (
              <div style={{ padding: 12, backgroundColor: colors.bgSecondary, borderRadius: 8, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Folder size={18} style={{ color: accentColor }} />
                <span style={{ fontSize: 14, color: colors.text }}>Uploading to: <strong>{activeFolder}</strong></span>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowUploadModal(false)} style={{ flex: 1, padding: '12px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', color: colors.text }}>
                Cancel
              </button>
              <button onClick={() => fileInputRef.current?.click()} style={{ flex: 1, padding: '12px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none' }}>
                Browse Files
              </button>
            </div>
          </div>
        </div>
      )}

      {showDocumentModal && selectedDocument && (
        <div onClick={() => setShowDocumentModal(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 150, padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: colors.card, borderRadius: 16, width: 560, maxWidth: '100%', maxHeight: '90vh', overflow: 'hidden', boxShadow: isDark ? '0 25px 50px rgba(0,0,0,0.5)' : '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ padding: 24, borderBottom: `1px solid ${colors.border}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: `${getFileIcon(selectedDocument.type).color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: getFileIcon(selectedDocument.type).color }}>
                    {React.createElement(getFileIcon(selectedDocument.type).icon, { size: 28 })}
                  </div>
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>{selectedDocument.name}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13, color: colors.textSecondary }}>{selectedDocument.size}</span>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: colors.textMuted }}></span>
                      <span style={{ fontSize: 13, color: colors.textSecondary }}>Version {selectedDocument.version}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowDocumentModal(false)} style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 8 }}>
                  <X size={20} style={{ color: colors.textSecondary }} />
                </button>
              </div>
            </div>

            <div className="custom-scrollbar" style={{ padding: 24, maxHeight: 'calc(90vh - 220px)', overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                <div style={{ padding: 14, backgroundColor: colors.bgSecondary, borderRadius: 10 }}>
                  <p style={{ fontSize: 11, color: colors.textMuted, margin: '0 0 4px 0', textTransform: 'uppercase' }}>Uploaded By</p>
                  <p style={{ fontSize: 14, color: colors.text, margin: 0, fontWeight: 500 }}>{selectedDocument.uploadedBy}</p>
                </div>
                <div style={{ padding: 14, backgroundColor: colors.bgSecondary, borderRadius: 10 }}>
                  <p style={{ fontSize: 11, color: colors.textMuted, margin: '0 0 4px 0', textTransform: 'uppercase' }}>Upload Date</p>
                  <p style={{ fontSize: 14, color: colors.text, margin: 0, fontWeight: 500 }}>{selectedDocument.uploadDate}</p>
                </div>
                <div style={{ padding: 14, backgroundColor: colors.bgSecondary, borderRadius: 10 }}>
                  <p style={{ fontSize: 11, color: colors.textMuted, margin: '0 0 4px 0', textTransform: 'uppercase' }}>Modified</p>
                  <p style={{ fontSize: 14, color: colors.text, margin: 0, fontWeight: 500 }}>{selectedDocument.modifiedDate}</p>
                </div>
                <div style={{ padding: 14, backgroundColor: colors.bgSecondary, borderRadius: 10 }}>
                  <p style={{ fontSize: 11, color: colors.textMuted, margin: '0 0 4px 0', textTransform: 'uppercase' }}>Category</p>
                  <p style={{ fontSize: 14, color: colors.text, margin: 0, fontWeight: 500 }}>{selectedDocument.category}</p>
                </div>
              </div>

              {selectedDocument.matter && (
                <div style={{ padding: 14, backgroundColor: colors.accentLight, borderRadius: 10, marginBottom: 24, borderLeft: `3px solid ${accentColor}` }}>
                  <p style={{ fontSize: 11, color: accentColor, margin: '0 0 4px 0', textTransform: 'uppercase', fontWeight: 600 }}>Related Matter</p>
                  <p style={{ fontSize: 14, color: colors.text, margin: 0, fontWeight: 500 }}>{selectedDocument.matter}</p>
                  <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>{selectedDocument.matterNumber}</p>
                </div>
              )}

              {selectedDocument.tags.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: colors.textSecondary, margin: '0 0 10px 0', textTransform: 'uppercase' }}>Tags</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {selectedDocument.tags.map((tag, i) => (
                      <span key={i} style={{ padding: '6px 12px', borderRadius: 20, fontSize: 12, backgroundColor: colors.bgTertiary, color: colors.text }}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                <button
                  onClick={() => { addNotification('info', 'Opening preview...'); }}
                  style={{ padding: '12px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: colors.text }}
                >
                  <Eye size={16} /> Preview
                </button>
                <button
                  onClick={() => { addNotification('success', `Downloading ${selectedDocument.name}`); }}
                  style={{ padding: '12px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: colors.text }}
                >
                  <Download size={16} /> Download
                </button>
                <button
                  onClick={() => { addNotification('info', 'Sharing document...'); }}
                  style={{ padding: '12px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: colors.text }}
                >
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>

            <div style={{ padding: '16px 24px', borderTop: `1px solid ${colors.border}`, display: 'flex', gap: 12 }}>
              <button
                onClick={() => deleteFile(selectedDocument.id)}
                style={{ padding: '12px 20px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: colors.error }}
              >
                <Trash2 size={16} /> Delete
              </button>
              <button
                onClick={() => setShowDocumentModal(false)}
                style={{ flex: 1, padding: '12px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewFolderModal && (
        <div onClick={() => setShowNewFolderModal(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 150, padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: colors.card, borderRadius: 12, padding: 24, width: 400, maxWidth: '100%', boxShadow: isDark ? '0 25px 50px rgba(0,0,0,0.5)' : '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>Create New Folder</h3>
              <button onClick={() => setShowNewFolderModal(false)} style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 8 }}>
                <X size={20} style={{ color: colors.textSecondary }} />
              </button>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: colors.text, display: 'block', marginBottom: 8 }}>Folder Name</label>
              <input
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name..."
                style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: colors.input, color: colors.text, boxSizing: 'border-box' }}
                onKeyDown={(e) => { if (e.key === 'Enter') createFolder(); }}
                autoFocus
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowNewFolderModal(false)} style={{ flex: 1, padding: '12px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', color: colors.text }}>
                Cancel
              </button>
              <button onClick={createFolder} style={{ flex: 1, padding: '12px', backgroundColor: accentColor, color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none' }}>
                Create Folder
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .documents-sidebar { display: none !important; }
        }
      `}</style>
    </div>
  );
}