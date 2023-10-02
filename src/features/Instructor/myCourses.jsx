import React from 'react';
import myCoursesCSS from "../../assets/css/myCourses.module.css";
import navbarCSS from "../../assets/css/navbar.module.css";
import { Link } from "react-router-dom";
const myCourses = () => {
    return(
        <div>
            <div className={myCoursesCSS.container}>
			<div className={myCoursesCSS.leftElement}><h2>My Courses</h2></div>
			<div className={myCoursesCSS.rightElement}>
				<Link to="/createCourse"><button className={myCoursesCSS.mycoursesButton}>Create Course</button></Link>
				<Link to="/info/program"><button className={myCoursesCSS.mycoursesButton}>Program Details</button></Link>
			</div>
		</div>
		<div className={myCoursesCSS.courses}>
			<Link to="/InstructorCourseInfo">
				<div className={myCoursesCSS.courseCard}>
					<div className={myCoursesCSS.courseInfo}>
						<h2 className={myCoursesCSS.courseTitle}>Course Title 1</h2>
						<p className={myCoursesCSS.courseDescription}>This is a brief description of the first course.</p>
						<div className={myCoursesCSS.courseMeta}>
							<p className={myCoursesCSS.courseInstructor}>Instructor: John Doe</p>
						</div>
					</div>
				</div>
			</Link>
			<Link to="/InstructorCourseInfo">
			<div className={myCoursesCSS.courseCard}>
				<div className={myCoursesCSS.courseInfo}>
					<h2 className={myCoursesCSS.courseTitle}>Course Title 2</h2>
					<p className={myCoursesCSS.courseDescription}>This is a brief description of the second course.</p>
					<div className={myCoursesCSS.courseMeta}>
						<p className={myCoursesCSS.courseInstructor}>Instructor: Jane Smith</p>
					</div>
				</div>
			</div>
			</Link>
			<Link to="/InstructorCourseInfo">
			<div className={myCoursesCSS.courseCard}>
				<div className={myCoursesCSS.courseInfo}>
					<h2 className={myCoursesCSS.courseTitle}>Course Title 3</h2>
					<p className={myCoursesCSS.courseDescription}>This is a brief description of the second course.</p>
					<div className={myCoursesCSS.courseMeta}>
						<p className={myCoursesCSS.courseInstructor}>Instructor: Jane Smith</p>
					</div>
				</div>
			</div>
			</Link>
			<Link to="/InstructorCourseInfo">
			<div className={myCoursesCSS.courseCard}>
				<div className={myCoursesCSS.courseInfo}>
					<h2 className={myCoursesCSS.courseTitle}>Course Title 4</h2>
					<p className={myCoursesCSS.courseDescription}>This is a brief description of the second course.</p>
					<div className={myCoursesCSS.courseMeta}>
						<p className={myCoursesCSS.courseInstructor}>Instructor: Jane Smith</p>
					</div>
				</div>
			</div>
			</Link>
			<Link to="/InstructorCourseInfo">
			<div className={myCoursesCSS.courseCard}>
				<div className={myCoursesCSS.courseInfo}>
					<h2 className={myCoursesCSS.courseTitle}>Course Title 5</h2>
					<p className={myCoursesCSS.courseDescription}>This is a brief description of the second course.</p>
					<div className={myCoursesCSS.courseMeta}>
						<p className={myCoursesCSS.courseInstructor}>Instructor: Jane Smith</p>
					</div>
				</div>
			</div>
			</Link>
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
export default myCourses;