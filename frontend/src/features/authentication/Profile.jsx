import ProfileCSS from '@assets/css/Profile.module.css'
import ProfileImg from '@assets/images/user.jpg'

const Profile = () => {
  return (
    <div>
      <div className={ProfileCSS.container}>
        <div className={ProfileCSS.leftElement}>
          <h2>My Profile</h2>
        </div>
      </div>

      <div className={ProfileCSS.profile}>
        <div className={ProfileCSS.profilePicture}>
          <img src={ProfileImg} alt="User Profile" />
        </div>
        <form action="#" method="post" encType="multipart/form-data">
          <div className={ProfileCSS.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              className={ProfileCSS.profileInput}
              type="text"
              id="name"
              value="Jane Smith"
              name="name"
              placeholder="Your Name"
              required
            />
          </div>
          <div className={ProfileCSS.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              className={ProfileCSS.profileInput}
              type="email"
              id="email"
              value="jane.smith@gmail.com"
              name="email"
              placeholder="Your Email"
              required
              disabled
            />
          </div>
          <div className={ProfileCSS.formGroup}>
            <label htmlFor="profile-picture">Profile Picture:</label>
            <input
              className={ProfileCSS.profileInput}
              type="file"
              id="profile-picture"
              name="profile-picture"
            />
          </div>
          <div className={`${ProfileCSS.formGroup} ${ProfileCSS.btnGroup}`}>
            <button type="button" className={ProfileCSS.submitBtn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
