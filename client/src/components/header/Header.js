import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
	const token = localStorage.getItem('token');

	return (
		<header className="header">
			<div className="header__inner responsive-wrapper">
				<div className="header__logo">
					<img
						src="https://avatars.githubusercontent.com/u/54891099?v=4"
						alt="avatar"
					/>
					<Link to="/">
						<h3>Threads Lite</h3>
					</Link>
				</div>
				<nav className="header-navigation">
					{token ? (
						<>
							<Link to="/profile">Profile</Link>
							<button>
								<Link to="/profile">Profile</Link>
							</button>
						</>
					) : (
						<>
							<Link to="/login">Login</Link>
							<button>
								<Link to="/login">Login</Link>
							</button>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
