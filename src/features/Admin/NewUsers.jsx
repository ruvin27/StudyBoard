import React from 'react'
import NewUsersCSS from '../../assets/css/NewUser.module.css'

const NewUsers = () => {
    return ( 
        <div>
            <div className={NewUsersCSS.addContainer}>
			<h2>Add New Users</h2>
		</div>
		<div className={NewUsersCSS.searchContainer}>
			<input type="text" className={NewUsersCSS.searchInput} placeholder="Search..." />
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
				<tr>
					<td>user1@example.com</td>
					<td>Admin</td>
					<td><button className={NewUsersCSS.newUsersButton}>Approve</button></td>
				</tr>
				<tr>
					<td>user2@example.com</td>
					<td>Instructor</td>
					<td><button className={NewUsersCSS.newUsersButton}>Approve</button></td>
				</tr>
				<tr>
					<td>user3@example.com</td>
					<td>Student</td>
					<td><button className={NewUsersCSS.newUsersButton}>Approve</button></td>
				</tr>
			</tbody>
		</table>
        </div>
     );
}
 
export default NewUsers;