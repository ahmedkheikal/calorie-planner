import React, { useState } from 'react';
import MealCard from './MealCard';
import FoodFormPopup from './FoodFormPopup';

const DraggableMealList = ({ 
  meals, 
  onAddFood, 
  onDeleteFood
}) => {
  const [editingMeal, setEditingMeal] = useState(null);

  const handleAddFood = (mealId) => {
    setEditingMeal(meals.find(meal => meal.id === mealId));
  };

  const handleCloseForm = () => {
    setEditingMeal(null);
  };

  return (
    <>
      <div className="meals-list">
        {meals.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            onAddFood={handleAddFood}
            onDeleteFood={onDeleteFood}
          />
        ))}
      </div>

      {editingMeal && (
        <FoodFormPopup
          meal={editingMeal}
          onAddFood={onAddFood}
          onClose={handleCloseForm}
        />
      )}
    </>
  );
};

export default DraggableMealList; 