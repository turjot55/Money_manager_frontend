import React, { useState } from 'react';
import './ForgotPasswordForm.css';
import Footer from '../footer';

const ForgotPasswordForm = ({ setAuthMode }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      console.log('Sending forgot password request for email:', email);
      const response = await fetch('https://money-manager-ym1k.onrender.com/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log('Forgot password response:', data);

      if (response.ok) {
        setMessage({
          type: 'success',
          text: '✅ Reset link sent! Please check your email.'
        });
        setEmail('');
      } else {
        setMessage({
          type: 'error',
          text: `❌ ${data.error || 'Something went wrong'}`
        });
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setMessage({
        type: 'error',
        text: '❌ Connection error. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="email-input">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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
              <span className="button-icon">📨</span>
              <span>Send Reset Link</span>
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
      <Footer/>
    </div>
  );
};

export default ForgotPasswordForm;