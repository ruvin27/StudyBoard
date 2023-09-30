import React from "react";
import LoginCSS from "../../assets/css/auth.module.css";
import { Link } from "react-router-dom";

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
						<button className={LoginCSS.subBtn} name="submit">
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
