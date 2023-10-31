import NavbarCSS from '@assets/css/navbar.module.css'
import Logo from '@assets/images/logo.png'
import { useAuth } from '@contexts/AuthContext'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [isActive, setIsActive] = useState(false)
  const toggleMenu = () => setIsActive((prev) => !prev)

  const handleLogout = async () => {
    logout()
    console.log('User logged out.')
    navigate('/login')
  }

  return (
    <nav className={`${NavbarCSS.navbar} ${isActive ? NavbarCSS.active : ''}`}>
      <div className={NavbarCSS.navbarLogo}>
        <img src={Logo} alt="Logo" />
        <span className={NavbarCSS.brandName}>
          <Link
            to={
              user && user.role === 'Student'
                ? '/mycourses'
                : user && user.role === 'QA Officer'
                ? '/mycoursesqa'
                : user && user.role === 'Program Coordinator'
                ? '/MyCoursesPc'
                : user && user.role === 'Instructor'
                ? '/mycoursesInstructor'
                : user && user.role === 'Admin'
                ? '/panel'
                : '/'
            }
          >
            StudyBoard
          </Link>
        </span>
      </div>
      <ul className={NavbarCSS.navbarLinks} id="nav-links">
        <li className={NavbarCSS.dropdown}>
          <a href="#" className={NavbarCSS.dropbtn}>
            Information Links &#9662;
          </a>

          <div className={NavbarCSS.dropdownContent}>
            <Link to="/">Program</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/contactus">Contact Us</Link>
          </div>
        </li>
        <li>
          <a href="http://sxv8509.uta.cloud/" target="_blank" rel="noreferrer">
            Blog
          </a>
        </li>
        {user && (
          <li>
            <Link to="/profile"> Profile</Link>
          </li>
        )}
        <li>
          {user ? (
            <Link to={'/login'} onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to={'/login'}>Login</Link>
          )}
        </li>
      </ul>
      <button className={NavbarCSS.menuButton} id="menu-button" onClick={toggleMenu}>
        &#9776;
      </button>
    </nav>
  )
}

export default Navbar
