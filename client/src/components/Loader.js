import React from 'react';
import '../assets/styles/loader.scss';

const Loader = () => {
	return (
		<div className="loader">
			<div className="loader__rings">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loader;
