import React, { useState } from "react";
import LoginCSS from "../../assets/css/auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import apiUrl from "../../Config";

const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	// Define state variables to store form data
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	// Handle input changes
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const isEmailValid = (email) => {
		// Regular expression for basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isEmailValid(formData.email)) {
			alert("Please enter a valid email address.");
			return;
		}
		if (formData.password.length < 6) {
			alert("Password must be at least 6 characters long.");
			return;
		}
		await axios
			.post(`${apiUrl}backend/authentication/login.php`, {
				email: formData.email,
				password: formData.password,
			})
			.then(async (res) => {
				if (res.data === "Incorrect password") {
					alert("Incorrect password");
				} else if (res.data === "User not found") {
					alert("User not found");
				} else {
					await login(res.data);
					navigate("/");
				}
			});
	};

	return (
		<div className={LoginCSS.containerLogin}>
			<div className={LoginCSS.wrapLogin}>
				<div className={LoginCSS.headerimg}>
					<span> SIGN IN </span>
				</div>
				<form className={LoginCSS.loginform} onSubmit={handleSubmit}>
					<div className={LoginCSS.loginInput}>
						<input className={LoginCSS.input100} type="email" name="email" placeholder="Enter Email" autoComplete="username" value={formData.email} onChange={handleChange} />
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
						<Link to={"/forgotpassword"}>Forgot Password</Link>
						<div>
							Don't have an account?
							<Link to={"/register"}>Sign Up</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
