import React from "react"
import MyCoursesCSS from "../../assets/css/MyCourses.module.css"
import { Link } from "react-router-dom"

export default function StudentMyCourses() {
  return (
    <>
      <div className={MyCoursesCSS.container}>
        <div className={MyCoursesCSS.leftElement}>
          <h2>My Courses</h2>
        </div>
        <div className={MyCoursesCSS.rightElement}>
          <Link to="../info/program">
            <button className={MyCoursesCSS.mycoursesButton}>
              Program Details
            </button>
          </Link>
        </div>
      </div>
      <div className={MyCoursesCSS.courses}>
        <Link to="/CourseInfoNavigation">
          <div className={MyCoursesCSS.courseCard}>
            <div className={MyCoursesCSS.courseInfo}>
              <h2 className={MyCoursesCSS.courseTitle}>Course Title 1</h2>
              <p className={MyCoursesCSS.courseDescription}>
                This is a brief description of the first course.
              </p>
              <div className={MyCoursesCSS.courseMeta}>
                <p className={MyCoursesCSS.courseInstructor}>
                  Instructor: John Do
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/CourseInfoNavigation">
          <div className={MyCoursesCSS.courseCard}>
            <div className={MyCoursesCSS.courseInfo}>
              <h2 className={MyCoursesCSS.courseTitle}>Course Title 2</h2>
              <p className={MyCoursesCSS.courseDescription}>
                This is a brief description of the second course.
              </p>
              <div className={MyCoursesCSS.courseMeta}>
                <p className={MyCoursesCSS.courseInstructor}>
                  Instructor: Jane Smith
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/CourseInfoNavigation">
          <div className={MyCoursesCSS.courseCard}>
            <div className={MyCoursesCSS.courseInfo}>
              <h2 className={MyCoursesCSS.courseTitle}>Course Title 3</h2>
              <p className={MyCoursesCSS.courseDescription}>
                This is a brief description of the second course.
              </p>
              <div className={MyCoursesCSS.courseMeta}>
                <p className={MyCoursesCSS.courseInstructor}>
                  Instructor: Jane Smith
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/CourseInfoNavigation">
          <div className={MyCoursesCSS.courseCard}>
            <div className={MyCoursesCSS.courseInfo}>
              <h2 className={MyCoursesCSS.courseTitle}>Course Title 4</h2>
              <p className={MyCoursesCSS.courseDescription}>
                This is a brief description of the second course.
              </p>
              <div className={MyCoursesCSS.courseMeta}>
                <p className={MyCoursesCSS.courseInstructor}>
                  Instructor: Jane Smith
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/CourseInfoNavigation">
          <div className={MyCoursesCSS.courseCard}>
            <div>
              <h2 className={MyCoursesCSS.courseTitle}>Course Title 5</h2>
              <p className={MyCoursesCSS.courseDescription}>
                This is a brief description of the second course.
              </p>
              <div className={MyCoursesCSS.courseMeta}>
                <p className={MyCoursesCSS.courseInstructor}>
                  Instructor: Jane Smith
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
