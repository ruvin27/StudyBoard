import React from "react";
import InstructorCourseInfoCSS from "../../assets/css/CourseInfo.module.css";
import { Link } from "react-router-dom";
const InstructorCourseInfo = () => {
	return (
		<div>
			<div className={InstructorCourseInfoCSS.container}>
				<div className={InstructorCourseInfoCSS.leftElement}>
					<h2>Course Title-1</h2>
				</div>
				<div className={InstructorCourseInfoCSS.rightElement}>
					<Link to="/people">
						<button className={InstructorCourseInfoCSS.button}>People</button>
					</Link>
					<Link to="/createCourse">
						<button className={InstructorCourseInfoCSS.button}>Manage Course</button>
					</Link>
					<button className={InstructorCourseInfoCSS.button}>Remove Course</button>
				</div>
			</div>
			<div className={InstructorCourseInfoCSS.courseButton}>
				<button className={InstructorCourseInfoCSS.button}>Syllabus</button>
				<button className={InstructorCourseInfoCSS.button}>Upload File</button>
				<Link to="/exams">
					<button className={InstructorCourseInfoCSS.button}>Exams</button>
				</Link>
				<Link to="/instructorExamAnalysis">
					<button className={InstructorCourseInfoCSS.button}>Reports</button>
				</Link>
				<Link to="/recommendation">
					<button className={InstructorCourseInfoCSS.button}>View Recommedations</button>
				</Link>
			</div>

			<div className={InstructorCourseInfoCSS.CourseInformation}>
				<p>Detailed information about Course-1</p>
			</div>
			<div className={InstructorCourseInfoCSS.CourseInformation}>
				<p>comments and Discussion</p>
			</div>
		</div>
	);
};
export default InstructorCourseInfo;
