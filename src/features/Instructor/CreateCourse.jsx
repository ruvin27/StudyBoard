import React from 'react';
import MyCoursesCSS from "../../assets/css/MyCourses.module.css";
import CreateCourseCSS from "../../assets/css/CreateCourse.module.css";

const CreateCourse = () => {
    return (
        <div>
		    <div className={MyCoursesCSS.container}>
			    <div className={MyCoursesCSS.leftElement}><h2>Create a new Course</h2></div>
		    </div>
		    <div className={CreateCourseCSS.courseFormContainer}>
			    <form id="courseForm">
				    <label htmlFor="courseName">Course Name:</label>
				    <input type="text" id="courseName" name="courseName" required /><br /><br />

				    <label htmlFor="courseDescription">Description:</label>
				    <input type="text" id="courseDescription" name="courseDescription" required /><br /><br />

				    <label htmlFor="courseCode">Course Code:</label>
				    <input type="text" id="courseCode" name="courseCode" required /><br /><br />

				    <label htmlFor="courseCredit">Credit:</label>
				    <input type="number" id="courseCredit" name="courseCredit" required /><br /><br />

				    <label htmlFor="courseStartDate">Start Date:</label>
				    <input type="date" id="courseStartDate" name="courseStartDate" required /><br /><br />

				    <label htmlFor="courseEndDate">End Date:</label>
				    <input type="date" id="courseEndDate" name="courseEndDate" required /><br /><br />

				    <label htmlFor="programObjective">Program Objective:</label>
				    <select id="programObjective" name="programObjective" className={CreateCourseCSS.programObjective}>
					    <option value="objective1">Objective 1</option>
					    <option value="objective2">Objective 2</option>
					    <option value="objective3">Objective 3</option>
					    <option value="objective4">Objective 4</option>
				    </select>
				    <br /><br />

				    <button type="submit" className={CreateCourseCSS.submitBtn}>Submit</button>
			    </form>
		    </div>
        </div>
    );
}

export default CreateCourse;
