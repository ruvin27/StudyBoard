import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { apiClient } from '@lib/apiClient'
import { useAuth } from '@contexts/AuthContext'
import './assets/css/variables.css'

//Auth Imports
import ForgotPassword from '@features/authentication/ForgotPaswword'
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
import Grades from '@features/Instructor/Grades'
import InstructorCourseInfo from '@features/Instructor/InstructorCourseInfo'
import InstructorExamAnalysis from '@features/Instructor/InstructorExamAnalysis'
import MyCourses from '@features/Instructor/MyCourses'
import Recommendation from '@features/Instructor/Recommendation'

//PC imports
import BelowAverageResults from '@features/PC/belowavgexams'
import ContactUsResponses from '@features/PC/contactresponses'
import MyCoursesPc from '@features/PC/myCourses'
import PCCourseInfo from '@features/PC/PCCourseInfo'
import SendRecommendations from '@features/PC/sendRecommendations'
import PCObjectives from '@features/PC/PCObjectives'

//QA imports
import BelowAverageResultsQA from '@features/QA/belowavgexams'
import MyCoursesQA from '@features/QA/myCourses'
import CourseInfoQA from '@features/QA/QACourseInfo'
import CourseRecommendationQA from '@features/QA/sendRecommendations'

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

const App = () => {
  const { user, isLoading } = useAuth()

  console.log(user)
  const [colors, setColors] = useState([])

  useEffect(() => {
    // Fetch color data from the database using Axios
    apiClient
      .get('/webdesign/colors.php')
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

  const getRouteElement = (user, role, emailVerifiedAt, component) => {
    if (!user) {
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
          {/* Admin routes */}
          <Route path="/finduser" element={getRouteElement(user, 'Admin', user?.email_verified_at, <FindUser />)} />
          <Route path="/newusers" element={getRouteElement(user, 'Admin', user?.email_verified_at, <NewUsers />)} />
          <Route path="/panel" element={getRouteElement(user, 'Admin', user?.email_verified_at, <Panel />)} />
          <Route path="/useraccounts" element={getRouteElement(user, 'Admin', user?.email_verified_at, <UserAccounts />)} />
          <Route path="/useractivity" element={getRouteElement(user, 'Admin', user?.email_verified_at, <UserActivity />)} />
          <Route path="/settings" element={getRouteElement(user, 'Admin', user?.email_verified_at, <Settings />)} />
          {/* Instructor Page Routes */}
          <Route path="/CreateCourse" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <CreateCourse />)} />
          <Route path="/CreateExam" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <CreateExam />)} />
          <Route path="/CreateQuestions" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <CreateQuestions />)} />
          <Route path="/Exams" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <Exams />)} />
          <Route path="/Grades" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <Grades />)} />
          <Route path="/InstructorCourseInfo" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <InstructorCourseInfo />)} />
          <Route path="/InstructorExamAnalysis" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <InstructorExamAnalysis />)} />
          <Route path="/MyCoursesInstructor" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <MyCourses />)} />
          <Route path="/Recommendation" exact element={getRouteElement(user, 'Instructor', user?.email_verified_at, <Recommendation />)} />
          {/* PC Page Routes */}
          <Route path="/belowavgexams" exact element={getRouteElement(user, 'Program Coordinator', user?.email_verified_at, <BelowAverageResults />)} />
          <Route path="/contactusresponses" exact element={getRouteElement(user, 'Program Coordinator', user?.email_verified_at, <ContactUsResponses />)} />
          <Route path="/MyCoursesPc" exact element={getRouteElement(user, 'Program Coordinator', user?.email_verified_at, <MyCoursesPc />)} />
          <Route path="/PCCourseInfo" exact element={getRouteElement(user, 'Program Coordinator', user?.email_verified_at, <PCCourseInfo />)} />
          <Route path="/SendRecommendations" exact element={getRouteElement(user, 'Program Coordinator', user?.email_verified_at, <SendRecommendations />)} />
          <Route path="/PCExamAnalysis" exact element={getRouteElement(user, 'Program Coordinator', user?.email_verified_at, <InstructorExamAnalysis />)} />
          <Route path="/pcobjectives" exact element={getRouteElement(user, 'Program Coordinator', user?.email_verified_at, <PCObjectives />)} />

          {/* QA Page Routes */}
          <Route path="/belowavgexamsQA" exact element={getRouteElement(user, 'QA Officer', user?.email_verified_at, <BelowAverageResultsQA />)} />
          <Route path="/mycoursesqa" exact element={getRouteElement(user, 'QA Officer', user?.email_verified_at, <MyCoursesQA />)} />
          <Route path="/courseinfoqa" exact element={getRouteElement(user, 'QA Officer', user?.email_verified_at, <CourseInfoQA />)} />
          <Route path="/sendrecommendationsqa" exact element={getRouteElement(user, 'QA Officer', user?.email_verified_at, <CourseRecommendationQA />)} />
          <Route path="/QAExamAnalysis" exact element={getRouteElement(user, 'QA Officer', user?.email_verified_at, <InstructorExamAnalysis />)} />
          {/* Student Page Routes */}
          <Route path="/studentExams/:courseId/:name" exact element={getRouteElement(user, 'Student', user?.email_verified_at, <StudentExams />)} />
          <Route path="/CourseInfoNavigation/:courseId" exact element={getRouteElement(user, 'Student', user?.email_verified_at, <StudentCouseInfoNavigation />)} />
          <Route path="/student-grades/:courseId" exact element={getRouteElement(user, 'Student', user?.email_verified_at, <StudentGrades />)} />
          <Route path="/myCourses" exact element={getRouteElement(user, 'Student', user?.email_verified_at, <StudentMyCourses />)} />
          <Route path="/takeExam/:examId/:courseId" exact element={getRouteElement(user, 'Student', user?.email_verified_at, <StudentTakeExam />)} />
          <Route path="/people/:courseId" element={user ? <StudentPeople/> : <NotAuthorized />} />
        </Routes>
        {user && <Chat />}
      </Router>
    </div>
  )
}

export default App
