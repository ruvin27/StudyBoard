import PeopleCSS from '@assets/css/NewUser.module.css'
const People = () => {
  return (
    <div>
      <div className={PeopleCSS.container}>
        <div className={PeopleCSS.leftElement}>
          <h2>Course Name</h2>
        </div>
      </div>

      <div>
        <table className={PeopleCSS.people_list_table}>
          <thead>
            <tr>
              <th colSpan="3">People</th>
            </tr>
            <tr>
              <th>Role</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Instructor</td>
              <td>Instructor Name</td>

              <td></td>
            </tr>
            <tr>
              <td>Student</td>
              <td>Student 1</td>

              <td>
                <button className={PeopleCSS.removeButton}>
                  Remove from this course
                </button>
              </td>
            </tr>
            <tr>
              <td>Student</td>
              <td>Student 2</td>

              <td>
                <button className={PeopleCSS.removeButton}>
                  Remove from this course
                </button>
              </td>
            </tr>
            <tr>
              <td>Student</td>
              <td>Student 3</td>
              <td>
                <button className={PeopleCSS.removeButton}>
                  Remove from this course
                </button>
              </td>
            </tr>
            <tr>
              <td>Student</td>
              <td>Student 4</td>
              <td>
                <button className={PeopleCSS.removeButton}>
                  Remove from this course
                </button>
              </td>
            </tr>
            <tr>
              <td>Student</td>
              <td>Student 5</td>
              <td>
                <button className={PeopleCSS.removeButton}>
                  Remove from this course
                </button>
              </td>
            </tr>
            <tr>
              <td>Student</td>
              <td>Student 6</td>
              <td>
                <button className={PeopleCSS.removeButton}>
                  Remove from this course
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default People
