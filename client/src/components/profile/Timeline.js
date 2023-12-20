import React from 'react';
import { DELETE_QUOTE } from '../gql-operations/mutations';
import Message from '../../assets/svgs/Message';
import { useMutation } from '@apollo/client';
import NewThread from './NewThread';
import { format } from 'timeago.js';
import './timeline.scss';
import Loader from '../Loader';

const Timeline = ({ thread, hideUnnecessaryElements }) => {
	const token = localStorage.getItem('token');

	const [deleteQuote, { loading, error }] = useMutation(DELETE_QUOTE, {
		onCompleted: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
		refetchQueries: ['getMyProfile'],
	});

	const handleDelete = (quoteId) => {
		const shouldDelete = window.confirm(
			'Are you sure you want to delete this thread?'
		);
		if (shouldDelete) {
			deleteQuote({
				variables: {
					id: quoteId,
				},
			});
		}
	};

	if (loading) return <Loader />;

	if (error) {
		console.log(error);
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
							<div className="timeline__thread">
								<p>{quote?.name}</p>
							</div>
							{!hideUnnecessaryElements && token && (
								<button
									className="timeline__thread-delete"
									onClick={() => handleDelete(quote?._id)}
								>
									X
								</button>
							)}
						</div>
					</div>
				</li>
			))}
		</ol>
	);
};

export default Timeline;
