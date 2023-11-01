import InstructorCourseInfoCSS from '@assets/css/CourseInfo.module.css'

import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import * as React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from '@lib/apiClient'
import LoadingSpinner from '@features/LoadingSpinner'
import { toast } from 'sonner'

const InstructorCourseInfo = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  React.useEffect(() => {
    const courseId = searchParams.get('courseId')
    if (!courseId) {
      navigate('/MyCoursesInstructor')
    }
  }, [navigate, searchParams])

  const courseId = searchParams.get('courseId')
  const { data: course, isLoading } = useQuery({
    queryKey: ['course', { courseId }],
    queryFn: async () => {
      const response = await apiClient('/course/getById.php', {
        params: {
          id: courseId,
        },
      })

      return response.data
    },
  })

  const { mutate } = useMutation({
    mutationKey: 'deleteCourse',
    mutationFn: async () => {
      const response = await apiClient.post('/course/remove.php', {
        course_id: courseId,
      })

      return response.data
    },
    onSuccess: () => {
      navigate('/MyCoursesInstructor')
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || 'An unexpected error occurred'
      )
      console.log(error)
    },
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className={InstructorCourseInfoCSS.container}>
        <div className={InstructorCourseInfoCSS.leftElement}>
          <h2>{course.data.course_name}</h2>
        </div>
        <div className={InstructorCourseInfoCSS.rightElement}>
          <Link to={`/people/${courseId}`}>
            <button className={InstructorCourseInfoCSS.button}>People</button>
          </Link>
          <Link to={`/createCourse?courseId=${courseId}`}>
            <button className={InstructorCourseInfoCSS.button}>
              Manage Course
            </button>
          </Link>
          <button
            className={InstructorCourseInfoCSS.button}
            onClick={() => mutate()}
          >
            Remove Course
          </button>
        </div>
      </div>
      <div className={InstructorCourseInfoCSS.courseButton}>
      <Link to="/Syllabus.pdf" target="_blank" >
              <button className={InstructorCourseInfoCSS.button}>Syllabus</button>
            </Link>
        <button className={InstructorCourseInfoCSS.button}>Upload File</button>
        <Link to={`/exams?courseId=${courseId}`}>
          <button className={InstructorCourseInfoCSS.button}>Exams</button>
        </Link>
        <Link to={`/instructorExamAnalysis/${courseId}`}>
          <button className={InstructorCourseInfoCSS.button}>Reports</button>
        </Link>
        <Link to={`/recommendation?courseId=${courseId}`}>
          <button className={InstructorCourseInfoCSS.button}>
            View Recommedations
          </button>
        </Link>
      </div>

      <div className={InstructorCourseInfoCSS.CourseInformation} style={{height: "380px"}}>
        <p>
          <strong>Course Code:</strong> {course.data.course_code}
        </p>
        <p>
          <strong>Course Name:</strong> {course.data.course_name}
        </p>
        <p>
          <strong>Course Instructor:</strong> {course.data.instructor.name}
        </p>
        <p>
          <strong>Course Description:</strong> {course.data.course_description}
        </p>
        <p>
          <strong>Course Start Date:</strong> {course.data.course_start_date}
        </p>
        <p>
          <strong>Course End Date:</strong> {course.data.course_end_date}
        </p>

        <p>
          <strong>Students:</strong> {course.data.students.length}
        </p>
      </div>

    </div>
  )
}
export default InstructorCourseInfo
