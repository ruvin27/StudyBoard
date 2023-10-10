import React from 'react';
import MyCoursesCSS from '../../assets/css/MyCourses.module.css';
import { Link } from "react-router-dom";

const MyCoursesQA = () => {
  return (
    <div>
      
      <div className={MyCoursesCSS.container}>
        <div className={MyCoursesCSS.leftElement}>
          <h2>My Courses</h2>
        </div>
        <div className={MyCoursesCSS.rightElement}>
          <Link to={"/belowavgexamsQA"}>
            <button className={MyCoursesCSS.mycoursesButton}>Below Average Results</button>
          </Link>
          <Link to={"/"}>
            <button className={MyCoursesCSS.mycoursesButton}>Program Details</button>
            </Link>
        </div>
      </div>
      <div className={MyCoursesCSS.courses}>
        {[1, 2, 3, 4, 5].map((index) => (
          <Link to={"/courseinfoqa"} key={index}>
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
          </Link>
        ))}
      </div>
      
    </div>
  );
};

export default MyCoursesQA;
