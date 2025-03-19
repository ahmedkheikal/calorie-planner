/**
 * Service for handling food-related operations
 */
export class FoodService {
  /**
   * @param {IFoodRepository} repository - Food data repository
   */
  constructor(repository) {
    if (!repository) {
      throw new Error('Repository is required');
    }
    this.repository = repository;
  }

  /**
   * Search for foods by name
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of matching food objects
   */
  async searchFoods(query) {
    return this.repository.searchFoods(query);
  }

  /**
   * Get food by ID
   * @param {number} id - Food ID
   * @returns {Promise<Object>} Food object
   */
  async getFoodById(id) {
    return this.repository.getFoodById(id);
  }

  /**
   * Get food by name
   * @param {string} name - Food name
   * @returns {Promise<Object>} Food object
   */
  async getFoodByName(name) {
    return this.repository.getFoodByName(name);
  }

  /**
   * Get all foods
   * @returns {Promise<Array>} Array of food objects
   */
  async getAllFoods() {
    return this.repository.getAllFoods();
  }
} 