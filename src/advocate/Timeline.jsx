"use client";

import React, { useState } from 'react';
import { Calendar, FileText, Upload, Clock, Gavel, FileCheck, Info, X, CheckCircle2 } from 'lucide-react';

const getThemeColors = (isDark, accentColor) => ({
  bg: isDark ? '#0f0f1a' : '#ffffff',
  bgSecondary: isDark ? '#1a1a2e' : '#fafafa',
  bgTertiary: isDark ? '#16213e' : '#f5f5f5',
  text: isDark ? '#ffffff' : '#1f1f1f',
  textSecondary: isDark ? '#a0a0a0' : '#808080',
  border: isDark ? '#2d2d44' : '#e8e8e8',
  card: isDark ? '#1a1a2e' : '#ffffff',
  success: '#00c853',
});

/* ================= MODAL ================= */

function Modal({ isOpen, onClose, title, children, isDark = false, accentColor = '#4772fa' }) {
  const colors = getThemeColors(isDark, accentColor);
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/40 flex items-center justify-center z-[150] p-4">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-lg shadow-2xl overflow-hidden" style={{ backgroundColor: colors.card }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: colors.border }}>
          <h3 className="text-base font-semibold" style={{ color: colors.text }}>{title}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-black/10">
            <X size={18} style={{ color: colors.textSecondary }} />
          </button>
        </div>
        <div className="p-5 max-h-[calc(90vh-80px)] overflow-y-auto" style={{ color: colors.text }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ================= TIMELINE ================= */

export default function CaseTimeline({ addNotification, isDark = false, accentColor = '#4772fa' }) {
  const colors = getThemeColors(isDark, accentColor);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 👉 Track completed steps
  const [completedSteps, setCompletedSteps] = useState([]);

  const timelineEvents = [
    { type: 'upcoming', icon: Calendar, color: '#ff9500', title: 'Final Oral Arguments', date: 'MAR 18, 2024', time: '10:30 AM', desc: 'Both parties to present final arguments.', purpose: 'Final Hearing' },
    { type: 'order', icon: Gavel, color: '#9c27b0', title: 'Interim Stay Granted', date: 'FEB 02, 2024', desc: 'Temporary stay on recovery proceedings.', simple: 'The court has paused the other party\'s attempts to collect money until the next hearing.' },
    { type: 'filing', icon: FileText, color: '#4772fa', title: 'Counter-Affidavit Filed', date: 'JAN 28, 2024', desc: 'Response to preliminary objections submitted.' },
    { type: 'hearing', icon: Calendar, color: '#4772fa', title: 'Preliminary Hearing', date: 'JAN 20, 2024', desc: 'Initial hearing completed.' },
    { type: 'filing', icon: Upload, color: '#808080', title: 'Evidence Submitted', date: 'JAN 15, 2024', desc: 'Documentary evidence filed.' },
    { type: 'origin', icon: FileCheck, color: '#00c853', title: 'Case Registered', date: 'JAN 12, 2024', desc: 'Writ petition admitted.' }
  ];

  // 👉 Allow sequential completion only
  const markCompleted = (index) => {
    if (index !== completedSteps.length) return;
    setCompletedSteps(prev => [...prev, index]);
    addNotification?.('success', `Step "${timelineEvents[index].title}" completed`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold" style={{ color: colors.text }}>Timeline</h1>
        <p className="text-sm" style={{ color: colors.textSecondary }}>Chronological case updates</p>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div
          className="absolute left-5 top-0 bottom-0 w-[2px]"
          style={{ background: `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}50 50%, ${colors.border} 100%)` }}
        />

        {timelineEvents.map((event, i) => {
          const isCompleted = completedSteps.includes(i);
          const canComplete = i === completedSteps.length;

          return (
            <div key={i} className="relative pl-14 mb-4">
              {/* Icon */}
              <div
                className="absolute left-0 w-10 h-10 rounded-full flex items-center justify-center z-10 border-2"
                style={{
                  backgroundColor: colors.card,
                  borderColor: isCompleted ? colors.success : event.color,
                  color: isCompleted ? colors.success : event.color
                }}
              >
                {isCompleted ? <CheckCircle2 size={18} /> : <event.icon size={16} />}
              </div>

              {/* Card */}
              <div
                className="p-4 rounded-lg border transition-all"
                style={{
                  backgroundColor: isCompleted
                    ? isDark ? 'rgba(0,200,83,0.12)' : 'rgba(0,200,83,0.06)'
                    : colors.card,
                  borderColor: isCompleted ? colors.success : colors.border
                }}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold" style={{ color: colors.text }}>{event.title}</h4>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium" style={{ color: colors.text }}>{event.date}</p>
                    {event.time && <p className="text-xs" style={{ color: colors.textSecondary }}>{event.time}</p>}
                  </div>
                </div>

                <p className="text-sm" style={{ color: colors.textSecondary }}>{event.desc}</p>

                {/* Simplified Explanation */}
                {event.simple && (
                  <button
                    onClick={() => { setSelectedOrder(event); setShowOrderModal(true); }}
                    className="flex items-center gap-1 text-sm mt-2 cursor-pointer"
                    style={{ color: accentColor }}
                  >
                    <Info size={13} /> Simplified Explanation
                  </button>
                )}

                {/* Completion Button */}
                <div className="mt-3 flex justify-end">
                  {!isCompleted && canComplete && (
                    <button
                      onClick={() => markCompleted(i)}
                      className="px-3 py-1.5 text-xs font-medium rounded-md border cursor-pointer"
                      style={{
                        borderColor: colors.success,
                        color: colors.success,
                        backgroundColor: isDark ? 'rgba(0,200,83,0.12)' : 'rgba(0,200,83,0.06)'
                      }}
                    >
                      Mark as Completed
                    </button>
                  )}

                  {isCompleted && (
                    <span className="text-xs font-semibold flex items-center gap-1" style={{ color: colors.success }}>
                      ✓ Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Modal */}
      <Modal isOpen={showOrderModal} onClose={() => setShowOrderModal(false)} title="Court Order Explained" isDark={isDark} accentColor={accentColor}>
        {selectedOrder && (
          <div>
            <p className="font-semibold">{selectedOrder.title}</p>
            <p className="text-sm mt-2">{selectedOrder.simple}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
