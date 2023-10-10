import React from "react"
import StudentAllCoursesCSS from "../../assets/css/courses.module.css"
import { Link } from "react-router-dom"

export default function AllStudentCourses() {
  return (
    <>
      <div className={StudentAllCoursesCSS.container}>
        <div className={StudentAllCoursesCSS.lefElement}>
          <h2>All Courses</h2>
        </div>
        <div className={StudentAllCoursesCSS.rightElement}>
          <Link to="/student-myCourses">
            <button className={StudentAllCoursesCSS.mycoursesButton}>
              My Courses
            </button>
          </Link>
        </div>
      </div>
      <section className={StudentAllCoursesCSS.content}>
        <div className={StudentAllCoursesCSS.left}>
          <div className={StudentAllCoursesCSS.card}>
            <h2>Courses</h2>
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Instructor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Introduction to Data Science</td>
                  <td>Prof. John Smith</td>
                </tr>
                <tr>
                  <td>Data Analysis with Python</td>
                  <td>Dr. Emily Johnson</td>
                </tr>
                <tr>
                  <td>Machine Learning Fundamentals</td>
                  <td>Prof. Michael Davis</td>
                </tr>
                <tr>
                  <td>Big Data Analytics</td>
                  <td>Dr. Sarah Wilson</td>
                </tr>
                <tr>
                  <td>Deep Learning and Neural Networks</td>
                  <td>Prof. David Brown</td>
                </tr>
                <tr>
                  <td>Statistical Analysis for Data Science</td>
                  <td>Dr. Lisa Anderson</td>
                </tr>
                <tr>
                  <td>Data Visualization Techniques</td>
                  <td>Prof. Maria Garcia</td>
                </tr>
                <tr>
                  <td>Natural Language Processing</td>
                  <td>Dr. Robert Taylor</td>
                </tr>
                <tr>
                  <td>Time Series Analysis</td>
                  <td>Prof. Jennifer Lee</td>
                </tr>
                <tr>
                  <td>Advanced Data Science Projects</td>
                  <td>Dr. Daniel Wilson</td>
                </tr>
                <tr>
                  <td>AI Ethics and Responsible AI</td>
                  <td>Prof. Elizabeth Adams</td>
                </tr>
                <tr>
                  <td>Data Science Capstone</td>
                  <td>Dr. Richard Johnson</td>
                </tr>
                <tr>
                  <td>Natural Language Processing</td>
                  <td>Prof. Susan Miller</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={StudentAllCoursesCSS.right}>
          <div
            className={`${StudentAllCoursesCSS.card} ${StudentAllCoursesCSS.objectives}`}
          >
            <h2>Program Objectives</h2>
            <div className={StudentAllCoursesCSS.objectiveItem}>
              <strong>Objective 1:</strong>
              <p>
                Develop a strong foundation in data analysis and statistical
                techniques.
              </p>
            </div>
            <div className={StudentAllCoursesCSS.objectiveItem}>
              <strong>Objective 2:</strong>
              <p>
                Master machine learning algorithms and their applications in
                real-world scenarios.
              </p>
            </div>
            <div className={StudentAllCoursesCSS.objectiveItem}>
              <strong>Objective 3:</strong>
              <p>
                Gain expertise in data visualization and storytelling with data.
              </p>
            </div>
            <div className={StudentAllCoursesCSS.objectiveItem}>
              <strong>Objective 4:</strong>
              <p>
                Understand the ethical considerations and responsible use of
                data science tools.
              </p>
            </div>
            <div className={StudentAllCoursesCSS.objectiveItem}>
              <strong>Objective 5:</strong>
              <p>
                Complete a comprehensive data science project from data
                collection to analysis.
              </p>
            </div>
          </div>
        
        </div>
      </section>
    </>
  )
}
