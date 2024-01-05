import React from 'react';
import { DELETE_QUOTE, UPDATE_QUOTE } from '../gql-operations/mutations';
import Message from '../../assets/svgs/Message';
import { useMutation } from '@apollo/client';
import MentionRegex from '../../utility/MentionRegex';
import { ToastAlert, SweetAlert } from '../../utility/SweetAlertToast';
import { format } from 'timeago.js';
import NewThread from './NewThread';
import Loader from '../Loader';
import './timeline.scss';

const Timeline = ({ thread, hideUnnecessaryElements }) => {
	// Local State.
	const token = localStorage.getItem('token');

	// Delete graphql mutation
	const [deleteQuote, { loading: deleteLoader }] = useMutation(DELETE_QUOTE, {
		onCompleted: (data) => {
			if (data && data.deleteQuote) {
				ToastAlert.fire({
					icon: 'success',
					title: data.deleteQuote,
				});
			}
		},
		onError: (error) => {
			console.error(error); // eslint-disable-line
		},
		refetchQueries: ['getMyProfile', 'getAllQuotes'],
	});

	// Update graphql mutation
	const [updateQuote, { loading: updateLoader }] = useMutation(UPDATE_QUOTE, {
		onCompleted: (data) => {
			if (data && data.updateQuote) {
				ToastAlert.fire({
					icon: 'success',
					title: data.updateQuote,
				});
			}
		},
		onError: (error) => {
			console.error(error); // eslint-disable-line
		},
		refetchQueries: ['getMyProfile', 'getAllQuotes'],
	});

	// Handle edit.
	const handleEdit = async (id, text) => {
		await SweetAlert.fire({
			title: 'Edit your thread',
			input: 'textarea',
			inputPlaceholder: 'Edit your thread here...',
			inputAttributes: {
				'aria-label': 'Edit your thread here...',
			},
			inputValue: text,
			showCancelButton: true,
			confirmButtonText: 'Save',
			confirmButtonColor: '#4cbb17',
			cancelButtonColor: '#fb4f4f',
			backdrop: `
				rgba(0,0,0,0.62)
			`,
			preConfirm: async (newText) => {
				try {
					// Perform your update logic here
					await updateQuote({
						variables: {
							id,
							name: newText,
						},
					});
				} catch (error) {
					SweetAlert.showValidationMessage(
						`Edit failed: ${error.message}`
					);
				}
			},
			allowOutsideClick: () => !SweetAlert.isLoading(),
		});
	};

	// Handle delete.
	const handleDelete = (quoteId) => {
		SweetAlert.fire({
			title: 'Are you sure?',
			text: 'You will not be able to recover this thread!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#4cbb17',
			cancelButtonColor: '#fb4f4f',
			confirmButtonText: 'Yes, delete it!',
			backdrop: `
				rgba(0,0,0,0.62)
			`,
		}).then((result) => {
			if (result.isConfirmed) {
				try {
					deleteQuote({
						variables: {
							id: quoteId,
						},
					});
				} catch (error) {
					console.error('Delete error:', error); // eslint-disable-line
				}
			}
		});
	};

	// Loader.
	if (deleteLoader || updateLoader) return <Loader />;

	// Check if thread is edited.
	const isEdited = (createdAt, updatedAt) => createdAt !== updatedAt;

	return (
		<ol className="timeline">
			{token && !hideUnnecessaryElements && (
				<NewThread avatar={thread?.profileImage} />
			)}
			{[...thread.quotes].reverse().map((quote) => (
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
								<p
									dangerouslySetInnerHTML={{
										__html: MentionRegex(quote?.name),
									}}
								/>
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
