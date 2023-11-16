import React, { useState, useEffect } from 'react';
import UserActivityCSS from '@assets/css/NewUser.module.css';
import { apiClient } from '@lib/apiClient';
import axios from 'axios';
import { LARAVEL_BACKEND_URL } from '../../config';

const UserActivity = () => {
  const [userActivities, setUserActivities] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const fetchUserActivities = async () => {
    try {
      const response = await axios.get(`${LARAVEL_BACKEND_URL}/getuseractivity`);
      setUserActivities(response.data);
    } catch (error) {
      console.error('Error fetching user activities', error);
    }
  };

  useEffect(() => {
    fetchUserActivities();
  }, []);

  const filteredUsers = userActivities.filter((user) => {
    return user.email.toLowerCase().includes(searchInput.toLowerCase());
  });
  return (
    <div>
      <div className={UserActivityCSS.addContainer}>
        <h2 className={UserActivityCSS.addAccessHeader}>User Activity</h2>
      </div>
      <div className={UserActivityCSS.searchContainer}>
        <input type="text" className={UserActivityCSS.searchInput} placeholder="Search..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        <button className={UserActivityCSS.searchButton}>Search</button>
      </div>
      <table className={UserActivityCSS.newUsersTable}>
        <thead>
          <tr>
            <th>User Email</th>
            <th>Role</th>
            <th>Last Logged In</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((activity, index) => (
            <tr key={index}>
              <td>{activity.email}</td>
              <td>{activity.Role}</td>
              <td>{activity.Last_logged_in}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserActivity;
