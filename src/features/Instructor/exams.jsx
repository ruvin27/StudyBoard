import React from 'react';
import examsCSS from "../../assets/css/exams.module.css";
import navbarCSS from "../../assets/css/navbar.module.css";
import { Link } from "react-router-dom";
const exams = () => {
    return(
        <div>
          <div className={examsCSS.container}>
			<div className={examsCSS.leftElement}><h2>Course 1</h2></div>
			<div className={examsCSS.rightElement}>
				<Link to="/Instructor/createExam"><button className={examsCSS.gradesButton}>Create Exam</button></Link>
			</div>
		</div>
		<br />
		<br />
		<div>
			<table className={examsCSS.customTable}>
				<thead>
					<tr>
						<th>Upcoming Exams</th>
						<th>Take Exam</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Exam 4</td>
						<td>
							<Link to="/Instructor/createExam"><button className={examsCSS.customButton}>Edit</button></Link>
						</td>
					</tr>
					<tr>
						<td>Exam 5</td>
						<td>
							<Link to="/Instructor/createExam"><button className={examsCSS.customButton}>Edit</button></Link>
						</td>
					</tr>
					<tr>
						<td>Exam 6</td>
						<td>
							<Link to="/Instructor/createExam"><button className={examsCSS.customButton}>Edit</button></Link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div>
			<table className={examsCSS.customTable}>
				<thead>
					<tr>
						<th>Upcoming Exams</th>
						<th>Grades</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Exam 1</td>
						<td>
							<Link to="/Instructor/grades"><button className={examsCSS.customButton}>Grade Exam</button></Link>
						</td>
					</tr>
					<tr>
						<td>Exam 2</td>
						<td>
							<Link to="/Instructor/grades"><button className={examsCSS.customButton}>Grade Exam</button></Link>
						</td>
					</tr>
					<tr>
						<td>Exam 3</td>
						<td>
							<Link to="/Instructor/grades"><button className={examsCSS.customButton}>Grade Exam</button></Link>
						</td>
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

export default exams;