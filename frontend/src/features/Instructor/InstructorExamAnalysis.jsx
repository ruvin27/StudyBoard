import ReportsCSS from '@assets/css/Reports.module.css'

const InstructorExamAnalysis = () => {
  return (
    <div>
      <div className={ReportsCSS.container}>
        <div className={ReportsCSS.leftElement}>
          <h2>Course Name</h2>
        </div>
      </div>

      <div className={ReportsCSS.tableContainer}>
        <table className={ReportsCSS.table}>
          <tbody>
          <tr>
            <th colSpan="2">Exam Analysis</th>
          </tr>
          <tr>
            <td>Exam 1</td>
            <td>
              <span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span>
            </td>
          </tr>
          <tr>
            <td>Exam 2</td>
            <td>
              <span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span>
            </td>
          </tr>
          <tr>
            <td>Exam 3</td>
            <td>
              <span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span>
            </td>
          </tr>
          <tr>
            <td>Exam 4</td>
            <td>
              <span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span>
            </td>
          </tr>
          <tr>
            <td>Exam 5</td>
            <td>
              <span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span>
            </td>
          </tr>
          </tbody>
        </table>

        <table className={ReportsCSS.table}>
        <tbody>
          <tr>
            <th colSpan="2">Student Reports</th>
          </tr>
          <tr>
            <td>Student 1</td>
            <td>
              <span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span>
            </td>
          </tr>
          <tr>
            <td>Student 2</td>
            <td>
              <span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span>
            </td>
          </tr>
          <tr>
            <td>Student 3</td>
            <td>
              <span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span>
            </td>
          </tr>
          <tr>
            <td>Student 4</td>
            <td>
              <span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span>
            </td>
          </tr>
          <tr>
            <td>Student 5</td>
            <td>
              <span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default InstructorExamAnalysis
