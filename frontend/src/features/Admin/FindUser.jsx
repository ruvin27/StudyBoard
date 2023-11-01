import { Link } from 'react-router-dom'
import FindUserCSS from '@assets/css/finduser.module.css'
import { apiClient } from '@lib/apiClient'
import React, { useState, useEffect } from 'react'

const FindUser = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    // Fetch color data from the database using Axios
    apiClient
      .get('/webdesign/getusers.php')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.error('Error fetching Objectives data:', error)
      })
  }, [])
  return (
    <div>
      <div className={FindUserCSS.container}>
        <div className={FindUserCSS.leftElement}>
          <h2>Find User</h2>
        </div>
      </div>
      <div className={FindUserCSS.searchContainer}>
        <input
          type="text"
          className={FindUserCSS.searchInput}
          placeholder="Search User"
        />
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
          {users.map((user,index) => (
            <tr key={index}>
            <td>{user.email}</td>
            <td>
              <Link to={`/admin_profile/${user.userId}`}>
                <button className={FindUserCSS.findUserBtn}>Edit</button>
              </Link>
            </td>
          </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  )
}

export default FindUser
