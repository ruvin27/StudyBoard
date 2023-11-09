import React, { useState } from 'react'
import SendRecommendationsCSS from '@assets/css/sendRecommendations.module.css'
import { apiClient } from '@lib/apiClient'
import { useParams } from 'react-router-dom'
import { useAuth } from '@contexts/AuthContext'
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'

const SendRecommendations = () => {
  const {user} = useAuth();
  const { courseId, name } = useParams()
  const [inputs, setInputs] = useState({
    message: ''
  })
  const [feedback, setFeedback] = useState('')

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      axios.post(`${LARAVEL_BACKEND_URL}/store-recommendation`, {
        message: inputs.message,
        course_id: courseId,
        sender_id: user.userid
      }).then((res)=>{
        alert("Message Posted");
      })
    } catch (error) {
      console.error('Error sending recommendation:', error)
      setFeedback('An error occurred while sending the recommendation.')
    }
  }

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

          <button type="submit" className={SendRecommendationsCSS.btn}>
            Send Recommendation
          </button>
        </form>
        {feedback && <p className={SendRecommendationsCSS.feedback}>{feedback}</p>}
      </div>
    </div>
  )
}

export default SendRecommendations
