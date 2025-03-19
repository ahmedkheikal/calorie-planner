import React, { useState } from 'react';
import './styles/iOS.css';
import DraggableMealList from './components/DraggableMealList';
import SideMenu from './components/SideMenu';

function App() {
  const [meals, setMeals] = useState([]);

  const addMeal = (mealName) => {
    const newMeal = {
      id: Date.now(),
      name: mealName,
      foods: []
    };
    setMeals([...meals, newMeal]);
  };

  const addFood = (mealId, foodName, calories) => {
    setMeals(prevMeals => {
      return prevMeals.map(meal => {
        if (meal.id === mealId) {
          return {
            ...meal,
            foods: [
              ...meal.foods,
              {
                id: Date.now(),
                name: foodName,
                calories: parseInt(calories)
              }
            ]
          };
        }
        return meal;
      });
    });
  };

  const deleteFood = (mealId, foodId) => {
    setMeals(prevMeals => {
      return prevMeals.map(meal => {
        if (meal.id === mealId) {
          return {
            ...meal,
            foods: meal.foods.filter(food => food.id !== foodId)
          };
        }
        return meal;
      });
    });
  };

  const totalCalories = meals.reduce((total, meal) => {
    return total + meal.foods.reduce((mealTotal, food) => mealTotal + food.calories, 0);
  }, 0);

  return (
    <div className="ios-container">
      <div className="ios-header">
        <h1 className="ios-title">Calorie Planner</h1>
      </div>

      <DraggableMealList
        meals={meals}
        onAddFood={addFood}
        onDeleteFood={deleteFood}
      />

      <div className="ios-total-calories">
        <span className="ios-label">Total Calories:</span>
        <span className="ios-value">{totalCalories}</span>
      </div>

      <SideMenu onAddMeal={addMeal} />
    </div>
  );
}

export default App; 