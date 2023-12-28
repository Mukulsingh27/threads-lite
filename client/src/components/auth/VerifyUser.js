import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { VERIFY_USER } from '../gql-operations/mutations';
import Loader from '../Loader';

const VerifyUser = () => {
	// Navigate Hook.
	const navigate = useNavigate();

	// Get token from url.
	const { token } = useParams();

	// Local State.
	const [countDown, setCountDown] = useState(10);

	// Verify User Mutation Hook
	const [verifyUser, { loading, error, data }] = useMutation(VERIFY_USER, {
		onCompleted: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
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

	// Count down to redirect to login page
	useEffect(() => {
		if (countDown === 0) {
			navigate('/login');
		}

		const timer =
			countDown > 0 &&
			setInterval(() => setCountDown(countDown - 1), 1000);
		return () => clearInterval(timer);
	}, [countDown, navigate]);

	if (loading) return <Loader />;

	return (
		<div className="login-container">
			<section className="wrapper">
				{data && data.verifyUser && (
					<>
						<div
							className="success"
							style={{
								color: 'green',
								paddingTop: '5px',
								fontWeight: '500',
							}}
						>
							{data.verifyUser}
						</div>
						<p>
							{`You will be redirected to the login page in ${countDown} seconds`}
						</p>
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
			</section>
		</div>
	);
};

export default VerifyUser;
