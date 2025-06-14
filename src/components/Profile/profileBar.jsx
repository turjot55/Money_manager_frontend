import React, { useState, useEffect } from "react";
import { FiChevronsRight, FiCalendar, FiLogOut, FiUser, FiSettings, FiHome } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
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

  const menuItems = [
    { icon: FiHome, title: "Dashboard", path: "/" },
    { icon: FiCalendar, title: "Calendar", path: "/calendar" },
    { icon: FiUser, title: "Profile", path: "/profile" },
    { icon: FiSettings, title: "Settings", path: "/settings" },
  ];

  return (
    <motion.div 
      className="sidebar-wrapper"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.nav
        layout
        className="sidebar"
        style={{
          width: open ? (window.innerWidth < 480 ? "140px" : "280px") : "fit-content",
        }}
      >
        <div className="sidebar-content">
          <TitleSection 
            open={open} 
            currentUser={currentUser} 
            logout={logout} 
            currentUserEmail={currentUserEmail} 
          />

          <div className="menu-section">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                Icon={item.icon}
                title={item.title}
                path={item.path}
                open={open}
                onClick={() => navigate(item.path)}
              />
            ))}
          </div>
        </div>

        <ToggleClose open={open} setOpen={setOpen} />
      </motion.nav>
    </motion.div>
  );
};

const MenuItem = ({ Icon, title, path, open, onClick }) => {
  const isActive = window.location.pathname === path;
  
  return (
    <motion.button
      layout
      onClick={onClick}
      className={`menu-item ${isActive ? "active" : ""}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div layout className="icon-container">
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="menu-title"
        >
          {title}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open, currentUser, logout, currentUserEmail }) => {
  return (
    <motion.div 
      className="title-section"
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="profile-card">
        <Logo currentUser={currentUser} />
        {open && (
          <motion.div
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="profile-info"
          >
            <h3 className="profile-name">{currentUser || "User"}</h3>
            <p className="profile-email">{currentUserEmail}</p>
          </motion.div>
        )}
      </div>
      
      <motion.button
        layout
        className="logout-button"
        onClick={logout}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FiLogOut />
        {open && <span>Logout</span>}
      </motion.button>
    </motion.div>
  );
};

const Logo = ({ currentUser }) => {
  const firstLetter = typeof currentUser === "string" && currentUser.length > 0
    ? currentUser.charAt(0).toUpperCase()
    : "U";

  return (
    <motion.div 
      className="profile-avatar"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {firstLetter}
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button 
      layout
      onClick={() => setOpen(!open)} 
      className="toggle-button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FiChevronsRight className={`toggle-icon ${open ? "rotated" : ""}`} />
    </motion.button>
  );
};

export default SidebarWithProfile;
