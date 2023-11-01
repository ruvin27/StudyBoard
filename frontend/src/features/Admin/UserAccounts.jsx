import React, { useState, useEffect } from 'react';
import UserAccountsCSS from '@assets/css/userAccounts.module.css';
import { apiClient } from '@lib/apiClient';
import { Link } from 'react-router-dom';

const UserAccounts = () => {
  const [userData, setUserData] = useState([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const [course, setCourse] = useState(1);
  const [courseOptions, setCourseOptions] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchUserData();
    fetchCourseOptions();
  }, []);

  const fetchUserData = () => {
    apiClient
      .get('/Admin/fetchUserAccounts.php')
      .then((response) => {
        console.log(response.data)
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const fetchCourseOptions = () => {
    apiClient
      .get('/QA/getCourses.php')
      .then((response) => {
        setCourseOptions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching course options:', error);
      });
  };

  const handleAddUser = () => {
    const newUser = {
      email: email,
      role: role,
      course_id: course,
    };
    console.log(newUser)
    apiClient
      .post('/Admin/UserAccounts.php', newUser)
      .then((response) => {
        window.location.reload();
        // console.log(response.data)
      })
      .catch((error) => {
        console.error('Error adding a new user:', error);
      });
  };

  const handleRemoveUser = (userid, course_id) => {
    console.log(userid, course_id)
    apiClient
    .post('/Admin/removeAccess.php', {
      userid: userid,
      course_id: course_id
    })
    .then((response) => {
      // Reload the current window
window.location.reload();

    })
    .catch((error) => {
      console.error('Error adding a new user:', error);
    });
  }

  const filteredUsers = userData.filter((user) => {
    return user.User_email.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div>
      <div className={UserAccountsCSS.container}>
        <div className={UserAccountsCSS.leftElement}>
          <h2>User Accounts</h2>
        </div>
        <div className={UserAccountsCSS.rightElement}>
          <Link to={'/finduser'}>
            <button className={UserAccountsCSS.userButton}>
              Find User Profiles
            </button>
          </Link>
          {/* <Link to={'/newusers'}>
            <button className={UserAccountsCSS.userButton}>
              Approve New Users
            </button>
          </Link> */}
        </div>
      </div>
      <div className={UserAccountsCSS.searchContainer}>
      <input
          type="text"
          className={UserAccountsCSS.searchInput}
          placeholder="Search User"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className={UserAccountsCSS.searchButton}>Search</button>
      </div>
      <table className={UserAccountsCSS.userAccTable}>
        <thead>
          <tr>
            <th>User Email</th>
            <th>Role</th>
            <th>Course</th>
            <th>Remove User</th>
          </tr>
        </thead>
        <tbody>
        {filteredUsers.length > 0 ? (
          userData.map((user, index) => (
            <tr key={index}>
              <td>{user.User_email}</td>
              <td>{user.Role}</td>
              <td>{user.Course}</td>
              <td>
                <button
                  className={UserAccountsCSS.userAccButton}
                  onClick={() => handleRemoveUser(user.userid, user.course_id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))
          ) : (
            <tr>
              <td colSpan="2">No similar users found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={UserAccountsCSS.addContainer}>
        <h2 className={UserAccountsCSS.addAccessHeader}>Add New Access</h2>
      </div>
      <form id="userForm" className={UserAccountsCSS.form}>
        <label htmlFor="email">Email:</label>
        <div className={UserAccountsCSS.autocompleteContainer}>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          className={UserAccountsCSS.select}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Student">Student</option>
        </select>

        <label htmlFor="course">Course:</label>
        <select
          id="course"
          name="course"
          className={UserAccountsCSS.select}
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          {courseOptions.map((course, index) => (
            <option key={index} value={course.course_id}>
              {course.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          className={UserAccountsCSS.button}
          onClick={handleAddUser}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default UserAccounts;
