import React, { useState } from 'react';
import SendRecommendationsCSS from '@assets/css/sendRecommendations.module.css';
import { apiClient } from '@lib/apiClient';

const SendRecommendations = () => {
  const [inputs, setInputs] = useState({
    courseName: '',
    instructorName: '',
    message: ''
  });
  const [feedback, setFeedback] = useState('');

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(prevState => ({...prevState, [name]: value}));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await apiClient.post('PC/recommendation.php', inputs);
    } catch (error) {
        console.error('Error sending recommendation:', error);
        setFeedback('An error occurred while sending the recommendation.');
    }
  };

  return (
    <div>
      <div className={SendRecommendationsCSS.container}>
        <h2 className={SendRecommendationsCSS.leftElement}>
          Course Recommendation
        </h2>
      </div>
      <div className={SendRecommendationsCSS.recommendationform}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="courseName" className={SendRecommendationsCSS.label}>
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={inputs.courseName}
            onChange={handleChange}
            required
            className={SendRecommendationsCSS.input}
          />

          <label htmlFor="instructorName" className={SendRecommendationsCSS.label}>
            Instructor Name
          </label>
          <input
            type="text"
            id="instructorName"
            name="instructorName"
            value={inputs.instructorName}
            onChange={handleChange}
            required
            className={SendRecommendationsCSS.input}
          />

          <label htmlFor="message" className={SendRecommendationsCSS.label}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={inputs.message}
            onChange={handleChange}
            required
            className={SendRecommendationsCSS.textarea}
          ></textarea>

          <button type="submit" className={SendRecommendationsCSS.btn}>
            Send Recommendation
          </button>
        </form>
        {feedback && <p className={SendRecommendationsCSS.feedback}>{feedback}</p>}
      </div>
    </div>
  );
}

export default SendRecommendations;
