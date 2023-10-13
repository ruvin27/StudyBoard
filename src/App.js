import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./features/navbar";
import Chat from "./features/Chat";

//Auth Imports
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
import ForgotPassword from "./features/authentication/ForgotPaswword";
import Profile from "./features/authentication/Profile";
import NewPassword from "./features/authentication/NewPassword";

//Admin Imports
import FindUser from "./features/Admin/FindUser";
import NewUsers from "./features/Admin/NewUsers";
import Panel from "./features/Admin/Panel";
import UserAccounts from "./features/Admin/UserAccounts";
import UserActivity from "./features/Admin/UserActivity";

//Information Page Imports
import About from "./features/info/About";
import ContactUs from "./features/info/ContactUs";
import Program from "./features/info/Program";
import Services from "./features/info/Services";

//Instructor Page Imports
import CreateCourse from "./features/Instructor/CreateCourse";
import CreateExam from "./features/Instructor/CreateExam";
import Exams from "./features/Instructor/Exams";
import Grades from "./features/Instructor/Grades";
import InstructorCourseInfo from "./features/Instructor/InstructorCourseInfo";
import InstructorExamAnalysis from "./features/Instructor/InstructorExamAnalysis";
import MyCourses from "./features/Instructor/MyCourses";
import Recommendation from "./features/Instructor/Recommendation";

//PC imports
import BelowAverageResults from "./features/PC/belowavgexams";
import ContactUsResponses from "./features/PC/contactresponses";
import MyCoursesPc from "./features/PC/myCourses";
import PCCourseInfo from "./features/PC/PCCourseInfo";
import SendRecommendations from "./features/PC/sendRecommendations";

//QA imports
import BelowAverageResultsQA from "./features/QA/belowavgexams";
import MyCoursesQA from "./features/QA/myCourses";
import CourseInfoQA from "./features/QA/QACourseInfo";
import CourseRecommendationQA from "./features/QA/sendRecommendations";

//Student imports

import StudentCouseInfoNavigation from "./features/Student/CourseInfoNavigation";
import AllStudentCourses from "./features/Student/allcourses";
import StudentExams from "./features/Student/exams";
import StudentGrades from "./features/Student/grades";
import StudentMyCourses from "./features/Student/myCourses";
import StudentPeople from "./features/Student/people";
import StudentTakeExam from "./features/Student/takeExam";

const App = () => {
	return (
		<div>
			<Router>
				<Navbar />
				<Routes>
					{/* Authentication Routes */}
					<Route path="/login" exact element={<Login />} />
					<Route path="/register" exact element={<Register />} />
					<Route path="/forgotpassword" exact element={<ForgotPassword />} />
					<Route path="/profile" exact element={<Profile />} />
					<Route path="/newpassword" exact element={<NewPassword />} />
					{/* Admin routes */}
					<Route path="/finduser" exact element={<FindUser />} />
					<Route path="/newusers" exact element={<NewUsers />} />
					<Route path="/panel" exact element={<Panel />} />
					<Route path="/useraccounts" exact element={<UserAccounts />} />
					<Route path="/useractivity" exact element={<UserActivity />} />
					{/* Information Page Routes */}
					<Route path="/about" exact element={<About />} />
					<Route path="/contactus" exact element={<ContactUs />} />
					<Route path="/" exact element={<Program />} />
					<Route path="/services" exact element={<Services />} />
					{/* Instructor Page Routes */}
					<Route path="/CreateCourse" exact element={<CreateCourse />} />
					<Route path="/CreateExam" exact element={<CreateExam />} />
					<Route path="/Exams" exact element={<Exams />} />
					<Route path="/Grades" exact element={<Grades />} />
					<Route path="/InstructorCourseInfo" exact element={<InstructorCourseInfo />} />
					<Route path="/InstructorExamAnalysis" exact element={<InstructorExamAnalysis />} />
					<Route path="/MyCoursesInstructor" exact element={<MyCourses />} />
					<Route path="/Recommendation" exact element={<Recommendation />} />

					{/* PC Page Routes */}
					<Route path="/belowavgexams" exact element={<BelowAverageResults />} />
					<Route path="/contactusresponses" exact element={<ContactUsResponses />} />
					<Route path="/MyCoursesPc" exact element={<MyCoursesPc />} />
					<Route path="/PCCourseInfo" exact element={<PCCourseInfo />} />
					<Route path="/SendRecommendations" exact element={<SendRecommendations />} />
					{/* QA Page Routes */}
					<Route path="/belowavgexamsQA" exact element={<BelowAverageResultsQA />} />
					<Route path="/mycoursesqa" exact element={<MyCoursesQA />} />
					<Route path="/courseinfoqa" exact element={<CourseInfoQA />} />
					<Route path="/sendrecommendationsqa" exact element={<CourseRecommendationQA />} />
					{/* Student Page Routes */}
					<Route path="/allcourses" exact element={<AllStudentCourses />} />
					<Route path="/studentExams" exact element={<StudentExams />} />
					<Route path="/CourseInfoNavigation" exact element={<StudentCouseInfoNavigation />} />
					<Route path="/student-grades" exact element={<StudentGrades />} />
					<Route path="/myCourses" exact element={<StudentMyCourses />} />
					<Route path="/people" exact element={<StudentPeople />} />
					<Route path="/takeExam" exact element={<StudentTakeExam />} />
				</Routes>
				<Chat />
			</Router>
		</div>
	);
};

export default App;
