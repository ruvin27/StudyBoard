import React from 'react';
import RecommendationsqaCSS from '../../assets/css/sendRecommendations.css';

const CourseRecommendationQA = () => {
  return (
    <div>

      <div className="container">
        <h2 className="left-element">Course Recommendation</h2>
      </div>
      <div className={RecommendationsqaCSS.recommendationform}>
        <form action="#" method="post">
          <label htmlFor="courseName">Course Name</label>
          <input type="text" id="courseName" name="courseName" required />

          <label htmlFor="instructorName">Instructor Name</label>
          <input type="text" id="instructorName" name="instructorName" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required></textarea>

          <button type="submit" className={RecommendationsqaCSS.btn}>Send Recommendation</button>
        </form>
      </div>
      <script src="../../assets/js/nav.js"></script>
    </div>
  );
};

export default CourseRecommendationQA;
