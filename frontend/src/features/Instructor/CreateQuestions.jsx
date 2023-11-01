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

  const [isFetched, setIsFetched] = React.useState(false)
  const [questions, setQuestions] = React.useState([])

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

  const handleSaveExam = () => {
    console.log('Save exam')
    // check if all questions are filled
    const isAllQuestionsFilled = questions.every((q) => {
      return q.question && q.mcq1 && q.mcq2 && q.mcq3 && q.mcq4 && q.answer
    })

    if (!isAllQuestionsFilled) {
      return toast.error('Please fill all questions')
    }

    // remove question_id from questions
    const questionsWithoutId = questions.map((q) => {
      const { question_id, ...rest } = q
      return rest
    })

    mutateCreateQuestions({
      exam_id: examId,
      questions: questionsWithoutId,
    })
  }

  React.useEffect(() => {
    if (isLoading || isFetched) return

    if (!exam.data?.questions) return

    setQuestions(exam.data.questions)
    setIsFetched(true)
  }, [exam, isFetched, isLoading])

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

        {questions.map((question, index) => (
          <QuestionBox key={index} question={question} setQuestions={setQuestions} />
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
          gap: '1rem',
        }}
      >
        <button
          className={CreateExamCSS.button}
          onClick={() => {
            setQuestions((prevQuestions) => {
              return [
                ...prevQuestions,
                {
                  question_id: '',
                  question: '',
                  mcq1: '',
                  mcq2: '',
                  mcq3: '',
                  mcq4: '',
                  answer: '',
                },
              ]
            })
          }}
        >
          Add question
        </button>
        <button className={CreateExamCSS.button} onClick={handleSaveExam}>
          Save exam
        </button>
      </div>
    </div>
  )
}

function QuestionBox({ question, setQuestions }) {
  const handleUpdateQuestion = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const updatedQuestion = {
      ...question,
      question: formData.get('questionText'),
      mcq1: formData.get('option1'),
      mcq2: formData.get('option2'),
      mcq3: formData.get('option3'),
      mcq4: formData.get('option4'),
      answer: formData.get('correctAnswer'),
    }

    const curAnswerNumber = parseInt(updatedQuestion.answer)

    if (curAnswerNumber === 1) {
      updatedQuestion.answer = updatedQuestion.mcq1
    } else if (curAnswerNumber === 2) {
      updatedQuestion.answer = updatedQuestion.mcq2
    }
    if (curAnswerNumber === 3) {
      updatedQuestion.answer = updatedQuestion.mcq3
    }
    if (curAnswerNumber === 4) {
      updatedQuestion.answer = updatedQuestion.mcq4
    }

    setQuestions((prevQuestions) => {
      return prevQuestions.map((q) => (q.question_id === question.question_id ? updatedQuestion : q))
    })
  }

  return (
    <form id="questionForm" onSubmit={handleUpdateQuestion}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <label htmlFor="questionText">Question</label>
        <textarea id="questionText" name="questionText" defaultValue={question.question} rows="4" required></textarea>

        <label htmlFor="option1">Option 1</label>
        <input type="text" name="option1" defaultValue={question.mcq1} required />

        <label htmlFor="option2">Option 2</label>
        <input type="text" name="option2" defaultValue={question.mcq2} required />

        <label htmlFor="option3">Option 3</label>
        <input type="text" name="option3" defaultValue={question.mcq3} required />

        <label htmlFor="option4">Option 4</label>
        <input type="text" name="option4" defaultValue={question.mcq4} required />

        <label htmlFor="correctAnswer">Correct Answer</label>
        <select name="correctAnswer" required defaultValue={question.answer?.slice(-1)}>
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
          gap: '1rem',
        }}
      >
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            setQuestions((prevQuestions) => {
              if (prevQuestions.length === 1) {
                toast.error('You must have at least one question')
                return prevQuestions
              }

              return prevQuestions.filter((q) => q.question_id !== question.question_id)
            })
          }}
        >
          Remove
        </button>
      </div>
    </form>
  )
}

export default CreateQuestions
