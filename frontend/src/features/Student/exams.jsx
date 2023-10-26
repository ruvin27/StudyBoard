import ExamsCSS from '@assets/css/Exams.module.css'
import { Link } from 'react-router-dom'

export default function StudentExams() {
  return (
    <div>
      <div className={ExamsCSS.container}>
        <div className={ExamsCSS.leftElement}>
          <h2>Course 1</h2>
        </div>
      </div>
      <br />
      <br />
      <div>
        <table className={ExamsCSS.customTable}>
          <thead>
            <tr>
              <th>Upcoming Exams</th>
              <th>Take Exam</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Exam 4</td>
              <td>
                <Link to="/takeExam">
                  <button className={ExamsCSS.customButton}>Take Exam</button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>Exam 5</td>
              <td>
                <Link to="/takeExam">
                  <button className={ExamsCSS.customButton}>Take Exam</button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>Exam 6</td>
              <td>
                <Link to="/takeExam">
                  <button className={ExamsCSS.customButton}>Take Exam</button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table className={ExamsCSS.customTable}>
          <thead>
            <tr>
              <th>Upcoming Exams</th>
              <th>Grades</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Exam 1</td>
              <td>
                <h3>69%</h3>
              </td>
            </tr>
            <tr>
              <td>Exam 2</td>
              <td>
                <h3>95%</h3>
              </td>
            </tr>
            <tr>
              <td>Exam 3</td>
              <td>
                <h3>90%</h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
