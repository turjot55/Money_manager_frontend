 
import {useAnimate, motion, usePresence } from "framer-motion";
import { useEffect } from "react";

const TransactionItem = ({ entry, handleDelete }) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!isPresent) {
      const exit = async () => {
        await animate(scope.current, { scale: 1.05 }, { duration: 0.15 });
        await animate(scope.current, { opacity: 0, x: -30 }, { duration: 0.3 });
        safeToRemove();
      };
      exit();
    }
  }, [isPresent]);

  return (
    <motion.div
      ref={scope}
      layout
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      exit={{}} 
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
  );
};

export default TransactionItem;
