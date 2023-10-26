import ServicesCSS from '@assets/css/services.module.css'
import analyticsIcon from '@assets/images/service images/icons8-analytics-48.png'
import examIcon from '@assets/images/service images/icons8-exam-94.png'
import forumIcon from '@assets/images/service images/icons8-forum-48.png'
import parcelIcon from '@assets/images/service images/icons8-parcel-64.png'
import profilesIcon from '@assets/images/service images/icons8-profiles-40.png'
import reportCardIcon from '@assets/images/service images/icons8-report-card-48.png'
import support1Icon from '@assets/images/service images/icons8-support-50 (1).png'
import support2Icon from '@assets/images/service images/icons8-support-50.png'

const Services = () => {
  return (
    <div>
      <div className={ServicesCSS.serviceHeaderContainer}>
        <h2 className={ServicesCSS.serviceHeader}>Services</h2>
      </div>
      <div className={ServicesCSS.serviceCardContainer}>
        <div className={ServicesCSS.serviceCard}>
          <img src={examIcon} alt="Examination" />
          <h2>Examination</h2>
        </div>
        <div className={ServicesCSS.serviceCard}>
          <img src={parcelIcon} alt="Content Delivery" />
          <h2>Content Delivery</h2>
        </div>
        <div className={ServicesCSS.serviceCard}>
          <img src={forumIcon} alt="Discussion Forum" />
          <h2>Discussion Forum</h2>
        </div>
        <div className={ServicesCSS.serviceCard}>
          <img src={reportCardIcon} alt="Grading" />
          <h2>Grading</h2>
        </div>
        <div className={ServicesCSS.serviceCard}>
          <img src={analyticsIcon} alt="Course Analytics" />
          <h2>Course Analytics</h2>
        </div>
        <div className={ServicesCSS.serviceCard}>
          <img src={support1Icon} alt="Feedback and Support" />
          <h2>Feedback and Support</h2>
        </div>
        <div className={ServicesCSS.serviceCard}>
          <img src={support2Icon} alt="Admin Tools" />
          <h2>Admin Tools</h2>
        </div>
        <div className={ServicesCSS.serviceCard}>
          <img src={profilesIcon} alt="User Profiles" />
          <h2>User Profiles</h2>
        </div>
      </div>
      <p className={ServicesCSS.attribution}>
        Icons by{' '}
        <a target="_blank" href="https://icons8.com" rel="noreferrer">
          Icons8
        </a>
      </p>
    </div>
  )
}

export default Services
