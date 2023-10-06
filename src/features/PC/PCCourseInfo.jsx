import React from 'react';
import CourseInfoCSS from '../../assets/css/CourseInfo.module.css';

const CourseInfo = () => {
  return (
    <div>
      <div className={CourseInfoCSS.container}>
        <div className={CourseInfoCSS["left-element"]}>
          <h2>Course Title-1</h2>
        </div>
        <div className={CourseInfoCSS["right-element"]}>
          <a href="../Student/people.html">
            <button className={CourseInfoCSS.button}>People</button>
          </a>
        </div>
      </div>
      <div className={CourseInfoCSS["course-Button"]}>
        <button className={CourseInfoCSS.button}>Syllabus</button>
        <a href="../Instructor/instructorExamAnalysis.html">
          <button className={CourseInfoCSS.button}>Reports</button>
        </a>
        <a href="./sendRecommendations.html">
          <button className={CourseInfoCSS.button}>Send Recommendation</button>
        </a>
      </div>
      <div className={CourseInfoCSS["Course-information"]}>
        <p>Detailed information about Course-1</p>
      </div>
      <div className={CourseInfoCSS["Course-information"]}>
        <p>Comments and Discussion</p>
      </div>
    
      <script src="../../assets/js/nav.js"></script>
    </div>
  );
};

export default CourseInfo;
