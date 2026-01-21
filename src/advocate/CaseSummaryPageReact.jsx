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
    <div
  className="min-h-screen p-6"
  style={{ backgroundColor: colors.bg, color: colors.text }}
>
  <div className="text-center py-10 px-4">

    {/* Icon Box */}
    <div
      className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
      style={{ backgroundColor: colors.accentLight }}
    >
      <Briefcase size={40} style={{ color: accentColor }} />
    </div>

    {/* Heading */}
    <h1
      className="text-2xl sm:text-3xl font-semibold mb-4"
      style={{ color: colors.text }}
    >
      Case Summary
    </h1>

    <p
      className="text-sm sm:text-base mb-2"
      style={{ color: colors.textSecondary }}
    >
      View and manage case details, documents, and timeline
    </p>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 max-w-5xl mx-auto">

      {/* Card */}
      <div
        className="p-5 rounded-xl border text-center"
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
      >
        <Scale size={32} style={{ color: accentColor }} className="mx-auto mb-3" />
        <p className="text-sm font-medium" style={{ color: colors.text }}>
          Case Information
        </p>
      </div>

      <div
        className="p-5 rounded-xl border text-center"
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
      >
        <FileText size={32} style={{ color: accentColor }} className="mx-auto mb-3" />
        <p className="text-sm font-medium" style={{ color: colors.text }}>
          Documents
        </p>
      </div>

      <div
        className="p-5 rounded-xl border text-center"
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
      >
        <Calendar size={32} style={{ color: accentColor }} className="mx-auto mb-3" />
        <p className="text-sm font-medium" style={{ color: colors.text }}>
          Timeline
        </p>
      </div>

      <div
        className="p-5 rounded-xl border text-center"
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
      >
        <Users size={32} style={{ color: accentColor }} className="mx-auto mb-3" />
        <p className="text-sm font-medium" style={{ color: colors.text }}>
          Parties
        </p>
      </div>

    </div>
  </div>
</div>

  );
}
