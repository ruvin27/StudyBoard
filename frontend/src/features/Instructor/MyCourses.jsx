import myCoursesCSS from '@assets/css/MyCourses.module.css'
import { Link } from 'react-router-dom'
const MyCourses = () => {
  return (
    <div>
      <div className={myCoursesCSS.container}>
        <div className={myCoursesCSS.leftElement}>
          <h2>My Courses</h2>
        </div>
        <div className={myCoursesCSS.rightElement}>
          <Link to="/createCourse">
            <button className={myCoursesCSS.mycoursesButton}>
              Create Course
            </button>
          </Link>
          <Link to="/">
            <button className={myCoursesCSS.mycoursesButton}>
              Program Details
            </button>
          </Link>
        </div>
      </div>
      <div className={myCoursesCSS.courses}>
        <Link to="/InstructorCourseInfo">
          <div className={myCoursesCSS.courseCard}>
            <div className={myCoursesCSS.courseInfo}>
              <h2 className={myCoursesCSS.courseTitle}>Course Title 1</h2>
              <p className={myCoursesCSS.courseDescription}>
                This is a brief description of the first course.
              </p>
              <div className={myCoursesCSS.courseMeta}>
                <p className={myCoursesCSS.courseInstructor}>
                  Instructor: John Doe
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/InstructorCourseInfo">
          <div className={myCoursesCSS.courseCard}>
            <div className={myCoursesCSS.courseInfo}>
              <h2 className={myCoursesCSS.courseTitle}>Course Title 2</h2>
              <p className={myCoursesCSS.courseDescription}>
                This is a brief description of the second course.
              </p>
              <div className={myCoursesCSS.courseMeta}>
                <p className={myCoursesCSS.courseInstructor}>
                  Instructor: Jane Smith
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/InstructorCourseInfo">
          <div className={myCoursesCSS.courseCard}>
            <div className={myCoursesCSS.courseInfo}>
              <h2 className={myCoursesCSS.courseTitle}>Course Title 3</h2>
              <p className={myCoursesCSS.courseDescription}>
                This is a brief description of the second course.
              </p>
              <div className={myCoursesCSS.courseMeta}>
                <p className={myCoursesCSS.courseInstructor}>
                  Instructor: Jane Smith
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/InstructorCourseInfo">
          <div className={myCoursesCSS.courseCard}>
            <div className={myCoursesCSS.courseInfo}>
              <h2 className={myCoursesCSS.courseTitle}>Course Title 4</h2>
              <p className={myCoursesCSS.courseDescription}>
                This is a brief description of the second course.
              </p>
              <div className={myCoursesCSS.courseMeta}>
                <p className={myCoursesCSS.courseInstructor}>
                  Instructor: Jane Smith
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/InstructorCourseInfo">
          <div className={myCoursesCSS.courseCard}>
            <div className={myCoursesCSS.courseInfo}>
              <h2 className={myCoursesCSS.courseTitle}>Course Title 5</h2>
              <p className={myCoursesCSS.courseDescription}>
                This is a brief description of the second course.
              </p>
              <div className={myCoursesCSS.courseMeta}>
                <p className={myCoursesCSS.courseInstructor}>
                  Instructor: Jane Smith
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
export default MyCourses
