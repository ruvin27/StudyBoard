import React from "react";
import ContactUsCSS from "../../assets/css/contact.module.css";

const ContactUs = () => {
	return (
		<div>
			<div className={ContactUsCSS.contactContainer}>
				<div className={ContactUsCSS.contactHeader}>
					<h2>Contact Us</h2>
				</div>
			</div>
			<form className={ContactUsCSS.contactForm}>
				<label htmlFor={ContactUsCSS.email} className={ContactUsCSS.contactLabel}>
					Enter your email:
				</label>
				<input type="email" id={ContactUsCSS.email} name={ContactUsCSS.email} className={ContactUsCSS.contactInput} placeholder="Your email address" required />

				<label htmlFor={ContactUsCSS.message} className={ContactUsCSS.contactLabel}>
					Message:
				</label>
				<textarea id={ContactUsCSS.message} name={ContactUsCSS.message} className={ContactUsCSS.contactTextarea} placeholder="Your message" rows="4" required></textarea>

				<button type="submit" className={ContactUsCSS.sendButton}>
					Send Message
				</button>
			</form>
		</div>
	);
};

export default ContactUs;
