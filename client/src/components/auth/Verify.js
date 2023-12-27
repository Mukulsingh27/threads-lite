import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { VERIFY_USER } from '../gql-operations/mutations';
import Loader from '../Loader';

const Verify = () => {
	const navigate = useNavigate();
	const { token } = useParams();
	const [countDown, setCountDown] = useState(10);

	// Verify User Mutation Hook
	const [verifyUser, { loading, error, data }] = useMutation(VERIFY_USER);

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
				{data ? (
					<div>
						<b>{data.verifyUser}</b>
						<p>
							{`You will be redirected to the login page in ${countDown} seconds`}
						</p>
					</div>
				) : (
					<p>{error && <p>{error.message}</p>}</p>
				)}
			</section>
		</div>
	);
};

export default Verify;
