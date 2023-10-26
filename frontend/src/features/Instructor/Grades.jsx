import GradesCSS from '@assets/css/Grades.module.css'

const Grades = () => {
  return (
    <div>
      <div className={GradesCSS.container}>
        <div className={GradesCSS.leftElement}>
          <h2>Course 1 - Exam 1</h2>
        </div>
      </div>
      <div className={GradesCSS.Grades}>
        <table className={GradesCSS.customTable}>
          <thead>
            <tr>
              <th>Student</th>
              <th>Grades</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Student 1</td>
              <td>
                <input type="text" value="86%" />
              </td>
              <td>
                <input type="text" value="NA" />
              </td>
            </tr>
            <tr>
              <td>Student 2</td>
              <td>
                <input type="text" value="95%" />
              </td>
              <td>
                <input type="text" value="Great Work" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={GradesCSS.release}>
        <button className={GradesCSS.gradesButton}>Release Grades</button>
      </div>
    </div>
  )
}

export default Grades
