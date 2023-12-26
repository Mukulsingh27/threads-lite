import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { SIGN_IN_USER } from '../gql-operations/mutations';
import './auth.scss';
import Loader from '../Loader';

const Login = () => {
	const navigation = useNavigate();
	const [loginData, setLoginData] = useState({});

	const [passwordVisible, setPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

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

	if (loading) return <Loader />;

	const handleLoginDataChange = (e) => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value,
		});
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		signInUser({
			variables: {
				userSignIn: {
					...loginData,
				},
			},
		});
	};

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
							id="Enter Password"
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
					{/* <Link to="/reset-password" className="text text-links">
						Forgot Password
					</Link> */}
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
