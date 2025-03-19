import React from 'react';
import '../styles/iOS.css';

const MealCard = ({ meal, onAddFood, onDeleteFood }) => {
  const handleAddButtonClick = () => {
    onAddFood(meal.id);
  };

  const handleDeleteFood = (foodId) => {
    onDeleteFood(meal.id, foodId);
  };

  return (
    <div className="ios-card">
      <div className="ios-card-header">
        <div className="ios-card-title">
          <h3 className="ios-section-title">{meal.name}</h3>
        </div>
        <button 
          className="ios-add-button"
          onClick={handleAddButtonClick}
          aria-label="Add food"
        >
          <span className="ios-add-icon">+</span>
        </button>
      </div>

      <ul className="ios-list">
        {meal.foods.map(food => (
          <li key={food.id} className="ios-list-item">
            <span className="ios-label">{food.name}</span>
            <div className="ios-food-actions">
              <span className="ios-value">{food.calories} cal</span>
              <button 
                className="ios-delete-button"
                onClick={() => handleDeleteFood(food.id)}
                aria-label="Delete food"
              >
                <span className="ios-delete-icon">×</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealCard; 