import React from 'react';
import '../components/profile/profile.scss';
import Timeline from '../components/profile/Timeline';
import UserCard from '../components/profile/UserCard';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../components/gql-operations/queries';
import { useParams } from 'react-router-dom';
import { SweetAlert } from '../utility/SweetAlertToast';
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
		SweetAlert.fire({
			icon: 'error',
			title: 'User not found!',
			confirmButtonColor: '#4cbb17',
			backdrop: `
				rgba(0,0,0,0.62)
			`,
		});
		return;
	}

	// If loading, show loader.
	if (loading) return <Loader />;

	// Destructure data.
	const { user } = data || {};

	return (
		<div className="profile-section">
			<div className="profile-section__left-side">
				<UserCard user={user} hideUnnecessaryElements={false} />
			</div>
			<div className="profile-section__right-side">
				{data?.user && (
					<Timeline thread={user} hideUnnecessaryElements={true} />
				)}
			</div>
		</div>
	);
};

export default UserProfile;
