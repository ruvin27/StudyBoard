import React, { useState } from "react";
import NavbarCSS from "../assets/css/navbar.module.css";
import Logo from "../assets/images/logo.png";

const Navbar = () => {
	const [isActive, setIsActive] = useState(false);

	const toggleMenu = () => {
		setIsActive(!isActive);
	};

	return (
		<nav className={`${NavbarCSS.navbar} ${isActive ? NavbarCSS.active : ""}`}>
			<div className={NavbarCSS.navbarLogo}>
				<img src={Logo} alt="Logo" />
				<span className={NavbarCSS.brandName}>
					<a href="../Student/myCourses.html">StudyBoard</a>
				</span>
			</div>
			<ul className={NavbarCSS.navbarLinks} id="nav-links">
				<li className={NavbarCSS.dropdown}>
					<a href="#" className={NavbarCSS.dropbtn}>
						Information Links &#9662;
					</a>
					<div className={NavbarCSS.dropdownContent}>
						<a href="../info/program.html">Program</a>
						<a href="../info/About.html">About</a>
						<a href="../info/services.html">Services</a>
						<a href="../info/ContactUs.html">Contact US</a>
					</div>
				</li>
				<li>
					<a href="./register.html">Register</a>
				</li>
			</ul>
			<button className={NavbarCSS.menuButton} id="menu-button" onClick={toggleMenu}>
				&#9776;
			</button>
		</nav>
	);
};

export default Navbar;
