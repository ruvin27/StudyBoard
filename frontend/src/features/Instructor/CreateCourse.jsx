import CreateCourseCSS from '@assets/css/CreateCourse.module.css'
import MyCoursesCSS from '@assets/css/MyCourses.module.css'
import { useAuth } from '@contexts/AuthContext'
import LoadingSpinner from '@features/LoadingSpinner'
import { apiClient } from '@lib/apiClient'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'

const CreateCourse = () => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const courseId = searchParams.get('courseId')

  const { data: course, isLoading: isCourseLoading } = useQuery({
    queryKey: ['course', courseId],
    enabled: !!courseId,
    queryFn: async () => {
      const response = await axios.get(`${LARAVEL_BACKEND_URL}/courses/getCourseById/${courseId}`)
      return response.data
    },
  })

  const { data: objectives, isLoading: isObjectivesLoading } = useQuery({
    queryKey: ['objectives'],
    queryFn: async () => {
      const response = await axios.get(`${LARAVEL_BACKEND_URL}/objectives`)
      return response.data
    },
  })

  const { mutate: mutateCreateCourse } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${LARAVEL_BACKEND_URL}/courses/create`, data)

      return response.data
    },
    onSuccess: () => {
      toast.success('Course created successfully')
      navigate('/mycoursesInstructor')
    },
    onError: () => {
      toast.error('An error occurred')
    },
  })

  const { mutate: mutateUpdateCourse } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${LARAVEL_BACKEND_URL}/courses/update-course`, data)

      return response.data
    },
    onSuccess: () => {
      toast.success('Course updated successfully')
      navigate('/mycoursesInstructor')
    },
    onError: () => {
      toast.error('An error occurred')
    },
  })

  const { user: instructor } = useAuth()

  const handleCreateCourse = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const _data = {
      name: formData.get('courseName'),
      description: formData.get('courseDescription'),
      instructor_id: instructor.userid,
      program_id: 1,
      code: formData.get('courseCode'),
      start_date: formData.get('courseStartDate'),
      end_date: formData.get('courseEndDate'),
      objective: formData.get('programObjective'),
    }

    mutateCreateCourse(_data)
  }

  const handleUpdateCourse = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const _data = {
      course_id: courseId,
      name: formData.get('courseName'),
      description: formData.get('courseDescription'),
      code: formData.get('courseCode'),
      start_date: formData.get('courseStartDate'),
      end_date: formData.get('courseEndDate'),
      objective: formData.get('programObjective'),
    }
    mutateUpdateCourse(_data)
  }

  if (isObjectivesLoading || isCourseLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className={MyCoursesCSS.container}>
        <div className={MyCoursesCSS.leftElement}>
          <h2>{courseId ? 'Update Course' : 'Create Course'}</h2>
        </div>
      </div>
      <div className={CreateCourseCSS.courseFormContainer}>
        <form
          id="courseForm"
          onSubmit={(e) => {
            if (courseId) {
              handleUpdateCourse(e)
            } else {
              handleCreateCourse(e)
            }
          }}
        >
          <label className={CreateCourseCSS.labelClass} htmlFor="courseName">
            Course Name:
          </label>
          <input type="text" id="courseName" name="courseName" defaultValue={course?.data?.course_name} className={CreateCourseCSS.createInput} required />
          <br />
          <br />

          <label className={CreateCourseCSS.labelClass} htmlFor="courseDescription">
            Description:
          </label>
          <input type="text" id="courseDescription" name="courseDescription" defaultValue={course?.data?.course_description} className={CreateCourseCSS.createInput} required />
          <br />
          <br />

          <label className={CreateCourseCSS.labelClass} htmlFor="courseCode">
            Course Code:
          </label>
          <input type="text" id="courseCode" name="courseCode" defaultValue={course?.data?.course_code} className={CreateCourseCSS.createInput} required />
          <br />
          <br />

          <label className={CreateCourseCSS.labelClass} htmlFor="courseStartDate">
            Start Date:
          </label>
          <input type="date" id="courseStartDate" name="courseStartDate" defaultValue={course?.data?.course_start_date} className={CreateCourseCSS.createInput} required />
          <br />
          <br />

          <label className={CreateCourseCSS.labelClass} htmlFor="courseEndDate">
            End Date:
          </label>
          <input type="date" id="courseEndDate" name="courseEndDate" defaultValue={course?.data?.course_end_date} className={CreateCourseCSS.createInput} required />
          <br />
          <br />

          <label className={CreateCourseCSS.labelClass} htmlFor="programObjective">
            Program Objective:
          </label>
          <select id="programObjective" name="programObjective" defaultValue={course?.data?.course_objective} className={CreateCourseCSS.programObjective} required>
            {objectives.data?.map((objective) => (
              <option key={objective.objective_id} value={objective.objective}>
                {objective.objective}
              </option>
            ))}
          </select>
          <br />
          <br />

          <button type="submit" className={CreateCourseCSS.submitBtn}>
            {courseId ? 'Update Course' : 'Create Course'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateCourse
