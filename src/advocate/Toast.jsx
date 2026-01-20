"use client";

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ notifications, removeNotification, isDark = false }) {
  return (
    <div className="toast-container">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="animate-slide-in"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 16px',
            borderRadius: 8,
            boxShadow: isDark ? '0 10px 15px -3px rgba(0,0,0,0.4)' : '0 10px 15px -3px rgba(0,0,0,0.1)',
            border: '1px solid',
            backgroundColor: n.type === 'success'
              ? isDark ? '#052e16' : '#f0fdf4'
              : n.type === 'error'
              ? isDark ? '#450a0a' : '#fef2f2'
              : isDark ? '#172554' : '#eff6ff',
            borderColor: n.type === 'success'
              ? isDark ? '#166534' : '#bbf7d0'
              : n.type === 'error'
              ? isDark ? '#991b1b' : '#fecaca'
              : isDark ? '#1e40af' : '#bfdbfe',
            color: n.type === 'success'
              ? isDark ? '#4ade80' : '#15803d'
              : n.type === 'error'
              ? isDark ? '#fca5a5' : '#b91c1c'
              : isDark ? '#93c5fd' : '#1d4ed8'
          }}
        >
          {n.type === 'success' ? (
            <CheckCircle2 size={16} />
          ) : n.type === 'error' ? (
            <AlertCircle size={16} />
          ) : (
            <Info size={16} />
          )}
          <span style={{ fontSize: 14 }}>{n.message}</span>
          <button
            onClick={() => removeNotification(n.id)}
            style={{
              marginLeft: 8,
              opacity: 0.6,
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              color: 'inherit',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

export const toastStyles = `
  .toast-container { 
    position: fixed; 
    bottom: 80px; 
    right: 16px; 
    left: 16px; 
    z-index: 200; 
    display: flex; 
    flex-direction: column; 
    gap: 8px; 
  }
  
  @keyframes slide-in-from-right { 
    from { transform: translateX(100%); opacity: 0; } 
    to { transform: translateX(0); opacity: 1; } 
  }
  .animate-slide-in { animation: slide-in-from-right 0.25s ease-out; }
  
  @media (min-width: 768px) {
    .toast-container {
      left: auto;
      right: 24px;
      bottom: 24px;
      max-width: 400px;
    }
  }
`;
