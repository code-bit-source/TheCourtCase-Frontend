import React from 'react';
import { Briefcase, FileText, Calendar, Users, Scale } from 'lucide-react';

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

export default function CaseSummaryPageReact({ isDark = false, accentColor = '#4772fa' }) {
  const colors = getThemeColors(isDark, accentColor);

  return (
    <div style={{ padding: 24, backgroundColor: colors.bg, color: colors.text, minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ width: 80, height: 80, borderRadius: 20, backgroundColor: colors.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Briefcase size={40} style={{ color: accentColor }} />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, color: colors.text, margin: '0 0 16px 0' }}>Case Summary</h1>
        <p style={{ fontSize: 16, color: colors.textSecondary, margin: '0 0 8px 0' }}>View and manage case details, documents, and timeline</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
          <div style={{ padding: 20, backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, minWidth: 200, textAlign: 'center' }}>
            <Scale size={32} style={{ color: accentColor, marginBottom: 12 }} />
            <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>Case Information</p>
          </div>
          <div style={{ padding: 20, backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, minWidth: 200, textAlign: 'center' }}>
            <FileText size={32} style={{ color: accentColor, marginBottom: 12 }} />
            <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>Documents</p>
          </div>
          <div style={{ padding: 20, backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, minWidth: 200, textAlign: 'center' }}>
            <Calendar size={32} style={{ color: accentColor, marginBottom: 12 }} />
            <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>Timeline</p>
          </div>
          <div style={{ padding: 20, backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, minWidth: 200, textAlign: 'center' }}>
            <Users size={32} style={{ color: accentColor, marginBottom: 12 }} />
            <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>Parties</p>
          </div>
        </div>
      </div>
    </div>
  );
}
