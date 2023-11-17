import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StudentAllCoursesCSS from '@assets/css/courses.module.css'
import { useAuth } from '@contexts/AuthContext'
import { apiClient } from '@lib/apiClient'
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'

const AllStudentCourses = () => {
  const { user } = useAuth()
  const [allCourseDetails, setCourseDetails] = useState([]) // Initialize with an empty array

  const [objectives, setObjectives] = useState([])

  useEffect(() => {
    // Fetch color data from the database using Axios
    axios.get(`${LARAVEL_BACKEND_URL}/objectives`)
      .then((response) => {
        setObjectives(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching Objectives data:', error)
      })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an API request to fetch all course details
        const response = await axios.get(`${LARAVEL_BACKEND_URL}/get-all-courses`)

        setCourseDetails(response.data.data)
      } catch (error) {
        console.error('Error fetching course details:', error)
      }
    }
      fetchData()
  }, [])

  return (
    <>
      <div className={StudentAllCoursesCSS.container}>
        <div className={StudentAllCoursesCSS.leftElement}>
          <h2>All Courses</h2>
        </div>
        <div className={StudentAllCoursesCSS.rightElement}>
          {user && user.role !== 'Admin' && (
            <Link
              to={
                user && user.role === 'Student'
                  ? '/mycourses'
                  : user && user.role === 'QA Officer'
                  ? '/mycoursesqa'
                  : user && user.role === 'Program Coordinator'
                  ? '/MyCoursesPc'
                  : user && user.role === 'Instructor'
                  ? '/mycoursesInstructor'
                  : '/'
              }
            >
              <button className={StudentAllCoursesCSS.mycoursesButton}>My Courses</button>
            </Link>
          )}
          <Link to={'/policies'}>
            <button className={StudentAllCoursesCSS.mycoursesButton}>Policies</button>
          </Link>
        </div>
      </div>
      <section className={StudentAllCoursesCSS.content}>
        <div className={StudentAllCoursesCSS.left}>
          <div className={StudentAllCoursesCSS.card}>
            <h2>Courses</h2>
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Instructor</th>
                </tr>
              </thead>
              <tbody>
                {allCourseDetails.map((course, index) => (
                  <tr key={index}>
                    <td>{course.course_name}</td>
                    <td>{course.instructor.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={StudentAllCoursesCSS.right}>
          <div className={`${StudentAllCoursesCSS.card} ${StudentAllCoursesCSS.objectives}`}>
            <h2>Program Objectives</h2>

            {objectives.map((objective, index) => (
              <div className={StudentAllCoursesCSS.objectiveItem} key={index}>
                <strong>Objective {index + 1}:</strong>
                <p>{objective.objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default AllStudentCourses
