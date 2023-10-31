import CreateExamCSS from '@assets/css/CreateExam.module.css'
import LoadingSpinner from '@features/LoadingSpinner'
import { useCourseById } from '@hooks/course/use-courses-by-id'
import { useExamById } from '@hooks/exam/use-courses-by-id'
import { apiClient } from '@lib/apiClient'
import { useMutation } from '@tanstack/react-query'
import * as React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const CreateExam = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  React.useEffect(() => {
    const courseId = searchParams.get('courseId')
    if (!courseId) {
      navigate('/exams')
    }
  }, [navigate, searchParams])

  const courseId = searchParams.get('courseId')
  const examId = searchParams.get('examId')

  const { data: course, isLoading: isCourseLoading } = useCourseById(courseId)
  const { data: exam, isLoading: isExamLoading } = useExamById(examId)

  const { mutate: mutateCreateExam } = useMutation({
    mutationFn: async (data) => {
      return apiClient.post('/exam/create.php', data)
    },
    onSuccess: ({ data }) => {
      toast.success('Exam created successfully')
      navigate(`/CreateQuestions?examId=${data.data}&courseId=${courseId}`)
    },
    onError: () => {
      toast.error('Exam creation failed. Please try again later')
    },
  })

  const { mutate: mutateUpdateExam } = useMutation({
    mutationFn: async (data) => {
      return apiClient.post('/exam/update.php', data)
    },
    onSuccess: () => {
      toast.success('Exam updated successfully')
      navigate(`/CreateQuestions?examId=${examId}&courseId=${courseId}`)
    },
    onError: () => {
      toast.error('Exam update failed. Please try again later.')
    },
  })

  const handleCreate = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const name = formData.get('examName')
    const description = formData.get('examDescription')
    const date = formData.get('examDate')
    const score = formData.get('examScore')
    const duration = formData.get('examDuration')

    const data = {
      exam_title: name,
      exam_date: date,
      exam_description: description,
      exam_score: Number(score),
      course_id: Number(courseId),
      exam_duration: Number(duration),
    }

    mutateCreateExam(data)
  }

  const handleUpdateExam = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const name = formData.get('examName')
    const description = formData.get('examDescription')
    const date = formData.get('examDate')
    const score = formData.get('examScore')
    const duration = formData.get('examDuration')

    const data = {
      exam_id: Number(examId),
      exam_title: name,
      exam_date: date,
      exam_description: description,
      exam_score: Number(score),
      exam_duration: Number(duration),
    }

    mutateUpdateExam(data)
  }

  if (isCourseLoading || isExamLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className={CreateExamCSS.container}>
        <div className={CreateExamCSS.leftElement}>
          <h2>{course.data.course_name}</h2>
        </div>
      </div>
      <div className={CreateExamCSS.examFormContainer}>
        <h3>Create an Exam</h3>
        <form
          id="examForm"
          onSubmit={(e) => {
            if (examId) {
              handleUpdateExam(e)
            } else {
              handleCreate(e)
            }
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <label htmlFor="examName">Exam Name</label>
            <input
              type="text"
              id="examName"
              name="examName"
              defaultValue={exam?.data?.exam_title}
              placeholder="Exam Name"
              required
            />

            <label htmlFor="examDescription">Exam Description</label>
            <textarea
              id="examDescription"
              name="examDescription"
              placeholder="Exam Description"
              defaultValue={exam?.data?.exam_description}
              required
            />

            <label htmlFor="examDate">Exam Date</label>
            <input
              type="date"
              id="examDate"
              name="examDate"
              defaultValue={exam?.data?.exam_date}
              required
            />

            <label htmlFor="examScore">Maximum Score</label>
            <input
              type="number"
              id="examScore"
              name="examScore"
              defaultValue={exam?.data?.exam_score}
              placeholder="Maximum Score"
              min="0"
              required
            />

            <label htmlFor="examDuration">Exam Duration (in minutes)</label>
            <input
              type="number"
              id="examDuration"
              name="examDuration"
              defaultValue={exam?.data?.exam_duration}
              placeholder="Exam Duration (in minutes)"
              min="0"
              required
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            <button type="submit" className={CreateExamCSS.createButton}>
              {examId ? 'Update Exam' : 'Create Exam'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default CreateExam
