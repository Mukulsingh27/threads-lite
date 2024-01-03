import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGN_UP_USER } from '../gql-operations/mutations';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loader from '../Loader';
import './auth.scss';

const SignUp = () => {
	const navigation = useNavigate();

	// Token.
	const token = localStorage.getItem('token');

	// SweetAlert2
	const MySwal = withReactContent(Swal);

	// Toast
	const Toast = MySwal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
	});

	// If token exists, redirect to profile page.
	useEffect(() => {
		if (token) {
			navigation('/profile');
		}
	}, [navigation, token]);

	// Local States.
	const [signUpData, setSignUpData] = useState({});
	const [passwordVisible, setPasswordVisible] = useState(false);
	const passwordRegex =
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;

	// Toggle Password Visibility.
	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	// Sign Up Mutation Hook.
	const [signUpUser, { loading }] = useMutation(SIGN_UP_USER, {
		onCompleted: async (data) => {
			if (data && data.user) {
				MySwal.fire({
					title: `Welcome ${data.user.firstName}!`,
					icon: 'success',
					text: 'Please check your email to verify your account.',
					confirmButtonColor: '#4cbb17',
				});
				setSignUpData({});
			}
		},
		onError: (error) => {
			if (error && error.message) {
				Toast.fire({
					icon: 'error',
					title: error.message,
				});
			}
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

		// Check if required fields are not empty
		const { firstName, email, password } = signUpData;
		if (!firstName || !email || !password) {
			window.alert('Please fill in all required fields');
			return;
		}

		// Check password against regex
		if (!passwordRegex.test(password)) {
			window.alert(
				'Password criteria not met. Please check the password requirements.'
			);
			return;
		}

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
							placeholder="Enter First Name*"
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
							placeholder="Enter Email Address*"
							onChange={handleSignUpDataChange}
							required
							autoComplete="on"
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
							placeholder="Set a Password*"
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
					<span
						className="password-requirements"
						style={{
							display: 'block',
							marginTop: '5px',
							fontSize: '1rem',
							marginBottom: '14px',
							paddingLeft: '1.25rem',
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
							value="Sign Up"
						/>
					</div>
				</form>
			</section>
		</div>
	);
};

export default SignUp;
