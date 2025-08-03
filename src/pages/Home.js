import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Smart Home Solutions for
              <span className="gradient-text"> Modern Living</span>
            </h1>
            <p className="hero-subtitle">
              Transform your home into an intelligent, connected environment with our cutting-edge smart home technology. 
              Monitor, control, and optimize your living space with ease.
            </p>
            <div className="hero-buttons">
              <Link to="/temperature" className="btn btn-primary">
                View Temperature Data
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get Started
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="smart-home-illustration">
              <div className="house-icon">🏠</div>
              <div className="sensor-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title text-center">Why Choose SmartGarden?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌡️</div>
              <h3>Real-time Monitoring</h3>
              <p>Monitor temperature, humidity, and environmental conditions in real-time with our advanced sensors.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Control</h3>
              <p>Control your smart home devices from anywhere using our intuitive mobile application.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your data is protected with enterprise-grade security and privacy controls.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Energy Efficient</h3>
              <p>Optimize energy consumption and reduce costs with intelligent automation systems.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered</h3>
              <p>Advanced AI algorithms learn your preferences and optimize your home environment automatically.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3>Easy Installation</h3>
              <p>Quick and simple setup process with our plug-and-play smart home solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Devices Connected</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Home?</h2>
            <p>Join thousands of satisfied customers who have already upgraded to smart living.</p>
            <Link to="/contact" className="btn btn-primary">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 