import React from 'react';
import MyCoursesCSS from '../../assets/css/MyCourses.module.css';

const MyCoursesPc = () => {
  return (
    <div>
      <div className={MyCoursesCSS.container}>
        <div className={MyCoursesCSS["left-element"]}>
          <h2>My Courses</h2>
        </div>
        <div className={MyCoursesCSS["right-element"]}>
          <a href="./contactresponses.html">
            <button className={MyCoursesCSS["mycourses-button"]}>Contact Responses</button>
          </a>
          <a href="../PC/belowavgexams.html">
            <button className={MyCoursesCSS["mycourses-button"]}>Below Average Results</button>
          </a>
          <a href="../info/program.html">
            <button className={MyCoursesCSS["mycourses-button"]}>Program Details</button>
          </a>
        </div>
      </div>
      <div className={MyCoursesCSS.courses}>
        {Array.from({ length: 5 }).map((_, index) => (
          <a href="./PCCourseInfo.html" key={index}>
            <div className={MyCoursesCSS["course-card"]}>
              <div className={MyCoursesCSS["course-info"]}>
                <h2 className={MyCoursesCSS["course-title"]}>Course Title {index + 1}</h2>
                <p className={MyCoursesCSS["course-description"]}>
                  This is a brief description of the {index + 1} course.
                </p>
                <div className={MyCoursesCSS["course-meta"]}>
                  <p className={MyCoursesCSS["course-instructor"]}>Instructor: Jane Smith</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      
      <script src="../../assets/js/nav.js"></script>
    </div>
  );
};

export default MyCoursesPc;
