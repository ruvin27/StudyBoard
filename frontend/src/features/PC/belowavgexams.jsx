import GradesCSS from '@assets/css/Grades.module.css'

const BelowAverageResults = () => {
  return (
    <div>
      <div className={GradesCSS.container}>
        <div className={GradesCSS.leftElement}>
          <h2>Below Average Results</h2>
        </div>
      </div>
      <div className={GradesCSS.grades}>
        <table className={GradesCSS.customTable}>
          <thead>
            <tr>
              <th>Course</th>
              <th>Exam</th>
              <th>Grade</th>
              <th>QA Officer</th>
              <th>Program Coordinator</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Course 1</td>
              <td>Exam 1</td>
              <td>69%</td>
              <td>
                <button className={GradesCSS.resolveButton}>Resolve</button>
              </td>
              <td>
                <button className={GradesCSS.resolveButton}>Resolve</button>
              </td>
            </tr>
            <tr>
              <td>Course 2</td>
              <td>Exam 2</td>
              <td>65%</td>
              <td>Resolved</td>
              <td>
                <button className={GradesCSS.resolveButton}>Resolve</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BelowAverageResults
