import React from 'react';
import InstructorCourseInfoCSS from "../../assets/css/CourseInfo.module.css";
import navbarCSS from "../../assets/css/navbar.module.css";
import { Link } from "react-router-dom";
const InstructorCourseInfo = () => {
    return(
       <div>
        <div className={InstructorCourseInfoCSS.container}>
			<div className={InstructorCourseInfoCSS.leftElement}><h2>Course Title-1</h2></div>
			<div className={InstructorCourseInfoCSS.rightElement}>
				<Link to="/Instructor/people">
					<button className="button">People</button>
				</Link>
				<Link to="/createCourse">
				<button className="button">Manage Course</button></Link>
				<button className="button">Remove Course</button>
			</div>
		</div>
		<div className={InstructorCourseInfoCSS.courseButton}>
			<button className={InstructorCourseInfoCSS.button}>Syllabus</button>
			<button className={InstructorCourseInfoCSS.button}>Upload File</button>
			<Link to="/exams">
				<button className={InstructorCourseInfoCSS.button}>Exams</button>
			</Link>
			<Link to="/Instructor/instructorExamAnalysis">
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
export default InstructorCourseInfo;