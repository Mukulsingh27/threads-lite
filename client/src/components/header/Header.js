import React from "react";
import "./header.scss";

const Header = () => {
	return (
		<header className="header">
			<div className="header__inner responsive-wrapper">
				<div className="header__logo">
					<img src="https://avatars.githubusercontent.com/u/54891099?v=4" alt="avatar"/>
					<a href="https://github.com/Mukulsingh27">
						<h3>mukulsingh.dev</h3>
					</a>
				</div>
				<nav className="header-navigation">
					<a href="#">Home</a>
					<a href="#">About</a>
					<a href="#">Blog</a>
					<a href="#">Contact Us</a>
					<button>Menu</button>
				</nav>
			</div>
		</header>
	);
};

export default Header;
