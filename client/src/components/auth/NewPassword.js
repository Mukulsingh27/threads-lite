import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SET_NEW_PASSWORD } from '../gql-operations/mutations';
import { useParams } from 'react-router-dom';
import { ToastAlert, SweetAlert } from '../../utility/SweetAlertToast';
import Loader from '../Loader';

const NewPassword = () => {
	// Local States.
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const navigation = useNavigate();
	const passwordRegex =
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;

	// Get token from url.
	const { token } = useParams();

	// Set New Password Mutation Hook
	const [setNewPassword, { loading }] = useMutation(SET_NEW_PASSWORD, {
		onCompleted: (data) => {
			if (data && data.setNewPassword) {
				setPassword('');
				setConfirmPassword('');
				SweetAlert.fire({
					title: 'Success!',
					icon: 'success',
					text: data.setNewPassword,
					confirmButtonColor: '#4cbb17',
					backdrop: `
						rgba(0,0,0,0.62)
					`,
				}).then((result) => {
					if (result.isConfirmed) {
						navigation('/login');
					}
				});
			}
		},
		onError: (error) => {
			if (error && error.message) {
				ToastAlert.fire({
					icon: 'error',
					title: error.message || 'Something went wrong!',
				});
			}
		},
	});

	// Handle reset password form submit.
	const handleFormSubmit = (e) => {
		e.preventDefault();

		// Check if password and confirm password match.
		if (password !== confirmPassword) {
			// You can handle the error here, for example, display a message to the user.
			SweetAlert.fire({
				icon: 'error',
				title: 'Passwords do not match!',
				confirmButtonColor: '#4cbb17',
				backdrop: `
					rgba(0,0,0,0.62)
				`,
			});
			return;
		}

		// Check if password meets the requirements.
		if (!passwordRegex.test(password)) {
			SweetAlert.fire({
				icon: 'error',
				title: 'Password criteria not met. Please check the password requirements!',
				confirmButtonColor: '#4cbb17',
			});
			return;
		}

		// If passwords match, proceed with the mutation.
		setNewPassword({
			variables: {
				token,
				password,
			},
		});
	};

	// Toggle Password Visibility.
	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	// If the data is loading, return a loader.
	if (loading) return <Loader />;

	return (
		<div className="login-container">
			<section className="wrapper">
				<div className="heading">
					<h1 className="text text-large">Set New Password</h1>
				</div>
				<form
					name="setNewPassword"
					className="form"
					onSubmit={handleFormSubmit}
				>
					<div className="input-control">
						<label
							htmlFor="newPassword"
							className="input-label"
							hidden
						>
							New Password
						</label>
						<input
							type={passwordVisible ? 'text' : 'password'}
							name="newPassword"
							id="newPassword"
							className="input-field"
							placeholder="New Password"
							onChange={(e) => setPassword(e.target.value.trim())}
							required
							autoComplete="on"
						/>
						<button
							type="button"
							onClick={togglePasswordVisibility}
							className="toggle-password-button"
						>
							{passwordVisible ? 'Hide' : 'Show'}
						</button>
					</div>

					<div className="input-control">
						<label
							htmlFor="confirmPassword"
							className="input-label"
							hidden
						>
							Password
						</label>
						<input
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							className="input-field"
							placeholder="Confirm New Password"
							onChange={(e) =>
								setConfirmPassword(e.target.value.trim())
							}
							required
							autoComplete="on"
						/>
					</div>
					<span
						className="password-requirements"
						style={{
							display: 'block',
							marginTop: '5px',
							fontSize: '1rem',
							marginBottom: '14px',
							paddingLeft: '1.2rem',
						}}
					>
						Password must be 8 characters or more with at least one
						uppercase letter, one lowercase letter, one digit, and
						one special character.
					</span>
					<div className="input-control">
						<input
							type="submit"
							name="submit"
							className="input-submit"
							value="Change Password"
						/>
					</div>
				</form>
			</section>
		</div>
	);
};

export default NewPassword;
