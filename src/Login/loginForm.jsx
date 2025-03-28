import { useState } from "react";
import React from "react";
import "./login.css";
import { motion } from "framer-motion";
import {
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";

import { FaUser } from "react-icons/fa";
import Footer from "../components/footer";
import { IoMailOutline } from "react-icons/io5";

const LoginForm = ({
  authMode,
  setAuthMode,
  authData,
  setAuthData,
  handleAuthSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      className="screen-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="logo">Money Manager</div>

      <form onSubmit={handleAuthSubmit}>
        <div className="email">
          <label htmlFor="email">Email Address</label>
          <div className="sec-2">
            <IoMailOutline />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={authData.email || ""}
              onChange={(e) =>
                setAuthData({ ...authData, email: e.target.value })
              }
              required
            />
          </div>
        </div>

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
            />
          </div>
        </div>

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

        <button className="login" type="submit">
          {authMode === "login" ? "Login" : "Register"}
        </button>
      </form>

      <div className="footer">
        <span
          onClick={() =>
            setAuthMode(authMode === "login" ? "register" : "login")
          }
        >
          {authMode === "login" ? "Sign up" : "Already have an account?"}
        </span>
        <span>Forgot Password?</span>
      </div>
      <Footer />
    </motion.div>
  );
};

export default LoginForm;
