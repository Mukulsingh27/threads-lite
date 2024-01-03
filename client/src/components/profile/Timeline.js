import React from 'react';
import { DELETE_QUOTE, UPDATE_QUOTE } from '../gql-operations/mutations';
import Message from '../../assets/svgs/Message';
import { useMutation } from '@apollo/client';
import MentionRegex from '../../utility/MentionRegex';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { format } from 'timeago.js';
import NewThread from './NewThread';
import './timeline.scss';

const Timeline = ({ thread, hideUnnecessaryElements }) => {
	// Local State.
	const token = localStorage.getItem('token');

	// SweetAlert2
	const MySwal = withReactContent(Swal);

	// Delete graphql mutation
	const [deleteQuote] = useMutation(DELETE_QUOTE, {
		onCompleted: (data) => {
			// Check if the deletion was successful
			if (data && data.deleteQuote) {
				MySwal.fire({
					title: 'Deleted!',
					text: 'Your thread has been deleted.',
					icon: 'success',
					confirmButtonColor: '#688afd',
					showConfirmButton: false,
					timer: 2000,
					timerProgressBar: true,
				});
			}
		},
		onError: (error) => {
			console.error(error);
		},
		refetchQueries: ['getMyProfile', 'getAllQuotes'],
	});

	// Update graphql mutation
	const [updateQuote] = useMutation(UPDATE_QUOTE, {
		onError: (error) => {
			console.error(error);
		},
		refetchQueries: ['getMyProfile', 'getAllQuotes'],
	});

	// Handle edit.
	const handleEdit = async (id, text) => {
		await MySwal.fire({
			title: 'Edit your thread',
			input: 'textarea',
			inputPlaceholder: 'Edit your thread here...',
			inputAttributes: {
				'aria-label': 'Edit your thread here...',
			},
			inputValue: text,
			showCancelButton: true,
			confirmButtonText: 'Save',
			showLoaderOnConfirm: true,
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
					console.error('Edit error:', error);
					Swal.showValidationMessage(`Edit failed: ${error.message}`);
				}
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Updated!',
					text: 'Your thread has been updated.',
					icon: 'success',
					confirmButtonColor: '#688afd',
					timer: 2000,
					timerProgressBar: true,
					showConfirmButton: false,
				});
			}
		});
	};

	// Handle delete.
	const handleDelete = (quoteId) => {
		MySwal.fire({
			title: 'Are you sure?',
			text: 'You will not be able to recover this thread!',
			icon: 'warning',
			showCancelButton: true,
			showLoaderOnConfirm: true,
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
					console.error('Delete error:', error);
				}
			}
		});
	};

	// Check if thread is edited.
	const isEdited = (createdAt, updatedAt) => createdAt !== updatedAt;

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
