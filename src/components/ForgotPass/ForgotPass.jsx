import React, { useState } from 'react';

const ForgotPasswordForm = ({ setAuthMode }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage('✅ Password reset link sent to your email!');
        setEmail('');
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setMessage('❌ Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {message && <p className={message.includes('✅') ? 'success' : 'error'}>{message}</p>}
      <button onClick={() => setAuthMode('login')} className="link-button">
        Back to Login
      </button>
    </div>
  );
};

export default ForgotPasswordForm;