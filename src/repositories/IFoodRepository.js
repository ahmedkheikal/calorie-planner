/**
 * Interface for food data repository
 */
export class IFoodRepository {
  /**
   * Get all foods
   * @returns {Promise<Array>} Array of food objects
   */
  async getAllFoods() {
    throw new Error('Method not implemented');
  }

  /**
   * Search foods by name
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of matching food objects
   */
  async searchFoods(query) {
    throw new Error('Method not implemented');
  }

  /**
   * Get food by ID
   * @param {number} id - Food ID
   * @returns {Promise<Object>} Food object
   */
  async getFoodById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Get food by name
   * @param {string} name - Food name
   * @returns {Promise<Object>} Food object
   */
  async getFoodByName(name) {
    throw new Error('Method not implemented');
  }
} 