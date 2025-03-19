import React, { useState, useEffect, useRef } from 'react';
import { FoodService } from '../services/FoodService';
import { FatSecretRepository } from '../repositories/FatSecretRepository';
import '../styles/iOS.css';

const foodService = new FoodService(new FatSecretRepository());

const FoodFormPopup = ({ meal, onAddFood, onClose }) => {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFoodNameChange = async (e) => {
    const value = e.target.value;
    setFoodName(value);
    
    if (value.length > 0) {
      setIsLoading(true);
      try {
        const results = await foodService.searchFoods(value);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error searching foods:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (food) => {
    setFoodName(food.name);
    setCalories(food.calories.toString());
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (foodName && calories) {
      onAddFood(meal.id, foodName, calories);
      setFoodName('');
      setCalories('');
      onClose();
    }
  };

  return (
    <div className="ios-utility-overlay">
      <div className="ios-utility-window">
        <div className="ios-utility-header">
          <h2>Add Food to {meal.name}</h2>
          <button 
            className="ios-close-button"
            onClick={onClose}
            aria-label="Close"
          >
            <span className="ios-close-icon">×</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="ios-input-wrapper" ref={wrapperRef}>
            <input
              type="text"
              className="ios-input"
              placeholder="Food Name"
              value={foodName}
              onChange={handleFoodNameChange}
              autoFocus
            />
            {isLoading && (
              <div className="ios-loading">Loading...</div>
            )}
            {showSuggestions && suggestions.length > 0 && (
              <ul className="ios-suggestions-list">
                {suggestions.map(food => (
                  <li 
                    key={food.id}
                    className="ios-suggestion-item"
                    onClick={() => handleSuggestionClick(food)}
                  >
                    <span className="ios-suggestion-name">{food.name}</span>
                    <span className="ios-suggestion-calories">{food.calories} cal</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="number"
            className="ios-input"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
          <button type="submit" className="ios-button">
            Add Food
          </button>
        </form>
        <div className="ios-attribution">
          Powered by <a href="https://www.fatsecret.com" target="_blank" rel="noopener noreferrer">FatSecret</a>
        </div>
      </div>
    </div>
  );
};

export default FoodFormPopup; 