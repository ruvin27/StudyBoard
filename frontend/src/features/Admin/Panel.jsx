import PanelCSS from '@assets/css/panel.module.css'
import CoursesImg from '@assets/images/courses.png'
import UserImg from '@assets/images/user.jpg'
import ActivityImg from '@assets/images/activity.jpg'
import { Link } from 'react-router-dom'
import support2Icon from '@assets/images/settings.jpg'

const Panel = () => {
  return (
    <div className={PanelCSS.container}>
      <div className={PanelCSS.card}>
        <Link to={'/allcourses'} className={PanelCSS.cardLink}>
          <img className={PanelCSS.cardImage} src={CoursesImg} alt="" />
          <h3>All Courses</h3>
        </Link>
      </div>
      <div className={PanelCSS.card}>
        <Link to={'/useraccounts'} className={PanelCSS.cardLink}>
          <img className={PanelCSS.cardImage} src={UserImg} alt="" />
          <h3>User Accounts</h3>
        </Link>
      </div>
      <div className={PanelCSS.card}>
        <Link to={'/useractivity'} className={PanelCSS.cardLink}>
          <img className={PanelCSS.cardImage} src={ActivityImg} alt="" />
          <h3>User Activity</h3>
        </Link>
      </div>
      <div className={PanelCSS.card}>
        <Link to={'/settings'} className={PanelCSS.cardLink}>
          <img className={PanelCSS.cardImage} src={support2Icon} alt="Admin Tools" />
          <h3>Website Design and Settings</h3>
        </Link>
      </div>
    </div>
  )
}

export default Panel
