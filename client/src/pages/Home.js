import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_QUOTES } from '../components/gql-operations/queries';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import WebShare from '../utility/WebShare';
import CopyClick from '../utility/CopyClick';
import MentionRegex from '../utility/MentionRegex';

const Home = () => {
	const pageSize = 10;
	const [page, setPage] = useState(1);
	const [threads, setThreads] = useState([]);
	const [deadEnd, setDeadEnd] = useState(false);

	const { loading, fetchMore } = useQuery(GET_ALL_QUOTES, {
		onCompleted: ({ quotes }) => {
			setThreads(quotes);
		},
		variables: { page, pageSize },
		onError: (error) => {
			console.log(error); // eslint-disable-line
		},
	});

	const loadMoreThreads = () => {
		fetchMore({
			variables: { page: page + 1, pageSize },
			updateQuery: (prev, { fetchMoreResult }) => {
				if (fetchMoreResult.quotes.length === 0) {
					setDeadEnd(true);
				}
				setThreads([...threads, ...fetchMoreResult.quotes]);
			},
		});

		setPage(page + 1);
	};

	if (loading) return <Loader />;

	if (threads.length === 0) {
		return (
			<div className="home no-thread">
				<h1>
					Oops, No Threads found. Please login to create one. Happy
					Threading...
				</h1>
			</div>
		);
	}

	return (
		<div className="home">
			<ol className="timeline">
				{threads.map(({ _id, by, createdAt, name }) => (
					<li
						className="timeline__timeline-item extra-space"
						key={_id}
					>
						<span className="timeline__timeline-item-icon filled-icon-white">
							<i className="avatar">
								<img src={by?.profileImage} alt="avatar" />
							</i>
						</span>
						<div className="timeline__timeline-item-wrapper">
							<div className="timeline__timeline-item-description">
								<span>
									<Link to={`/profile/${by?._id}`}>
										{`${by?.firstName} ${
											by?.lastName || ''
										}`}
									</Link>{' '}
									threaded{' '}
									<time dateTime={createdAt}>
										{format(createdAt)}
									</time>
								</span>
							</div>
							<div className="timeline__thread-wrap">
								<div className="timeline__thread">
									<p
										dangerouslySetInnerHTML={{
											__html: MentionRegex(name),
										}}
									/>
								</div>
								<div className="timeline__thread-buttons">
									<button
										className="timeline__thread-buttons-button timeline__thread-buttons-button-edit"
										onClick={() => {
											CopyClick(
												window.location.origin,
												_id,
												'thread'
											);
											WebShare(
												window.location.origin,
												_id,
												'thread'
											);
										}}
									>
										Share
									</button>
								</div>
							</div>
						</div>
					</li>
				))}
			</ol>
			{!deadEnd && (
				<button className="loadmore-threads" onClick={loadMoreThreads}>
					Load More
				</button>
			)}
		</div>
	);
};

export default Home;
