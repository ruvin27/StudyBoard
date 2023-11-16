import ContactUsCSS from '@assets/css/contact.module.css';
import { useAuth } from '@contexts/AuthContext';
import React, { useState } from 'react';
import { apiClient } from '@lib/apiClient';
import axios from 'axios';
import { LARAVEL_BACKEND_URL } from '../../config';

const ContactUs = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    email: user?.email || '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailValid(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    axios
      .post(`${LARAVEL_BACKEND_URL}/store-contact`, formData)
      .then((response) => {
        alert(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error fetching color data:', error);
      });
  };

  return (
    <div>
      <div className={ContactUsCSS.contactContainer}>
        <div className={ContactUsCSS.contactHeader}>
          <h2>Contact Us</h2>
        </div>
      </div>
      <form className={ContactUsCSS.contactForm} onSubmit={handleSubmit}>
        <label htmlFor={ContactUsCSS.email} className={ContactUsCSS.contactLabel}>
          Enter your email:
        </label>
        <input type="email" id={ContactUsCSS.email} name="email" className={ContactUsCSS.contactInput} placeholder="Your email address" value={formData.email} onChange={handleInputChange} required />

        <label htmlFor={ContactUsCSS.message} className={ContactUsCSS.contactLabel}>
          Message:
        </label>
        <textarea
          id={ContactUsCSS.message}
          name="message"
          className={ContactUsCSS.contactTextarea}
          placeholder="Your message"
          value={formData.message}
          onChange={handleInputChange}
          rows="4"
          required
        ></textarea>

        <button type="submit" className={ContactUsCSS.sendButton}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
