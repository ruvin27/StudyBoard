import LoginCSS from '@assets/css/auth.module.css'
import { useAuth } from '@contexts/AuthContext'
import { apiClient } from '@lib/apiClient'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  // Define state variables to store form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isEmailValid(formData.email)) {
      alert('Please enter a valid email address.')
      return
    }
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long.')
      return
    }
    await apiClient
      .post('/authentication/login.php', {
        email: formData.email,
        password: formData.password,
      })
      .then( (res) => {
         login(res.data.data)
        if(res.data.data.role === 'Admin'){
          navigate('/panel')
        }
        else if(res.data.data.role === 'Instructor'){
          navigate('/MyCoursesInstructor');
        }
        else if(res.data.data.role === 'QA Officer'){
          navigate('/mycoursesqa');
        }
        else if(res.data.data.role === 'Program Coordinator'){
          navigate('/MyCoursesPc');
        }
        else{
          navigate('/myCourses');
        }
      })
      .catch((error) => {
          alert(error.response.data.message);
      })
  }

  return (
    <div className={LoginCSS.containerLogin}>
      <div className={LoginCSS.wrapLogin}>
        <div className={LoginCSS.headerimg}>
          <span> SIGN IN </span>
        </div>
        <form className={LoginCSS.loginform} onSubmit={handleSubmit}>
          <div className={LoginCSS.loginInput}>
            <input
              className={LoginCSS.input100}
              type="email"
              name="email"
              placeholder="Enter Email"
              autoComplete="username"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={LoginCSS.loginInput}>
            <input
              className={LoginCSS.input100}
              type="password"
              name="password"
              placeholder="Enter Password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className={LoginCSS.loginBtn}>
            <button className={LoginCSS.subBtn} name="submit" type="submit">
              Login
            </button>
          </div>
          <div className={LoginCSS.txt}>
            <Link to={'/forgotpassword'}>Forgot Password</Link>
            <div>
              Don&apos;t have an account?
              <Link to={'/register'}>Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
