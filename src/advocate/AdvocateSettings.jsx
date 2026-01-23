import React, { useState, useEffect } from 'react';
import {
  User, Settings as SettingsIcon, Bell, Calendar, Keyboard,
  RefreshCw, Crown, Shield, Info, Moon, Sun, Monitor,
  Palette, Globe, Trash2, Camera, CheckCircle2, AlertCircle,
  CreditCard, Database, Zap, FileText, Link as LinkIcon, Star,
  X, Menu, Lock, Eye, EyeOff, Key
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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

export default function AdvocateSettings({ isDark, accentColor, setIsDark, setAccentColor, addNotification, onClose, userInfo = {} }) {
  const colors = getThemeColors(isDark, accentColor);
  const { user, setPassword: authSetPassword, changePassword, openSetPasswordModal } = useAuth();
  
  const [activeTab, setActiveTab] = useState('account');
  const [displayName, setDisplayName] = useState(userInfo.name || user?.name || 'Alex Thompson');
  const [email, setEmail] = useState(userInfo.email || user?.email || 'alex.thompson@email.com');
  const [language, setLanguage] = useState('English');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [desktopNotif, setDesktopNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Password modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    { id: 'account', icon: User, label: 'Account' },
    { id: 'general', icon: SettingsIcon, label: 'General' },
    { id: 'theme', icon: Palette, label: 'Appearance' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'shortcuts', icon: Keyboard, label: 'Shortcuts' },
    { id: 'sync', icon: RefreshCw, label: 'Sync & Backup' },
    { id: 'subscription', icon: Crown, label: 'Subscription' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'about', icon: Info, label: 'About' }
  ];

  const Toggle = ({ checked, onChange }) => (
    <label style={{ position: 'relative', display: 'inline-flex', cursor: 'pointer', flexShrink: 0 }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <div style={{ width: 44, height: 22, backgroundColor: checked ? accentColor : colors.inputBorder, borderRadius: 11, position: 'relative', transition: 'background-color 0.2s' }}>
        <div style={{ position: 'absolute', top: 2, left: checked ? 24 : 2, width: 18, height: 18, backgroundColor: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
      </div>
    </label>
  );

  const SettingRow = ({ label, desc, children }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: `1px solid ${colors.borderLight}`, gap: 16 }}>
      <div style={{ flex: 1, minWidth: 150 }}>
        <p style={{ fontSize: 14, color: colors.text, margin: 0, fontWeight: 500 }}>{label}</p>
        {desc && <p style={{ fontSize: 12, color: colors.textSecondary, margin: '4px 0 0 0' }}>{desc}</p>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );

  const Select = ({ value, onChange, options }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: '8px 32px 8px 12px', fontSize: 13, border: `1px solid ${colors.inputBorder}`, borderRadius: 6, backgroundColor: colors.input, color: colors.text, cursor: 'pointer', outline: 'none', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(colors.textSecondary)}' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', minWidth: 140 }}
    >
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  );

  const handleThemeChange = (newTheme) => {
    setIsDark(newTheme === 'dark');
    addNotification('success', `Theme changed to ${newTheme}`);
  };

  const handleAccentColorChange = (color, name) => {
    setAccentColor(color);
    addNotification('success', `Accent color changed to ${name}`);
  };

  // Password validation
  const validatePassword = (pwd) => {
    const checks = {
      length: pwd.length >= 6,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd)
    };
    return checks;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');

    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    // Validation
    if (!newPassword || !confirmPassword) {
      setPasswordError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    const passwordChecks = validatePassword(newPassword);
    const isValid = Object.values(passwordChecks).every(check => check);

    if (!isValid) {
      setPasswordError('Password does not meet requirements');
      return;
    }

    setPasswordLoading(true);
    try {
      // If user has password, use changePassword, otherwise use setPassword
      if (user?.hasPassword) {
        if (!currentPassword) {
          setPasswordError('Current password is required');
          setPasswordLoading(false);
          return;
        }
        const result = await changePassword(currentPassword, newPassword, confirmPassword);
        if (result.success) {
          addNotification('success', 'Password changed successfully');
          setShowPasswordModal(false);
          setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } else {
          setPasswordError(result.message);
        }
      } else {
        // Set password for first time (Google users)
        await authSetPassword(newPassword, confirmPassword);
        addNotification('success', 'Password set successfully');
        setShowPasswordModal(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (error) {
      setPasswordError(error.response?.data?.message || 'Failed to update password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSetPassword = () => {
    if (user?.hasPassword) {
      setShowPasswordModal(true);
    } else {
      openSetPasswordModal();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div>
  {/* Profile Header */}
  <div
    className="flex items-center gap-5 py-6 border-b"
    style={{ borderColor: colors.borderLight }}
  >
    <div className="relative">
      <div
        className="w-20 h-20 rounded-full overflow-hidden border-[3px]"
        style={{ borderColor: accentColor }}
      >
        <img
          src={
            userInfo.profilePic ||
            user?.profilePicture ||
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
          }
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <button
        className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border-2"
        style={{ backgroundColor: accentColor, borderColor: colors.card }}
      >
        <Camera size={14} className="text-white" />
      </button>
    </div>

    <div>
      <p className="text-xl font-semibold" style={{ color: colors.text }}>
        {userInfo.name || user?.name || 'Alex Thompson'}
      </p>
      <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
        {userInfo.email || user?.email || 'alex.thompson@email.com'}
      </p>
      <div className="flex items-center gap-1.5 mt-2">
        <Crown size={16} className="text-[#ff9500]" />
        <span className="text-[13px] font-medium text-[#ff9500]">
          Premium Member
        </span>
      </div>
    </div>
  </div>

  {/* Display Name */}
  <SettingRow label="Display Name" desc="Your name as shown to others">
    <input
      type="text"
      value={displayName}
      onChange={(e) => setDisplayName(e.target.value)}
      className="px-[14px] py-[10px] text-sm rounded-lg w-[220px] outline-none box-border"
      style={{
        border: `1px solid ${colors.inputBorder}`,
        backgroundColor: colors.input,
        color: colors.text
      }}
    />
  </SettingRow>

  {/* Email */}
  <SettingRow label="Email Address" desc="Used for login and notifications">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="px-[14px] py-[10px] text-sm rounded-lg w-[220px] outline-none box-border"
      style={{
        border: `1px solid ${colors.inputBorder}`,
        backgroundColor: colors.input,
        color: colors.text
      }}
    />
  </SettingRow>

  {/* Password Section */}
  <SettingRow
    label={user?.hasPassword ? "Password" : "Set Password"}
    desc={user?.hasPassword ? "Last changed 30 days ago" : "Add password for email/password login"}
  >
    <button
      onClick={handleSetPassword}
      className="px-5 py-2.5 text-sm rounded-lg flex items-center gap-2 font-medium cursor-pointer"
      style={{
        border: `1px solid ${user?.hasPassword ? colors.inputBorder : accentColor}`,
        backgroundColor: user?.hasPassword ? colors.card : colors.accentLight,
        color: user?.hasPassword ? colors.text : accentColor
      }}
    >
      {user?.hasPassword ? <Lock size={16} /> : <Key size={16} />}
      {user?.hasPassword ? 'Change Password' : 'Set Password'}
    </button>
  </SettingRow>

  {/* 2FA */}
  <SettingRow label="Two-Factor Authentication" desc="Add an extra layer of security">
    <button
      onClick={() =>
        addNotification('info', '2FA setup initiated. Check your email for instructions.')
      }
      className="px-5 py-2.5 text-sm rounded-lg font-medium cursor-pointer"
      style={{
        border: `1px solid ${accentColor}`,
        backgroundColor: colors.accentLight,
        color: accentColor
      }}
    >
      Enable 2FA
    </button>
  </SettingRow>

  {/* Delete Account */}
  <div
    className="mt-8 p-5 rounded-xl border"
    style={{
      backgroundColor: isDark ? 'rgba(235,77,61,0.1)' : 'rgba(235,77,61,0.05)',
      borderColor: 'rgba(235,77,61,0.2)'
    }}
  >
    <div className="flex items-center gap-4">
      <Trash2 size={20} className="text-[#eb4d3d] shrink-0" />
      <div className="flex-1">
        <p className="text-[15px] font-medium text-[#eb4d3d]">Delete Account</p>
        <p className="text-[13px] mt-1" style={{ color: colors.textSecondary }}>
          Permanently delete your account and all data
        </p>
      </div>
      <button
        onClick={() =>
          addNotification('warning', 'Account deletion request sent. Check your email for confirmation.')
        }
        className="px-5 py-2.5 text-sm rounded-lg font-medium cursor-pointer"
        style={{
          border: '1px solid #eb4d3d',
          backgroundColor: colors.card,
          color: '#eb4d3d'
        }}
      >
        Delete
      </button>
    </div>
  </div>
</div>

        );

      case 'general':
        return (
          <div>
            <SettingRow label="Language" desc="Select your preferred language">
              <Select value={language} onChange={setLanguage} options={['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese']} />
            </SettingRow>
            <SettingRow label="Date Format" desc="How dates are displayed">
              <Select value={dateFormat} onChange={setDateFormat} options={['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']} />
            </SettingRow>
          </div>
        );

      case 'theme':
        return (
          <div>
            <p style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 24, margin: '0 0 24px 0' }}>Choose how TheCourtCase looks to you</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
              {[
                { id: 'light', label: 'Light', icon: Sun },
                { id: 'dark', label: 'Dark', icon: Moon },
                { id: 'system', label: 'System', icon: Monitor }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id)}
                  style={{
                    padding: 24, borderRadius: 12, border: `2px solid ${(!isDark && t.id === 'light') || (isDark && t.id === 'dark') ? accentColor : colors.inputBorder}`,
                    backgroundColor: ((!isDark && t.id === 'light') || (isDark && t.id === 'dark')) ? colors.accentLight : colors.card, cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, transition: 'all 0.2s'
                  }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: ((!isDark && t.id === 'light') || (isDark && t.id === 'dark')) ? accentColor : colors.bgTertiary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <t.icon size={26} style={{ color: ((!isDark && t.id === 'light') || (isDark && t.id === 'dark')) ? '#fff' : colors.textSecondary }} />
                  </div>
                  <span style={{ fontSize: 15, fontWeight: ((!isDark && t.id === 'light') || (isDark && t.id === 'dark')) ? 600 : 400, color: ((!isDark && t.id === 'light') || (isDark && t.id === 'dark')) ? accentColor : colors.text }}>{t.label}</span>
                </button>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${colors.borderLight}`, paddingTop: 24 }}>
              <p style={{ fontSize: 15, fontWeight: 500, color: colors.text, marginBottom: 16, margin: '0 0 16px 0' }}>Accent Color</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { color: '#4772fa', name: 'Blue' },
                  { color: '#00c853', name: 'Green' },
                  { color: '#9c27b0', name: 'Purple' },
                  { color: '#ff9500', name: 'Orange' },
                  { color: '#eb4d3d', name: 'Red' },
                  { color: '#e91e63', name: 'Pink' },
                  { color: '#00bcd4', name: 'Teal' }
                ].map((c) => (
                  <button
                    key={c.color}
                    onClick={() => handleAccentColorChange(c.color, c.name)}
                    style={{
                      width: 40, height: 40, borderRadius: '50%', border: `2px solid ${accentColor === c.color ? accentColor : colors.inputBorder}`,
                      backgroundColor: c.color, cursor: 'pointer', transition: 'all 0.2s', position: 'relative'
                    }}
                  >
                    {accentColor === c.color && (
                      <CheckCircle2 size={16} style={{ color: '#fff', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div>
            <SettingRow label="Sound Notifications" desc="Play sound for new notifications">
              <Toggle checked={soundEnabled} onChange={(e) => setSoundEnabled(e.target.checked)} />
            </SettingRow>
            <SettingRow label="Desktop Notifications" desc="Show notifications on your desktop">
              <Toggle checked={desktopNotif} onChange={(e) => setDesktopNotif(e.target.checked)} />
            </SettingRow>
            <SettingRow label="Email Notifications" desc="Receive notifications via email">
              <Toggle checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} />
            </SettingRow>
          </div>
        );

      case 'calendar':
        return (
          <div>
            <SettingRow label="Default View" desc="Default calendar view">
              <Select value="Month" onChange={(value) => addNotification('success', `Calendar view changed to ${value}`)} options={['Month', 'Week', 'Day', 'Agenda']} />
            </SettingRow>
            <SettingRow label="Start of Week" desc="First day of the week">
              <Select value="Sunday" onChange={(value) => addNotification('success', `Week start changed to ${value}`)} options={['Sunday', 'Monday', 'Tuesday']} />
            </SettingRow>
            <SettingRow label="Show Week Numbers" desc="Display week numbers in calendar">
              <Toggle checked={true} onChange={(checked) => addNotification('success', `Week numbers ${checked ? 'enabled' : 'disabled'}`)} />
            </SettingRow>
          </div>
        );

      case 'shortcuts':
        return (
          <div>
            <p style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 24, margin: '0 0 24px 0' }}>Keyboard shortcuts to help you work faster</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { key: 'Ctrl + N', desc: 'Create new matter' },
                { key: 'Ctrl + K', desc: 'Quick search' },
                { key: 'Ctrl + C', desc: 'Create new client' },
                { key: 'Ctrl + E', desc: 'Create new event' },
                { key: 'Ctrl + D', desc: 'Open dashboard' },
                { key: 'Esc', desc: 'Close modal or panel' }
              ].map((shortcut, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: colors.bgTertiary, borderRadius: 8 }}>
                  <span style={{ fontSize: 14, color: colors.text }}>{shortcut.desc}</span>
                  <kbd style={{ padding: '6px 12px', fontSize: 12, backgroundColor: colors.card, border: `1px solid ${colors.inputBorder}`, borderRadius: 4, color: colors.text, fontFamily: 'monospace' }}>{shortcut.key}</kbd>
                </div>
              ))}
            </div>
          </div>
        );

      case 'sync':
        return (
          <div>
            <SettingRow label="Auto Backup" desc="Automatically backup your data">
              <Toggle checked={autoBackup} onChange={(e) => setAutoBackup(e.target.checked)} />
            </SettingRow>
            <SettingRow label="Last Backup" desc="Last successful backup time">
              <span style={{ fontSize: 13, color: colors.textSecondary }}>Today at 2:30 PM</span>
            </SettingRow>
            <SettingRow label="Sync Status" desc="Current sync status">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle2 size={16} style={{ color: colors.success }} />
                <span style={{ fontSize: 13, color: colors.success }}>All data synced</span>
              </div>
            </SettingRow>
            <div style={{ marginTop: 24 }}>
              <button onClick={() => addNotification('success', 'Backup started')} style={{ padding: '12px 24px', fontSize: 14, border: 'none', borderRadius: 8, backgroundColor: accentColor, cursor: 'pointer', color: '#fff', fontWeight: 500 }}>
                Backup Now
              </button>
            </div>
          </div>
        );

      case 'subscription':
        return (
          <div>
            <div style={{ padding: 24, backgroundColor: colors.accentLight, borderRadius: 12, border: `1px solid ${accentColor}`, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <Crown size={24} style={{ color: '#ff9500' }} />
                <div>
                  <p style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>Premium Plan</p>
                  <p style={{ fontSize: 14, color: colors.textSecondary, margin: '4px 0 0 0' }}>$29/month • Renews on Jan 15, 2025</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => addNotification('info', 'Redirecting to subscription management...')} style={{ padding: '10px 20px', fontSize: 14, border: 'none', borderRadius: 8, backgroundColor: accentColor, cursor: 'pointer', color: '#fff', fontWeight: 500 }}>
                  Manage Subscription
                </button>
                <button onClick={() => addNotification('info', 'Opening invoices...')} style={{ padding: '10px 20px', fontSize: 14, border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', color: colors.text, fontWeight: 500 }}>
                  View Invoices
                </button>
              </div>
            </div>

            <p style={{ fontSize: 15, fontWeight: 500, color: colors.text, marginBottom: 16, margin: '0 0 16px 0' }}>Plan Features</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Unlimited matters and clients',
                'Advanced document management',
                'Priority support',
                'Custom branding',
                'Team collaboration',
                'API access'
              ].map((feature, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <CheckCircle2 size={18} style={{ color: colors.success }} />
                  <span style={{ fontSize: 14, color: colors.text }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'security':
        return (
          <div>
            <SettingRow label="Login History" desc="View recent login activity">
              <button onClick={() => addNotification('info', 'Opening login history...')} style={{ padding: '10px 20px', fontSize: 14, border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', color: colors.text, fontWeight: 500 }}>
                View History
              </button>
            </SettingRow>
            <SettingRow label="Active Sessions" desc="Manage devices with active sessions">
              <button onClick={() => addNotification('info', 'Opening active sessions...')} style={{ padding: '10px 20px', fontSize: 14, border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', color: colors.text, fontWeight: 500 }}>
                Manage Sessions
              </button>
            </SettingRow>
            <SettingRow label="Data Export" desc="Export all your data">
              <button onClick={() => addNotification('success', 'Data export started. You will receive an email when ready.')} style={{ padding: '10px 20px', fontSize: 14, border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', color: colors.text, fontWeight: 500 }}>
                Export Data
              </button>
            </SettingRow>
            <div style={{ marginTop: 24, padding: 20, backgroundColor: isDark ? 'rgba(255,149,0,0.1)' : 'rgba(255,149,0,0.05)', borderRadius: 12, border: '1px solid rgba(255,149,0,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <AlertCircle size={20} style={{ color: '#ff9500', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, fontWeight: 500, color: '#ff9500', margin: 0 }}>Security Tips</p>
                  <p style={{ fontSize: 13, color: colors.textSecondary, margin: '4px 0 0 0' }}>Enable 2FA and use a strong password to protect your account</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div>
            <div style={{ textAlign: 'center', padding: '32px 0', borderBottom: `1px solid ${colors.borderLight}` }}>
              <div style={{ width: 80, height: 80, borderRadius: 16, backgroundColor: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Zap size={40} style={{ color: '#fff' }} />
              </div>
              <p style={{ fontSize: 24, fontWeight: 600, color: colors.text, margin: '0 0 8px 0' }}>TheCourtCase</p>
              <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>Version 2.5.0</p>
            </div>

            <div style={{ marginTop: 24 }}>
              <SettingRow label="Website" desc="Visit our official website">
                <button onClick={() => window.open('https://thecourtcase.com', '_blank')} style={{ padding: '10px 20px', fontSize: 14, border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', color: colors.text, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Globe size={16} />
                  Visit
                </button>
              </SettingRow>
              <SettingRow label="Documentation" desc="Read the documentation">
                <button onClick={() => window.open('https://docs.thecourtcase.com', '_blank')} style={{ padding: '10px 20px', fontSize: 14, border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', color: colors.text, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FileText size={16} />
                  Read
                </button>
              </SettingRow>
              <SettingRow label="Support" desc="Get help and support">
                <button onClick={() => window.open('https://support.thecourtcase.com', '_blank')} style={{ padding: '10px 20px', fontSize: 14, border: `1px solid ${colors.inputBorder}`, borderRadius: 8, backgroundColor: colors.card, cursor: 'pointer', color: colors.text, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Star size={16} />
                  Contact
                </button>
              </SettingRow>
            </div>

            <div style={{ marginTop: 32, textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: colors.textMuted, margin: 0 }}>© 2024 TheCourtCase. All rights reserved.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Password checks for the modal
  const newPasswordChecks = validatePassword(passwordForm.newPassword);
  const isNewPasswordValid = Object.values(newPasswordChecks).every(check => check);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100vh', backgroundColor: colors.bg }}>
        {/* Mobile Header */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.card }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => setShowMobileMenu(!showMobileMenu)} style={{ padding: 8, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: colors.text, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Menu size={20} />
              </button>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>Settings</h2>
            </div>
            <button onClick={onClose} style={{ padding: 8, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: colors.textSecondary, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={20} />
            </button>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {isMobile && showMobileMenu && (
          <div onClick={() => setShowMobileMenu(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 }} />
        )}

        {/* Sidebar */}
        <div style={{
          width: isMobile ? (showMobileMenu ? '100%' : '0') : 280,
          backgroundColor: colors.card,
          borderRight: isMobile ? 'none' : `1px solid ${colors.border}`,
          display: 'flex',
          flexDirection: 'column',
          position: isMobile ? 'fixed' : 'relative',
          left: 0,
          top: isMobile ? 57 : 0,
          bottom: 0,
          zIndex: isMobile ? 101 : 'auto',
          transition: 'width 0.3s ease',
          overflow: 'hidden'
        }}>
          {!isMobile && (
            <div style={{ padding: '24px 20px', borderBottom: `1px solid ${colors.borderLight}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.text, margin: 0 }}>Settings</h2>
                <button onClick={onClose} style={{ padding: 8, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: colors.textSecondary, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={18} />
                </button>
              </div>
            </div>
          )}

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 12px' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); if (isMobile) setShowMobileMenu(false); }}
                style={{
                  width: '100%', padding: '12px 16px', marginBottom: 4, borderRadius: 8, border: 'none', backgroundColor: activeTab === tab.id ? colors.accentLight : 'transparent',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.2s'
                }}
              >
                <tab.icon size={18} style={{ color: activeTab === tab.id ? accentColor : colors.textSecondary }} />
                <span style={{ fontSize: 14, fontWeight: activeTab === tab.id ? 500 : 400, color: activeTab === tab.id ? accentColor : colors.text }}>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '16px' : '32px 48px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: colors.card,
            borderRadius: 16,
            maxWidth: 480,
            width: '100%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '24px 24px 20px',
              borderBottom: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: accentColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}>
                  <Lock size={24} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: colors.text }}>
                    Change Password
                  </h2>
                  <p style={{ margin: '4px 0 0 0', fontSize: 13, color: colors.textSecondary }}>
                    Update your account password
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  setPasswordError('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: colors.textSecondary,
                  padding: 4
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handlePasswordSubmit} style={{ padding: 24 }}>
              {passwordError && (
                <div style={{
                  padding: 12,
                  backgroundColor: isDark ? 'rgba(235,77,61,0.15)' : '#fff0f0',
                  border: '1px solid #ffcccc',
                  borderRadius: 8,
                  marginBottom: 16,
                  color: '#eb4d3d',
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <AlertCircle size={16} />
                  {passwordError}
                </div>
              )}

              {/* Current Password (only if user has password) */}
              {user?.hasPassword && (
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: colors.text }}>
                    Current Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                      style={{
                        width: '100%',
                        padding: '12px 40px 12px 12px',
                        border: `1px solid ${colors.inputBorder}`,
                        borderRadius: 8,
                        fontSize: 14,
                        outline: 'none',
                        backgroundColor: colors.input,
                        color: colors.text,
                        boxSizing: 'border-box'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                      style={{
                        position: 'absolute',
                        right: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: colors.textSecondary,
                        padding: 4
                      }}
                    >
                      {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {/* New Password */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: colors.text }}>
                  New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    placeholder="Enter new password"
                    style={{
                      width: '100%',
                      padding: '12px 40px 12px 12px',
                      border: `1px solid ${colors.inputBorder}`,
                      borderRadius: 8,
                      fontSize: 14,
                      outline: 'none',
                      backgroundColor: colors.input,
                      color: colors.text,
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: colors.textSecondary,
                      padding: 4
                    }}
                  >
                    {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: colors.text }}>
                  Confirm New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    style={{
                      width: '100%',
                      padding: '12px 40px 12px 12px',
                      border: `1px solid ${colors.inputBorder}`,
                      borderRadius: 8,
                      fontSize: 14,
                      outline: 'none',
                      backgroundColor: colors.input,
                      color: colors.text,
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: colors.textSecondary,
                      padding: 4
                    }}
                  >
                    {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              {passwordForm.newPassword && (
                <div style={{
                  padding: 16,
                  backgroundColor: colors.bgTertiary,
                  borderRadius: 8,
                  marginBottom: 20
                }}>
                  <p style={{ margin: '0 0 12px 0', fontSize: 12, fontWeight: 600, color: colors.text, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Password Requirements:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <PasswordCheck colors={colors} label="At least 6 characters" isValid={newPasswordChecks.length} />
                    <PasswordCheck colors={colors} label="One uppercase letter (A-Z)" isValid={newPasswordChecks.uppercase} />
                    <PasswordCheck colors={colors} label="One lowercase letter (a-z)" isValid={newPasswordChecks.lowercase} />
                    <PasswordCheck colors={colors} label="One number (0-9)" isValid={newPasswordChecks.number} />
                    {passwordForm.confirmPassword && (
                      <PasswordCheck 
                        colors={colors}
                        label="Passwords match" 
                        isValid={passwordForm.newPassword === passwordForm.confirmPassword} 
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setPasswordError('');
                  }}
                  disabled={passwordLoading}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    backgroundColor: 'transparent',
                    color: colors.textSecondary,
                    border: `1px solid ${colors.inputBorder}`,
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: passwordLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading || !isNewPasswordValid || passwordForm.newPassword !== passwordForm.confirmPassword || (user?.hasPassword && !passwordForm.currentPassword)}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    backgroundColor: (passwordLoading || !isNewPasswordValid || passwordForm.newPassword !== passwordForm.confirmPassword) ? colors.inputBorder : accentColor,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: (passwordLoading || !isNewPasswordValid || passwordForm.newPassword !== passwordForm.confirmPassword) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {passwordLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// Password Check Component
const PasswordCheck = ({ colors, label, isValid }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    {isValid ? (
      <CheckCircle2 size={16} style={{ color: colors.success, flexShrink: 0 }} />
    ) : (
      <AlertCircle size={16} style={{ color: colors.textMuted, flexShrink: 0 }} />
    )}
    <span style={{
      fontSize: 13,
      color: isValid ? colors.success : colors.textSecondary,
      fontWeight: isValid ? 500 : 400
    }}>
      {label}
    </span>
  </div>
);
