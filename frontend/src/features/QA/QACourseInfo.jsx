import CourseInfoCSS from '@assets/css/CourseInfo.module.css'
import { Link } from 'react-router-dom'

const CourseInfoQA = () => {
  return (
    <div>
      <div className={CourseInfoCSS.container}>
        <div className={CourseInfoCSS.leftElement}>
          <h2>Course Title-1</h2>
        </div>
        <div className={CourseInfoCSS.rightElement}>
          <Link to={'/people'}>
            <button className={CourseInfoCSS.button}>People</button>
          </Link>
        </div>
      </div>
      <div className={CourseInfoCSS.courseButton}>
        <button className={CourseInfoCSS.button}>Syllabus</button>
        <Link to={'/qaexamanalysis'}>
          <button className={CourseInfoCSS.button}>Reports</button>
        </Link>
        <Link to={'/sendrecommendationsqa'}>
          <button className={CourseInfoCSS.button}>Send Recommendation</button>
        </Link>
      </div>
      <div className={CourseInfoCSS.CourseInformation}>
        <p>Detailed information about Course-1</p>
      </div>
      <div className={CourseInfoCSS.CourseInformation}>
        <p>Comments and Discussion</p>
      </div>
    </div>
  )
}

export default CourseInfoQA
