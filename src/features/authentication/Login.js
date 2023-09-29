import React from "react";
import LoginCSS from "../../assets/css/auth.module.css";

const Login = () => {
	return (
		<div className={LoginCSS.containerLogin}>
			<div className={LoginCSS.wrapLogin}>
				<div className={LoginCSS.headerimg}>
					<span> SIGN IN </span>
				</div>
				<form className={LoginCSS.loginform}>
					<div className={LoginCSS.loginInput}>
						<input className={LoginCSS.input100} type="email" name="email" placeholder="Enter Email" />
					</div>
					<div className={LoginCSS.loginInput}>
						<input className={LoginCSS.input100} type="password" name="password" placeholder="Enter Password" />
					</div>
					<div className={LoginCSS.loginBtn}>
						{/* <a href="../Student/myCourses.html" class="sub-btn login">
								Login as Student
							</a>
							<a href="../Instructor/myCourses.html" class="sub-btn login">
								Login as Instructor
							</a>
							<a href="../Admin/panel.html" class="sub-btn login">
								Login as Admin
							</a>
							<a href="../QA/myCourses.html" class="sub-btn login">
								Login as QA Officer
							</a>
							<a href="../PC/myCourses.html" class="sub-btn login">
								Login as PC
							</a> */}
						<button className={LoginCSS.subBtn} name="submit">
							Login
						</button>
					</div>
					<div className={LoginCSS.txt}>
						<a href=".\forgotpassword.html"> Forgot Password </a>
						<div>
							Don't have an account?
							<a href=".\register.html"> Sign Up </a>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
