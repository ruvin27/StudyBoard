import React from 'react';
import PeopleCSS from "../../assets/css/NewUser.module.css";
import navbarCSS from "../../assets/css/navbar.module.css";
const People = () => {
    return(
        <div>
            <div className={PeopleCSS.container}>
			<div className={PeopleCSS.leftElement}><h2>Course Name</h2></div>
		</div>

		<div>
			<table className={PeopleCSS.people_list_table}>
				<thead>
					<tr>
						<th colspan="3">People</th>
					</tr>
					<tr>
						<th>Role</th>
						<th>Name</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Instructor</td>
						<td>Instructor Name</td>

						<td></td>
					</tr>
					<tr>
						<td>Student</td>
						<td>Student 1</td>

						<td><button className={PeopleCSS.removeButton}>Remove from this course</button></td>
					</tr>
					<tr>
						<td>Student</td>
						<td>Student 2</td>

						<td><button className={PeopleCSS.removeButton}>Remove from this course</button></td>
					</tr>
					<tr>
						<td>Student</td>
						<td>Student 3</td>
						<td><button className={PeopleCSS.removeButton}>Remove from this course</button></td>
					</tr>
					<tr>
						<td>Student</td>
						<td>Student 4</td>
						<td><button className={PeopleCSS.removeButton}>Remove from this course</button></td>
					</tr>
					<tr>
						<td>Student</td>
						<td>Student 5</td>
						<td><button className={PeopleCSS.removeButton}>Remove from this course</button></td>
					</tr>
					<tr>
						<td>Student</td>
						<td>Student 6</td>
						<td><button className={PeopleCSS.removeButton}>Remove from this course</button></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div className={navbarCSS.chatContainer}>
    <div className={navbarCSS.chatHeader}>Instant Messaging</div>
    <div className={navbarCSS.chatMessages}>
        <div className={navbarCSS.message}>Alice: Hi there!</div>
        <div className={navbarCSS.message}>Bob: Hey, Alice! How are you?</div>
        <div className={navbarCSS.message}>Alice: I'm good, thanks. How about you?</div>
        <div className={navbarCSS.message}>Bob: I'm doing well too.</div>
        <div className={navbarCSS.message}>Alice: That's great to hear!</div>
    </div>
    <div className={navbarCSS.chatInput}>
        <input type="text" placeholder="Type your message..." />
        <button>Send</button>
    </div>
		</div>
        </div>
    );
}
export default People;