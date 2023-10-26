import GradesCSS from '@assets/css/Grades.module.css'

const ContactUsResponses = () => {
  return (
    <div>
      <div className={GradesCSS.container}>
        <div className={GradesCSS.leftElement}>
          <h2>Contact Us Responses</h2>
        </div>
      </div>
      <div className={GradesCSS.grades}>
        <table className={GradesCSS.customTable}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Date</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>john@example.com</td>
              <td>2023-09-25</td>
              <td>This is a sample comment.</td>
            </tr>
            <tr>
              <td>jane@example.com</td>
              <td>2023-09-26</td>
              <td>Another sample comment here.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ContactUsResponses
