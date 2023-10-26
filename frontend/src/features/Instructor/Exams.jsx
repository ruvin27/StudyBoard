import { Link } from 'react-router-dom'
import ExamsCSS from '@assets/css/Exams.module.css'
import { useExamsByInstructor } from '@hooks/exam'
import { useAuth } from '@contexts/AuthContext'
import LoadingSpinner from '@features/LoadingSpinner'

const Exams = () => {
  const { user } = useAuth()
  const { data: courses, isLoading } = useExamsByInstructor(user.userid)

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      {courses.data.map((course) => (
        <div key={course.course_id}>
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
                {course.exams.length > 0 ? (
                  course.exams.map((exam) => (
                    <tr key={exam.exam_id}>
                      <td>{exam.exam_title}</td>
                      <td>
                        <Link to="/createExam">
                          <button className={ExamsCSS.customButton}>
                            Edit
                          </button>
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
      ))}
    </div>
  )
}

export default Exams
