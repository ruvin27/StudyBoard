import ExamsCSS from '@assets/css/Exams.module.css'
import LoadingSpinner from '@features/LoadingSpinner'
import { apiClient } from '@lib/apiClient'
import { useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'

const Exams = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  React.useEffect(() => {
    const courseId = searchParams.get('courseId')
    if (!courseId) {
      navigate('/MyCoursesInstructor')
    }
  }, [navigate, searchParams])

  const courseId = searchParams.get('courseId')

  const { data: courseExams, isLoading } = useQuery({
    queryKey: ['exams', { courseId }],
    queryFn: async () => {
      const response = await axios.get(`${LARAVEL_BACKEND_URL}/exams/getAllByCourseId/${courseId}`)

      return response.data
    },
  })

  if (isLoading) {
    return <LoadingSpinner />
  }
  const { course, exams } = courseExams.data

  if (exams.length === 0) {
    return (
      <div>
        <div className={ExamsCSS.container}>
          <div className={ExamsCSS.leftElement}>
            <h2>{course.course_name}</h2>
          </div>
          <div className={ExamsCSS.rightElement}>
            <Link to={`/createExam?courseId=${course.course_id}`}>
              <button className={ExamsCSS.gradesButton}>Create Exam</button>
            </Link>
          </div>
        </div>
        <br />
        <br />
        <div>
          <div className={ExamsCSS.customTable}>
            <p>No exams found</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className={ExamsCSS.container}>
        <div className={ExamsCSS.leftElement}>
          <h2>{course.course_name}</h2>
        </div>
        <div className={ExamsCSS.rightElement}>
          <Link to={`/createExam?courseId=${course.course_id}`}>
            <button className={ExamsCSS.gradesButton}>Create Exam</button>
          </Link>
        </div>
      </div>
      <br />
      <br />
      <div>
        <table className={ExamsCSS.customTable}>
          <thead>
            <tr>
              <th>Exams</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.length > 0 ? (
              exams.map((exam) => (
                <tr key={exam.exam_id}>
                  <td>{exam.exam_title}</td>
                  <td>
                    <Link
                      to={`/createExam?courseId=${course.course_id}&examId=${exam.exam_id}`}
                    >
                      <button className={ExamsCSS.customButton}>Edit</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No exams found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Exams
