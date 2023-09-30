import React from 'react'
import PanelCSS from '../../assets/css/panel.module.css'
import CoursesImg from '../../assets/images/courses.png'
import UserImg from '../../assets/images/user.jpg'
import ActivityImg from '../../assets/images/activity.jpg'

const Panel = () => {
    return ( 
        <div className={PanelCSS.container}>
			<div className={PanelCSS.card}>
				<a href="../Student/allcourses.html" className={PanelCSS.cardLink}>
				<img className={PanelCSS.cardImage} src={CoursesImg} alt="" />
				<h3>All Courses</h3></a>
			</div>
			<div className={PanelCSS.card}>
				<a href=".\userAccounts.html" className={PanelCSS.cardLink}>
					<img className={PanelCSS.cardImage} src={UserImg} alt="" />
					<h3>User Accounts</h3>
				</a>
			</div>
			<div className={PanelCSS.card}>
				<a href=".\useractivity.html" className={PanelCSS.cardLink}>
					<img className={PanelCSS.cardImage} src={ActivityImg} alt="" />
					<h3>User Activity</h3>
				</a>
			</div>
		</div>
     );
}
 
export default Panel;