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
					<Route path="/program" exact element={<Program />} />
					<Route path="/services" exact element={<Services />} />
				</Routes>
				<Chat/>
			</Router>
		</div>
	);
};

export default App;
