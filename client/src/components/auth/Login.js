import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { SIGN_IN_USER } from '../gql-operations/mutations';
import './auth.scss';
import Loader from '../Loader';

const Login = () => {
	const navigation = useNavigate();

	// Local States.
	const [loginData, setLoginData] = useState({});
	const [passwordVisible, setPasswordVisible] = useState(false);

	// Toggle Password Visibility.
	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	// Sign In Mutation Hook.
	const [signInUser, { loading, error }] = useMutation(SIGN_IN_USER, {
		onCompleted: (data) => {
			localStorage.setItem('token', data?.user?.token);
			if (!error) {
				navigation('/profile');
			}
		},
		onError: (error) => {
			console.log(error);
		},
		refetchQueries: ['getMyProfile'],
	});

	// Handle Login Data Change.
	const handleLoginDataChange = (e) => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	// Handle Form Submit.
	const handleFormSubmit = (e) => {
		e.preventDefault();

		// Check if required fields are not empty
		if (!loginData.email || !loginData.password) {
			window.alert('Please fill in all required fields');
			return;
		}

		signInUser({
			variables: {
				userSignIn: {
					...loginData,
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
					<h1 className="text text-large">Sign In</h1>
					<p className="text text-normal">
						New user?{' '}
						<span>
							<Link to="/signup" className="text text-links">
								Create an account
							</Link>
						</span>
					</p>
				</div>
				<div className="error">{error && <p>{error.message}</p>}</div>
				<form
					name="signin"
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
							onChange={handleLoginDataChange}
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
							id="password"
							className="input-field"
							placeholder="Password"
							onChange={handleLoginDataChange}
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
					<Link
						to="/reset"
						className="text text-links"
						style={{
							marginBottom: '14px',
							display: 'block',
							paddingLeft: '1.25rem',
						}}
					>
						Forgot Password
					</Link>
					<div className="input-control">
						<input
							type="submit"
							name="submit"
							className="input-submit"
							value="Sign In"
						/>
					</div>
				</form>
			</section>
		</div>
	);
};

export default Login;
