import React from 'react';
import myCoursesCSS from "../../assets/css/myCourses.module.css";
import createCourseCSS from "../../assets/css/createCourse.module.css";
const createCourse = () => {
    return (
        <div>
		<div className={myCoursesCSS.container}>
			<div className={myCoursesCSS.leftElement}><h2>Create a new Course</h2></div>
		</div>
		<div className={createCourseCSS.course-form-container}>
			<form id="courseForm">
				<label htmlfor="courseName">Course Name:</label>
				<input type="text" id="courseName" name="courseName" required /><br /><br />

				<label htmlfor="courseDescription">Description:</label>
				<input type="text" id="courseDescription" name="courseDescription" required /><br /><br />

				<label htmlfor="courseCode">Course Code:</label>
				<input type="text" id="courseCode" name="courseCode" required /><br /><br />

				<label htmlfor="courseCredit">Credit:</label>
				<input type="number" id="courseCredit" name="courseCredit" required /><br /><br />

				<label htmlfor="courseStartDate">Start Date:</label>
				<input type="date" id="courseStartDate" name="courseStartDate" required /><br /><br />

				<label htmlfor="courseEndDate">End Date:</label>
				<input type="date" id="courseEndDate" name="courseEndDate" required /><br /><br />

				<label htmlfor="programObjective">Program Objective:</label>
				<select id="programObjective" name="programObjective" classname={createCourseCSS.programObjective}>
					<option value="objective1">Objective 1</option>
					<option value="objective2">Objective 2</option>
					<option value="objective3">Objective 3</option>
					<option value="objective4">Objective 4</option></select
				><br /><br />

				<button type="submit" className={createCourseCSS.submitBtn}>Submit</button>
			</form>
		</div>
        
        </div>
    );
}
export default createCourse;
