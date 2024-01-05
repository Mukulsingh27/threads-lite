import React from 'react';
import '../components/profile/profile.scss';
import Timeline from '../components/profile/Timeline';
import UserCard from '../components/profile/UserCard';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../components/gql-operations/queries';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const UserProfile = () => {
	// Get user id from url.
	const { id } = useParams();

	// Get user profile data.
	const { loading, error, data } = useQuery(GET_USER_PROFILE, {
		variables: { id },
		onError: (error) => console.log(error), // eslint-disable-line
	});

	// If there is an error, log it and show error message.
	if (error) {
		return <p>Error :(</p>;
	}

	// If loading, show loader.
	if (loading) return <Loader />;

	// Destructure data.
	const { firstName, lastName, email, profileImage } = data?.user || {};

	return (
		<div className="profile-section">
			<div className="profile-section__left-side">
				<UserCard
					firstName={firstName}
					lastName={lastName}
					email={email}
					avatar={profileImage}
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
