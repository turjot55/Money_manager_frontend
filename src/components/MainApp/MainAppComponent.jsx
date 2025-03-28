import React, { useState, useEffect } from "react";
// import "./App.css";
import '../../App.css';
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
// import ToastNotification from "./Notification/toastNotification";
// import SlideInNotifications from "./Notification/toastNotification";
// import SlideInNotifications
// import Footer from "./components/footer";
import Footer from "../footer";
// import CookieConsent from "./components/cookies/CookieConsent";
import CookieConsent from "../cookies/CookieConsent";
// import StickyModal from "./components/modal/StickyModal";
import StickyModal from "../modal/StickyModal";
// import TransactionItem from "./components/transaction/TransactionItem";
import TransactionItem from "../transaction/TransactionItem";
import { AnimatePresence } from "framer-motion";
// import SlideInNotifications from "./Notification/toastNotification";
// import SlideProfile from "./components/Profile/profileBar";
// import { SlideProfile } from "./components/Profile/profileBar";
// import { SlideProfile } from "./components/Profile/profileBar";
// import { SidebarWithProfile } from "./components/Profile/profileBar";
import { SidebarWithProfile } from "../Profile/profileBar";

// import { Placeholder } from '../node_modules/@babel/types/lib/index-legacy.d';
// import { Divide } from '../../server/node_modules/mongoose/types/expressions.d';
// import LoginForm from '../../Login/loginForm';
import LoginForm from '../../Login/loginForm'
import SlideInNotifications from '../../Notification/toastNotification'

function MainApp() {
  const [entries, setEntries] = useState([]);
  const [conversionRate, setConversionRate] = useState(85);
  // const [currentUser, setCurrentUser] = useState(null);
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
  // const [notification, setNotification] = useState({ type: "", message: "" });
  // const [authData, setAuthData] = useState({ username: "", password: "" });
  const [authData, setAuthData] = useState({
    username: "",
    password: "",
    email: "", // ✅ add this
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [notification, setNotification] = useState({ type: "", message: "" });
  // const [notifications, setNotifications] = useState([]); // 👈 initialize as an empty array
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [currentUser, setCurrentUser] = useState("");

  // logout function
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
      fetch(`https://money-manager-ym1k.onrender.com/auth/verify-email?token=${token}`)
        .then(res => res.json())
        .then(data => {
          if (data.message) {
            alert("✅ " + data.message); // You can replace with toast
            window.location.href = "/"; // redirect to home or login
          } else {
            alert("❌ Verification failed. Token may be invalid or expired.");
          }
        })
        .catch(err => {
          console.error("Verification error:", err);
          alert("❌ Something went wrong.");
        });
    }
  }, []);
  

  // useEffect(() => {
  //   if (notification.message) {
  //     const timeout = setTimeout(() => setNotification({ type: "", message: "" }), 3000);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [notification]);

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
      console.log("Sending authData:", authData); // Optional debug log
  
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
          // ✅ Expecting token on login
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
          // ✅ Register response does not return token
          addNotification("success", data.message || "🎉 Registered successfully. Please verify your email.");
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
  

  // const logout = () => {
  //   setToken("");
  //   localStorage.removeItem("token");
  //   setEntries([]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const newEntry = {
    //   ...formData,
    //   income: parseFloat(formData.income),
    //   fee: parseFloat(formData.fee),
    // };
    const newEntry = {
      ...formData,
      income: parseFloat(formData.income),
      fee: parseFloat(formData.fee),
      date: new Date().toISOString(), // 👈 Add this line
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

      // 🎯 Update balances based on income currency
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
        date: new Date().toISOString().substring(0, 10), // Default: today
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

  // if (!token) {
  //   return (
  //     <LoginForm
  //       authMode={authMode}
  //       setAuthMode={setAuthMode}
  //       authData={authData}
  //       setAuthData={setAuthData}
  //       handleAuthSubmit={handleAuthSubmit}
  //     />
  //   );
  // }

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
                {/* <div className="topbar">
              
                <div className="profile-info">
                  <div className="profile-avatar-circle">
                    {currentUser?.charAt(0).toUpperCase()}
                  </div>
                  <span>{currentUser}</span>
                </div>
                <button className="dotted-button" onClick={logout}>🔓 Logout</button>
              </div> */}

                {/* <h1 className="header">Money Management Tool</h1> */}

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
                      {/* <h2 className="section-title">Agrani Bank limited</h2> */}
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
                  {/* {entries.length === 0 ? (
                  <p className="empty">No transactions recorded yet.</p>
                ) : (
                  entries.map((entry) => (
                    <motion.div
                      key={entry._id}
                      className="entry"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <p>
                        <strong>{entry.platform}</strong> – Income:{" "}
                        <strong>
                          {entry.income}
                          {entry.incomeCurrency}
                        </strong>
                        {entry.fee && (
                          <span className="fee">
                            {" "}
                            (Fee: {entry.fee}
                            {entry.feeCurrency})
                          </span>
                        )}
                        <br />
                        <span className="entry-date">
                          {new Date(entry.date).toLocaleString()}
                        </span>
                      </p>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(entry._id)}
                      >
                        🗑 Delete
                      </button>
                    </motion.div>
                  ))
                )} */}
                  {/* {entries.length === 0 ? (
                  <p className="empty">No transactions recorded yet.</p>
                ) : (
                  entries.map((entry) => (
                    <motion.div
                      key={entry._id}
                      layout
                      drag="y"
                      dragConstraints={{ top: 0, bottom: 0 }}
                      dragElastic={0.2}
                      className="entry draggable-card"
                    >
                      <p>
                        <strong>{entry.platform}</strong> – Income:{" "}
                        <strong>
                          {entry.income}
                          {entry.incomeCurrency}
                        </strong>
                        {entry.fee && (
                          <span className="fee">
                            {" "}
                            (Fee: {entry.fee}
                            {entry.feeCurrency})
                          </span>
                        )}
                        <br />
                        <span className="entry-date">
                          {new Date(entry.date).toLocaleString()}
                        </span>
                      </p>
                      <button
                        className="button-delete"
                        onClick={() => handleDelete(entry._id)}
                      >
                        🗑 Delete
                      </button>
                    </motion.div>
                  ))
                )} */}
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

        {/* <motion.div
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    > */}

        {/* </motion.div> */}
      </div>
    </>
  );
}

export default MainApp;

// const Logo = () => {
//     return (
//       <motion.div
//         layout
//         className="logo"
//         style={{ color: "black", textAlign: "center", marginBottom: "1rem" }}
//       >
//         <svg
//           width="64" // ✅ Bigger width
//           height="64" // ✅ Optional: define height explicitly
//           viewBox="0 0 50 39"
//           fill="black"
//           xmlns="http://www.w3.org/2000/svg"
//           className="logo-icon"
//         >
//           <path
//             d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
//             fill="black"
//           />
//           <path
//             d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
//             fill="black"
//           />
//         </svg>
//         <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "0.9rem" }}>
//           Money Management Tool
//         </h2>
//       </motion.div>
//     );
//   };
  
const Logo = () => {
    return (
      <motion.div
        layout
        className="logo"
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          transform: "translateZ(0)", // triggers hardware acceleration
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
            filter: "drop-shadow(4px 4px 8px rgba(0,0,0,0.3))", // ✅ 3D shadow
            transform: "rotateX(5deg) rotateY(-5deg) scale(1.05)", // ✅ 3D tilt
            transition: "transform 0.3s ease, filter 0.3s ease",
            
          }}
        >
          <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" fill="black" />
          <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" fill="black" />
        </svg>
        <h2
          style={{
            
            fontWeight: "900",
            color: "#111827",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)", // ✅ title shadow
            
          }}
        >
          Money Management Tool
        </h2>
      </motion.div>
    );
  };
  