import React, { useState, useEffect } from 'react';
import SendRecommendationsCSS from '@assets/css/sendRecommendations.module.css';
import { apiClient } from '@lib/apiClient';
import { useParams } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import axios from 'axios';
import { LARAVEL_BACKEND_URL } from '../../config';

const SendRecommendations = () => {
  const { user } = useAuth();
  const { courseId, name } = useParams();
  const [inputs, setInputs] = useState({
    message: '',
  });
  const [suggestions, setSuggestions] = useState([]);
  const [timer, setTimer] = useState(null);

  async function fetchSuggestions() {
    try {
      const response = await axios.post('http://localhost:5000/getresponse', {
        prompt: inputs.message,
      });

      // Extract suggestions from the API response
      const suggestions = response.data[0]?.message?.content
        ? JSON.parse(response.data[0].message.content)
        : [];

      if (Array.isArray(suggestions)) {
        setSuggestions(suggestions);
      } else {
        console.error('Invalid suggestions format:', suggestions);
      }
    } catch (error) {
      console.error('Error fetching suggestions from ChatGPT:', error);
    }
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
    if (timer) {
      clearTimeout(timer);
    }

    // Set a new timer to fetch suggestions after 2 seconds of inactivity
    setTimer(setTimeout(() => {
      fetchSuggestions();
    }, 2000)); // 2000 milliseconds = 2 seconds
  };

  useEffect(() => {
    // Clear the timer on component unmount
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      axios
        .post(`${LARAVEL_BACKEND_URL}/store-recommendation`, {
          message: inputs.message,
          course_id: courseId,
          sender_id: user.userid,
        })
        .then((res) => {
          alert('Message Posted');
        });
    } catch (error) {
      console.error('Error sending recommendation:', error);
    }
  };

  return (
    <div>
      <div className={SendRecommendationsCSS.container}>
        <h2 className={SendRecommendationsCSS.leftElement}>Course Recommendation</h2>
      </div>
      <div className={SendRecommendationsCSS.recommendationform}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="courseName" className={SendRecommendationsCSS.label}>
            Course Name
          </label>
          <input type="text" id="courseName" name="courseName" defaultValue={name} disabled className={SendRecommendationsCSS.input} />

          <label htmlFor="message" className={SendRecommendationsCSS.label}>
            Message
          </label>
          <textarea id="message" name="message" value={inputs.message} onChange={handleChange} required className={SendRecommendationsCSS.textarea}></textarea>
{suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => setInputs({ ...inputs, message: suggestion })}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <button type="submit" className={SendRecommendationsCSS.btn}>
            Send Recommendation
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendRecommendations;
