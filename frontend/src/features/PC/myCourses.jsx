import MyCoursesCSS from '@assets/css/MyCourses.module.css'
import { Link } from 'react-router-dom'

const MyCoursesPc = () => {
  return (
    <div>
      <div className={MyCoursesCSS.container}>
        <div className={MyCoursesCSS.leftElement}>
          <h2>My Courses</h2>
        </div>
        <div className={MyCoursesCSS.rightElement}>
          <Link to={'/contactusresponses'}>
            <button className={MyCoursesCSS.mycoursesButton}>
              Contact Responses
            </button>
          </Link>
          <Link to={'/belowavgexams'}>
            <button className={MyCoursesCSS.mycoursesButton}>
              Below Average Results
            </button>
          </Link>
          <Link to={'/'}>
            <button className={MyCoursesCSS.mycoursesButton}>
              Program Details
            </button>
          </Link>
        </div>
      </div>
      <div className={MyCoursesCSS.courses}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Link to={'/PCCourseInfo'} key={index}>
            <div className={MyCoursesCSS.courseCard}>
              <div className={MyCoursesCSS.courseInfo}>
                <h2 className={MyCoursesCSS.courseTitle}>
                  Course Title {index + 1}
                </h2>
                <p className={MyCoursesCSS.courseDescription}>
                  This is a brief description of the {index + 1} course.
                </p>
                <div className={MyCoursesCSS.courseMeta}>
                  <p className={MyCoursesCSS.courseInstructor}>
                    Instructor: Jane Smith
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MyCoursesPc
