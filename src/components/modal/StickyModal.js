import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import "./StickyModal.css"; // Import CSS

const StickyModal = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="modal-overlay"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="modal-content"
          >
            <FiAlertCircle className="modal-icon-bg" />
            <div className="modal-inner">
              <div className="modal-circle">
                <FiAlertCircle />
              </div>
              <h3>One more thing!</h3>
              <p>
                This Web application for tracking your Transaction from Different Platform 
                Use It Only For Personal Use 
              </p>
              <div className="modal-buttons">
                <button onClick={() => setIsOpen(false)} className="modal-cancel">
                  Reject
                </button>
                <button onClick={() => setIsOpen(false)} className="modal-confirm">
                  Accept
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyModal;
