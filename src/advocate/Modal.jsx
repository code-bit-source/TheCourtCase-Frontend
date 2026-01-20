"use client";

import React from 'react';
import { X } from 'lucide-react';

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

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  isDark = false, 
  accentColor = '#4772fa',
  maxWidth = 512 
}) {
  const colors = getThemeColors(isDark, accentColor);
  
  if (!isOpen) return null;
  
  return (
    <div 
      onClick={onClose} 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        backgroundColor: 'rgba(0,0,0,0.4)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        zIndex: 150, 
        padding: 16 
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          backgroundColor: colors.card, 
          borderRadius: 8, 
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', 
          maxWidth: maxWidth, 
          width: '100%', 
          maxHeight: '90vh', 
          overflow: 'hidden' 
        }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '16px 20px', 
          borderBottom: `1px solid ${colors.border}` 
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, margin: 0 }}>{title}</h3>
          <button 
            onClick={onClose} 
            style={{ 
              padding: 4, 
              cursor: 'pointer', 
              background: 'none', 
              border: 'none', 
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} style={{ color: colors.textSecondary }} />
          </button>
        </div>
        <div style={{ 
          padding: 20, 
          overflowY: 'auto', 
          maxHeight: 'calc(90vh - 80px)', 
          color: colors.text 
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export const modalStyles = `
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal-fade-in { animation: fadeIn 0.2s ease-out; }
`;
