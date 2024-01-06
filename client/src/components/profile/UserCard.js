import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../gql-operations/mutations';
import { SweetAlert } from '../../utility/SweetAlertToast';
import WebShare from '../../utility/WebShare';
import CopyClick from '../../utility/CopyClick';
import Share from '../../assets/svgs/Share';
import Edit from '../../assets/svgs/Edit';
import Loader from '../Loader';

const UserCard = ({
	user: { _id: userId, firstName, lastName, email, profileImage: avatar },
	hideUnnecessaryElements,
}) => {
	const token = localStorage.getItem('token');
	const navigation = useNavigate();

	// Delete user
	const [deleteUser, { loading }] = useMutation(DELETE_USER, {
		onError: (error) => {
			console.error(error); // eslint-disable-line
		},
	});

	// Log out
	const handleLogOut = () => {
		SweetAlert.fire({
			title: 'Are you sure?',
			text: 'You will be logged out.',
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#4cbb17',
			cancelButtonColor: '#fb4f4f',
			confirmButtonText: 'Yes, log out',
			backdrop: `
				rgba(0,0,0,0.62)
			`,
		}).then((result) => {
			if (result.isConfirmed) {
				localStorage.removeItem('token');
				navigation('/login');
				window.location.reload();
			}
		});
	};

	// Delete user
	const handleDelete = async (id) => {
		// Show SweetAlert2 confirmation dialog
		const result = await SweetAlert.fire({
			title: 'Are you sure?',
			text: 'This action cannot be undone, and your data will be permanently deleted.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#fb4f4f',
			cancelButtonColor: '#4cbb17',
			confirmButtonText: 'Yes, delete my account',
			backdrop: `
				rgba(0,0,0,0.62)
			`,
		});

		if (result.isConfirmed) {
			try {
				await deleteUser({
					variables: {
						id,
					},
					// Refetch queries.
					refetchQueries: ['getMyProfile'],
				});
			} catch (error) {
				console.error('Delete error:', error); // eslint-disable-line
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
			<div
				className="user-card__share"
				onClick={() => {
					CopyClick(window.location.origin, userId, 'profile');
					WebShare(window.location.origin, userId, 'profile');
				}}
			>
				<Share />
			</div>
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
			<div className="user-card__edit-wrap">
				<h2 className="user-card__name">
					{firstName} {lastName}
				</h2>
				{token && hideUnnecessaryElements && (
					<div className="user-card__edit">
						<Edit />
					</div>
				)}
			</div>
			<h3 className="user-card__username">{email}</h3>
			<p className="user-card__description">
				Happy to see you here! Welcome to Threads Lite!
			</p>
			{token && hideUnnecessaryElements && (
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
