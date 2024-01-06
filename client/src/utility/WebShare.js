const WebShare = (host, id, route) => {
	// Check if navigator.share is supported by the browser
	if (navigator.share) {
		navigator
			.share({
				url: `${host}/${route}/${id}`,
			})
			.then(() => {
				console.log('Sharing successfully'); // eslint-disable-line
			})
			.catch(() => {
				console.log('Sharing failed'); // eslint-disable-line
			});
	} else {
		console.log('Sorry! Your browser does not support Web Share API'); // eslint-disable-line
	}
};

export default WebShare;
