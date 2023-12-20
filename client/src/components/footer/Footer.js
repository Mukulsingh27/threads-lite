import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__logo">
				<img
					src="https://avatars.githubusercontent.com/u/54891099?v=4"
					alt="avatar"
				/>
				<Link to="/">Threads Lite</Link>
			</div>
			<ul className="footer__menu">
				<li className="footer__menu-item">
					<Link
						className="footer__menu-link"
						to="https://github.com/Mukulsingh27"
						target="__blank"
					>
						GitHub
					</Link>
				</li>
				<li className="footer__menu-item">
					<Link
						className="footer__menu-link"
						to="https://linkedin.com/in/mukulsingh27/"
						target="__blank"
					>
						LikedIn
					</Link>
				</li>
				<li className="footer__menu-item">
					<Link
						className="footer__menu-link"
						to="https://mukulsingh.dev/"
						target="__blank"
					>
						Contact
					</Link>
				</li>
			</ul>
			<p>
				{`© ${new Date().getFullYear()} Mukul Singh | All Rights Reserved ❤️`}
			</p>
		</footer>
	);
};

export default Footer;
