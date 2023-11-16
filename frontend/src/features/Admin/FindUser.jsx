import { Link } from 'react-router-dom';
import FindUserCSS from '@assets/css/finduser.module.css';
import { apiClient } from '@lib/apiClient';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LARAVEL_BACKEND_URL } from '../../config';

const FindUser = () => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    // Fetch user data from the database using Axios
    axios
      .get(`${LARAVEL_BACKEND_URL}/get-all-users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users data:', error);
      });
  }, []);

  // Create a filtered user list based on the search input
  const filteredUsers = users.filter((user) => {
    return user.email.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div>
      <div className={FindUserCSS.container}>
        <div className={FindUserCSS.leftElement}>
          <h2>Find User</h2>
        </div>
      </div>
      <div className={FindUserCSS.searchContainer}>
        <input type="text" className={FindUserCSS.searchInput} placeholder="Search User" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        <button className={FindUserCSS.searchButton}>Search</button>
      </div>
      <table className={FindUserCSS.findUserTable}>
        <thead>
          <tr>
            <th>User Email</th>
            <th>Edit User</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.email}</td>
                <td>
                  <Link to={`/admin_profile/${user.userid}`}>
                    <button className={FindUserCSS.findUserBtn}>Edit</button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FindUser;
