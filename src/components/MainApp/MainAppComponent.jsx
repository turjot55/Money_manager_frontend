import React, { useState, useEffect } from "react";

import "../../App.css";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

import Footer from "../footer";

import CookieConsent from "../cookies/CookieConsent";

import StickyModal from "../modal/StickyModal";

import TransactionItem from "../transaction/TransactionItem";
import { AnimatePresence } from "framer-motion";

import SidebarWithProfile from "../Profile/profileBar";

import LoginForm from "../../Login/loginForm";
import SlideInNotifications from "../../Notification/toastNotification";

function MainApp() {
  const [entries, setEntries] = useState([]);
  const [conversionRate, setConversionRate] = useState(85);

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

  const [authData, setAuthData] = useState({
    username: "",
    password: "",
    email: "",
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
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setEntries(data));

    fetch("https://money-manager-ym1k.onrender.com/convert?from=USD&to=BDT")
      .then((res) => res.json())
      .then((data) => setConversionRate(data.rate || 117));
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
        const decoded = jwtDecode(token);
        setCurrentUser(decoded.username);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, [token]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    const url = authMode === "login" ? "login" : "register";
    const endpoint = `https://money-manager-ym1k.onrender.com/auth/${url}`;

    try {
      console.log("Sending authData:", authData);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      });

      const data = await res.json();

      if (res.ok) {
        if (authMode === "login") {
          if (data.token) {
            addNotification("success", "✅ Logged in successfully!");

            setTimeout(() => {
              localStorage.setItem("token", data.token);
              setToken(data.token);
              setAuthData({ username: "", password: "", email: "" });
            }, 200);
          } else {
            addNotification("error", data.error || "Login failed.");
          }
        } else {
          addNotification(
            "success",
            data.message ||
              "🎉 Registered successfully. Please verify your email."
          );
          setAuthData({ username: "", password: "", email: "" });
        }
      } else {
        addNotification("error", data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error("Auth error:", err);
      addNotification("error", "❌ Something went wrong. Please try again.");
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
    let totalIncomeUSD = 0;
    let totalFeesUSD = 0;

    entries.forEach((entry) => {
      totalIncomeUSD += convertCurrency(
        entry.income,
        entry.incomeCurrency,
        "USD"
      );
      totalFeesUSD += convertCurrency(entry.fee, entry.feeCurrency, "USD");
    });

    return {
      netEarningsUSD: totalIncomeUSD - totalFeesUSD,
      netEarningsBDT: (totalIncomeUSD - totalFeesUSD) * conversionRate,
    };
  };

  return (
    <>
      <div className="top-logo-wrapper">
        <Logo />
      </div>
      <div className="app-wrapper">
        {token && (
          <SidebarWithProfile currentUser={currentUser} logout={logout} />
        )}

        <div className="app-content">{/* ✅ Your existing content here */}</div>

        <CookieConsent />
        <SlideInNotifications
          notifications={notifications}
          removeNotification={removeNotification}
        />

        {token ? (
          <motion.div
            className="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {
              <div className="container">
                <motion.div
                  className="card"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <h2 className="section-title">Add Transaction</h2>
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
                  className="card"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <h2 className="section-title">Balance in USD</h2>
                  <div className="balances">
                    <div className="balance-item">
                      <h3>Payoneer</h3>
                      <p>
                        <strong>
                          ${calculateTotals().netEarningsUSD.toFixed(2)}
                        </strong>
                      </p>
                    </div>
                    <div className="balances">
                      <div className="balance-item">
                        <h3>Balance in BDT</h3>
                        <p>
                          <strong>
                            {" "}
                            ৳{calculateTotals().netEarningsBDT.toFixed(2)}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="card"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <h2 className="section-title">Summary</h2>
                  <p>
                    Net Earnings:{" "}
                    <strong>
                      ${calculateTotals().netEarningsUSD.toFixed(2)}
                    </strong>{" "}
                    /
                    <strong>
                      {" "}
                      ৳{calculateTotals().netEarningsBDT.toFixed(2)}
                    </strong>
                  </p>
                </motion.div>

                <motion.div
                  className="card"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <h2 className="section-title">Transaction History</h2>

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
                <StickyModal isOpen={showModal} setIsOpen={setShowModal} />

                <button
                  className="sticky-cookie-btn"
                  onClick={() => setShowModal(true)}
                >
                  Important Notice
                </button>
                <Footer />
              </div>
            }
          </motion.div>
        ) : (
          <LoginForm
            authMode={authMode}
            setAuthMode={setAuthMode}
            authData={authData}
            setAuthData={setAuthData}
            handleAuthSubmit={handleAuthSubmit}
          />
        )}
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
      style={{
        textAlign: "center",
        marginBottom: "2rem",
        transform: "translateZ(0)",
      }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 50 39"
        fill="black"
        xmlns="http://www.w3.org/2000/svg"
        className="logo-icon"
        style={{
          filter: "drop-shadow(4px 4px 8px rgba(0,0,0,0.3))",
          transform: "rotateX(5deg) rotateY(-5deg) scale(1.05)",
          transition: "transform 0.3s ease, filter 0.3s ease",
        }}
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          fill="black"
        />
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          fill="black"
        />
      </svg>
      <h2
        style={{
          fontWeight: "900",
          color: "#111827",
          textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        Money Management Tool
      </h2>
    </motion.div>
  );
};
