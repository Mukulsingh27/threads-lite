import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { VERIFY_USER } from '../gql-operations/mutations';
import { SweetAlert } from '../../utility/SweetAlertToast';
import Loader from '../Loader';

const VerifyUser = () => {
	// Navigate Hook.
	const navigate = useNavigate();
	let timerInterval;

	// Get token from url.
	const { token } = useParams();

	// Verify User Mutation Hook
	const [verifyUser, { loading }] = useMutation(VERIFY_USER, {
		onCompleted: (data) => {
			if (data && data.verifyUser) {
				SweetAlert.fire({
					icon: 'success',
					title: data.verifyUser,
					html: 'You will be redirected to the login page in <b></b> milliseconds.',
					timer: 10000,
					timerProgressBar: true,
					backdrop: `
						rgba(0,0,0,0.62)
					`,
					didOpen: () => {
						SweetAlert.showLoading();
						const timer = SweetAlert.getPopup().querySelector('b');
						timerInterval = setInterval(() => {
							timer.textContent = `${SweetAlert.getTimerLeft()}`;
						}, 100);
					},
					willClose: () => {
						clearInterval(timerInterval);
					},
				}).then((result) => {
					if (result.dismiss === SweetAlert.DismissReason.timer) {
						navigate('/login');
					}

					// If user click outside of the alert, redirect to login page.
					if (result.dismiss === SweetAlert.DismissReason.backdrop) {
						navigate('/login');
					}
				});
			}
		},
		onError: (error) => {
			if (error && error.message) {
				SweetAlert.fire({
					icon: 'error',
					title: error.message || 'Something went wrong!',
					confirmButtonColor: '#fb4f4f',
					backdrop: `
						rgba(0,0,0,0.62)
					`,
				}).then((result) => {
					if (result.dismiss === SweetAlert.DismissReason.backdrop) {
						navigate('/login');
					}

					// id it click on the close button, redirect to login page.
					if (result.isConfirmed) {
						navigate('/login');
					}
				});
			}
		},
	});

	// Verify user
	useEffect(() => {
		verifyUser({
			variables: {
				token,
			},
		});
	}, [token, verifyUser]);

	if (loading) return <Loader />;

	return <div className="verify-user-container"></div>;
};

export default VerifyUser;
