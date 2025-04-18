import React, { useState, useEffect } from "react";
import { FiChevronsRight, FiCalendar, FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useContext } from "react";




const SidebarWithProfile = ({ logout }) => {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();
  const { currentUser, currentUserEmail } = useContext(UserContext);
  

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="sidebar-wrapper ">
      <motion.nav
        layout
        className="sidebar"
        style={{
          width: open
            ? window.innerWidth < 480
              ? "140px"
              : "225px"
            : "fit-content",
        }}
      >
        <TitleSection open={open} currentUser={currentUser} logout={logout} currentUserEmail={currentUserEmail} />

        <Option
          Icon={FiCalendar}
          title="Calendar"
          selected={null}
          setSelected={() => navigate("/calendar")}
          open={open}
        />

        <div className="sidebar-options">
          <div className="calendar-sidebar">
            <div className="calendar-icon-label"></div>
          </div>
        </div>

        <ToggleClose open={open} setOpen={setOpen} />
      </motion.nav>
    </div>
  );
};

export default SidebarWithProfile;

const Option = ({ Icon, title, selected, setSelected, open, notifs }) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`sidebar-option ${selected === title ? "selected" : ""}`}
    >
      <motion.div layout className="icon-container">
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="option-title"
        >
          {title}
        </motion.span>
      )}

      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="notif-badge"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open, currentUser, logout, currentUserEmail }) => {
  
  return (
    <div className="title-section">
      <div className="title-container">
        <Logo currentUser={currentUser}/>
        {open && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="title-text"
          >
            {/* <span className="title-main">{currentUser || "User"}</span> */}
            <span className="title-sub">
              Hello, <strong style={{ color: "red" }}>{currentUser}</strong>{" "}
              Welcome to Money Management Tool{" "}
            <span className="email-text" style={{ fontSize: "0.6rem", color: "blue"}}><strong>{currentUserEmail}</strong></span>
            </span>

          </motion.div>
        )}
      </div>
      <div className="logout-section">
        {open ? (
          <button className="dotted-button" onClick={logout}>
            🔓 Logout
          </button>
        ) : (
          <button className="logout-icon-button" onClick={logout}>
            <FiLogOut />
          </button>
        )}
      </div>
    </div>
  );
};

const Logo = ({ currentUser }) => {
  const firstLetter =
    typeof currentUser === "string" && currentUser.length > 0
      ? currentUser.toUpperCase()
      : "";
  return (
    <motion.div layout className="logo-user" style={{ color: "white" }}>
      {firstLetter}
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  const isMobile = window.innerWidth < 768;

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <motion.button layout onClick={handleToggle} className="toggle-button">
      <div className="toggle-content">
        <motion.div layout className="toggle-icon">
          <FiChevronsRight
            className={`chevron-icon ${open ? "rotated" : ""}`}
          />
        </motion.div>

        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="hide-label"
        >
          {open ? "Hide" : isMobile ? "" : ""}
        </motion.span>
      </div>
    </motion.button>
  );
};
