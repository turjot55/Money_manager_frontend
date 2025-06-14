import { useState } from "react";
import React from "react";
import "./login.css";
import { motion } from "framer-motion";
import {
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoMailOutline
} from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [authData, setAuthData] = useState({
    email: "",
    username: "",
    password: ""
  });

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const url = authMode === "login" ? "login" : "register";
      // Only send email and password for login, all fields for registration
      const requestData = authMode === "login" 
        ? { email: authData.email, password: authData.password }
        : authData;

      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (response.ok) {
        if (authMode === "login") {
          localStorage.setItem("token", data.token);
          // Update user context immediately with the data from the response
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
          }
          navigate("/dashboard");
        } else {
          // Registration successful
          setError("✅ Registration successful! Please check your email to verify your account.");
          setAuthMode("login");
          setAuthData({ email: "", username: "", password: "" });
        }
      } else {
        setError(data.error || "Authentication failed. Please try again.");
      }
    } catch (error) {
      setError("Connection error. Please check your internet connection.");
      console.error("Auth error:", error);
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
        <h1>Money Manager</h1>
      </div>

      {error && (
        <div className={`error-message ${error.includes("✅") ? "success" : "error"}`}>
          {error}
        </div>
      )}

      <form onSubmit={handleAuthSubmit}>
        <div className="email">
          <label htmlFor="email">Email Address</label>
          <div className="sec-2">
            <IoMailOutline />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={authData.email}
              onChange={(e) =>
                setAuthData({ ...authData, email: e.target.value })
              }
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {authMode === "register" && (
          <div className="user">
            <label htmlFor="username">User Name</label>
            <div className="sec-2">
              <FaUser />
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={authData.username}
                onChange={(e) =>
                  setAuthData({ ...authData, username: e.target.value })
                }
                required
                disabled={isLoading}
              />
            </div>
          </div>
        )}

        <div className="password">
          <label htmlFor="password">Password</label>
          <div className="sec-2">
            <IoLockClosedOutline />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="············"
              value={authData.password}
              onChange={(e) =>
                setAuthData({ ...authData, password: e.target.value })
              }
              required
              disabled={isLoading}
            />

            {showPassword ? (
              <IoEyeOffOutline
                className="show-hide"
                onClick={() => setShowPassword(false)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <IoEyeOutline
                className="show-hide"
                onClick={() => setShowPassword(true)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>

        <button className="login" type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="loading-spinner"></span>
          ) : (
            authMode === "login" ? "Login" : "Register"
          )}
        </button>
      </form>

      <div className="footer">
        <span
          onClick={() => {
            setAuthMode(authMode === "login" ? "register" : "login");
            setError("");
          }}
        >
          {authMode === "login" ? "Sign up" : "Already have an account?"}
        </span>
        <span onClick={() => navigate("/forgot-password")}>
          Forgot Password
        </span>
      </div>
      <Footer />
    </motion.div>
  );
};

export default LoginForm;
