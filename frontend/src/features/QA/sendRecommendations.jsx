import RecommendationsqaCSS from '@assets/css/sendRecommendations.module.css'
import  React,{ useState } from 'react';
import { apiClient } from '@lib/apiClient';
const CourseRecommendationQA = () => {
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
      <div className={RecommendationsqaCSS.container}>
        <h2 className={RecommendationsqaCSS.leftElement}>
          Course Recommendation
        </h2>
      </div>
      <div className={RecommendationsqaCSS.recommendationform}>
        <form action="#" method="post" onSubmit={handleSubmit}>
          <label htmlFor="courseName" className={RecommendationsqaCSS.label}>
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={inputs.courseName}
            onChange={handleChange}
            required
            className={RecommendationsqaCSS.input}
          />

          <label
            htmlFor="instructorName"
            className={RecommendationsqaCSS.label}
          >
            Instructor Name
          </label>
          <input
            type="text"
            id="instructorName"
            name="instructorName"
            value={inputs.instructorName}
            onChange={handleChange}
            required
            className={RecommendationsqaCSS.input}
          />

          <label htmlFor="message" className={RecommendationsqaCSS.label}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={inputs.message}
            onChange={handleChange}
            required
            className={RecommendationsqaCSS.textarea}
          ></textarea>

          <button type="submit" className={RecommendationsqaCSS.btn}>
            Send Recommendation
          </button>
        </form>
      </div>
    </div>
  )
}

export default CourseRecommendationQA
