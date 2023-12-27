import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_QUOTE } from '../gql-operations/mutations';
import Loader from '../Loader';

const NewThread = ({ avatar }) => {
	// Local State.
	const [newThread, setNewThread] = useState('');

	// Create Quote Mutation Hook.
	const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
		onCompleted: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
		refetchQueries: ['getAllQuotes', 'getMyProfile'],
	});

	// Handle Form Submit.
	const handleThreadSubmit = (e) => {
		e.preventDefault();
		createQuote({
			variables: {
				name: newThread,
			},
		});
	};

	// If the data is loading, return a loader.
	if (loading) return <Loader />;

	return (
		<>
			{data && <p>{data.quote}</p>}
			<li className="timeline__timeline-item">
				<span className="timeline__timeline-item-icon filled-icon-white">
					<i className="avatar">
						<img src={avatar} alt="" />
					</i>
				</span>
				<div className="timeline__new-thread">
					<form onSubmit={handleThreadSubmit} className="thread-form">
						<input
							onChange={(e) =>
								setNewThread(e.target.value.trim())
							}
							type="text"
							placeholder="Post a thread"
						/>
						<button className="thread-button">Post</button>
					</form>
					<div className="error">
						{error && <p>{error.message}</p>}
					</div>
				</div>
			</li>
		</>
	);
};

export default NewThread;
