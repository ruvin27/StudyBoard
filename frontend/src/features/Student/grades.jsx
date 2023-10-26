import GradesCSS from '@assets/css/Grades.module.css'

export default function StudentGrades() {
  return (
    <>
      <div className={GradesCSS.container}>
        <div className={GradesCSS.leftElement}>
          <h2>Course 1</h2>
        </div>
        <div className={GradesCSS.rightElement}>
          <h2>Overall Score : 82%</h2>
        </div>
      </div>
      <div className={GradesCSS.grades}>
        <table className={GradesCSS.customTable}>
          <thead>
            <tr>
              <th>Exam</th>
              <th>Grades</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Exam 1</td>
              <td>69%</td>
              <td>Study Harder</td>
            </tr>
            <tr>
              <td>Exam 2</td>
              <td>95%</td>
              <td>Great Work</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={GradesCSS.reports}>
        <button className={GradesCSS.pdfButton}>Download PDF</button>
      </div>
    </>
  )
}
