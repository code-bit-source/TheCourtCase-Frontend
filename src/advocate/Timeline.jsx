"use client";

import React, { useState } from 'react';
import { Calendar, FileText, Upload, Clock, Gavel, FileCheck, Info, X } from 'lucide-react';

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

function Modal({ isOpen, onClose, title, children, isDark = false, accentColor = '#4772fa' }) {
  const colors = getThemeColors(isDark, accentColor);
  if (!isOpen) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 150, padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: colors.card, borderRadius: 8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', maxWidth: 512, width: '100%', maxHeight: '90vh', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${colors.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ padding: 4, cursor: 'pointer', background: 'none', border: 'none', borderRadius: 4 }}>
            <X size={18} style={{ color: colors.textSecondary }} />
          </button>
        </div>
        <div style={{ padding: 20, overflowY: 'auto', maxHeight: 'calc(90vh - 80px)', color: colors.text }}>{children}</div>
      </div>
    </div>
  );
}

export default function CaseTimeline({ addNotification, isDark = false, accentColor = '#4772fa' }) {
  const colors = getThemeColors(isDark, accentColor);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const timelineEvents = [
    { type: 'upcoming', icon: Calendar, color: '#ff9500', title: 'Final Oral Arguments', date: 'MAR 18, 2024', time: '10:30 AM', desc: 'Both parties to present final arguments.', purpose: 'Final Hearing' },
    { type: 'order', icon: Gavel, color: '#9c27b0', title: 'Interim Stay Granted', date: 'FEB 02, 2024', desc: 'Temporary stay on recovery proceedings.', simple: 'The court has paused the other party\'s attempts to collect money until the next hearing.' },
    { type: 'filing', icon: FileText, color: '#4772fa', title: 'Counter-Affidavit Filed', date: 'JAN 28, 2024', desc: 'Response to preliminary objections submitted.' },
    { type: 'hearing', icon: Calendar, color: '#4772fa', title: 'Preliminary Hearing', date: 'JAN 20, 2024', desc: 'Initial hearing completed.' },
    { type: 'filing', icon: Upload, color: '#808080', title: 'Evidence Submitted', date: 'JAN 15, 2024', desc: 'Documentary evidence filed.' },
    { type: 'origin', icon: FileCheck, color: '#00c853', title: 'Case Registered', date: 'JAN 12, 2024', desc: 'Writ petition admitted.' }
  ];

  return (
    <div style={{ padding: 24, maxWidth: 768, margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: colors.text, marginBottom: 4, margin: '0 0 4px 0' }}>Timeline</h1>
        <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>Chronological case updates</p>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 2, background: `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}50 50%, ${colors.border} 100%)` }}></div>
        
        {timelineEvents.map((event, i) => (
          <div key={i} style={{ position: 'relative', paddingLeft: 56, marginBottom: 16 }}>
            <div style={{ position: 'absolute', left: 0, width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, backgroundColor: colors.card, border: `2px solid ${event.color}`, color: event.color }}>
              <event.icon size={16} />
            </div>
            
            <div style={{ padding: 16, borderRadius: 8, border: '1px solid', backgroundColor: event.type === 'upcoming' ? isDark ? 'rgba(255,149,0,0.1)' : 'rgba(255,149,0,0.05)' : colors.card, borderColor: event.type === 'upcoming' ? 'rgba(255,149,0,0.3)' : colors.border }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 4 }}>
                {event.type === 'upcoming' && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 6px', borderRadius: 4, backgroundColor: 'rgba(255,149,0,0.15)', color: '#cc7700', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', width: 'fit-content' }}>
                    <Clock size={10} /> Upcoming
                  </span>
                )}
                {event.type === 'order' && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 6px', borderRadius: 4, backgroundColor: 'rgba(156,39,176,0.1)', color: '#9c27b0', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', width: 'fit-content' }}>
                    <Gavel size={10} /> Order
                  </span>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ fontWeight: 600, color: colors.text, margin: 0 }}>{event.title}</h4>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: event.type === 'upcoming' ? '#cc7700' : colors.text, margin: 0 }}>{event.date}</p>
                    {event.time && <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>{event.time}</p>}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: colors.textSecondary, margin: '4px 0 0 0' }}>{event.desc}</p>
              {event.purpose && (
                <span style={{ display: 'inline-block', marginTop: 8, padding: '4px 8px', borderRadius: 4, backgroundColor: colors.bgTertiary, fontSize: 12, color: colors.textSecondary }}>
                  Purpose: {event.purpose}
                </span>
              )}
              {event.simple && (
                <button
                  onClick={() => { setSelectedOrder({ title: event.title, date: event.date, simple: event.simple }); setShowOrderModal(true); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, color: accentColor, cursor: 'pointer', marginTop: 8, background: 'none', border: 'none', padding: 0 }}
                >
                  <Info size={13} /> Simplified Explanation
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showOrderModal} onClose={() => setShowOrderModal(false)} title="Court Order Explained" isDark={isDark} accentColor={accentColor}>
        {selectedOrder && (
          <div>
            <div style={{ padding: 12, backgroundColor: isDark ? 'rgba(156,39,176,0.15)' : 'rgba(156,39,176,0.05)', borderRadius: 6, border: '1px solid rgba(156,39,176,0.2)', marginBottom: 16 }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: '#9c27b0', textTransform: 'uppercase', marginBottom: 4, margin: '0 0 4px 0' }}>Order</p>
              <p style={{ fontWeight: 600, color: colors.text, margin: 0 }}>{selectedOrder.title}</p>
              <p style={{ fontSize: 14, color: colors.textSecondary, margin: '2px 0 0 0' }}>{selectedOrder.date}</p>
            </div>
            <div style={{ padding: 12, backgroundColor: isDark ? `${accentColor}20` : `${accentColor}10`, borderRadius: 6, border: `1px solid ${accentColor}30`, marginBottom: 16 }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: accentColor, textTransform: 'uppercase', marginBottom: 4, margin: '0 0 4px 0' }}>What This Means</p>
              <p style={{ fontSize: 14, color: colors.text, margin: 0 }}>{selectedOrder.simple}</p>
            </div>
            <p style={{ fontSize: 12, color: colors.textSecondary, fontStyle: 'italic', margin: 0 }}>Simplified explanation. Consult your advocate for legal advice.</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export const timelineStyles = `
  .timeline-event { padding-left: 56px; }
  .timeline-icon { width: 40px; height: 40px; }
  .timeline-line { left: 20px; }
  
  @media (max-width: 768px) {
    .timeline-event { padding-left: 44px !important; }
    .timeline-icon { width: 32px !important; height: 32px !important; left: 0 !important; }
    .timeline-line { left: 16px !important; }
  }
`;
