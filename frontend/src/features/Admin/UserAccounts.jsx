import React, { useState, useEffect } from 'react'
import UserAccountsCSS from '@assets/css/userAccounts.module.css'
import { apiClient } from '@lib/apiClient'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'

const UserAccounts = () => {
  const [userData, setUserData] = useState([])
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState(0)
  const [courseOptions, setCourseOptions] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [users, setUsers] = useState([])
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    fetchEnrollments()
    fetchCourseOptions()
    fetchStudentEmails()
  }, [])

  const fetchStudentEmails = async () => {
    const response = await axios.get(`${LARAVEL_BACKEND_URL}/get-student-emails`)
    setUsers(response.data)
  }

  const fetchEnrollments = () => {
    axios
      .get(`${LARAVEL_BACKEND_URL}/enrollment-data`)
      .then((response) => {
        setUserData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching user data:', error)
      })
  }

  const fetchCourseOptions = () => {
    axios
      .get(`${LARAVEL_BACKEND_URL}/get-all-courses`)
      .then((response) => {
        console.log(response.data)
        setCourseOptions(response.data.data)
        if (response.data.data.length > 0) {
          setCourse(response.data.data[0].course_id)
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

  const handleAddEnrollment = (e) => {
    e.preventDefault()
    if (course === 0) {
      alert('No Course to be selected')
      return
    }
    if (!isEmailValid(email)) {
      alert('Please enter a valid email address.')
      return
    }
    axios
      .post(`${LARAVEL_BACKEND_URL}/add-enrollment`, {
        email: email,
        course_id: course,
      })
      .then((response) => {
          alert(response.data.message);
          fetchEnrollments();
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
  }

  const handleRemoveEnrollment = (userid, course_id) => {
    axios
      .delete(`${LARAVEL_BACKEND_URL}/enrollments/${userid}/${course_id}`)
      .then((response) => {
        // Reload the current window
        alert(response.data.message)
        fetchEnrollments();
      })
      .catch((error) => {
        console.error('Error adding a new user:', error)
      })
  }

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value
    setEmail(inputEmail)

    // Filter user emails that match the input
    const matchingEmails = users.filter((userEmail) => userEmail.toLowerCase().includes(inputEmail.toLowerCase()))

    setSuggestions(matchingEmails)
  }

  const handleSuggestionClick = (suggestion) => {
    // Set the selected suggestion as the email input value
    setEmail(suggestion)
    // Clear suggestions
    setSuggestions([])
  }

  const filteredUsers = userData.filter((user) => {
    return user.email.toLowerCase().includes(searchInput.toLowerCase())
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
            <button className={UserAccountsCSS.userButton}>Approve New Users</button>
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
                <td>{user.email}</td>
                <td>{user.Role}</td>
                <td>{user.courseName}</td>
                <td>
                  <button className={UserAccountsCSS.userAccButton} onClick={() => handleRemoveEnrollment(user.userid, user.course_id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No similar users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={UserAccountsCSS.addContainer}>
        <h2 className={UserAccountsCSS.addAccessHeader}>Add New Enrollment Access</h2>
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
              <option
                style={{
                  backgroundColor: 'white', // Change the background color here
                  // Add more CSS styles as needed
                }}
                key={index}
                value={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
              />
            ))}
          </datalist>
        </div>


        <label htmlFor="course">Course:</label>
        <select id="course" name="course" className={UserAccountsCSS.select} value={course} onChange={(e) => setCourse(e.target.value)}>
          {courseOptions.map((course, index) => (
            <option key={index} value={course.course_id}>
              {course.course_name}
            </option>
          ))}
        </select>

        <button type="submit" className={UserAccountsCSS.button} onClick={handleAddEnrollment}>
          Add
        </button>
      </form>
    </div>
  )
}

export default UserAccounts
