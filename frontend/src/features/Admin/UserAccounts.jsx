import React, { useState, useEffect } from 'react'
import UserAccountsCSS from '@assets/css/userAccounts.module.css'
import { apiClient } from '@lib/apiClient'
import { Link } from 'react-router-dom'

const UserAccounts = () => {
  const [userData, setUserData] = useState([])
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('student')
  const [course, setCourse] = useState(0)
  const [courseOptions, setCourseOptions] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [users, setUsers] = useState([])
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    fetchUserData()
    fetchCourseOptions()
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await apiClient.get(`/chat/users.php`)
    setUsers(response.data)
  }

  const fetchUserData = () => {
    apiClient
      .get('/Admin/fetchUserAccounts.php')
      .then((response) => {
        setUserData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching user data:', error)
      })
  }

  const fetchCourseOptions = () => {
    apiClient
      .get('/QA/getCourses.php')
      .then((response) => {
        setCourseOptions(response.data)
        if (response.data.length > 0) {
          setCourse(response.data[0].course_id)
        }
      })
      .catch((error) => {
        console.error('Error fetching course options:', error)
      })
  }

  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleAddUser = (e) => {
    e.preventDefault()
    if (course === 0) {
      alert('No Course to be selected')
      return
    }
    if (!isEmailValid(email)) {
      alert('Please enter a valid email address.')
      return
    }
    const newUser = {
      email: email,
      role: role,
      course_id: course,
    }
    apiClient
      .post('/Admin/UserAccounts.php', newUser)
      .then((response) => {
        if (response.data === "Data inserted successfully"){
          alert(response.data);
          window.location.reload()
        }
        else{
          alert(response.data);
        }
      })
      .catch((error) => {
        console.error('Error adding a new user:', error)
      })
  }

  const handleRemoveUser = (userid, course_id) => {
    console.log(userid, course_id)
    apiClient
      .post('/Admin/removeAccess.php', {
        userid: userid,
        course_id: course_id,
      })
      .then((response) => {
        // Reload the current window
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error adding a new user:', error)
      })
  }

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value
    setEmail(inputEmail)

    // Filter user emails that match the input
    const matchingEmails = users.filter((userEmail) => userEmail.includes(inputEmail))

    setSuggestions(matchingEmails)
  }

  const handleSuggestionClick = (suggestion) => {
    // Set the selected suggestion as the email input value
    setEmail(suggestion)
    // Clear suggestions
    setSuggestions([])
  }

  const filteredUsers = userData.filter((user) => {
    return user.User_email.toLowerCase().includes(searchInput.toLowerCase())
  })

  return (
    <div>
      <div className={UserAccountsCSS.container}>
        <div className={UserAccountsCSS.leftElement}>
          <h2>User Accounts</h2>
        </div>
        <div className={UserAccountsCSS.rightElement}>
          <Link to={'/finduser'}>
            <button className={UserAccountsCSS.userButton}>Find User Profiles</button>
          </Link>
          <Link to={'/newusers'}>
            <button className={UserAccountsCSS.userButton}>
              Approve New Users
            </button>
          </Link>
        </div>
      </div>
      <div className={UserAccountsCSS.searchContainer}>
        <input type="text" className={UserAccountsCSS.searchInput} placeholder="Search User" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
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
                  <button className={UserAccountsCSS.userAccButton} onClick={() => handleRemoveUser(user.userid, user.course_id)}>
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
        <div>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={handleEmailChange}
            list="emailSuggestions" // This should match the id of the datalist
          />

          <datalist id="emailSuggestions">
            {suggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} onClick={() => handleSuggestionClick(suggestion)} />
            ))}
          </datalist>
        </div>

        <label htmlFor="role">Role:</label>
        <select id="role" name="role" className={UserAccountsCSS.select} value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Student">Student</option>
        </select>

        <label htmlFor="course">Course:</label>
        <select id="course" name="course" className={UserAccountsCSS.select} value={course} onChange={(e) => setCourse(e.target.value)}>
          {courseOptions.map((course, index) => (
            <option key={index} value={course.course_id}>
              {course.name}
            </option>
          ))}
        </select>

        <button type="submit" className={UserAccountsCSS.button} onClick={handleAddUser}>
          Add
        </button>
      </form>
    </div>
  )
}

export default UserAccounts
