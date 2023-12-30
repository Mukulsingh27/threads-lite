import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_QUOTES } from '../components/gql-operations/queries';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import MentionRegex from '../utility/MentionRegex';

const Home = () => {
	const pageSize = 10;
	const [page, setPage] = useState(1);
	const [threads, setThreads] = useState([]);
	const [deadEnd, setDeadEnd] = useState(false);

	// Get all threads query hook.
	const { loading, fetchMore } = useQuery(GET_ALL_QUOTES, {
		onCompleted: (data) => {
			setThreads(data.quotes);
		},
		variables: {
			page,
			pageSize,
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const loadMoreThreads = () => {
		// Fetch the next page of data
		fetchMore({
			variables: { page: page + 1, pageSize },
			updateQuery: (prev, { fetchMoreResult }) => {
				if (fetchMoreResult.quotes.length === 0) {
					setDeadEnd(true);
				}
				setThreads([...threads, ...fetchMoreResult.quotes]);
			},
		});

		// Update the current page
		setPage(page + 1);
	};

	// If the data is loading, return a loader.
	if (loading) return <Loader />;

	// If there are no threads, return a message.
	if (threads.length === 0)
		return (
			<div className="home no-thread">
				<h1>
					Oops, No Threads found please login to create one, Happy
					Threading...
				</h1>
			</div>
		);

	return (
		<div className="home">
			<ol className="timeline">
				{threads?.map((quote) => (
					<li
						className="timeline__timeline-item extra-space"
						key={quote?._id}
					>
						<span className="timeline__timeline-item-icon filled-icon-white">
							<i className="avatar">
								<img src={quote?.by?.profileImage} alt="" />
							</i>
						</span>
						<div className="timeline__timeline-item-wrapper">
							<div className="timeline__timeline-item-description">
								<span>
									<Link to={`/profile/${quote?.by?._id}`}>{`${
										quote?.by?.firstName
									} ${
										quote?.by?.lastName &&
										quote?.by?.lastName
									}`}</Link>{' '}
									threaded{' '}
									<time dateTime={quote?.createdAt}>
										{format(quote?.createdAt)}
									</time>
								</span>
							</div>
							<div className="timeline__thread">
								<p
									dangerouslySetInnerHTML={{
										__html: MentionRegex(quote?.name),
									}}
								/>
							</div>
						</div>
					</li>
				))}
			</ol>
			{deadEnd ? null : (
				<button className="loadmore-threads" onClick={loadMoreThreads}>
					Load More
				</button>
			)}
		</div>
	);
};

export default Home;
