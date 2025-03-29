import React from 'react';
import { FaEnvelope, FaFacebookF, FaInstagram, FaPhone, FaShareAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Quick Links Section */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/income">Income</a></li>
            <li><a href="/expenses">Expenses</a></li>
            <li><a href="/budget">Budget</a></li>
            <li><a href="/home">Home</a></li>
          </ul>
        </div>

       
        <div className="footer-section">
          <h3 className="footer-title">About us</h3>
          <ul className="footer-links">
            <li><a href="/about-us">About us</a></li>
            <li><a href="/contact-us">Contact us</a></li>
            <li><a href="/articles">Articles</a></li>
            <li><a href="/blogs">Blogs</a></li>
          </ul>
        </div>

      
        <div className="footer-section">
          <h3 className="footer-title">Social Media</h3>
          <div className="social-icons">
            <a href="mailto:support@myfinancemate.com" aria-label="Email">
              <FaEnvelope />
            </a>
            <a href="tel:+1234567890" aria-label="Phone">
              <FaPhone />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Share">
              <FaShareAlt />
            </a>
          </div>
          <h4 className="get-updates">Get Updates</h4>
          <form className="subscription-form">
            <input
              type="email"
              placeholder="enter your email"
              className="email-input"
              aria-label="Email for subscription"
            />
            <button type="submit" className="subscribe-btn">
              <span className="plus-icon">+</span> Subscribe
            </button>
          </form>
        </div>
      </div>

  
      <div className="footer-bottom">
        <p>
          COPYRIGHT © 2025 MyFinanceMate PVT LTD. ALL RIGHT RESERVED. Website Maintenance By Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;