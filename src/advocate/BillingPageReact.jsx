import React from 'react';
import { CreditCard, FileText, Download, Calendar } from 'lucide-react';

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

export default function BillingPageReact({ isDark = false, accentColor = '#4772fa' }) {
  const colors = getThemeColors(isDark, accentColor);

  const invoices = [
    { id: 1, case: 'Thompson vs. Global Corp', amount: '$2,500', date: 'Mar 15, 2024', status: 'paid' },
    { id: 2, case: 'Miller Estate Planning', amount: '$5,000', date: 'Mar 10, 2024', status: 'pending' },
    { id: 3, case: 'Johnson Litigation', amount: '$7,500', date: 'Mar 05, 2024', status: 'overdue' }
  ];

  return (
    <div style={{ padding: 24, backgroundColor: colors.bg, color: colors.text, minHeight: '100vh' }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, color: colors.text, marginBottom: 24, margin: '0 0 24px 0' }}>Payments & Billing</h1>
      <p style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 32, margin: '0 0 32px 0' }}>Manage your invoices, payments, and billing information</p>
      
      <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>Recent Invoices</h2>
          <button style={{ padding: '10px 20px', backgroundColor: accentColor, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            <Download size={16} /> Download All
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {invoices.map((invoice) => (
            <div key={invoice.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: colors.bgSecondary, borderRadius: 8, border: `1px solid ${colors.borderLight}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: colors.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={20} style={{ color: accentColor }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>{invoice.case}</p>
                  <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>{invoice.date}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>{invoice.amount}</p>
                <span style={{ 
                  fontSize: 11, 
                  padding: '4px 8px', 
                  borderRadius: 4, 
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  backgroundColor: invoice.status === 'paid' ? colors.success : invoice.status === 'pending' ? colors.warning : colors.error,
                  color: '#fff'
                }}>
                  {invoice.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.text, marginBottom: 20, margin: '0 0 20px 0' }}>Payment Methods</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
          <div style={{ padding: 20, backgroundColor: colors.bgSecondary, borderRadius: 8, border: `1px solid ${colors.borderLight}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <CreditCard size={24} style={{ color: accentColor }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>Credit Card</p>
                <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>**** **** **** 4242</p>
              </div>
            </div>
            <button style={{ padding: '8px 16px', backgroundColor: colors.bgTertiary, border: `1px solid ${colors.border}`, borderRadius: 6, fontSize: 13, color: colors.text, cursor: 'pointer' }}>
              Edit
            </button>
          </div>
          <div style={{ padding: 20, backgroundColor: colors.bgSecondary, borderRadius: 8, border: `1px solid ${colors.borderLight}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <Calendar size={24} style={{ color: accentColor }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>Bank Transfer</p>
                <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>Chase Bank • **** 6789</p>
              </div>
            </div>
            <button style={{ padding: '8px 16px', backgroundColor: colors.bgTertiary, border: `1px solid ${colors.border}`, borderRadius: 6, fontSize: 13, color: colors.text, cursor: 'pointer' }}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
