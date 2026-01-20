import React from 'react';
import { Puzzle, Plus, CheckCircle2, X, ExternalLink } from 'lucide-react';

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

export default function AppIntegrationsPageReact({ isDark = false, accentColor = '#4772fa' }) {
  const colors = getThemeColors(isDark, accentColor);

  const integrations = [
    { id: 1, name: 'Google Calendar', icon: 'calendar', description: 'Sync your court dates with Google Calendar', connected: true },
    { id: 2, name: 'Microsoft Outlook', icon: 'mail', description: 'Email integration for case communications', connected: true },
    { id: 3, name: 'Dropbox', icon: 'cloud', description: 'Secure document storage and sharing', connected: false },
    { id: 4, name: 'Slack', icon: 'message-square', description: 'Team communication and collaboration', connected: false },
    { id: 5, name: 'Zoom', icon: 'video', description: 'Video conferencing for virtual hearings', connected: true }
  ];

  return (
    <div style={{ padding: 24, backgroundColor: colors.bg, color: colors.text, minHeight: '100vh' }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, color: colors.text, marginBottom: 24, margin: '0 0 24px 0' }}>App Integrations</h1>
      <p style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 32, margin: '0 0 32px 0' }}>Connect your favorite apps and services to streamline your workflow</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {integrations.map((integration) => (
          <div key={integration.id} style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 24, transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: colors.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Puzzle size={28} style={{ color: accentColor }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>{integration.name}</h3>
                <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0 }}>{integration.description}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ 
                fontSize: 12, 
                padding: '4px 12px', 
                borderRadius: 12, 
                fontWeight: 500,
                backgroundColor: integration.connected ? colors.success : colors.bgTertiary,
                color: integration.connected ? '#fff' : colors.textSecondary
              }}>
                {integration.connected ? 'Connected' : 'Connect'}
              </span>
              <button style={{ 
                padding: 8, 
                backgroundColor: colors.bgTertiary, 
                border: `1px solid ${colors.border}`, 
                borderRadius: 6, 
                cursor: 'pointer',
                color: colors.textSecondary
              }}>
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, padding: 24, backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, textAlign: 'center' }}>
        <button style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 12, 
          padding: '14px 24px', 
          backgroundColor: accentColor, 
          color: '#fff', 
          border: 'none', 
          borderRadius: 8, 
          fontSize: 14, 
          fontWeight: 600, 
          cursor: 'pointer'
        }}>
          <Plus size={20} /> Add New Integration
        </button>
      </div>
    </div>
  );
}
