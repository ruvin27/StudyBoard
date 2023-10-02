import React from 'react';
import gradesCSS from "../../assets/css/grades.module.css";
import navbarCSS from "../../assets/css/navbar.module.css";
const grades = () => {
    return(
        <div>
            <div className={gradesCSS.container}>
			<div className={gradesCSS.leftElement}><h2>Course 1 - Exam 1</h2></div>
		</div>
		<div className={gradesCSS.grades}>
			<table className={gradesCSS.customTable}>
				<thead>
					<tr>
						<th>Student</th>
						<th>Grades</th>
						<th>Feedback</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Student 1</td>
						<td><input type="text" value="86%" /></td>
						<td><input type="text" value="NA" /></td>
					</tr>
					<tr>
						<td>Student 2</td>
						<td><input type="text" value="95%" /></td>
						<td><input type="text" value="Great Work" /></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div className={gradesCSS.release}>
			<button className={gradesCSS.gradesButton}>Release Grades</button>
		</div>
		<div className={navbarCSS.chatcontainer}>
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

export default grades;