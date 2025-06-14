import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WorkRoutine.css';

const WorkRoutine = () => {
  const [routines, setRoutines] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newRoutine, setNewRoutine] = useState({
    title: '',
    time: '',
    description: '',
    days: [],
    priority: 'Medium',
    status: 'Not Started'
  });

  const priorities = ['High', 'Medium', 'Low'];
  const statuses = ['Not Started', 'In Progress', 'Completed'];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const fetchRoutines = async () => {
    try {
      const response = await fetch('https://money-manager-ym1k.onrender.com/api/routines', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setRoutines(data);
      }
    } catch (error) {
      console.error('Failed to fetch routines:', error);
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://money-manager-ym1k.onrender.com/api/routines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newRoutine)
      });

      if (response.ok) {
        const savedRoutine = await response.json();
        setRoutines(prevRoutines => [...prevRoutines, savedRoutine]);
        setNewRoutine({
          title: '',
          time: '',
          description: '',
          days: [],
          priority: 'Medium',
          status: 'Not Started'
        });
        setIsAddingNew(false);
      }
    } catch (error) {
      console.error('Failed to save routine:', error);
    }
  };

  const handleStatusChange = async (routineId, newStatus) => {
    try {
      const response = await fetch(`https://money-manager-ym1k.onrender.com/api/routines/${routineId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setRoutines(prevRoutines =>
          prevRoutines.map(routine =>
            routine.id === routineId
              ? { ...routine, status: newStatus }
              : routine
          )
        );
      }
    } catch (error) {
      console.error('Failed to update routine status:', error);
    }
  };

  return (
    <div className="notion-like-container">
      <div className="notion-header">
        <h2>📝 Work Routines</h2>
        <motion.button 
          className="add-routine-btn"
          onClick={() => setIsAddingNew(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          + New Routine
        </motion.button>
      </div>

      <AnimatePresence>
        {isAddingNew && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="routine-form-container"
          >
            <form onSubmit={handleSubmit} className="notion-form">
              <input
                type="text"
                placeholder="Enter routine title..."
                value={newRoutine.title}
                onChange={(e) => setNewRoutine({...newRoutine, title: e.target.value})}
                className="title-input"
                required
              />
              
              <div className="form-row">
                <div className="time-input">
                  <label>🕒 Time</label>
                  <input
                    type="time"
                    value={newRoutine.time}
                    onChange={(e) => setNewRoutine({...newRoutine, time: e.target.value})}
                    required
                  />
                </div>
                
                <div className="priority-select">
                  <label>🎯 Priority</label>
                  <select
                    value={newRoutine.priority}
                    onChange={(e) => setNewRoutine({...newRoutine, priority: e.target.value})}
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="days-selector">
                <label>📅 Repeat on</label>
                <div className="days-buttons">
                  {daysOfWeek.map(day => (
                    <motion.button
                      key={day}
                      type="button"
                      className={`day-btn ${newRoutine.days.includes(day) ? 'selected' : ''}`}
                      onClick={() => {
                        const updatedDays = newRoutine.days.includes(day)
                          ? newRoutine.days.filter(d => d !== day)
                          : [...newRoutine.days, day];
                        setNewRoutine({...newRoutine, days: updatedDays});
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {day}
                    </motion.button>
                  ))}
                </div>
              </div>

              <textarea
                placeholder="Add description..."
                value={newRoutine.description}
                onChange={(e) => setNewRoutine({...newRoutine, description: e.target.value})}
                className="notion-textarea"
              />

              <div className="form-actions">
                <motion.button 
                  type="submit" 
                  className="save-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Routine
                </motion.button>
                <motion.button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setIsAddingNew(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="routines-list">
        <AnimatePresence>
          {routines.map((routine) => (
            <motion.div
              key={routine.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="notion-card"
              whileHover={{ y: -4 }}
            >
              <div className="card-header">
                <h3>{routine.title}</h3>
                <span className={`priority-badge ${routine.priority.toLowerCase()}`}>
                  {routine.priority}
                </span>
              </div>
              <div className="card-time">🕒 {routine.time}</div>
              <div className="card-days">
                {routine.days.map(day => (
                  <span key={day} className="day-tag">{day}</span>
                ))}
              </div>
              {routine.description && (
                <p className="card-description">{routine.description}</p>
              )}
              <div className="card-footer">
                <select
                  value={routine.status}
                  onChange={(e) => handleStatusChange(routine.id, e.target.value)}
                  className={`status-select ${routine.status.toLowerCase().replace(' ', '-')}`}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorkRoutine;