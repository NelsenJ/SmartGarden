import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../config';
import './Temperature.css';

const Temperature = () => {
  const [currentData, setCurrentData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // API base URL from config
  const API_BASE_URL = config.API_BASE_URL;

  const fetchCurrentTemperature = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/temperature`);
      setCurrentData(response.data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError('Failed to fetch current temperature data');
      console.error('Error fetching current temperature:', err);
    }
  }, [API_BASE_URL]);

  const fetchTemperatureHistory = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/temperature/history`);
      setHistoryData(response.data.history || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch temperature history');
      console.error('Error fetching temperature history:', err);
    }
  }, [API_BASE_URL]);

  const fetchTemperatureStats = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/temperature/stats`);
      setStatsData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch temperature statistics');
      console.error('Error fetching temperature stats:', err);
    }
  }, [API_BASE_URL]);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      fetchCurrentTemperature(),
      fetchTemperatureHistory(),
      fetchTemperatureStats()
    ]);
    setLoading(false);
  }, [fetchCurrentTemperature, fetchTemperatureHistory, fetchTemperatureStats]);

  useEffect(() => {
    fetchAllData();
    
    // Set up auto-refresh using config interval
    const interval = setInterval(fetchCurrentTemperature, config.REFRESH_INTERVAL);
    
    return () => clearInterval(interval);
  }, [fetchAllData, fetchCurrentTemperature]);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getTemperatureColor = (temp) => {
    if (temp < config.TEMPERATURE_THRESHOLDS.COLD) return '#3b82f6'; // Cold - Blue
    if (temp > config.TEMPERATURE_THRESHOLDS.HOT) return '#ef4444'; // Hot - Red
    return '#10b981'; // Normal - Green
  };

  const getHumidityColor = (humidity) => {
    if (humidity < config.HUMIDITY_THRESHOLDS.LOW) return '#f59e0b'; // Low - Orange
    if (humidity > config.HUMIDITY_THRESHOLDS.HIGH) return '#3b82f6'; // High - Blue
    return '#10b981'; // Normal - Green
  };

  if (loading) {
    return (
      <div className="temperature">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading temperature data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="temperature">
      {/* Header */}
      <section className="temperature-hero">
        <div className="container">
          <h1 className="temperature-title">Real-time Temperature Monitoring</h1>
          <p className="temperature-subtitle">
            Monitor your smart home environment with live temperature and humidity data
          </p>
          {lastUpdated && (
            <p className="last-updated">
              Last updated: {formatTimestamp(lastUpdated)}
            </p>
          )}
        </div>
      </section>

      {/* Error Display */}
      {error && (
        <div className="error-banner">
          <div className="container">
            <p>⚠️ {error}</p>
            <button onClick={fetchAllData} className="btn btn-secondary">
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Current Data */}
      {currentData && (
        <section className="current-data">
          <div className="container">
            <h2>Current Environment</h2>
            <div className="current-data-grid">
              <div className="data-card temperature-card">
                <div className="data-icon">🌡️</div>
                <div className="data-content">
                  <h3>Temperature</h3>
                  <div 
                    className="data-value"
                    style={{ color: getTemperatureColor(currentData.temperature) }}
                  >
                    {currentData.temperature}°C
                  </div>
                  <p className="data-unit">{currentData.unit}</p>
                </div>
              </div>

              <div className="data-card humidity-card">
                <div className="data-icon">💧</div>
                <div className="data-content">
                  <h3>Humidity</h3>
                  <div 
                    className="data-value"
                    style={{ color: getHumidityColor(currentData.humidity) }}
                  >
                    {currentData.humidity}%
                  </div>
                  <p className="data-unit">Relative Humidity</p>
                </div>
              </div>

              <div className="data-card location-card">
                <div className="data-icon">📍</div>
                <div className="data-content">
                  <h3>Location</h3>
                  <div className="data-value">{currentData.location}</div>
                  <p className="data-unit">{formatTimestamp(currentData.timestamp)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Statistics */}
      {statsData && (
        <section className="temperature-stats">
          <div className="container">
            <h2>Temperature Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Average Temperature</h3>
                <div className="stat-value">{statsData.average_temperature}°C</div>
              </div>
              <div className="stat-card">
                <h3>Min Temperature</h3>
                <div className="stat-value">{statsData.min_temperature}°C</div>
              </div>
              <div className="stat-card">
                <h3>Max Temperature</h3>
                <div className="stat-value">{statsData.max_temperature}°C</div>
              </div>
              <div className="stat-card">
                <h3>Average Humidity</h3>
                <div className="stat-value">{statsData.average_humidity}%</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* History */}
      {historyData.length > 0 && (
        <section className="temperature-history">
          <div className="container">
            <h2>Recent History</h2>
            <div className="history-table-container">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Temperature</th>
                    <th>Humidity</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.slice(0, 10).map((record, index) => (
                    <tr key={index}>
                      <td>{formatTimestamp(record.timestamp)}</td>
                      <td 
                        style={{ color: getTemperatureColor(record.temperature) }}
                      >
                        {record.temperature}°C
                      </td>
                      <td 
                        style={{ color: getHumidityColor(record.humidity) }}
                      >
                        {record.humidity}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Refresh Button */}
      <section className="refresh-section">
        <div className="container">
          <button onClick={fetchAllData} className="btn btn-primary">
            🔄 Refresh Data
          </button>
        </div>
      </section>
    </div>
  );
};

export default Temperature; 