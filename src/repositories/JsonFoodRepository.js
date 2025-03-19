import { IFoodRepository } from './IFoodRepository';
import foodData from '../data/foodData.json';

export class JsonFoodRepository extends IFoodRepository {
  constructor() {
    super();
    this.foods = foodData.foods;
  }

  async getAllFoods() {
    return this.foods;
  }

  async searchFoods(query) {
    if (!query) return [];
    
    const searchTerm = query.toLowerCase();
    return this.foods.filter(food => 
      food.name.toLowerCase().includes(searchTerm)
    );
  }

  async getFoodById(id) {
    return this.foods.find(food => food.id === id);
  }

  async getFoodByName(name) {
    return this.foods.find(food => 
      food.name.toLowerCase() === name.toLowerCase()
    );
  }
} 