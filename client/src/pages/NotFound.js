import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/404.scss';

const NotFound = () => {
	return (
		<div className="not-found">
			<div className="not-found__page">
				<h1>404</h1>
				<p>Page not found</p>
				<Link to="/">
					<button>Back to home</button>
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
