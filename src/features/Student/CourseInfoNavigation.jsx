import React from "react"
import CouseInfoCSS from "../../assets/css/CourseInfo.module.css"
import { Link } from "react-router-dom"

export default function StudentCouseInfoNavigation() {
  return (
    <>
      <div className={CouseInfoCSS.container}>
        <div className={CouseInfoCSS.leftElement}>
          <h2>Course Title-1</h2>
        </div>
        <div className={CouseInfoCSS.rightElement}>
          <Link to="/people">
            <button className={CouseInfoCSS.button}>People</button>
          </Link>
        </div>
      </div>
      <div className={CouseInfoCSS.coursesButton}>
        <button className={CouseInfoCSS.button}>Syllabus</button>
        <Link to="/student-exams">
          <button className={CouseInfoCSS.button}>Exams</button>
        </Link>
        <Link to="/student-grades">
          <button className={CouseInfoCSS.button}>Grades</button>
        </Link>
      </div>

      <div className={CouseInfoCSS.CourseInformation}>
        <p>Detailed information about Course-1</p>
      </div>
      <div className={CouseInfoCSS.CourseInformation}>
        <p>comments and Discussion</p>
      </div>
    </>
  )
}
