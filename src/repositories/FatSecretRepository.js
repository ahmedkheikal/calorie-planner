import { IFoodRepository } from './IFoodRepository';
import FatSecretAuth from '../utils/FatSecretAuth';

export class FatSecretRepository extends IFoodRepository {
  constructor() {
    super();
  }

  async getAllFoods() {
    // FatSecret API doesn't support getting all foods at once
    // Return empty array or implement pagination if needed
    return [];
  }

  async searchFoods(query) {
    try {
      const token = await FatSecretAuth.getAccessToken();
      const params = new URLSearchParams({
        method: 'foods.search',
        search_expression: query,
        format: 'json',
      });

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/fatsecret/foods?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to search foods');
      }

      const data = await response.json();
      return this.transformSearchResponse(data);
    } catch (error) {
      console.error('Error searching foods:', error);
      throw error;
    }
  }

  async getFoodById(id) {
    try {
      const token = await FatSecretAuth.getAccessToken();
      const params = new URLSearchParams({
        method: 'food.get',
        food_id: id,
        format: 'json',
      });

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/fatsecret/food?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get food details');
      }

      const data = await response.json();
      return this.transformFoodResponse(data);
    } catch (error) {
      console.error('Error getting food details:', error);
      throw error;
    }
  }

  async getFoodByName(name) {
    const results = await this.searchFoods(name);
    return results.find(food => 
      food.name.toLowerCase() === name.toLowerCase()
    );
  }

  transformSearchResponse(data) {
    if (!data.foods || !data.foods.food) {
      return [];
    }

    return data.foods.food.map(food => ({
      id: food.food_id,
      name: food.food_name,
      calories: parseFloat(food.calories) || 0,
      protein: parseFloat(food.protein) || 0,
      carbs: parseFloat(food.carbohydrate) || 0,
      fat: parseFloat(food.fat) || 0,
    }));
  }

  transformFoodResponse(data) {
    if (!data.food) {
      throw new Error('Food not found');
    }

    const food = data.food;
    return {
      id: food.food_id,
      name: food.food_name,
      calories: parseFloat(food.calories) || 0,
      protein: parseFloat(food.protein) || 0,
      carbs: parseFloat(food.carbohydrate) || 0,
      fat: parseFloat(food.fat) || 0,
    };
  }
}

export default new FatSecretRepository(); 