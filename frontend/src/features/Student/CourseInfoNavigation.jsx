import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import CouseInfoCSS from '@assets/css/CourseInfo.module.css'
import axios from 'axios' // You may use axios for API calls
import { useAuth } from '@contexts/AuthContext'
import { apiClient } from '@lib/apiClient'

const CourseInfoNavigation = () => {
  const { courseId } = useParams()
  const { user } = useAuth()
  const [courseDetails, setCourseDetails] = useState(null) // Initialize with null or an empty object

  useEffect(() => {
    const fetchData = async () => {
      try {
        // You can use axios or apiClient to fetch course details
        const response = await apiClient.post(
          'student/CourseInfoNavigation.php',
          {
            courseId: courseId,
            userid: user.userid, // If you need to send user information
          }
        )

        setCourseDetails(response.data) // Update the state with the course details
      } catch (error) {
        console.error('Error fetching course details:', error)
      }
    }

    if (user) {
      fetchData()
    }
  }, [courseId, user]) // Add courseId to the dependency array

  return (
    <>
      {courseDetails ? (
        <>
          <div className={CouseInfoCSS.container}>
            <div className={CouseInfoCSS.leftElement}>
              <h2>{courseDetails.name}</h2>
            </div>
            <div className={CouseInfoCSS.rightElement}>
              <Link to={`/people/${courseId}`}> {/* Include courseId in the URL */}
                <button className={CouseInfoCSS.button}>People</button>
              </Link>
            </div> 
          </div>
          <div>
            <button className={CouseInfoCSS.button}>Syllabus</button>
            <Link to={`/studentExams/${courseId}`}>
              <button className={CouseInfoCSS.button}>Exams</button>
            </Link>
            <Link to="/student-grades">
              <button className={CouseInfoCSS.button}>Grades</button>
            </Link>
          </div>
          <div className={CouseInfoCSS.CourseInformation}>
            <p>{courseDetails.description}</p>
          </div>
          <div className={CouseInfoCSS.CourseInformation}>
            <p>comments and Discussion</p>
          </div>
        </>
      ) : (
        <p>Loading course details...</p>
      )}
    </>
  )
}

export default CourseInfoNavigation
