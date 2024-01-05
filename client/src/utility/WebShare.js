const WebShare = (host, id) => {
	// Check if navigator.share is supported by the browser
	if (navigator.share) {
		navigator
			.share({
				url: `${host}/thread/${id}`,
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
