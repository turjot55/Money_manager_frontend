import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import "./StickyModal.css"; 

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
              <h3>Important Notice</h3>
              <p>
                This Money Management Tool is designed for personal use only. Please do not use it to store sensitive financial or business data. <br /><br />
                <strong>Your privacy matters:</strong> No sensitive financial data is stored or shared with third parties. All features are intended to help you track your personal transactions and routines in a simple, secure way.<br /><br />
                <strong>Disclaimer:</strong> This tool is not a substitute for professional financial advice or business accounting. Use it responsibly and at your own discretion.
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
