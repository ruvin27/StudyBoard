import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@contexts/AuthContext'
import './assets/css/variables.css'
//Auth Imports
import ForgotPassword from '@features/authentication/ForgotPassword'
import Login from '@features/authentication/Login'
import NewPassword from '@features/authentication/NewPassword'
import Profile from '@features/authentication/Profile'
import Register from '@features/authentication/Register'
import Verification from '@features/authentication/Verification'

//Admin Imports
import FindUser from '@features/Admin/FindUser'
import NewUsers from '@features/Admin/NewUsers'
import Panel from '@features/Admin/Panel'
import UserAccounts from '@features/Admin/UserAccounts'
import UserActivity from '@features/Admin/UserActivity'
import Settings from '@features/Admin/Settings'
import AdminProfile from '@features/Admin/AdminProfile'
//Information Page Imports
import About from '@features/info/About'
import ContactUs from '@features/info/ContactUs'
import Program from '@features/info/Program'
import Services from '@features/info/Services'

//Instructor Page Imports
import CreateCourse from '@features/Instructor/CreateCourse'
import CreateExam from '@features/Instructor/CreateExam'
import CreateQuestions from '@features/Instructor/CreateQuestions'

import Exams from '@features/Instructor/Exams'
// import Grades from '@features/Instructor/Grades'
import InstructorCourseInfo from '@features/Instructor/InstructorCourseInfo'
import MyCourses from '@features/Instructor/MyCourses'
import Recommendation from '@features/Instructor/Recommendation'

//PC imports
import BelowAverageResultsPC from '@features/PC/PCbelowavgexams'
import ContactUsResponses from '@features/PC/contactresponses'
import MyCoursesPc from '@features/PC/myCourses'
import PCCourseInfo from '@features/PC/PCCourseInfo'
import SendRecommendations from '@features/PC/sendRecommendations'
import PCObjectives from '@features/PC/PCObjectives'
import Policies from '@features/info/Policies'

//QA imports
import BelowAverageResultsQA from '@features/QA/QAbelowavgexams'
import MyCoursesQA from '@features/QA/myCourses'
import QAExamAnalysis from '@features/QA/QAExamAnalysis'
import QAPolicies from '@features/QA/QAPolicies'
import QACourseInfoNavigation from '@features/QA/QACourseInfoNavigation'
//Student imports
import AllStudentCourses from '@features/Student/allcourses'
import StudentCouseInfoNavigation from '@features/Student/CourseInfoNavigation'
import StudentExams from '@features/Student/exams'
import StudentGrades from '@features/Student/grades'
import StudentMyCourses from '@features/Student/myCourses'
import StudentPeople from '@features/Student/people'
import StudentTakeExam from '@features/Student/takeExam'

import Chat from '@features/Chat'
import LoadingSpinner from '@features/LoadingSpinner'
import Navbar from '@features/navbar'
import NotAuthorized from '@features/NotAuthorized'
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from './config'
const App = () => {
  const { user, isLoading } = useAuth()
  // console.log(user);
  const getRouteElement = (user, role, emailVerifiedAt, component) => {
    if (!user || parseInt(user.approved) === 0) {
      return <NotAuthorized />
    }

    if (emailVerifiedAt == null) {
      return <Verification />
    } else if (user.role === role) {
      return component
    } else {
      return <NotAuthorized />
    }
  }

  const [colors, setColors] = useState([])

  useEffect(() => {
    // Fetch color data from the database using Axios
    axios.get(`${LARAVEL_BACKEND_URL}/getcolors`)
      .then((response) => {
        setColors(response.data)
      })
      .catch((error) => {
        console.error('Error fetching color data:', error)
      })
  }, [])

  useEffect(() => {
    if (colors) {
      const cssContent = `:root {
        ${colors.map((color) => `--${color.usedFor}: #${color.hexColor};`).join('\n')}
      }`

      const styleElement = document.createElement('style')
      styleElement.innerHTML = cssContent
      document.head.appendChild(styleElement)
    }
  }, [colors])

  if (isLoading) {
    return <LoadingSpinner />
  }
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/forgotpassword" element={user ? <Navigate to="/" /> : <ForgotPassword />} />
          <Route path="/verify" element={user && user.email_verified_at == null ? <Verification /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/newpassword/:email/:code" element={user ? <Navigate to="/login" /> : <NewPassword />} />
          {/* Information Page Routes */}
          <Route path="/about" exact element={<About />} />
          <Route path="/contactus" exact element={<ContactUs />} />
          <Route path="/" exact element={<Program />} />
          <Route path="/services" exact element={<Services />} />
          <Route path="/allcourses" exact element={<AllStudentCourses />} />
          <Route path="/policies" exact element={<Policies />} />

          {/* Admin routes */}
          <Route path="/finduser" element={getRouteElement(user, 'Admin', user?.email_verified_at, <FindUser />)} />
          <Route path="/newusers" element={getRouteElement(user, 'Admin', user?.email_verified_at, <NewUsers />)} />
          <Route path="/panel" element={getRouteElement(user, 'Admin', user?.email_verified_at, <Panel />)} />
          <Route path="/useraccounts" element={getRouteElement(user, 'Admin', user?.email_verified_at, <UserAccounts />)} />
          <Route path="/useractivity" element={getRouteElement(user, 'Admin', user?.email_verified_at, <UserActivity />)} />
          <Route path="/settings" element={getRouteElement(user, 'Admin', user?.email_verified_at, <Settings />)} />
          <Route path="/admin_profile/:userId" element={getRouteElement(user, 'Admin', user?.email_verified_at, <AdminProfile />)} />

          {/* Instructor Page Routes */}
          <Route path="/CreateCourse" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <CreateCourse />)} />
          <Route path="/CreateExam" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <CreateExam />)} />
          <Route path="/CreateQuestions" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <CreateQuestions />)} />
          <Route path="/Exams" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <Exams />)} />
          {/* <Route path="/Grades" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <Grades />)} /> */}
          <Route path="/InstructorCourseInfo" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <InstructorCourseInfo />)} />
          <Route path="/InstructorExamAnalysis/:courseId" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <QAExamAnalysis />)} />
          <Route path="/MyCoursesInstructor" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <MyCourses />)} />
          <Route path="/Recommendation" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <Recommendation />)} />
          {/* PC Page Routes */}
          <Route path="/belowavgexamspc" exact element={getRouteElement(user, 'Program Coordinator', user?.email_verified_at, <BelowAverageResultsPC />)} />
          <Route path="/contactusresponses" exact element={getRouteElement(user, 'Program Coordinator', user?.email_verified_at, <ContactUsResponses />)} />
          <Route path="/MyCoursesPc" exact element={getRouteElement(user, 'Program Coordinator', user?.email_verified_at, <MyCoursesPc />)} />
          <Route path="/PCCourseInfo" exact element={getRouteElement(user, 'Program Coordinator', user?.email_verified_at, <PCCourseInfo />)} />
          <Route path="/SendRecommendations/:courseId/:name" exact element={user && <SendRecommendations/>} />
          <Route path="/pcobjectives" exact element={getRouteElement(user, 'Program Coordinator', user?.email_verified_at, <PCObjectives />)} />
          <Route path="/PCExamAnalysis/:courseId" exact element={getRouteElement(user, 'Program Coordinator', user?.email_verified_at, <QAExamAnalysis />)} />
          {/* QA Page Routes */}
          <Route path="/belowavgexamsqa" exact element={getRouteElement(user, 'QA Officer', user?.email_verified_at, <BelowAverageResultsQA />)} />
          <Route path="/qa-processes" exact element={getRouteElement(user, 'QA Officer', user?.email_verified_at, <QAPolicies />)} />
          <Route path="/mycoursesqa" exact element={getRouteElement(user, 'QA Officer', user?.email_verified_at, <MyCoursesQA />)} />
          <Route path="/courseinfoqa/:courseId" exact element={getRouteElement(user, 'QA Officer', user?.email_verified_at, <QACourseInfoNavigation />)} />
          <Route path="/student-reports/:courseId" exact element={getRouteElement(user, 'QA Officer', user?.email_verified_at, <QAExamAnalysis />)} />
          <Route path="/qapolicies" exact element={getRouteElement(user, 'QA Officer', user?.email_verified_at, <QAPolicies />)} />

          {/* Student Page Routes */}
          <Route path="/studentExams/:courseId/:name" exact element={getRouteElement(user, 'Student', user?.email_verified_at, <StudentExams />)} />
          <Route path="/CourseInfoNavigation/:courseId" exact element={getRouteElement(user, 'Student', user?.email_verified_at, <StudentCouseInfoNavigation />)} />
          <Route path="/student-grades/:courseId" exact element={getRouteElement(user, 'Student', user?.email_verified_at, <StudentGrades />)} />
          <Route path="/myCourses" exact element={getRouteElement(user, 'Student', user?.email_verified_at, <StudentMyCourses />)} />
          <Route path="/takeExam/:examId/:courseId" exact element={getRouteElement(user, 'Student', user?.email_verified_at, <StudentTakeExam />)} />
          <Route path="/people/:courseId" element={user ? <StudentPeople /> : <NotAuthorized />} />
        </Routes>
        {user && <Chat />}
      </Router>
    </div>
  )
}

export default App
