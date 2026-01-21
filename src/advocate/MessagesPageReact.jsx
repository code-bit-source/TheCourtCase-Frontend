import React, { useState, useRef, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { messageService } from '../services';
import {
  MessageSquare, Phone, Video, Info, Send, Paperclip,
  Search, Users, Inbox, Smartphone, Mail, Bell,
  CheckCircle2, X, ChevronLeft, Download, FileText
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

export default function MessagesPageReact() {
  const context = useOutletContext();
  const isDark = context?.isDark || false;
  const accentColor = context?.accentColor || '#4772fa';
  const addNotification = context?.addNotification || (() => {});
  
  const colors = getThemeColors(isDark, accentColor);
  const [message, setMessage] = useState('');
  const [activeConversation, setActiveConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Loading and error states
  const [loading, setLoading] = useState({
    conversations: false,
    messages: false,
    sending: false
  });
  const [error, setError] = useState({
    conversations: null,
    messages: null
  });

  // Fetch conversations on component mount
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(prev => ({ ...prev, conversations: true }));
      try {
        const response = await messageService.getMessages();
        // Transform API response to match UI format
        const formattedConversations = response.data.map(conv => ({
          id: conv.id,
          name: conv.participants?.[0]?.name || 'Unknown',
          role: conv.participants?.[0]?.role || 'User',
          avatar: conv.participants?.[0]?.avatar || 'https://via.placeholder.com/100',
          status: conv.participants?.[0]?.status || 'offline',
          matter: conv.case?.name || 'No matter',
          matterNumber: conv.case?.caseNumber || '',
          lastMessage: conv.lastMessage || 'No messages yet',
          lastMessageTime: conv.lastMessageTime || 'Recently',
          unread: conv.unreadCount || 0,
          channel: conv.channel || 'portal',
          phone: conv.participants?.[0]?.phone || '',
          email: conv.participants?.[0]?.email || ''
        }));
        setConversations(formattedConversations);
        setError(prev => ({ ...prev, conversations: null }));
        
        // Set first conversation as active if none selected
        if (!activeConversation && formattedConversations.length > 0) {
          setActiveConversation(formattedConversations[0].id);
        }
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError(prev => ({ ...prev, conversations: 'Failed to load conversations' }));
        addNotification('error', 'Failed to load conversations');
      } finally {
        setLoading(prev => ({ ...prev, conversations: false }));
      }
    };

    fetchConversations();
}, [addNotification, activeConversation]);


  // Fetch messages when conversation changes
  useEffect(() => {
    if (!activeConversation) return;

    const fetchMessages = async () => {
      setLoading(prev => ({ ...prev, messages: true }));
      try {
        const response = await messageService.getConversation(activeConversation);
        // Transform API response to match UI format
        const formattedMessages = response.data.map(msg => ({
          id: msg.id,
          from: msg.sender?.role === 'client' ? 'client' : 'advocate',
          name: msg.sender?.name || 'Unknown',
          text: msg.content || '',
          time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          channel: msg.channel || 'portal',
          read: msg.read || false,
          attachment: msg.attachment ? {
            name: msg.attachment.name,
            size: msg.attachment.size
          } : null
        }));
        setAllMessages(prev => ({ ...prev, [activeConversation]: formattedMessages }));
        setError(prev => ({ ...prev, messages: null }));
        
        // Mark messages as read
        await messageService.markAllAsRead();
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError(prev => ({ ...prev, messages: 'Failed to load messages' }));
        addNotification('error', 'Failed to load messages');
      } finally {
        setLoading(prev => ({ ...prev, messages: false }));
      }
    };

    fetchMessages();
  }, [activeConversation, addNotification]);

  // Mobile responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [conversations, setConversations] = useState([]);
  const [allMessages, setAllMessages] = useState({});

  const channels = [
    { id: 'all', label: 'All Messages', icon: Inbox, count: conversations.reduce((sum, c) => sum + c.unread, 0) },
    { id: 'portal', label: 'Client Portal', icon: MessageSquare, count: conversations.filter((c) => c.channel === 'portal').reduce((sum, c) => sum + c.unread, 0) },
    { id: 'sms', label: 'Text Messages', icon: Smartphone, count: conversations.filter((c) => c.channel === 'sms').reduce((sum, c) => sum + c.unread, 0) },
    { id: 'email', label: 'Email', icon: Mail, count: conversations.filter((c) => c.channel === 'email').reduce((sum, c) => sum + c.unread, 0) }
  ];

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'sms': return Smartphone;
      case 'email': return Mail;
      case 'portal': return MessageSquare;
      default: return MessageSquare;
    }
  };

  const getChannelColor = (channel) => {
    switch (channel) {
      case 'sms': return '#00c853';
      case 'email': return '#4772fa';
      case 'portal': return '#9c27b0';
      default: return accentColor;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#00c853';
      case 'offline': return '#808080';
      default: return '#808080';
    }
  };

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.matter.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const currentConversation = conversations.find((c) => c.id === activeConversation);
  const currentMessages = allMessages[activeConversation] || [];

  const handleSendMessage = async () => {
    if (!message.trim() || !activeConversation) return;

    setLoading(prev => ({ ...prev, sending: true }));
    try {
      const response = await messageService.sendMessage({
        conversationId: activeConversation,
        content: message
      });

      // Add new message to state
      const newMsg = {
        id: response.data.id,
        from: 'client',
        name: 'You',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: 'Today',
        channel: currentConversation?.channel || 'portal',
        read: true
      };
      setAllMessages((prev) => ({
        ...prev,
        [activeConversation]: [...(prev[activeConversation] || []), newMsg]
      }));
      setConversations((prev) => prev.map((c) =>
        c.id === activeConversation ? { ...c, lastMessage: message, lastMessageTime: 'Just now' } : c
      ));
      setMessage('');
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) {
      console.error('Error sending message:', err);
      addNotification('error', 'Failed to send message');
    } finally {
      setLoading(prev => ({ ...prev, sending: false }));
    }
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0 && activeConversation) {
      setLoading(prev => ({ ...prev, sending: true }));
      try {
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('conversationId', activeConversation);

        const response = await messageService.uploadAttachment(formData);

        // Add new message with attachment to state
        const newMsg = {
          id: response.data.id,
          from: 'client',
          name: 'You',
          text: `Shared a file: ${files[0].name}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: 'Today',
          channel: currentConversation?.channel || 'portal',
          read: true,
          attachment: { name: files[0].name, size: `${(files[0].size / 1024).toFixed(0)} KB` }
        };
        setAllMessages((prev) => ({
          ...prev,
          [activeConversation]: [...(prev[activeConversation] || []), newMsg]
        }));
        setConversations((prev) => prev.map((c) =>
          c.id === activeConversation ? { ...c, lastMessage: `Shared a file: ${files[0].name}`, lastMessageTime: 'Just now' } : c
        ));
        addNotification('success', 'File uploaded successfully');
      } catch (err) {
        console.error('Error uploading file:', err);
        addNotification('error', 'Failed to upload file');
      } finally {
        setLoading(prev => ({ ...prev, sending: false }));
      }
    }
  };

  const selectConversation = async (convId) => {
    setActiveConversation(convId);
    setConversations((prev) => prev.map((c) => c.id === convId ? { ...c, unread: 0 } : c));
    
    // Mark conversation as read
    try {
      await messageService.markAsRead(convId);
    } catch (err) {
      console.error('Error marking conversation as read:', err);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: colors.bg }}>
      <aside style={{ width: 340, borderRight: `1px solid ${colors.border}`, backgroundColor: colors.card, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: 16, borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.text, margin: 0 }}>Messages</h2>
            <button style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: accentColor, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </button>
          </div>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary }} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              style={{ width: '100%', padding: '10px 12px 10px 38px', border: `1px solid ${colors.border}`, borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: colors.input, color: colors.text, boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, padding: '12px 16px', borderBottom: `1px solid ${colors.border}`, overflowX: 'auto' }}>
          {channels.map((ch) => (
            <button
              key={ch.id}
              onClick={() => {}}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', border: 'none', flexShrink: 0,
                backgroundColor: accentColor,
                color: '#fff'
              }}
            >
              <ch.icon size={14} />
              {ch.label}
              {ch.count > 0 && (
                <span style={{ backgroundColor: 'rgba(255,255,255,0.3)', color: '#fff', padding: '2px 6px', borderRadius: 10, fontSize: 10, fontWeight: 600 }}>{ch.count}</span>
              )}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {loading.conversations ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ width: 40, height: 40, border: `3px solid ${colors.borderLight}`, borderTopColor: accentColor, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
              <p style={{ fontSize: 14, color: colors.textSecondary }}>Loading conversations...</p>
            </div>
          ) : error.conversations ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <MessageSquare size={40} style={{ color: colors.error, marginBottom: 12 }} />
              <p style={{ fontSize: 14, color: colors.textSecondary, margin: '0 0 8px 0' }}>{error.conversations}</p>
              <button onClick={() => window.location.reload()} style={{ padding: '8px 16px', backgroundColor: accentColor, color: '#fff', borderRadius: 6, fontSize: 13, cursor: 'pointer', border: 'none' }}>Retry</button>
            </div>
          ) : filteredConversations.length > 0 ? filteredConversations.map((conv) => {
            const ChannelIcon = getChannelIcon(conv.channel);
            return (
              <div
                key={conv.id}
                onClick={() => selectConversation(conv.id)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', cursor: 'pointer', borderBottom: `1px solid ${colors.borderLight}`,
                  backgroundColor: activeConversation === conv.id ? colors.accentLight : 'transparent'
                }}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img src={conv.avatar} alt={conv.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: '50%', backgroundColor: getStatusColor(conv.status), border: `2px solid ${colors.card}` }}></div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: conv.unread > 0 ? 600 : 500, color: colors.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.name}</span>
                    <span style={{ fontSize: 11, color: conv.unread > 0 ? accentColor : colors.textMuted, fontWeight: conv.unread > 0 ? 600 : 400, flexShrink: 0 }}>{conv.lastMessageTime}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: colors.textSecondary }}>{conv.role}</span>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: colors.textMuted }}></span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <ChannelIcon size={12} style={{ color: getChannelColor(conv.channel) }} />
                      <span style={{ fontSize: 11, color: getChannelColor(conv.channel), textTransform: 'capitalize' }}>{conv.channel}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: 13, color: conv.unread > 0 ? colors.text : colors.textSecondary, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: conv.unread > 0 ? 500 : 400, flex: 1 }}>{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span style={{ backgroundColor: accentColor, color: '#fff', padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600, marginLeft: 8, flexShrink: 0 }}>{conv.unread}</span>
                    )}
                  </div>
                  <p style={{ fontSize: 11, color: colors.textMuted, margin: '4px 0 0 0' }}>{conv.matter}</p>
                </div>
              </div>
            );
          }) : (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <MessageSquare size={40} style={{ color: colors.textMuted, marginBottom: 12, opacity: 0.3 }} />
              <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>No conversations found</p>
            </div>
          )}
        </div>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: colors.card }}>
        <header style={{ height: 64, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.card }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isMobile && (
              <button onClick={() => {}} style={{ padding: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6, marginRight: 4 }}>
                <ChevronLeft size={24} style={{ color: colors.textSecondary }} />
              </button>
            )}
            {currentConversation && (
              <>
                <div style={{ position: 'relative' }}>
                  <img src={currentConversation.avatar} alt={currentConversation.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: '50%', backgroundColor: getStatusColor(currentConversation.status), border: `2px solid ${colors.card}` }}></div>
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: 0 }}>{currentConversation.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, color: colors.textSecondary }}>{currentConversation.role}</span>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: colors.textMuted }}></span>
                    <span style={{ fontSize: 12, color: getStatusColor(currentConversation.status), textTransform: 'capitalize' }}>{currentConversation.status}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button onClick={() => {}} style={{ padding: 10, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 8, minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={20} style={{ color: colors.textSecondary }} />
            </button>
            <button onClick={() => {}} style={{ padding: 10, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 8, minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Video size={20} style={{ color: colors.textSecondary }} />
            </button>
            <button onClick={() => setShowContactInfo(!showContactInfo)} style={{ padding: 10, backgroundColor: showContactInfo ? colors.accentLight : 'transparent', border: 'none', cursor: 'pointer', borderRadius: 8, minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Info size={20} style={{ color: showContactInfo ? accentColor : colors.textSecondary }} />
            </button>
          </div>
        </header>

        {currentConversation && (
          <div style={{ padding: '8px 16px', backgroundColor: colors.bgSecondary, borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: colors.textSecondary }}>Matter:</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>{currentConversation.matter}</span>
            <span style={{ fontSize: 12, color: colors.textMuted }}>({currentConversation.matterNumber})</span>
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto', padding: 20, backgroundColor: colors.bgSecondary, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {loading.messages ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ width: 40, height: 40, border: `3px solid ${colors.borderLight}`, borderTopColor: accentColor, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
              <p style={{ fontSize: 14, color: colors.textSecondary }}>Loading messages...</p>
            </div>
          ) : error.messages ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <MessageSquare size={40} style={{ color: colors.error, marginBottom: 12 }} />
              <p style={{ fontSize: 14, color: colors.textSecondary, margin: '0 0 8px 0' }}>{error.messages}</p>
              <button onClick={() => window.location.reload()} style={{ padding: '8px 16px', backgroundColor: accentColor, color: '#fff', borderRadius: 6, fontSize: 13, cursor: 'pointer', border: 'none' }}>Retry</button>
            </div>
          ) : currentMessages.map((msg, i) => {
            const showDateDivider = i === 0 || currentMessages[i - 1]?.date !== msg.date;
            const ChannelIcon = getChannelIcon(msg.channel);
            return (
              <div key={msg.id}>
                {showDateDivider && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0 16px' }}>
                    <span style={{ fontSize: 12, color: colors.textMuted, backgroundColor: colors.bgSecondary, padding: '4px 12px' }}>{msg.date}</span>
                  </div>
                )}
                <div style={{ display: 'flex', gap: 12, maxWidth: '75%', marginLeft: msg.from === 'client' ? 'auto' : 0, flexDirection: msg.from === 'client' ? 'row-reverse' : 'row' }}>
                  {msg.from !== 'client' && (
                    <img src={currentConversation?.avatar} alt={msg.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, marginTop: 4 }} />
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.from === 'client' ? 'flex-end' : 'flex-start', flex: 1, minWidth: 0 }}>
                    {msg.from !== 'client' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>{msg.name}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <ChannelIcon size={12} style={{ color: getChannelColor(msg.channel) }} />
                        </div>
                      </div>
                    )}
                    <div style={{ padding: '12px 16px', borderRadius: 16, borderBottomRightRadius: msg.from === 'client' ? 4 : 16, borderBottomLeftRadius: msg.from === 'client' ? 16 : 4, backgroundColor: msg.from === 'client' ? accentColor : colors.card, color: msg.from === 'client' ? '#fff' : colors.text, border: msg.from === 'client' ? 'none' : `1px solid ${colors.border}`, maxWidth: '100%', wordWrap: 'break-word' }}>
                      <p style={{ fontSize: 14, margin: 0, lineHeight: 1.5 }}>{msg.text}</p>
                      {msg.attachment && (
                        <div style={{ marginTop: 10, padding: '10px 12px', backgroundColor: msg.from === 'client' ? 'rgba(255,255,255,0.15)' : colors.bgTertiary, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                          <FileText size={20} style={{ color: msg.from === 'client' ? '#fff' : accentColor }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 13, fontWeight: 500, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.attachment.name}</p>
                            <p style={{ fontSize: 11, margin: '2px 0 0 0', opacity: 0.7 }}>{msg.attachment.size}</p>
                          </div>
                          <Download size={16} style={{ opacity: 0.7 }} />
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, padding: '0 4px' }}>
                      <span style={{ fontSize: 11, color: colors.textMuted }}>{msg.time}</span>
                      {msg.from === 'client' && (
                        <CheckCircle2 size={12} style={{ color: msg.read ? '#00c853' : colors.textMuted }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: 16, borderTop: `1px solid ${colors.border}`, backgroundColor: colors.card }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => fileInputRef.current?.click()} style={{ padding: 10, color: colors.textSecondary, cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: 8, minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Attach file">
                <Paperclip size={20} />
              </button>
              <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileUpload} />
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                style={{ width: '100%', minHeight: 44, maxHeight: 120, padding: '12px 16px', border: `1px solid ${colors.border}`, borderRadius: 12, fontSize: 14, outline: 'none', resize: 'none', backgroundColor: colors.input, color: colors.text, boxSizing: 'border-box' }}
                placeholder="Type a message..."
                rows={1}
              />
            </div>
            <button onClick={handleSendMessage} disabled={!message.trim() || loading.sending} style={{ padding: 12, backgroundColor: message.trim() && !loading.sending ? accentColor : colors.bgTertiary, color: message.trim() && !loading.sending ? '#fff' : colors.textMuted, borderRadius: 12, cursor: message.trim() && !loading.sending ? 'pointer' : 'not-allowed', border: 'none', minWidth: 48, minHeight: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
              {loading.sending ? (
                <div style={{ width: 20, height: 20, border: `2px solid ${colors.textMuted}`, borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        </div>
      </main>

      {showContactInfo && !isMobile && currentConversation && (
        <div style={{ width: 280, borderLeft: `1px solid ${colors.border}`, backgroundColor: colors.card, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 20, textAlign: 'center', borderBottom: `1px solid ${colors.border}` }}>
            <img src={currentConversation?.avatar} alt={currentConversation?.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: `3px solid ${accentColor}` }} />
            <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>{currentConversation?.name}</h3>
            <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>{currentConversation?.role}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: getStatusColor(currentConversation?.status || 'offline') }}></span>
              <span style={{ fontSize: 13, color: colors.textSecondary, textTransform: 'capitalize' }}>{currentConversation?.status}</span>
            </div>
          </div>

          <div style={{ padding: 16 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <button onClick={() => {}} style={{ flex: 1, padding: '10px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, color: colors.text }}>
                <Phone size={16} /> Call
              </button>
              <button onClick={() => {}} style={{ flex: 1, padding: '10px', backgroundColor: colors.bgTertiary, border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, color: colors.text }}>
                <Mail size={16} /> Email
              </button>
            </div>

            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px 0' }}>Contact Info</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', backgroundColor: colors.bgTertiary, borderRadius: 8 }}>
                  <Phone size={16} style={{ color: colors.textSecondary }} />
                  <div>
                    <p style={{ fontSize: 12, color: colors.textMuted, margin: 0 }}>Phone</p>
                    <p style={{ fontSize: 14, color: colors.text, margin: '2px 0 0 0' }}>{currentConversation?.phone}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', backgroundColor: colors.bgTertiary, borderRadius: 8 }}>
                  <Mail size={16} style={{ color: colors.textSecondary }} />
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 12, color: colors.textMuted, margin: 0 }}>Email</p>
                    <p style={{ fontSize: 14, color: colors.text, margin: '2px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentConversation?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px 0' }}>Related Matter</p>
              <div style={{ padding: '12px', backgroundColor: colors.bgTertiary, borderRadius: 8, borderLeft: `3px solid ${accentColor}` }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>{currentConversation?.matter}</p>
                <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>{currentConversation?.matterNumber}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
