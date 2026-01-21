import React, { useState } from 'react';
import { X, Eye, EyeOff, Lock, CheckCircle, XCircle } from 'lucide-react';

const SetPasswordModal = ({ isOpen, onClose, onSetPassword, userEmail, canSkip = true }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password strength validation
  const validatePassword = (pwd) => {
    const checks = {
      length: pwd.length >= 6,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd)
    };
    return checks;
  };

  const passwordChecks = validatePassword(password);
  const isPasswordValid = Object.values(passwordChecks).every(check => check);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!isPasswordValid) {
      setError('Password does not meet requirements');
      return;
    }

    setLoading(true);
    try {
      await onSetPassword(password, confirmPassword);
      // Success - modal will close from parent
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to set password');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    if (canSkip) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
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
        backgroundColor: '#ffffff',
        borderRadius: 16,
        maxWidth: 480,
        width: '100%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 24px 20px',
          borderBottom: '1px solid #e8e8e8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: '#4772fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Lock size={24} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#1f1f1f' }}>
                Set Your Password
              </h2>
              <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#808080' }}>
                Secure your account with a password
              </p>
            </div>
          </div>
          {canSkip && (
            <button
              onClick={handleSkip}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#808080',
                padding: 4
              }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ padding: 24 }}>
          <div style={{
            padding: 16,
            backgroundColor: '#f5f7ff',
            borderRadius: 8,
            marginBottom: 20,
            border: '1px solid #e8f0ff'
          }}>
            <p style={{ margin: 0, fontSize: 13, color: '#1f1f1f', lineHeight: 1.5 }}>
              <strong>Welcome!</strong> You signed up with Google ({userEmail}). 
              Set a password now to enable email/password login in the future.
            </p>
          </div>

          {error && (
            <div style={{
              padding: 12,
              backgroundColor: '#fff0f0',
              border: '1px solid #ffcccc',
              borderRadius: 8,
              marginBottom: 16,
              color: '#eb4d3d',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <XCircle size={16} />
              {error}
            </div>
          )}

          {/* Password Input */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: '#1f1f1f' }}>
              New Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                  fontSize: 14,
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4772fa'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#808080',
                  padding: 4
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: '#1f1f1f' }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                  fontSize: 14,
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4772fa'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#808080',
                  padding: 4
                }}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          {password && (
            <div style={{
              padding: 16,
              backgroundColor: '#fafafa',
              borderRadius: 8,
              marginBottom: 20
            }}>
              <p style={{ margin: '0 0 12px 0', fontSize: 12, fontWeight: 600, color: '#1f1f1f', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Password Requirements:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <PasswordCheck label="At least 6 characters" isValid={passwordChecks.length} />
                <PasswordCheck label="One uppercase letter (A-Z)" isValid={passwordChecks.uppercase} />
                <PasswordCheck label="One lowercase letter (a-z)" isValid={passwordChecks.lowercase} />
                <PasswordCheck label="One number (0-9)" isValid={passwordChecks.number} />
                {confirmPassword && (
                  <PasswordCheck 
                    label="Passwords match" 
                    isValid={password === confirmPassword} 
                  />
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
            <button
              type="submit"
              disabled={loading || !isPasswordValid || password !== confirmPassword}
              style={{
                width: '100%',
                padding: '12px 24px',
                backgroundColor: (loading || !isPasswordValid || password !== confirmPassword) ? '#cccccc' : '#4772fa',
                color: '#ffffff',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: (loading || !isPasswordValid || password !== confirmPassword) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {loading ? 'Setting Password...' : 'Set Password'}
            </button>

            {canSkip && (
              <button
                type="button"
                onClick={handleSkip}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  backgroundColor: 'transparent',
                  color: '#808080',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Skip for Now
              </button>
            )}
          </div>

          {canSkip && (
            <p style={{
              margin: '16px 0 0 0',
              fontSize: 12,
              color: '#b0b0b0',
              textAlign: 'center',
              lineHeight: 1.5
            }}>
              You can set a password later from your account settings
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

// Password Check Component
const PasswordCheck = ({ label, isValid }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    {isValid ? (
      <CheckCircle size={16} style={{ color: '#00c853', flexShrink: 0 }} />
    ) : (
      <XCircle size={16} style={{ color: '#cccccc', flexShrink: 0 }} />
    )}
    <span style={{
      fontSize: 13,
      color: isValid ? '#00c853' : '#808080',
      fontWeight: isValid ? 500 : 400
    }}>
      {label}
    </span>
  </div>
);

export default SetPasswordModal;
