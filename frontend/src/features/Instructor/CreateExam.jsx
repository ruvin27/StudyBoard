import CreateExamCSS from '@assets/css/CreateExam.module.css'
import LoadingSpinner from '@features/LoadingSpinner'
import { useCourseById } from '@hooks/course/use-courses-by-id'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const CreateExam = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const courseId = searchParams.get('courseId')
    if (!courseId) {
      navigate('/exams')
    }
  }, [navigate, searchParams])

  const courseId = searchParams.get('courseId')
  const { data: course, isLoading } = useCourseById(courseId)

  if (isLoading) {
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
        <form id="examForm">
          <label htmlFor="examName">Exam Name:</label>
          <input type="text" id="examName" name="examName" required />
          <br />
          <br />

          <label htmlFor="examDate">Exam Date:</label>
          <input type="date" id="examDate" name="examDate" required />
          <br />
          <br />

          <label htmlFor="examScore">Maximum Score:</label>
          <input type="number" id="examScore" name="examScore" required />
          <br />
          <br />

          <label htmlFor="examTime">Exam Duration (in minutes):</label>
          <input type="number" id="examTime" name="examTime" required />
          <br />
          <br />
        </form>
      </div>

      <div className={CreateExamCSS.questionFormContainer}>
        <h3>Add a Question</h3>
        <form id="questionForm">
          <label htmlFor="questionText">Question:</label>
          <textarea
            id="questionText"
            name="questionText"
            rows="4"
            required
          ></textarea>
          <br />
          <br />

          <label htmlFor="option1">Option 1:</label>
          <input type="text" id="option1" name="option1" required />
          <br />
          <br />

          <label htmlFor="option2">Option 2:</label>
          <input type="text" id="option2" name="option2" required />
          <br />
          <br />

          <label htmlFor="option3">Option 3:</label>
          <input type="text" id="option3" name="option3" required />
          <br />
          <br />

          <label htmlFor="option4">Option 4:</label>
          <input type="text" id="option4" name="option4" required />
          <br />
          <br />

          <label htmlFor="correctAnswer">Correct Answer (1-4):</label>
          <select id="correctAnswer" name="correctAnswer" required>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
          </select>
          <br />
          <br />

          <button type="button">Add Question</button>
        </form>
      </div>

      <div className={CreateExamCSS.create}>
        <button className={CreateExamCSS.createButton}>Create Exam</button>
      </div>
    </div>
  )
}
export default CreateExam
