// API Configuration
const API_CONFIG = {
  // Production URL as primary
  PRIMARY_BASE_URL: 'https://newww-mern-portfolio-backend.onrender.com',
  // Localhost as fallback
  FALLBACK_BASE_URL: 'http://localhost:10000',
  // Timeout for API requests (in milliseconds)
  TIMEOUT: 10000
};

// Function to get the API base URL with fallback logic
export const getApiBaseUrl = () => {
  // Always try production first
  return API_CONFIG.PRIMARY_BASE_URL;
};

// Function to get fallback URL
export const getFallbackUrl = () => {
  return API_CONFIG.FALLBACK_BASE_URL;
};

// Function to make API requests with automatic fallback
export const makeApiRequest = async (url, options = {}) => {
  const primaryUrl = `${API_CONFIG.PRIMARY_BASE_URL}${url}`;
  const fallbackUrl = `${API_CONFIG.FALLBACK_BASE_URL}${url}`;

  try {
    // Try primary URL first
    const response = await fetch(primaryUrl, {
      ...options,
      timeout: API_CONFIG.TIMEOUT
    });
    
    if (response.ok) {
      return response;
    }
    throw new Error(`Primary server returned ${response.status}`);
  } catch (primaryError) {
    console.warn(`Primary API failed (${primaryUrl}):`, primaryError.message);
    console.log('Attempting fallback to localhost...');
    
    try {
      // Try fallback URL
      const fallbackResponse = await fetch(fallbackUrl, {
        ...options,
        timeout: API_CONFIG.TIMEOUT
      });
      
      if (fallbackResponse.ok) {
        console.log('Successfully connected to fallback server');
        return fallbackResponse;
      }
      throw new Error(`Fallback server returned ${fallbackResponse.status}`);
    } catch (fallbackError) {
      console.error(`Both primary and fallback APIs failed:`, {
        primary: primaryError.message,
        fallback: fallbackError.message
      });
      throw new Error(`API unavailable. Primary: ${primaryError.message}, Fallback: ${fallbackError.message}`);
    }
  }
};

export default API_CONFIG;
