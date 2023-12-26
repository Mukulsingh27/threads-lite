import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGN_UP_USER } from '../gql-operations/mutations';
import Loader from '../Loader';
import './auth.scss';

const SignUp = () => {
	const [signUpData, setSignUpData] = useState({});

	const sendEmail = async () => {
		await fetch(`http://localhost:4000/api/mail/`, {
			method: 'POST',
			body: JSON.stringify({
				name: signUpData.firstName + ' ' + signUpData.lastName,
				email: signUpData.email,
			}),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				if (res.status > 199 && res.status < 300) {
					window.alert('Send Successfully !');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const [signUpUser, { loading, error, data }] = useMutation(SIGN_UP_USER, {
		onCompleted: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	if (loading) return <Loader />;

	const handleSignUpDataChange = (e) => {
		setSignUpData({
			...signUpData,
			[e.target.name]: e.target.value,
		});
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		signUpUser({
			variables: {
				newUser: {
					...signUpData,
				},
			},
		});
		sendEmail();
	};
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
				<div className="error">{error && <p>{error.message}</p>}</div>
				<div className="success">
					{data && data?.user && (
						<p>
							{data.user?.firstName} {data.user?.lastName} has
							been successfully registered
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
							type="password"
							name="password"
							id="Enter Password"
							className="input-field"
							placeholder="Password"
							onChange={handleSignUpDataChange}
							required
							autoComplete="on"
						/>
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
