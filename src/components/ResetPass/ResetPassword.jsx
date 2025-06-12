import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Resetpass.css';

const ResetPassword = ({ setAuthMode }) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // const [authMode, setAuthMode] = useState('login');

  const handleSubmit =  async (e)  => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: '❌ Passwords do not match' });
      return;
    }

     

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('https://money-manager-ym1k.onrender.com/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: '✅ Password reset successful! You can now login with your new password.'
        });
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({
          type: 'error',
          text: `❌ ${data.error || 'Something went wrong'}`
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: '❌ Connection error. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="password-input">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>
        <div className="password-input">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>
        <button 
          type="submit" 
          className="reset-button modern-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading-spinner"></span>
          ) : (
            <>
              <span className="button-icon">🔐</span>
              <span>Reset Password</span>
            </>
          )}
        </button>
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
        <button
          type="button"
          className="back-button modern-button"
          onClick={() => setAuthMode('login')}
        >
          <span className="button-icon">←</span>
          <span>Back to Login</span>
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;