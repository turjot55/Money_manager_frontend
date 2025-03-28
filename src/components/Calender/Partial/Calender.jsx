import { motion } from "framer-motion";
import React from "react";
import Calendar from "react-calendar";
// import "src/App.css";
const CalendarComponent = (props) => {
  const { setDate, date, selectRange } = props;
  return (
    <motion.div
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
      className="calendar-container"
    >
      <Calendar onChange={setDate} value={date} selectRange={selectRange} />
    </motion.div>
  );
};

export default CalendarComponent;
