import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * Authentication Modal supporting both Login (Sign In) and Sign Up (Create Account).
 * Includes 1-Click Demo Login for quick testing.
 */
export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please verify.');
        return;
      }
    }

    // Success response simulation
    const userProfile = {
      name: mode === 'signup' ? name.trim() : (email.split('@')[0] || 'Demo User'),
      email: email.trim(),
      joinedDate: new Date().toLocaleDateString(),
    };

    if (rememberMe) {
      localStorage.setItem('skypulse_user', JSON.stringify(userProfile));
    }

    setSuccessMessage(mode === 'signup' ? 'Account created successfully!' : 'Signed in successfully!');
    setTimeout(() => {
      onAuthSuccess(userProfile);
      onClose();
      setSuccessMessage('');
    }, 700);
  };

  const handleDemoLogin = () => {
    const demoUser = {
      name: 'Alex Rivera',
      email: 'alex.rivera@demo.com',
      joinedDate: new Date().toLocaleDateString(),
    };
    localStorage.setItem('skypulse_user', JSON.stringify(demoUser));
    setSuccessMessage('Welcome back, Alex!');
    setTimeout(() => {
      onAuthSuccess(demoUser);
      onClose();
      setSuccessMessage('');
    }, 600);
  };

  return (
    <div className="auth-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="auth-close-btn"
          onClick={onClose}
          aria-label="Close authentication modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="auth-header">
          <div className="auth-badge">
            <Sparkles size={16} />
            <span>SkyPulse Account</span>
          </div>
          <h2 className="auth-title">
            {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="auth-subtitle">
            {mode === 'login'
              ? 'Log in to sync favorite cities & personal alerts'
              : 'Join today to customize your weather dashboard'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => {
              setMode('login');
              setError('');
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => {
              setMode('signup');
              setError('');
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Status Alerts */}
        {error && <div className="auth-alert error">{error}</div>}
        {successMessage && (
          <div className="auth-alert success">
            <CheckCircle2 size={16} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="auth-input-group">
              <label htmlFor="auth-name">Full Name</label>
              <div className="auth-input-wrapper">
                <User size={18} className="auth-icon" />
                <input
                  id="auth-name"
                  type="text"
                  placeholder="e.g. Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="auth-input-group">
            <label htmlFor="auth-email">Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-icon" />
              <input
                id="auth-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label htmlFor="auth-password">Password</label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-icon" />
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div className="auth-input-group">
              <label htmlFor="auth-confirm-password">Confirm Password</label>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-icon" />
                <input
                  id="auth-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="auth-options">
            <label className="remember-checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            {mode === 'login' && (
              <button
                type="button"
                className="forgot-link"
                onClick={() => setError('Password reset instructions sent to your email!')}
              >
                Forgot password?
              </button>
            )}
          </div>

          <button type="submit" className="auth-submit-btn">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* 1-Click Demo Login for quick testing */}
        <button
          type="button"
          className="demo-login-btn"
          onClick={handleDemoLogin}
          title="Instant 1-click test login"
        >
          <Sparkles size={16} />
          <span>Quick Demo Login (1-Click)</span>
        </button>
      </div>
    </div>
  );
}
