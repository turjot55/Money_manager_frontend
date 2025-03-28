import React, { useEffect } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import './toast.css'

const SlideInNotifications = ({ notifications, removeNotification }) => {
  return (
    <div className="slide-in-container">
      <AnimatePresence>
        {notifications.map((n) => (
          <SlideNotification key={n.id} {...n} onClose={() => removeNotification(n.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const SlideNotification = ({ id, type = "success", text, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [id, onClose]);

  return (
    <motion.div
      className={`slide-in-notification ${type}`}
      initial={{ y: -20, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <FiCheckSquare />
      <span>{text}</span>
      <button onClick={onClose}>&times;</button>
    </motion.div>
  );
};

export default SlideInNotifications;
