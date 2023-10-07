import React from 'react';
import SendRecommendationsCSS from '../../assets/css/sendRecommendations.css';

const SendRecommendations = () => {
  return (
    <div>
      <div className={SendRecommendationsCSS.container}>
        <h2 className={SendRecommendationsCSS.leftElement}>Course Recommendation</h2>
      </div>
      <div className={SendRecommendationsCSS.recommendationform}>
        <form action="#" method="post">
          <label htmlFor="courseName">Course Name</label>
          <input type="text" id="courseName" name="courseName" required />

          <label htmlFor="instructorName">Instructor Name</label>
          <input type="text" id="instructorName" name="instructorName" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required></textarea>

          <button type="submit" className={SendRecommendationsCSS.btn}>Send Recommendation</button>
        </form>
      </div>
      <script src="../../assets/js/nav.js"></script>
    </div>
  );
};  

export default SendRecommendations;

