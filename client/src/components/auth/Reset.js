import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../gql-operations/mutations';
import Loader from '../Loader';

const Reset = () => {
	// Local States.
	const [email, setEmail] = useState('');

	// Reset Password Mutation Hook
	const [resetPassword, { loading, error, data }] =
		useMutation(RESET_PASSWORD);

	// Handle reset password form submit.
	const handleFormSubmit = (e) => {
		e.preventDefault();
		resetPassword({
			variables: {
				email,
			},
		});
	};

	// If the data is loading, return a loader.
	if (loading) return <Loader />;

	return (
		<div className="login-container">
			<section className="wrapper">
				<div className="heading">
					<h1 className="text text-large">Reset Password</h1>
					<p className="text text-normal">
						Want to sign in instead?{' '}
						<span>
							<Link to="/login" className="text text-links">
								Sign In
							</Link>
						</span>
					</p>
				</div>
				{data && data.resetPassword && (
					<div
						className="success"
						style={{
							color: 'green',
							paddingTop: '5px',
							fontWeight: '500',
						}}
					>
						{data.resetPassword}
					</div>
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
					name="resetpassword"
					className="form"
					onSubmit={handleFormSubmit}
				>
					<div className="input-control">
						<label htmlFor="email" className="input-label" hidden>
							Email Address
						</label>
						<input
							type="email"
							name="email"
							id="email"
							className="input-field"
							placeholder="Enter Email Address"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="input-control">
						<input
							type="submit"
							name="submit"
							className="input-submit"
							value="Reset Password"
						/>
					</div>
				</form>
			</section>
		</div>
	);
};

export default Reset;
