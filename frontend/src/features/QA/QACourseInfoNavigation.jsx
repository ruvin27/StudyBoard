import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import CourseInfoCSS from '@assets/css/CourseInfo.module.css'
import { useAuth } from '@contexts/AuthContext'
import { apiClient } from '@lib/apiClient'

const QACourseInfoNavigation = () => {
  const { courseId } = useParams()
  const { user } = useAuth()
  const [courseDetails, setCourseDetails] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.post(
          'student/CourseInfoNavigation.php',
          {
            courseId: courseId,
            userid: user.userid,
          }
        )

        setCourseDetails(response.data)
      } catch (error) {
        console.error('Error fetching course details:', error)
      }
    }

    if (user) {
      fetchData()
    }
  }, [courseId, user])

  return (
    <>
      {courseDetails ? (
        <>
          <div className={CourseInfoCSS.container}>
            <div className={CourseInfoCSS.leftElement}>
              <h2>{courseDetails.name}</h2>
            </div>
            <div className={CourseInfoCSS.rightElement}>
              <Link to={`/people/${courseId}`}>
                <button className={CourseInfoCSS.button}>People</button>
              </Link>
            </div>
          </div>
          <div>
            <button className={CourseInfoCSS.button}>Syllabus</button>
            <Link to={`/studentExams/${courseId}`}>
              <button className={CourseInfoCSS.button}>Exams</button>
            </Link>
            <Link to={`/student-grades/${courseId}`}>
              <button className={CourseInfoCSS.button}>Grades</button>
            </Link>
            <Link to={`/student-reports/${courseId}`}> {/* Add Reports button */}
              <button className={CourseInfoCSS.button}>Reports</button>
            </Link>
          </div>
          <div className={CourseInfoCSS.CourseInformation}>
            <p>{courseDetails.description}</p>
          </div>
        </>
      ) : (
        <p>Loading course details...</p>
      )}
    </>
  )
}

export default QACourseInfoNavigation
