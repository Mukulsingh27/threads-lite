import React, { useEffect } from 'react';
import { GET_MY_PROFILE } from '../components/gql-operations/queries';
import Timeline from '../components/profile/Timeline';
import UserCard from '../components/profile/UserCard';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useQuery } from '@apollo/client';
import '../components/profile/profile.scss';

const MyProfile = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	// If there is no token, redirect to login page.
	useEffect(() => {
		if (!token) {
			navigate('/login');
		}
	}, [navigate, token]);

	// Get my profile data.
	const { loading, data } = useQuery(GET_MY_PROFILE, {
		onError: (error) => {
			console.log(error); // eslint-disable-line
			window.location.reload();
		},
	});

	// If loading, show loader.
	if (loading) return <Loader />;

	// Destructure data.
	const { user } = data || {};

	return (
		<div className="profile-section">
			{user && (
				<>
					<div className="profile-section__left-side">
						<UserCard user={user} hideUnnecessaryElements={true} />
					</div>
					<div className="profile-section__right-side">
						<Timeline
							thread={user}
							hideUnnecessaryElements={false}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default MyProfile;
