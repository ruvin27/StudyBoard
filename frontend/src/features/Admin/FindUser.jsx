import { Link } from 'react-router-dom'
import FindUserCSS from '@assets/css/finduser.module.css'

const FindUser = () => {
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
          <tr>
            <td>user1@example.com</td>
            <td>
              <Link to={'profile'}>
                <button className={FindUserCSS.findUserBtn}>Edit</button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>user2@example.com</td>
            <td>
              <Link to={'profile'}>
                <button className={FindUserCSS.findUserBtn}>Edit</button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>user3@example.com</td>
            <td>
              <Link to={'profile'}>
                <button className={FindUserCSS.findUserBtn}>Edit</button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default FindUser
