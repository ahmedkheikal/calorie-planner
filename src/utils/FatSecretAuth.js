class FatSecretAuth {
  constructor() {
    this.token = null;
    this.tokenExpiry = null;
    this.STORAGE_KEY = 'fatsecret_token';
    this.EXPIRY_KEY = 'fatsecret_token_expiry';
    this.REFRESH_THRESHOLD = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  }

  async getAccessToken() {
    // Check localStorage first
    const storedToken = localStorage.getItem(this.STORAGE_KEY);
    const storedExpiry = localStorage.getItem(this.EXPIRY_KEY);
    
    if (storedToken && storedExpiry) {
      const expiryDate = parseInt(storedExpiry);
      const now = Date.now();
      
      // If token is still valid and not nearing expiry (within 7 days)
      if (now < expiryDate && (expiryDate - now) > this.REFRESH_THRESHOLD) {
        this.token = storedToken;
        this.tokenExpiry = expiryDate;
        return this.token;
      }
    }

    // If no valid token in localStorage, fetch new one
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/fatsecret/token`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to get access token');
      }

      const data = await response.json();
      this.token = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000);

      // Store in localStorage
      localStorage.setItem(this.STORAGE_KEY, this.token);
      localStorage.setItem(this.EXPIRY_KEY, this.tokenExpiry.toString());

      return this.token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  clearToken() {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.EXPIRY_KEY);
    this.token = null;
    this.tokenExpiry = null;
  }
}

export default new FatSecretAuth(); 