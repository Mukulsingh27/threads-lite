import React from "react";
import "./footer.scss";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__logo">
				<img src="https://avatars.githubusercontent.com/u/54891099?v=4" alt="avatar"/>
				<a href="#">mukulsingh.dev</a>
			</div>
			<ul className="footer__menu">
				<li className="footer__menu-item">
					<a className="footer__menu-link" href="#">
						Home
					</a>
				</li>
				<li className="footer__menu-item">
					<a className="footer__menu-link" href="#">
						About
					</a>
				</li>
				<li className="footer__menu-item">
					<a className="footer__menu-link" href="#">
						Blog
					</a>
				</li>
				<li className="footer__menu-item">
					<a className="footer__menu-link" href="#">
						Contact
					</a>
				</li>
			</ul>
			<p>
				{`© ${new Date().getFullYear()} Mukul Singh | All Rights Reserved ❤️`}
			</p>
		</footer>
	);
};

export default Footer;