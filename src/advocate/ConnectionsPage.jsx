"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, UserPlus, CheckCircle, XCircle, Users, Mail, Phone,
  MapPin, Star, TrendingUp, AlertCircle, Loader, MessageSquare
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
});

export default function ConnectionsPage({ addNotification = () => {}, isDark = false, accentColor = '#4772fa' }) {
  const navigate = useNavigate();
  const colors = getThemeColors(isDark, accentColor);

  const [searchQuery, setSearchQuery] = useState('');
  const [advocates, setAdvocates] = useState([]);
  const [myConnections, setMyConnections] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const [searchRole, setSearchRole] = useState('advocate'); // advocate, paralegal, client

  useEffect(() => {
    fetchConnections();
    fetchReceivedRequests();
    fetchSentRequests();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/connections/connections`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMyConnections(data.connections || []);
      }
    } catch (err) {
      console.error('Error fetching connections:', err);
    }
  };

  const fetchReceivedRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/connections/requests/received`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setReceivedRequests(data.requests || []);
      }
    } catch (err) {
      console.error('Error fetching received requests:', err);
    }
  };

  const fetchSentRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/connections/requests/sent`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSentRequests(data.requests || []);
      }
    } catch (err) {
      console.error('Error fetching sent requests:', err);
    }
  };

  const searchAdvocates = async () => {
    if (!searchQuery.trim()) {
      setAdvocates([]);
      return;
    }

    try {
      setLoading(true);
      let endpoint = '';
      
      if (searchRole === 'advocate') {
        endpoint = `${API_BASE_URL}/connections/search/advocates?search=${encodeURIComponent(searchQuery)}`;
      } else if (searchRole === 'paralegal') {
        endpoint = `${API_BASE_URL}/connections/search/paralegals?search=${encodeURIComponent(searchQuery)}`;
      } else if (searchRole === 'client') {
        endpoint = `${API_BASE_URL}/connections/search/clients?search=${encodeURIComponent(searchQuery)}`;
      }

      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (searchRole === 'advocate') {
          setAdvocates(data.advocates || []);
        } else if (searchRole === 'paralegal') {
          setAdvocates(data.paralegals || []);
        } else if (searchRole === 'client') {
          setAdvocates(data.clients || []);
        }
      }
    } catch (err) {
      console.error('Search error:', err);
      addNotification('error', 'Failed to search');
    } finally {
      setLoading(false);
    }
  };

  const sendConnectionRequest = async (advocateId) => {
    try {
      // Update local state immediately to show "Pending"
      setAdvocates(advocates.map(adv => 
        adv._id === advocateId ? { ...adv, requestSent: true } : adv
      ));
      
      const response = await fetch(`${API_BASE_URL}/connections/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          recipientId: advocateId,
          connectionType: 'advocate',
          requestMessage: 'I would like to connect with you'
        })
      });

      if (response.ok) {
        addNotification('success', 'Connection request sent!');
        fetchSentRequests();
      } else {
        const error = await response.json();
        addNotification('error', error.message || 'Failed to send request');
        // Revert local state if request fails
        setAdvocates(advocates.map(adv => 
          adv._id === advocateId ? { ...adv, requestSent: false } : adv
        ));
      }
    } catch (err) {
      console.error('Error sending request:', err);
      addNotification('error', 'Failed to send connection request');
      // Revert local state if request fails
      setAdvocates(advocates.map(adv => 
        adv._id === advocateId ? { ...adv, requestSent: false } : adv
      ));
    }
  };

  const acceptConnection = async (requestId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/connections/request/${requestId}/accept`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        addNotification('success', 'Connection accepted!');
        fetchConnections();
        fetchReceivedRequests();
      } else {
        const error = await response.json();
        addNotification('error', error.message || 'Failed to accept request');
      }
    } catch (err) {
      console.error('Error accepting request:', err);
      addNotification('error', 'Failed to accept connection');
    }
  };

  const rejectConnection = async (requestId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/connections/request/${requestId}/reject`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        addNotification('success', 'Connection rejected');
        fetchReceivedRequests();
      } else {
        const error = await response.json();
        addNotification('error', error.message || 'Failed to reject request');
      }
    } catch (err) {
      console.error('Error rejecting request:', err);
      addNotification('error', 'Failed to reject connection');
    }
  };

  const navigateToMessages = (userId, userName) => {
    navigate('/advocate/messages', { state: { selectedUserId: userId, selectedUserName: userName } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: colors.bg }}>
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.card }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Users size={28} color={accentColor} />
          <h1 style={{ fontSize: '24px', fontWeight: '600', margin: 0, color: colors.text }}>Connections</h1>
        </div>
        <p style={{ fontSize: '14px', color: colors.textSecondary, margin: 0 }}>Search for advocates and manage your professional connections</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.bgSecondary }}>
        {[
          { id: 'search', label: 'Search Advocates', icon: Search },
          { id: 'pending', label: `Pending (${sentRequests.length})`, icon: AlertCircle },
          { id: 'received', label: `Requests (${receivedRequests.length})`, icon: UserPlus },
          { id: 'connected', label: `Connected (${myConnections.length})`, icon: CheckCircle }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: 'none',
              background: activeTab === tab.id ? colors.accent : 'transparent',
              color: activeTab === tab.id ? 'white' : colors.textSecondary,
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: activeTab === tab.id ? '600' : '400',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* Search Tab */}
        {activeTab === 'search' && (
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <select
                value={searchRole}
                onChange={(e) => {
                  setSearchRole(e.target.value);
                  setAdvocates([]);
                }}
                style={{
                  padding: '8px 12px',
                  background: colors.card,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  color: colors.text,
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="advocate">Advocates</option>
                <option value="paralegal">Paralegals</option>
                <option value="client">Clients</option>
              </select>

              <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', background: colors.card, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '8px 12px' }}>
                <Search size={18} color={colors.textSecondary} style={{ marginRight: '8px' }} />
                <input
                  type="text"
                  placeholder="Search by name, email, or username..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchAdvocates()}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '14px',
                    color: colors.text
                  }}
                />
              </div>
              <button
                onClick={searchAdvocates}
                disabled={loading}
                style={{
                  padding: '8px 16px',
                  background: accentColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                {loading ? <Loader size={16} className="animate-spin" /> : <Search size={16} />}
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>

            {advocates.length > 0 ? (
              <div style={{ display: 'grid', gap: '12px' }}>
                {advocates.map((advocate) => {
                  const isRequested = sentRequests.some(r => r.recipient?._id === advocate._id || r.recipient === advocate._id);
                  const isConnected = myConnections.some(c => c.user?._id === advocate._id || c.user === advocate._id);
                  
                  return (
                    <div
                      key={advocate._id}
                      style={{
                        padding: '16px',
                        background: colors.card,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: colors.text }}>
                          {advocate.name}
                        </h3>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: colors.textSecondary }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Mail size={14} />
                            {advocate.email}
                          </div>
                          {advocate.phone && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Phone size={14} />
                              {advocate.phone}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => sendConnectionRequest(advocate._id)}
                        disabled={isRequested || isConnected || loading}
                        style={{
                          padding: '8px 16px',
                          background: isConnected ? '#00c853' : isRequested ? '#ff9500' : accentColor,
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: (isRequested || isConnected) ? 'default' : 'pointer',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          opacity: loading ? 0.6 : 1
                        }}
                      >
                        {isConnected ? (
                          <>
                            <CheckCircle size={14} />
                            Connected
                          </>
                        ) : isRequested ? (
                          <>
                            <AlertCircle size={14} />
                            Pending
                          </>
                        ) : (
                          <>
                            <UserPlus size={14} />
                            Connect
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : searchQuery ? (
              <div style={{ textAlign: 'center', padding: '40px', color: colors.textSecondary }}>
                <Search size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p style={{ fontSize: '14px' }}>No {searchRole}s found for "{searchQuery}"</p>
                <p style={{ fontSize: '12px', color: colors.textMuted, marginTop: '8px' }}>Try searching by name, email, or username</p>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: colors.textSecondary }}>
                <Search size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p style={{ fontSize: '14px' }}>Search for {searchRole}s by name, email, or username</p>
              </div>
            )}
          </div>
        )}

        {/* Pending Requests Tab */}
        {activeTab === 'pending' && (
          <div>
            {sentRequests.length > 0 ? (
              <div style={{ display: 'grid', gap: '12px' }}>
                {sentRequests.map((request) => (
                  <div
                    key={request._id}
                    style={{
                      padding: '16px',
                      background: colors.card,
                      border: `1px solid ${colors.warning}33`,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: colors.text }}>
                        {request.recipient?.name || 'Unknown'}
                      </h3>
                      <div style={{ fontSize: '12px', color: colors.textSecondary }}>
                        <p style={{ margin: '0' }}>Waiting for response...</p>
                        <p style={{ margin: '4px 0 0 0', color: colors.textMuted }}>Sent on {new Date(request.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div style={{ background: colors.warning + '22', padding: '6px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: colors.warning }}>
                      <AlertCircle size={14} />
                      Pending
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: colors.textSecondary }}>
                <AlertCircle size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p style={{ fontSize: '14px' }}>No pending requests</p>
              </div>
            )}
          </div>
        )}

        {/* Received Requests Tab */}
        {activeTab === 'received' && (
          <div>
            {receivedRequests.length > 0 ? (
              <div style={{ display: 'grid', gap: '12px' }}>
                {receivedRequests.map((request) => (
                  <div
                    key={request._id}
                    style={{
                      padding: '16px',
                      background: colors.card,
                      border: `1px solid ${colors.accent}33`,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: colors.text }}>
                        {request.requester?.name || 'Unknown'}
                      </h3>
                      <p style={{ margin: 0, fontSize: '12px', color: colors.textSecondary }}>
                        {request.requester?.email}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => acceptConnection(request._id)}
                        style={{
                          padding: '8px 12px',
                          background: colors.success,
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <CheckCircle size={14} />
                        Accept
                      </button>
                      <button
                        onClick={() => rejectConnection(request._id)}
                        style={{
                          padding: '8px 12px',
                          background: colors.error,
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <XCircle size={14} />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: colors.textSecondary }}>
                <UserPlus size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p style={{ fontSize: '14px' }}>No pending requests</p>
              </div>
            )}
          </div>
        )}

        {/* Connected Tab */}
        {activeTab === 'connected' && (
          <div>
            {myConnections.length > 0 ? (
              <div style={{ display: 'grid', gap: '12px' }}>
                {myConnections.map((connection) => (
                  <div
                    key={connection._id}
                    style={{
                      padding: '16px',
                      background: colors.card,
                      border: `1px solid ${colors.success}33`,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: colors.text }}>
                        {connection.user?.name || 'Unknown'}
                      </h3>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: colors.textSecondary }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Mail size={14} />
                          {connection.user?.email}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigateToMessages(connection.user?._id, connection.user?.name)}
                      style={{
                        padding: '8px 16px',
                        background: accentColor,
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      <MessageSquare size={14} />
                      Message
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: colors.textSecondary }}>
                <Users size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p style={{ fontSize: '14px' }}>No connections yet. Search for advocates to connect!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
