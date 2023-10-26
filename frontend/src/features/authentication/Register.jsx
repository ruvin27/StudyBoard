import RegisterCSS from '@assets/css/auth.module.css'
import { useAuth } from '@contexts/AuthContext'
import { apiClient } from '@lib/apiClient'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    role: 'Student',
    name: '',
    email: '',
    password: '',
    phone_number: '',
    verification_code: '',
    email_verified_at: null,
  })

  const { role, name, email, password, phone_number } = formData

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleDropdownChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.value,
    })
  }

  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isPhoneNumberValid = (phoneNumber) => {
    // Regular expression for a basic phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/
    return phoneRegex.test(phoneNumber)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isEmailValid(email)) {
      alert('Please enter a valid email address.')
      return
    }

    if (!isPhoneNumberValid(phone_number)) {
      alert('Please enter a valid 10-digit phone number.')
      return
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.')
      return
    }
    await apiClient
      .post(`/authentication/register.php`, {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone_number: formData.phone_number,
        role: formData.role,
      })
      .then(async (res) => {
        if (!res.data) {
          alert(res.data)
          return
        }

        await login(formData)
        navigate('/verify')
      })
  }

  return (
    <div className={RegisterCSS.containerRegister}>
      <div className={RegisterCSS.wrapRegister}>
        <div className={RegisterCSS.headerimg}>
          <span>SIGN UP</span>
        </div>
        <form className={RegisterCSS.registerform} onSubmit={handleSubmit}>
          <div
            className={`${RegisterCSS.registerInput} ${RegisterCSS.dropdownRole}`}
          >
            <label htmlFor="role" className={RegisterCSS.dropdownLabel}>
              Select one:
            </label>
            <select
              id="role"
              name="role"
              className={RegisterCSS.dropdownSelect}
              value={role}
              onChange={handleDropdownChange}
            >
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
              <option value="Program Coordinator">Program Coordinator</option>
              <option value="QA Officer">QA Officer</option>
            </select>
          </div>

          <div className={RegisterCSS.registerInput}>
            <input
              className={RegisterCSS.input100}
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={RegisterCSS.registerInput}>
            <input
              className={RegisterCSS.input100}
              type="email"
              name="email"
              placeholder="Enter Email"
              autoComplete="username"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={RegisterCSS.registerInput}>
            <input
              className={RegisterCSS.input100}
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={phone_number}
              onChange={handleChange}
              required
              autoComplete="tel"
            />
          </div>
          <div className={RegisterCSS.registerInput}>
            <input
              className={RegisterCSS.input100}
              type="password"
              name="password"
              placeholder="Create Password"
              autoComplete="current-password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={RegisterCSS.registerBtn}>
            <button className={RegisterCSS.subBtn} name="submit" type="submit">
              Register
            </button>
          </div>
          <div className={RegisterCSS.txt}>
            Already have an account?
            <Link to={'/login'}>Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
