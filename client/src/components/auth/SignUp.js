import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGN_UP_USER } from '../gql-operations/mutations';
import Loader from '../Loader';
import './auth.scss';

const SignUp = () => {
	// Local States.
	const [signUpData, setSignUpData] = useState({});
	const [passwordVisible, setPasswordVisible] = useState(false);

	// Toggle Password Visibility.
	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	// Sign Up Mutation Hook.
	const [signUpUser, { loading, error, data }] = useMutation(SIGN_UP_USER, {
		onCompleted: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	// Handle Sign Up Data Change.
	const handleSignUpDataChange = (e) => {
		setSignUpData({
			...signUpData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	// Handle Form Submit.
	const handleFormSubmit = (e) => {
		e.preventDefault();
		signUpUser({
			variables: {
				newUser: {
					...signUpData,
				},
			},
		});
	};

	// If the data is loading, return a loader.
	if (loading) return <Loader />;

	return (
		<div className="login-container">
			<section className="wrapper">
				<div className="heading">
					<h1 className="text text-large">Sign Up</h1>
					<p className="text text-normal">
						Already a user?{' '}
						<span>
							<Link to="/login" className="text text-links">
								Sign In
							</Link>
						</span>
					</p>
				</div>
				<div
					className="error"
					style={{
						color: 'red',
						paddingTop: '5px',
						fontWeight: '500',
					}}
				>
					{error && <p>{error.message}</p>}
				</div>
				<div className="success">
					{data && data?.user && (
						<p
							style={{
								color: 'green',
								paddingTop: '5px',
								fontWeight: '500',
							}}
						>
							{data.user?.firstName} {data.user?.lastName} has
							been successfully registered, Please check your
							email to verify your account.
						</p>
					)}
				</div>
				<form
					name="signin"
					className="form"
					onSubmit={handleFormSubmit}
				>
					<div className="input-control">
						<label
							htmlFor="first-name"
							className="input-label"
							hidden
						>
							First Name
						</label>
						<input
							type="text"
							name="firstName"
							id="first-name"
							className="input-field"
							placeholder="Enter First Name"
							onChange={handleSignUpDataChange}
							required
						/>
					</div>

					<div className="input-control">
						<label
							htmlFor="last-name"
							className="input-label"
							hidden
						>
							Last Name
						</label>
						<input
							type="text"
							name="lastName"
							id="last-name"
							className="input-field"
							placeholder="Enter Last Name"
							onChange={handleSignUpDataChange}
						/>
					</div>

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
							onChange={handleSignUpDataChange}
							required
						/>
					</div>
					<div className="input-control">
						<label
							htmlFor="password"
							className="input-label"
							hidden
						>
							Password
						</label>
						<input
							type={passwordVisible ? 'text' : 'password'}
							name="password"
							id="Enter Password"
							className="input-field"
							placeholder="Password"
							onChange={handleSignUpDataChange}
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
						<input
							type="submit"
							name="submit"
							className="input-submit"
							value="Sign Up"
						/>
					</div>
				</form>
			</section>
		</div>
	);
};

export default SignUp;
