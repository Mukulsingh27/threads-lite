import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SET_NEW_PASSWORD } from '../gql-operations/mutations';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';

const NewPassword = () => {
	// Local States.
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);

	// Get token from url.
	const { token } = useParams();

	// Set New Password Mutation Hook
	const [setNewPassword, { loading, error, data }] = useMutation(
		SET_NEW_PASSWORD,
		{
			onCompleted: (data) => {
				console.log(data);
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);

	// Handle reset password form submit.
	const handleFormSubmit = (e) => {
		e.preventDefault();

		// Check if password and confirm password match.
		if (password !== confirmPassword) {
			// You can handle the error here, for example, display a message to the user.
			window.alert('Oops! Passwords do not match.');
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
				{data && data.setNewPassword && (
					<>
						<div
							className="success"
							style={{
								color: 'green',
								paddingTop: '5px',
								fontWeight: '500',
							}}
						>
							{data.setNewPassword}
						</div>
						<Link to="/login" className="text text-links">
							Sign In Here
						</Link>
					</>
				)}
				{error && (
					<div
						className="error"
						style={{
							color: 'red',
							paddingTop: '5px',
							fontWeight: '500',
						}}
					>
						{error.message}
					</div>
				)}
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
