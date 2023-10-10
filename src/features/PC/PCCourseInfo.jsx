import React from 'react';
import CourseInfoCSS from '../../assets/css/CourseInfo.module.css';

const CourseInfo = () => {
  return (
    <div>
      <div className={CourseInfoCSS.container}>
        <div className={CourseInfoCSS.leftElement}>
          <h2>Course Title-1</h2>
        </div>
        <div className={CourseInfoCSS.rightElement}>
          <a href="../Student/people.html">
            <button className={CourseInfoCSS.button}>People</button>
          </a>
        </div>
      </div>
      <div>
        <button className={CourseInfoCSS.button}>Syllabus</button>
        <a href="/instructorexamanalysis">
          <button className={CourseInfoCSS.button}>Reports</button>
        </a>
        <a href="./sendRecommendations">
          <button className={CourseInfoCSS.button}>Send Recommendation</button>
        </a>
      </div>
      <div className={CourseInfoCSS.CourseInformation}>
        <p>Detailed information about Course-1</p>
      </div>
      <div className={CourseInfoCSS.CourseInformation}>
        <p>Comments and Discussion</p>
      </div>
    
      <script src="../../assets/js/nav.js"></script>
    </div>
  );
};

export default CourseInfo;
