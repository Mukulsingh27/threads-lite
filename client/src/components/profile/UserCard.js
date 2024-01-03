import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../gql-operations/mutations';
import Loader from '../Loader';

const UserCard = ({
	userId,
	firstName,
	lastName,
	email,
	avatar,
	needLogOutButton,
}) => {
	const token = localStorage.getItem('token');
	const navigation = useNavigate();

	// Delete user
	const [deleteUser, { loading }] = useMutation(DELETE_USER, {
		onCompleted: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	// Log out
	const handleLogOut = () => {
		const confirmLogOut = window.confirm(
			'Are you sure you want to log out?'
		);

		if (confirmLogOut) {
			localStorage.removeItem('token');
			navigation('/login');
			window.location.reload();
		}
	};

	// Delete user
	const handleDelete = async (id) => {
		// Alter and confirm delete.
		const confirmDelete = window.confirm(
			'Are you sure you want to delete your account? This action cannot be undone and data cannot be recovered.'
		);

		if (confirmDelete) {
			try {
				await deleteUser({
					variables: {
						id,
					},

					// Refetch queries.
					refetchQueries: ['getMyProfile'],
				});
			} catch (error) {
				console.error('Delete error:', error);
			} finally {
				localStorage.removeItem('token');
				navigation('/signup');
				window.location.reload();
			}
		}
	};

	// If the data is loading, return a loader.
	if (loading) return <Loader />;

	return (
		<div className="user-card">
			<div className="user-card__profile-picture">
				<img
					src={
						avatar
							? avatar
							: 'https://avatars.githubusercontent.com/u/54891099?v=4'
					}
					alt="Profile avatar"
				/>
			</div>
			<h2 className="user-card__name">
				{firstName} {lastName}
			</h2>
			<h3 className="user-card__username">{email}</h3>
			<p className="user-card__description">
				Happy to see you here! Welcome to Threads Lite!
			</p>
			{token && needLogOutButton && (
				<div className="user-card__buttons">
					<button
						className="user-card__delete-button"
						onClick={() => handleDelete(userId)}
					>
						Delete Account
					</button>
					<button
						className="user-card__logoff-button"
						onClick={() => handleLogOut()}
					>
						Log Out
					</button>
				</div>
			)}
		</div>
	);
};

export default UserCard;
