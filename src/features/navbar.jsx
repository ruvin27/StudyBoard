import React, { useState } from "react";
import NavbarCSS from "../assets/css/navbar.module.css";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

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
					<Link to={"/mycourses"}>StudyBoard</Link>
				</span>
			</div>
			<ul className={NavbarCSS.navbarLinks} id="nav-links">
				<li className={NavbarCSS.dropdown}>
					<a href="#" className={NavbarCSS.dropbtn}>
						Information Links &#9662;
					</a>
					<div className={NavbarCSS.dropdownContent}>
						<Link to="/">Program</Link>
						<Link to="/about">About</Link>
						<Link to="/services">Services</Link>
						<Link to="/contactus">Contact Us</Link>
					</div>
				</li>
				<li>
					<a href="http://sxv8509.uta.cloud/" target="_blank">Blog</a>
				</li>
				<li>
					<Link to={"/register"}>Register</Link>
				</li>
			</ul>
			<button className={NavbarCSS.menuButton} id="menu-button" onClick={toggleMenu}>
				&#9776;
			</button>
		</nav>
	);
};

export default Navbar;
