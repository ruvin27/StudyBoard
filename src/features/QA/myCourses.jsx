import React from 'react';
import MyCoursesCSS from '../../assets/css/MyCourses.module.css';

const MyCoursesQA = () => {
  return (
    <div>
      
      <div className={MyCoursesCSS.container}>
        <div className={MyCoursesCSS.leftElement}>
          <h2>My Courses</h2>
        </div>
        <div className={MyCoursesCSS.rightElement}>
          <a href="/belowavgexamsQA">
            <button className={MyCoursesCSS.mycoursesButton}>Below Average Results</button>
          </a>
          <a href="/program">
            <button className={MyCoursesCSS.mycoursesButton}>Program Details</button>
          </a>
        </div>
      </div>
      <div className={MyCoursesCSS.courses}>
        {[1, 2, 3, 4, 5].map((index) => (
          <a href="/courseinfoqa" key={index}>
            <div className={MyCoursesCSS.courseCard}>
              <div className={MyCoursesCSS.courseInfo}>
                <h2 className={MyCoursesCSS.courseTitle}>Course Title {index}</h2>
                <p className={MyCoursesCSS.courseDescription}>
                  This is a brief description of the course.
                </p>
                <div className={MyCoursesCSS.courseMeta}>
                  <p className={MyCoursesCSS.courseInstructor}>Instructor: John Do</p>
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
