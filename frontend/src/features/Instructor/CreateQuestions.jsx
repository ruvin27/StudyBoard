import CreateExamCSS from '@assets/css/CreateExam.module.css'
import LoadingSpinner from '@features/LoadingSpinner'
import { useExamById } from '@hooks/exam/use-courses-by-id'
import { apiClient } from '@lib/apiClient'
import { useMutation } from '@tanstack/react-query'
import * as React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const CreateQuestions = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  React.useEffect(() => {
    const examId = searchParams.get('examId')
    const courseId = searchParams.get('courseId')
    if (!courseId) {
      return navigate('/MyCoursesInstructor')
    }

    if (!examId) {
      navigate('/exams?courseId=' + courseId)
    }
  }, [navigate, searchParams])

  const courseId = searchParams.get('courseId')
  const examId = searchParams.get('examId')
  const { data: exam, isLoading } = useExamById(examId)

  const { mutate: mutateCreateQuestions } = useMutation({
    mutationFn: async (data) => {
      return apiClient.post('/exam/createQuestions.php', data)
    },
    onSuccess: () => {
      toast.success('Questions added successfully')
      navigate('/exams?courseId=' + courseId)
    },
    onError: () => {
      toast.error("Couldn't create questions")
    },
  })

  // const { mutate: mutateUpdateQuestions } = useMutation({
  //   mutationFn: async (data) => {
  //     return apiClient.post('/exam/updateQuestion.php', data)
  //   },
  //   onSuccess: () => {
  //     toast.success('Question updated successfully')
  //     navigate('/exams')
  //   },
  //   onError: () => {
  //     toast.error("Couldn't update question")
  //   },
  // })

  const handleAddQuestion = (e) => {
    console.log('handleAddQuestion')
    e.preventDefault()
    const formData = new FormData(e.target)

    const question = formData.get('questionText')
    const mcq1 = formData.get('option1')
    const mcq2 = formData.get('option2')
    const mcq3 = formData.get('option3')
    const mcq4 = formData.get('option4')
    const answer = formData.get('correctAnswer')

    const correctOptionNumber = parseInt(answer)
    let _answer = mcq1
    switch (correctOptionNumber) {
      case 1:
        _answer = mcq1
        break
      case 2:
        _answer = mcq2
        break
      case 3:
        _answer = mcq3
        break
      case 4:
        _answer = mcq4
        break
      default:
        _answer = mcq1
    }

    const newQuestion = {
      question,
      mcq1,
      mcq2,
      mcq3,
      mcq4,
      answer: _answer,
    }

    mutateCreateQuestions({
      exam_id: examId,
      questions: [newQuestion],
    })
  }

  const handleUpdateQuestion = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const question = formData.get('questionText')
    const mcq1 = formData.get('option1')
    const mcq2 = formData.get('option2')
    const mcq3 = formData.get('option3')
    const mcq4 = formData.get('option4')
    const answer = formData.get('correctAnswer')

    const correctOptionNumber = parseInt(answer)
    let _answer = mcq1
    switch (correctOptionNumber) {
      case 1:
        _answer = mcq1
        break
      case 2:
        _answer = mcq2
        break
      case 3:
        _answer = mcq3
        break
      case 4:
        _answer = mcq4
        break
      default:
        _answer = mcq1
    }

    const newQuestion = {
      question,
      mcq1,
      mcq2,
      mcq3,
      mcq4,
      answer: _answer,
    }

    mutateCreateQuestions({
      exam_id: examId,
      questions: [newQuestion],
    })
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className={CreateExamCSS.container}>
        <div className={CreateExamCSS.leftElement}>
          <h2>{exam.data.exam_title}</h2>
        </div>
      </div>

      <div className={CreateExamCSS.questionFormContainer}>
        <h3>Question</h3>
        <form
          id="questionForm"
          onSubmit={(e) => {
            if (exam.data?.questions[0]?.question) {
              handleUpdateQuestion(e)
            } else {
              handleAddQuestion(e)
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
            <label htmlFor="questionText">Question</label>
            <textarea
              id="questionText"
              name="questionText"
              defaultValue={exam.data?.questions[0]?.question}
              rows="4"
              required
            ></textarea>

            <label htmlFor="option1">Option 1</label>
            <input
              type="text"
              name="option1"
              defaultValue={exam.data?.questions[0]?.mcq1}
              required
            />

            <label htmlFor="option2">Option 2</label>
            <input
              type="text"
              name="option2"
              defaultValue={exam.data?.questions[0]?.mcq2}
              required
            />

            <label htmlFor="option3">Option 3</label>
            <input
              type="text"
              name="option3"
              defaultValue={exam.data?.questions[0]?.mcq3}
              required
            />

            <label htmlFor="option4">Option 4</label>
            <input
              type="text"
              name="option4"
              defaultValue={exam.data?.questions[0]?.mcq4}
              required
            />

            <label htmlFor="correctAnswer">Correct Answer</label>
            <select
              name="correctAnswer "
              required
              defaultValue={exam.data?.questions[0]?.answer?.slice(-1)}
            >
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
              <option value="4">Option 4</option>
            </select>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            <button type="submit">
              {exam.data?.questions[0]?.question ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default CreateQuestions
