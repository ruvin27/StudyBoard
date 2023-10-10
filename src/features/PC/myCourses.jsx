import React from 'react';
import MyCoursesCSS from '../../assets/css/MyCourses.module.css';

const MyCoursesPc = () => {
  return (
    <div>
      <div className={MyCoursesCSS.container}>
        <div className={MyCoursesCSS.leftElement}>
          <h2>My Courses</h2>
        </div>
        <div className={MyCoursesCSS.rightElement}>
          <a href="/contactusresponses">
            <button className={MyCoursesCSS.mycoursesButton}>Contact Responses</button>
          </a>
          <a href="/belowavgexams">
            <button className={MyCoursesCSS.mycoursesButton}>Below Average Results</button>
          </a>
          <a href="/program">
            <button className={MyCoursesCSS.mycoursesButton}>Program Details</button>
          </a>
        </div>
      </div>
      <div className={MyCoursesCSS.courses}>
        {Array.from({ length: 5 }).map((_, index) => (
          <a href="/PCCourseInfo" key={index}>
            <div className={MyCoursesCSS.courseCard}>
              <div className={MyCoursesCSS.courseInfo}>
                <h2 className={MyCoursesCSS.courseTitle}>Course Title {index + 1}</h2>
                <p className={MyCoursesCSS.courseDescription}>
                  This is a brief description of the {index + 1} course.
                </p>
                <div className={MyCoursesCSS.courseMeta}>
                  <p className={MyCoursesCSS.courseInstructor}>Instructor: Jane Smith</p>
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
