import React from "react";
import RegisterCSS from "../../assets/css/auth.module.css";
import { Link } from "react-router-dom";

const Register = () => {
	return (
		<div className={RegisterCSS.containerRegister}>
			<div className={RegisterCSS.wrapRegister}>
				<div className={RegisterCSS.headerimg}>
					<span>SIGN UP</span>
				</div>
				<form className={RegisterCSS.registerform} action="index.php" method="POST">
					<div className={`${RegisterCSS.registerInput} ${RegisterCSS.dropdownRole}`}>
						<label htmlFor="category" className={RegisterCSS.dropdownLabel}>
							Select one:
						</label>
						<select id="category" name="category" className={RegisterCSS.dropdownSelect}>
							<option value="Student">Student</option>
							<option value="Instructor">Instructor</option>
							<option value="Program Coordinator">Program Coordinator</option>
							<option value="QA Officer">QA Officer</option>
						</select>
					</div>

					<div className={RegisterCSS.registerInput}>
						<input className={RegisterCSS.input100} type="text" name="name" placeholder="Full Name" required />
					</div>
					<div className={RegisterCSS.registerInput}>
						<input className={RegisterCSS.input100} type="email" name="email" placeholder="Enter Email" required autoComplete="username"/>
					</div>
					<div className={RegisterCSS.registerInput}>
						<input className={RegisterCSS.input100} type="password" name="password" placeholder="Create Password" required autoComplete="current-password"/>
					</div>
					<div className={RegisterCSS.registerBtn}>
						<button className={RegisterCSS.subBtn} name="submit">
							Register
						</button>
					</div>
					<div className={RegisterCSS.txt}>
						Already have an account?
						<Link to={"/login"}>Sign In</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
