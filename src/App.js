import Navbar from "./features/navbar";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
import ForgotPassword from "./features/authentication/ForgotPaswword";
import Profile from "./features/authentication/Profile";
import NewPassword from "./features/authentication/NewPassword";

const App = () => {
	return (
		<div>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/login" exact element={<Login />} />
					<Route path="/register" exact element={<Register />} />
					<Route path="/forgotpassword" exact element={<ForgotPassword />} />
					<Route path="/profile" exact element={<Profile />} />
					<Route path="/newpassword" exact element={<NewPassword />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
