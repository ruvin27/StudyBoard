import NewUsersCSS from '@assets/css/NewUser.module.css'
import { apiClient } from '@lib/apiClient';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'
const NewUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    axios.get(`${LARAVEL_BACKEND_URL}/unapproved-users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users data:', error);
      });
  }, []);

  const Approve = (id) => {
    axios.post(`${LARAVEL_BACKEND_URL}/approve-user`, {
        id: id
      })
      .then((response) => {
        alert(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.error)
      });
  }

  const filteredUsers = users.filter((user) => {
    return user.email.toLowerCase().includes(searchInput.toLowerCase());
  });
  return (
    <div>
      <div className={NewUsersCSS.addContainer}>
        <h2>Add New Users</h2>
      </div>
      <div className={NewUsersCSS.searchContainer}>
      <input
          type="text"
          className={NewUsersCSS.searchInput}
          placeholder="Search User"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className={NewUsersCSS.searchButton}>Search</button>
      </div>
      <table className={NewUsersCSS.newUsersTable}>
        <thead>
          <tr>
            <th>User Email</th>
            <th>Role</th>
            <th>Remove User</th>
          </tr>
        </thead>
        <tbody>
        {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className={NewUsersCSS.newUsersButton} onClick={()=> Approve(user.userid)}>Approve</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{textAlign: "center"}}>No users found.</td>
            </tr>
          )}
         
        </tbody>
      </table>
    </div>
  )
}

export default NewUsers
