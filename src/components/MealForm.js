import React from 'react';

const MealForm = ({ newMealName, setNewMealName, addMeal }) => {
  return (
    <div className="ios-card">
      <h2 className="ios-section-title">Add New Meal</h2>
      <input
        type="text"
        className="ios-input"
        placeholder="Meal Name"
        value={newMealName}
        onChange={(e) => setNewMealName(e.target.value)}
      />
      <button className="ios-button" onClick={addMeal}>Add Meal</button>
    </div>
  );
};

export default MealForm; 