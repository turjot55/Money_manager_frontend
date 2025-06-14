import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoMailOutline } from "react-icons/io5";
import Footer from '../footer';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Password reset link has been sent to your email.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(data.error || 'Failed to process request. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="screen-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="logo">
        <h1>Reset Password</h1>
      </div>

      {error && (
        <div className="error-message error">
          {error}
        </div>
      )}

      {success && (
        <div className="error-message success">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="email">
          <label htmlFor="email">Email Address</label>
          <div className="sec-2">
            <IoMailOutline />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <button className="login" type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="loading-spinner"></span>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>

      <div className="footer">
        <span onClick={() => navigate('/login')}>
          Back to Login
        </span>
      </div>
      <Footer />
    </motion.div>
  );
};

export default ForgotPasswordForm;