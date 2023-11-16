import ProfileCSS from '@assets/css/Profile.module.css';
import ProfileImg from '@assets/images/user.jpg';
import { useAuth } from '@contexts/AuthContext';
import { apiClient } from '@lib/apiClient';
import React, { useState } from 'react';
import axios from 'axios';
import { LARAVEL_BACKEND_URL } from '../../config';

const Profile = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone_number || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const isPhoneNumberValid = (phoneNumber) => {
    // Regular expression for a basic phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPhoneNumberValid(formData.phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    axios
      .post(`${LARAVEL_BACKEND_URL}/update-user`, formData)
      .then((response) => {
        alert(response.data.message);
        login({ ...user, phone_number: formData.phone, name: formData.name });
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error fetching color data:', error);
      });
  };

  return (
    <div>
      <div className={ProfileCSS.container}>
        <div className={ProfileCSS.leftElement}>
          <h2>My Profile</h2>
        </div>
      </div>

      <div className={ProfileCSS.profile}>
        <div className={ProfileCSS.profilePicture}>
          <img src={ProfileImg} alt="User Profile" />
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className={ProfileCSS.formGroup}>
            <label htmlFor="name">Name:</label>
            <input className={ProfileCSS.profileInput} type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required />
          </div>
          <div className={ProfileCSS.formGroup}>
            <label htmlFor="email">Email:</label>
            <input className={ProfileCSS.profileInput} type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" required disabled />
          </div>
          <div className={ProfileCSS.formGroup}>
            <label htmlFor="phone">Phone:</label>
            <input className={ProfileCSS.profileInput} type="number" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Your Phone Number" required />
          </div>
          <div className={`${ProfileCSS.formGroup} ${ProfileCSS.btnGroup}`}>
            <button type="submit" className={ProfileCSS.submitBtn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
