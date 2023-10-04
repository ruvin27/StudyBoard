import React from "react";
import UserActivityCSS from "../../assets/css/NewUser.module.css";

const UserActivity = () => {
	return (
		<div>
			<div className={UserActivityCSS.addContainer}>
				<h2 className={UserActivityCSS.addAccessHeader}>User Activity</h2>
			</div>
			<div className={UserActivityCSS.searchContainer}>
				<input type="text" className={UserActivityCSS.searchInput} placeholder="Search..." />
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
					<tr>
						<td>user1@example.com</td>
						<td>Admin</td>
						<td>2023-09-21 14:30:00</td>
					</tr>
					<tr>
						<td>user2@example.com</td>
						<td>Instructor</td>
						<td>2023-09-20 09:45:00</td>
					</tr>
					<tr>
						<td>user3@example.com</td>
						<td>Student</td>
						<td>2023-09-19 18:15:00</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default UserActivity;
