import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="about-title">About SmartGarden</h1>
            <p className="about-subtitle">
              Pioneering the future of smart home technology with innovative solutions that make life easier, 
              more efficient, and more connected.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-content">
              <h2>Our Mission</h2>
              <p>
                At SmartGarden, we believe that technology should enhance our lives, not complicate them. 
                Our mission is to create intelligent, user-friendly smart home solutions that seamlessly 
                integrate into your daily routine, providing comfort, security, and efficiency.
              </p>
              <p>
                We're committed to developing cutting-edge technology that's accessible to everyone, 
                making smart homes a reality for families worldwide.
              </p>
            </div>
            <div className="mission-image">
              <div className="mission-icon">🎯</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values">
        <div className="container">
          <h2 className="section-title text-center">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>We constantly push the boundaries of what's possible, creating breakthrough technologies that set new industry standards.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Customer First</h3>
              <p>Every decision we make is guided by our commitment to providing exceptional value and support to our customers.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>We develop eco-friendly solutions that help reduce energy consumption and promote environmental responsibility.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h3>Security</h3>
              <p>Your privacy and security are our top priorities. We implement the highest standards of data protection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story">
        <div className="container">
          <div className="story-grid">
            <div className="story-image">
              <div className="story-icon">📖</div>
            </div>
            <div className="story-content">
              <h2>Our Story</h2>
              <p>
                SmartGarden was founded in 2020 by a team of passionate engineers and designers who 
                shared a common vision: to make smart home technology accessible, reliable, and truly useful.
              </p>
              <p>
                What started as a small startup has grown into a trusted name in smart home solutions, 
                serving thousands of customers worldwide. Our journey has been driven by continuous 
                innovation and an unwavering commitment to customer satisfaction.
              </p>
              <div className="story-stats">
                <div className="story-stat">
                  <div className="stat-number">2020</div>
                  <div className="stat-label">Founded</div>
                </div>
                <div className="story-stat">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Team Members</div>
                </div>
                <div className="story-stat">
                  <div className="stat-number">25+</div>
                  <div className="stat-label">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <div className="container">
          <h2 className="section-title text-center">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">👨‍💼</div>
              <h3>John Smith</h3>
              <p className="team-role">CEO & Founder</p>
              <p className="team-bio">
                Former Google engineer with 15+ years of experience in IoT and smart home technology.
              </p>
            </div>
            <div className="team-card">
              <div className="team-avatar">👩‍💻</div>
              <h3>Sarah Johnson</h3>
              <p className="team-role">CTO</p>
              <p className="team-bio">
                Expert in AI and machine learning, leading our technical innovation efforts.
              </p>
            </div>
            <div className="team-card">
              <div className="team-avatar">👨‍🎨</div>
              <h3>Mike Chen</h3>
              <p className="team-role">Head of Design</p>
              <p className="team-bio">
                Award-winning designer focused on creating intuitive user experiences.
              </p>
            </div>
            <div className="team-card">
              <div className="team-avatar">👩‍🔬</div>
              <h3>Emily Davis</h3>
              <p className="team-role">Lead Engineer</p>
              <p className="team-bio">
                Specializes in embedded systems and IoT device development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta-content">
            <h2>Ready to Join the Smart Home Revolution?</h2>
            <p>Discover how SmartGarden can transform your living space into an intelligent, connected environment.</p>
            <a href="/contact" className="btn btn-primary">Get in Touch</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 