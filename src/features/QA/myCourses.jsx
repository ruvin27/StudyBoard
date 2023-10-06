import React from 'react';
import MyCoursesCSS from '../../assets/css/MyCourses.module.css';

const MyCoursesQA = () => {
  return (
    <div>
      
      <div className={MyCoursesCSS.container}>
        <div className={MyCoursesCSS["left-element"]}>
          <h2>My Courses</h2>
        </div>
        <div className={MyCoursesCSS["right-element"]}>
          <a href="../QA/belowavgexams.html">
            <button className={MyCoursesCSS["mycourses-button"]}>Below Average Results</button>
          </a>
          <a href="../info/program.html">
            <button className={MyCoursesCSS["mycourses-button"]}>Program Details</button>
          </a>
        </div>
      </div>
      <div className={MyCoursesCSS.courses}>
        {[1, 2, 3, 4, 5].map((index) => (
          <a href="./QACourseInfo.html" key={index}>
            <div className={MyCoursesCSS["course-card"]}>
              <div className={MyCoursesCSS["course-info"]}>
                <h2 className={MyCoursesCSS["course-title"]}>Course Title {index}</h2>
                <p className={MyCoursesCSS["course-description"]}>
                  This is a brief description of the course.
                </p>
                <div className={MyCoursesCSS["course-meta"]}>
                  <p className={MyCoursesCSS["course-instructor"]}>Instructor: John Do</p>
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

export default MyCoursesQA;
