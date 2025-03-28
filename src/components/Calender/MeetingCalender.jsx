// import "src/App.css";
import React from "react";
import Actions from "./Partial/Action";
import CalendarComponent from "./Partial/Calender";
import Title from "./Partial/Tite";
import Footer from "../footer";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import './button.css'
import { CalenderSidebar } from "./CalenderSidebar";
import './MeetingCalender.css'
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import StickyModal from "../modal/StickyModal";


const MeetingCalender = ({ date, setDate, selectRange, setSelectRange, currentUser }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="main-bg">
      <div className="calendar-vertical-wrapper">
        {/* You can now use it anywhere here */}
        <Logo currentUser={currentUser} />
        <h2 style={{ textAlign: "center", color: "#333" }}>
          Welcome, <span style={{ fontWeight: "bold", color: "red"  , fontSize: "1rem" , textWrap: "wrap"}}>{currentUser}  This is a test version of the calendar. Soon, you’ll be able to select meeting durations, auto-generate Google Meet links, and enjoy more powerful features.</span> 👋
        </h2>

        {/* <Title title={"Calendar"} /> */}
        <CalendarComponent
          setDate={setDate}
          date={date}
          selectRange={selectRange}
        />
        <Actions
          setDate={setDate}
          date={date}
          selectRange={selectRange}
          setSelectRange={setSelectRange}
        />
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
  );
};



export default MeetingCalender;

const Logo = () => {
  const navigate = useNavigate();
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
      <button className="home" onClick={() => navigate('/')}>
        Home
      </button>
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
        <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" fill="black" />
        <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" fill="black" />
      </svg>
      <h2
        style={{
          fontWeight: "900",
          color: "#111827",
          textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          cursor: "pointer"
        }}
      >
        Money Management Tool
      </h2>
    </motion.div>
  );
};
