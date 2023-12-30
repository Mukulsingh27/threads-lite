import React, { useState } from 'react';
import { DELETE_QUOTE, UPDATE_QUOTE } from '../gql-operations/mutations';
import Message from '../../assets/svgs/Message';
import { useMutation } from '@apollo/client';
import NewThread from './NewThread';
import { format } from 'timeago.js';
import Loader from '../Loader';
import './timeline.scss';

const Timeline = ({ thread, hideUnnecessaryElements }) => {
	// Local State.
	const [editLoading, setEditLoading] = useState(false);
	const token = localStorage.getItem('token');

	// Delete graphql mutation
	const [deleteQuote, { loading: deleteLoader }] = useMutation(DELETE_QUOTE, {
		onCompleted: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
		refetchQueries: ['getMyProfile', 'getAllQuotes'],
	});

	// Update graphql mutation
	const [updateQuote, { loading: updateLoader }] = useMutation(UPDATE_QUOTE, {
		onCompleted: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
		refetchQueries: ['getMyProfile', 'getAllQuotes'],
	});

	// Handle edit.
	const handleEdit = async (id, text) => {
		setEditLoading(true);
		const newText = window.prompt('Edit your thread', text);

		if (newText) {
			try {
				await updateQuote({
					variables: {
						id,
						name: newText,
					},
				});
			} catch (error) {
				console.error('Edit error:', error);
			} finally {
				setEditLoading(false);
			}
		} else {
			setEditLoading(false);
		}
	};

	// Handle delete.
	const handleDelete = async (quoteId) => {
		const shouldDelete = window.confirm(
			'Are you sure you want to delete this thread?'
		);

		if (shouldDelete) {
			try {
				await deleteQuote({
					variables: {
						id: quoteId,
					},
				});
			} catch (error) {
				console.error('Delete error:', error);
			}
		}
	};

	// Handle Output String.
	const handleOutputString = (string) => {
		const mentionRegex = /\@\[([^\]]+)\]\(([^\)]+)\)/g;

		const outputString = string.replace(
			mentionRegex,
			(_, mentionName, userId) => {
				// Assuming quote.by is the user object
				const user = {
					_id: '657eb3b009ee41be4e7ca404',
					firstName: 'Tripti',
					// Add other user properties as needed
				};

				// Construct the desired output
				return `<Link to="/${user._id}">casdfa</Link>`;
			}
		);

		return outputString;
	};

	// Check if thread is edited.
	const isEdited = (createdAt, updatedAt) => createdAt !== updatedAt;

	// If the data is loading, return a loader.
	if (updateLoader || editLoading || deleteLoader) {
		return (
			<div className="loader">
				<Loader />
			</div>
		);
	}

	return (
		<ol className="timeline">
			{token && !hideUnnecessaryElements && (
				<NewThread avatar={thread?.profileImage} />
			)}
			{[...thread?.quotes].reverse().map((quote) => (
				<li
					className="timeline__timeline-item extra-space"
					key={quote?._id}
				>
					<span className="timeline__timeline-item-icon filled-icon">
						<Message />
					</span>
					<div className="timeline__timeline-item-wrapper">
						<div className="timeline__timeline-item-description">
							<span>
								<p>{`${thread?.firstName} ${
									thread?.lastName && thread?.lastName
								}`}</p>{' '}
								threaded{' '}
								<time dateTime={quote?.createdAt}>
									{format(quote?.createdAt)}
								</time>
							</span>
						</div>
						<div className="timeline__thread-wrap">
							{!hideUnnecessaryElements &&
								token &&
								isEdited(
									quote?.createdAt,
									quote?.updatedAt
								) && (
									<div className="timeline__thread-edited">
										edited
									</div>
								)}
							<div className="timeline__thread">
								<p>{handleOutputString(quote?.name)}</p>
							</div>
							{!hideUnnecessaryElements && token && (
								<div className="timeline__thread-buttons">
									<button
										className="timeline__thread-buttons-button timeline__thread-buttons-button-edit"
										onClick={() =>
											handleEdit(quote?._id, quote?.name)
										}
									>
										Edit
									</button>
									<button
										className="timeline__thread-buttons-button timeline__thread-buttons-button-delete"
										onClick={() => handleDelete(quote?._id)}
									>
										Delete
									</button>
								</div>
							)}
						</div>
					</div>
				</li>
			))}
		</ol>
	);
};

export default Timeline;
