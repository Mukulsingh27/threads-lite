import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ firstName, lastName, email, avatar, needLogOutButton }) => {
	const token = localStorage.getItem('token');
	const navigation = useNavigate();
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
				<button
					className="user-card__logoff-button"
					style={{ cursor: 'pointer' }}
					onClick={() => {
						localStorage.removeItem('token');
						navigation('/login');
						window.location.reload();
					}}
				>
					Log Out
				</button>
			)}
		</div>
	);
};

export default UserCard;
