// SmartGarden Frontend Configuration
const config = {
  // API Configuration - Update dengan URL PythonAnywhere
  API_BASE_URL: process.env.REACT_APP_API_URL || 'https://NelsenDeploy.pythonanywhere.com',
  
  // Auto-refresh interval (in milliseconds)
  REFRESH_INTERVAL: 30000, // 30 seconds
  
  // Temperature thresholds
  TEMPERATURE_THRESHOLDS: {
    COLD: 20,    // Below this is considered cold
    HOT: 28,     // Above this is considered hot
  },
  
  // Humidity thresholds
  HUMIDITY_THRESHOLDS: {
    LOW: 40,     // Below this is considered low
    HIGH: 70,    // Above this is considered high
  }
};

export default config; 