import React from 'react';
import ExamsCSS from "../../assets/css/Exams.module.css";
import { Link } from "react-router-dom";
const Exams = () => {
    return(
        <div>
          <div className={ExamsCSS.container}>
			<div className={ExamsCSS.leftElement}><h2>Course 1</h2></div>
			<div className={ExamsCSS.rightElement}>
				<Link to="/Instructor/createExam"><button className={ExamsCSS.gradesButton}>Create Exam</button></Link>
			</div>
		</div>
		<br />
		<br />
		<div>
			<table className={ExamsCSS.customTable}>
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
							<Link to="/Instructor/createExam"><button className={ExamsCSS.customButton}>Edit</button></Link>
						</td>
					</tr>
					<tr>
						<td>Exam 5</td>
						<td>
							<Link to="/Instructor/createExam"><button className={ExamsCSS.customButton}>Edit</button></Link>
						</td>
					</tr>
					<tr>
						<td>Exam 6</td>
						<td>
							<Link to="/Instructor/createExam"><button className={ExamsCSS.customButton}>Edit</button></Link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div>
			<table className={ExamsCSS.customTable}>
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
							<Link to="/Instructor/grades"><button className={ExamsCSS.customButton}>Grade Exam</button></Link>
						</td>
					</tr>
					<tr>
						<td>Exam 2</td>
						<td>
							<Link to="/Instructor/grades"><button className={ExamsCSS.customButton}>Grade Exam</button></Link>
						</td>
					</tr>
					<tr>
						<td>Exam 3</td>
						<td>
							<Link to="/Instructor/grades"><button className={ExamsCSS.customButton}>Grade Exam</button></Link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		
		<script src="../../assets/js/nav.js"></script>
        </div>
    );
}

export default Exams;