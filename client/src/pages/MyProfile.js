import React from 'react';
import '../components/profile/profile.scss';
import Timeline from '../components/profile/Timeline';
import UserCard from '../components/profile/UserCard';
import { useQuery } from '@apollo/client';
import { GET_MY_PROFILE } from '../components/gql-operations/queries';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const MyProfile = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	if (!token) {
		navigate('/login');
	}

	// Get my profile data.
	const { loading, error, data } = useQuery(GET_MY_PROFILE);

	if (loading) return <Loader />;

	if (error) {
		console.error('Error fetching profile data:', error);
		window.location.reload();
	}

	return (
		<div className="profile-section">
			{data?.user && (
				<>
					<div className="profile-section__left-side">
						<UserCard
							firstName={data.user.firstName}
							lastName={data.user.lastName}
							email={data.user.email}
							avatar={data.user.profileImage}
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
