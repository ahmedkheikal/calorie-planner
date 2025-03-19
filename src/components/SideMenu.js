import React, { useState } from 'react';
import '../styles/iOS.css';

const SideMenu = ({ onAddMeal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newMealName, setNewMealName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMealName) {
      onAddMeal(newMealName);
      setNewMealName('');
      setIsOpen(false);
    }
  };

  return (
    <>
      <button 
        className="ios-fab-button"
        onClick={() => setIsOpen(true)}
        aria-label="Add new meal"
      >
        <span className="ios-fab-icon">+</span>
      </button>

      {isOpen && (
        <div className="ios-utility-overlay">
          <div className="ios-utility-window">
            <div className="ios-utility-header">
              <h2>Add New Meal</h2>
              <button 
                className="ios-close-button"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <span className="ios-close-icon">×</span>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="ios-input"
                placeholder="Meal Name"
                value={newMealName}
                onChange={(e) => setNewMealName(e.target.value)}
                autoFocus
              />
              <button type="submit" className="ios-button">
                Add Meal
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SideMenu; 