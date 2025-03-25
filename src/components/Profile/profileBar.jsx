import React, { useState, useEffect } from "react";
import {
  
  FiChevronDown,
  FiChevronsRight,
  
  FiLogOut,
} from "react-icons/fi";
import { motion } from "framer-motion";
import "./profile.css";

export const SidebarWithProfile = ({ currentUser, logout }) => {
  const [open, setOpen] = useState(true);
//   const [selected, setSelected] = useState("Dashboard");


// inside SidebarWithProfile component
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setOpen(false);  // hide sidebar on small screens
    } else {
      setOpen(true);   // show sidebar on large screens
    }
  };

  // Run once on mount
  handleResize();

  // Run on window resize
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

  

  return (
    
    <div className="sidebar-wrapper ">

    
    <motion.nav
      layout
      className="sidebar"
      style={{
        width: open ? (window.innerWidth < 480 ? "140px" : "225px") : "fit-content"
      }}
    >
      <TitleSection open={open} currentUser={currentUser} logout={logout} />

      {/* <div className="sidebar-options">
        <Option Icon={FiHome} title="Dashboard" {...{ selected, setSelected, open }} />
        <Option Icon={FiDollarSign} title="Sales" notifs={3} {...{ selected, setSelected, open }} />
        <Option Icon={FiMonitor} title="View Site" {...{ selected, setSelected, open }} />
        <Option Icon={FiShoppingCart} title="Products" {...{ selected, setSelected, open }} />
        <Option Icon={FiTag} title="Tags" {...{ selected, setSelected, open }} />
        <Option Icon={FiBarChart} title="Analytics" {...{ selected, setSelected, open }} />
        <Option Icon={FiUsers} title="Members" {...{ selected, setSelected, open }} />
      </div> */}

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
    </div>
  );
};

// const Option = ({ Icon, title, selected, setSelected, open, notifs }) => {
//   return (
//     <motion.button
//       layout
//       onClick={() => setSelected(title)}
//       className={`sidebar-option ${selected === title ? "selected" : ""}`}
//     >
//       <motion.div layout className="icon-container">
//         <Icon />
//       </motion.div>
//       {open && (
//         <motion.span
//           layout
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.125 }}
//           className="option-title"
//         >
//           {title}
//         </motion.span>
//       )}

//       {notifs && open && (
//         <motion.span
//           initial={{ scale: 0, opacity: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.5 }}
//           className="notif-badge"
//         >
//           {notifs}
//         </motion.span>
//       )}
//     </motion.button>
//   );
// };

const TitleSection = ({ open, currentUser, logout }) => {
  return (
    <div className="title-section">
      <div className="title-container">
        <Logo />
        {open && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="title-text"
          >
            <span className="title-main">{currentUser || "User"}</span>
            <span className="title-sub">Money Manager</span>
          </motion.div>
        )}
        {open && <FiChevronDown className="chevron-down" />}
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

const Logo = () => {
  return (
    <motion.div layout className="logo-box">
      <svg
        width="24"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="logo-icon"
      >
        <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" stopColor="#000000"></path>
        <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" stopColor="#000000"></path>
      </svg>
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
    const isMobile = window.innerWidth < 768;
  
    const handleToggle = () => {
      setOpen((prev) => !prev);
    };
  
    return (
      <motion.button
        layout
        onClick={handleToggle}
        className="toggle-button"
      >
        <div className="toggle-content">
          <motion.div layout className="toggle-icon">
            <FiChevronsRight className={`chevron-icon ${open ? "rotated" : ""}`} />
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
  
  
  

