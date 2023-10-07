import React from "react"
import PeopleCSS from "../../assets/css/NewUser.module.css"

export default function StudentPeople() {
  return (
    <>
      <div className={PeopleCSS.container}>
        <div className={PeopleCSS.leftElement}>
          <h2>Course Name</h2>
        </div>
      </div>

      <div>
        <table className={PeopleCSS.newUsersTable}>
          <thead>
            <tr>   
              <th colspan="3">People</th>
            </tr>
            <tr>
              <th>Role</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Instructor</td>
              <td>Instructor Name</td>
            </tr>
            <tr>
              <td>Student</td>
              <td>Student 1</td>
            </tr>
            <tr>
              <td>Student</td>
              <td>Student 2</td>
            </tr>
            <tr>
              <td>Student</td>
              <td>Student 3</td>
            </tr>
            <tr>
              <td>Student</td>
              <td>Student 4</td>
            </tr>
            <tr>
              <td>Student</td>
              <td>Student 5</td>
            </tr>
            <tr>
              <td>Student</td>
              <td>Student 6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
