import AuthCSS from '@assets/css/auth.module.css'
import { useAuth } from '@contexts/AuthContext'
import { apiClient } from '@lib/apiClient'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Verification = () => {
  const [otp, setOtp] = useState('')
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'otp') {
      setOtp(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await apiClient
      .post(`/authentication/verifyotp.php`, {
        email: user.email,
        otp: otp,
      })
      .then(async (res) => {
        if (res.data === 'Incorrect OTP') {
          alert('Incorrect OTP')
        } else if (res.data === 'Failed to update email verification status') {
          alert('Failed to update email verification status')
        } else {
          const userData = {
            ...user,
            email_verified_at	: true
          }
          login(userData);
          if(user.role === 'Admin'){
            navigate('/panel')
          }
          else if(user.role === 'Instructor'){
            navigate('/MyCoursesInstructor');
          }
          else if(user.role === 'QA Officer'){
            navigate('/mycoursesqa');
          }
          else if(user.role === 'Program Coordinator'){
            navigate('/MyCoursesPc');
          }
          else{
            navigate('/myCourses');
          }
        }
      })
  }

  return (
    <div className={AuthCSS.containerforgotpass}>
      <div className={AuthCSS.wrapForgotpass}>
        <div className={AuthCSS.headerimg}>
          <span>Email Verification</span>
        </div>
        <form className={AuthCSS.forgotpasswordform} onSubmit={handleSubmit}>
          <p style={{ color: 'red' }}>Otp has been sent to the Email*</p>
          <div className={AuthCSS.forgotpassInput}>
            <input
              className={AuthCSS.input100}
              type="number"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleChange}
              required
            />
          </div>
          <div className={AuthCSS.forgotBtn}>
            <button className={AuthCSS.subBtn} name="submit" type="submit">
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Verification
