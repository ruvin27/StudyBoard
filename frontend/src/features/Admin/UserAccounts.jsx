import UserAccountsCSS from '@assets/css/userAccounts.module.css'
import { Link } from 'react-router-dom'

const UserAccounts = () => {
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
          <Link to={'/newusers'}>
            <button className={UserAccountsCSS.userButton}>
              Approve New Users
            </button>
          </Link>
        </div>
      </div>
      <div className={UserAccountsCSS.searchContainer}>
        <input
          type="text"
          className={UserAccountsCSS.searchInput}
          placeholder="Search..."
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
          <tr>
            <td>user1@example.com</td>
            <td>Admin</td>
            <td>Mathematics</td>
            <td>
              <button className={UserAccountsCSS.userAccButton}>Remove</button>
            </td>
          </tr>
          <tr>
            <td>user2@example.com</td>
            <td>Instructor</td>
            <td>Physics</td>
            <td>
              <button className={UserAccountsCSS.userAccButton}>Remove</button>
            </td>
          </tr>
          <tr>
            <td>user3@example.com</td>
            <td>Student</td>
            <td>Chemistry</td>
            <td>
              <button className={UserAccountsCSS.userAccButton}>Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className={UserAccountsCSS.addContainer}>
        <h2 className={UserAccountsCSS.addAccessHeader}>Add New Access</h2>
      </div>
      <form id="userForm" className={UserAccountsCSS.form}>
        <label htmlFor="email">Email:</label>
        <div className={UserAccountsCSS.autocompleteContainer}>
          <input type="email" id="email" name="email" required />
          <div
            className={UserAccountsCSS.autocompleteSuggestions}
            id="autocompleteSuggestions"
          ></div>
        </div>

        <label htmlFor="role">Role:</label>
        <select id="role" name="role" className={UserAccountsCSS.select}>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>

        <label htmlFor="course">Course:</label>
        <select id="course" name="course" className={UserAccountsCSS.select}>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="history">History</option>
          <option value="english">English</option>
        </select>

        <button type="button" className={UserAccountsCSS.button}>
          Add
        </button>
      </form>
    </div>
  )
}

export default UserAccounts
