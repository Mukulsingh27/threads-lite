import { ToastAlert } from './SweetAlertToast';

const CopyClick = async (host, id) => {
	const text = `${host}thread/${id}`;
	try {
		await navigator.clipboard.writeText(text); // eslint-disable-line
		ToastAlert.fire({
			icon: 'success',
			title: 'Copied to clipboard!',
		});
	} catch (err) {
		console.error('Unable to copy to clipboard.', err); // eslint-disable-line
		ToastAlert.fire({
			icon: 'error',
			title: 'Unable to copy to clipboard!',
		});
	}
};

export default CopyClick;
