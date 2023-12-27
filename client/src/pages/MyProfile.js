import React from 'react';
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
	if (!token) {
		navigate('/login');
	}

	// Get my profile data.
	const { loading, data } = useQuery(GET_MY_PROFILE, {
		onError: (error) => {
			console.log(error);
			window.location.reload();
		},
	});

	// If there is an error, return a message.
	if (loading) return <Loader />;

	return (
		<div className="profile-section">
			{data?.user && (
				<>
					<div className="profile-section__left-side">
						<UserCard
							userId={data?.user._id}
							firstName={data?.user.firstName}
							lastName={data?.user.lastName}
							email={data?.user.email}
							avatar={data?.user.profileImage}
							needLogOutButton={true}
						/>
					</div>
					<div className="profile-section__right-side">
						<Timeline
							thread={data.user}
							hideUnnecessaryElements={false}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default MyProfile;
