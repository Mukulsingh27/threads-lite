import React from 'react';
import '../components/profile/profile.scss';
import Timeline from '../components/profile/Timeline';
import UserCard from '../components/profile/UserCard';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../components/gql-operations/queries';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const UserProfile = () => {
	const { id } = useParams();

	// Get user profile query hook.
	const { loading, error, data } = useQuery(GET_USER_PROFILE, {
		variables: {
			id,
		},
		onError: (error) => {
			console.log(error);
		},
	});

	// If the data is loading, return a loader.
	if (loading) return <Loader />;

	if (error) {
		console.log(error);
		return <p>Error :(</p>;
	}

	return (
		<div className="profile-section">
			<div className="profile-section__left-side">
				<UserCard
					firstName={data?.user?.firstName}
					lastName={data?.user?.lastName}
					email={data?.user?.email}
					avatar={data?.user?.profileImage}
					needLogOutButton={false}
				/>
			</div>
			<div className="profile-section__right-side">
				{data?.user && (
					<Timeline
						thread={data.user}
						hideUnnecessaryElements={true}
					/>
				)}
			</div>
		</div>
	);
};

export default UserProfile;
