import React, { useState, useEffect } from "react";

import "../../App.css";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";

import Footer from "../footer";

import CookieConsent from "../cookies/CookieConsent";

import StickyModal from "../modal/StickyModal";

import TransactionItem from "../transaction/TransactionItem";

import SidebarWithProfile from "../Profile/profileBar";

import LoginForm from "../../Login/loginForm";
import SlideInNotifications from "../../Notification/toastNotification";
// import TimeCard from "../TimeCard/TimeCard";
// import ForgotPasswordForm from '../ForgotPassword/ForgotPasswordForm';
import ForgotPasswordForm from "../ForgotPass/ForgotPass";
import WorkRoutine from "../WorkOut/WorkRoutine";

function MainApp() {
  const [entries, setEntries] = useState([]); // Initialize as empty array
  const [conversionRate, setConversionRate] = useState(85);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);

  const [formData, setFormData] = useState({
    platform: "",
    income: "",
    incomeCurrency: "USD",
    fee: "",
    feeCurrency: "USD",
    date: new Date().toISOString().slice(0, 16),
  });

  const [setBalances] = useState({
    payoneer: { amount: 100, currency: "USD" },
    bank: { amount: 0, currency: "BDT" },
  });

  const [authMode, setAuthMode] = useState("login");
  // const [ setErrorMsg] = useState(""); 

  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [notification, setNotification] = useState({ type: "", message: "" });

  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [currentUser, setCurrentUser] = useState("");

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const addNotification = (type, text) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, text }]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (window.location.pathname === "/verify" && token) {
      fetch(
        `https://money-manager-ym1k.onrender.com/auth/verify-email?token=${token}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            alert("✅ " + data.message);
            window.location.href = "/";
          } else {
            alert("❌ Verification failed. Token may be invalid or expired.");
          }
        })
        .catch((err) => {
          console.error("Verification error:", err);
          alert("❌ Something went wrong.");
        });
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    fetch("https://money-manager-ym1k.onrender.com/entries", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setEntries(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error("Failed to fetch entries:", error);
        setEntries([]);
      });
  }, [token]);

  useEffect(() => {
    if (notification.message) {
      const timeout = setTimeout(
        () => setNotification({ type: "", message: "" }),
        3000
      );
      return () => clearTimeout(timeout);
    }
  }, [notification]);

  useEffect(() => {
    if (token) {
      try {
        // First try to get user data from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setCurrentUser(userData.username);
        } else {
          // Fallback to decoding from token if no stored user data
          const decoded = jwtDecode(token);
          setCurrentUser(decoded.username);
        }
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, [token]);

  // Detect device type and capabilities
  useEffect(() => {
    const checkDevice = () => {
      const ua = navigator.userAgent;
      setIsIOS(/iPad|iPhone|iPod/.test(ua));
      setIsAndroid(/Android/.test(ua));
      setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
      setDevicePixelRatio(window.devicePixelRatio || 1);
      
      // Check if mobile
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(ua) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Handle viewport height for mobile browsers
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  // Handle safe areas for iOS devices
  useEffect(() => {
    if (isIOS) {
      document.documentElement.style.setProperty('--safe-area-inset-top', 'env(safe-area-inset-top)');
      document.documentElement.style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom)');
    }
  }, [isIOS]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    // setErrorMsg("");

    const url = authMode === "login" ? "login" : "register";
    const endpoint = `${process.env.REACT_APP_API_URL}/auth/${url}`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'omit',
        mode: 'cors',
        body: JSON.stringify(authData)
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle specific error cases
        if (data.error === "Email taken") {
          addNotification("error", "❌ This email is already registered. Please try logging in instead.");
          setAuthMode("login"); // Optionally switch to login mode
          return;
        }
        throw new Error(data.error || "Registration failed");
      }
      
      if (authMode === "login" && data.token) {
        addNotification("success", "✅ Logged in successfully!");
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setAuthData({ username: "", password: "", email: "" });
      } else if (authMode === "register") {
        addNotification("success", "🎉 Registration successful! Please check your email to verify your account.");
        setAuthData({ username: "", password: "", email: "" });
      }
    } catch (err) {
      console.error("Auth error:", err);
      addNotification("error", `❌ ${err.message || "Connection failed. Please try again."}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntry = {
      ...formData,
      income: parseFloat(formData.income),
      fee: parseFloat(formData.fee),
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch(
        "https://money-manager-ym1k.onrender.com/entries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newEntry),
        }
      );

      const saved = await res.json();
      setEntries([saved, ...entries]);

      setBalances((prev) => {
        const updated = { ...prev };

        if (saved.incomeCurrency === "USD") {
          updated.payoneer.amount += saved.income;
        } else {
          updated.bank.amount += saved.income;
        }

        return updated;
      });

      setFormData({
        platform: "",
        income: "",
        incomeCurrency: "USD",
        fee: "",
        feeCurrency: "USD",
        date: new Date().toISOString().substring(0, 10),
      });
    } catch (err) {
      console.error("Failed to save entry:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://money-manager-ym1k.onrender.com/entries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (err) {
      console.error("Failed to delete entry:", err);
    }
  };

  const convertCurrency = (amount, from, to) => {
    if (from === to) return amount;
    return from === "USD" ? amount * conversionRate : amount / conversionRate;
  };

  const calculateTotals = () => {
    if (!Array.isArray(entries)) {
      console.error('Entries is not an array:', entries);
      return {
        netEarningsUSD: 0,
        netEarningsBDT: 0
      };
    }

    let totalIncomeUSD = 0;
    let totalFeesUSD = 0;

    entries.forEach(entry => {
      if (entry && typeof entry.income === 'number' && typeof entry.fee === 'number') {
        totalIncomeUSD += convertCurrency(entry.income, entry.incomeCurrency, "USD");
        totalFeesUSD += convertCurrency(entry.fee, entry.feeCurrency, "USD");
      }
    });

    return {
      netEarningsUSD: totalIncomeUSD - totalFeesUSD,
      netEarningsBDT: (totalIncomeUSD - totalFeesUSD) * conversionRate
    };
  };

  return (
    <>
      <div className="top-logo-wrapper">
        <Logo />
      </div>
      <div className={`app-wrapper ${isMobile ? 'mobile' : ''} ${isIOS ? 'ios' : ''} ${isAndroid ? 'android' : ''}`}>
        {token ? (
          <div className="layout-container">
            <SidebarWithProfile currentUser={currentUser} logout={logout} />
            <div className="main-content-wrapper">
              <motion.div
                className="app"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="main-container">
                  <motion.div
                    className="content-wrapper"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <div className="main-content">
                      <div className="section work-routine-section">
                        <h2 className="section-heading">Work Routines</h2>
                        <div className="work-routine-container">
                          <WorkRoutine />
                        </div>
                      </div>

                      <motion.div
                        className="section transaction-section"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                      >
                        <h2 className="section-heading">Add Transaction</h2>
                        <form onSubmit={handleSubmit} className="form-grid">
                          <div className="form-group">
                            <label>Date Earned</label>
                            <input
                              type="date"
                              value={formData.date}
                              onChange={(e) =>
                                setFormData({ ...formData, date: e.target.value })
                              }
                            />
                            <label>Platform</label>
                            <input
                              required
                              placeholder="example: upwork"
                              type="text"
                              value={formData.platform}
                              onChange={(e) =>
                                setFormData({ ...formData, platform: e.target.value })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>Income</label>
                            <input
                              required
                              type="number"
                              value={formData.income}
                              onChange={(e) =>
                                setFormData({ ...formData, income: e.target.value })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>Income Currency</label>
                            <select
                              value={formData.incomeCurrency}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  incomeCurrency: e.target.value,
                                })
                              }
                            >
                              <option value="USD">USD</option>
                              <option value="BDT">BDT</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Fee</label>
                            <input
                              placeholder="tax: fee or VAT"
                              type="number"
                              value={formData.fee}
                              onChange={(e) =>
                                setFormData({ ...formData, fee: e.target.value })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>Fee Currency</label>
                            <select
                              value={formData.feeCurrency}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  feeCurrency: e.target.value,
                                })
                              }
                            >
                              <option value="USD">USD</option>
                              <option value="BDT">BDT</option>
                            </select>
                          </div>
                          <div className="form-button">
                            <button type="submit">Add Entry</button>
                          </div>
                        </form>
                      </motion.div>

                      <motion.div
                        className="section balance-section"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                      >
                        <h2 className="section-heading">Balance Summary</h2>
                        <div className="balances">
                          <div className="balance-item">
                            <h3>Payoneer (USD)</h3>
                            <p>
                              <strong>
                                ${calculateTotals().netEarningsUSD.toFixed(2)}
                              </strong>
                            </p>
                          </div>
                          <div className="balance-item">
                            <h3>Bank (BDT)</h3>
                            <p>
                              <strong>
                                ৳{calculateTotals().netEarningsBDT.toFixed(2)}
                              </strong>
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="section history-section"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                      >
                        <h2 className="section-heading">Transaction History</h2>
                        <AnimatePresence>
                          {entries.length === 0 ? (
                            <p className="empty">No transactions recorded yet.</p>
                          ) : (
                            entries.map((entry) => (
                              <TransactionItem
                                key={entry._id}
                                entry={entry}
                                handleDelete={handleDelete}
                              />
                            ))
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              <StickyModal isOpen={showModal} setIsOpen={setShowModal} />
              <button
                className="sticky-cookie-btn"
                onClick={() => setShowModal(true)}
              >
                Important Notice
              </button>
              <Footer />
            </div>
          </div>
        ) : (
          authMode === 'forgotPassword' ? (
            <ForgotPasswordForm setAuthMode={setAuthMode} />
          ) : (
            <LoginForm
              authMode={authMode}
              setAuthMode={setAuthMode}
              authData={authData}
              setAuthData={setAuthData}
              handleAuthSubmit={handleAuthSubmit}
            />
          )
        )}
        <CookieConsent />
        <SlideInNotifications
          notifications={notifications}
          removeNotification={removeNotification}
        />
      </div>
    </>
  );
}

export default MainApp;

const Logo = () => {
  return (
    <motion.div
      layout
      className="logo"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="logo-content">
        <motion.div 
          className="logo-icon-wrapper"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 50 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="logo-icon"
          >
            <path
              d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
              fill="url(#gradient1)"
            />
            <path
              d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
              fill="url(#gradient2)"
            />
            <defs>
              <linearGradient id="gradient1" x1="1" y1="2" x2="37.5808" y2="24.9729" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8B5CF6"/>
                <stop offset="1" stopColor="#EC4899"/>
              </linearGradient>
              <linearGradient id="gradient2" x1="11.4192" y1="36" x2="49" y2="13.0271" gradientUnits="userSpaceOnUse">
                <stop stopColor="#EC4899"/>
                <stop offset="1" stopColor="#8B5CF6"/>
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
        <motion.h2
          className="logo-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Money Management Tool
        </motion.h2>
      </div>
    </motion.div>
  );
};
