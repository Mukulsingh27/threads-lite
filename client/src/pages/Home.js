import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_QUOTES } from '../components/gql-operations/queries';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const Home = () => {
	const { loading, error, data } = useQuery(GET_ALL_QUOTES);

	if (loading) return <Loader />;

	if (error) {
		console.log(error);
	}

	if (data.quotes.length === 0)
		return (
			<div className="home">
				<h1>No quotes found</h1>
			</div>
		);

	return (
		<div className="home">
			<ol className="timeline">
				{data?.quotes?.map((quote, index) => (
					<li
						className="timeline__timeline-item extra-space"
						key={index}
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
								<p>{quote?.name}</p>
							</div>
						</div>
					</li>
				))}
			</ol>
		</div>
	);
};

export default Home;
