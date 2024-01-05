import React from 'react';
import { useQuery } from '@apollo/client';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { GET_QUOTE_BY_ID } from '../components/gql-operations/queries';
import MentionRegex from '../utility/MentionRegex';
import { format } from 'timeago.js';
import { SweetAlert } from '../utility/SweetAlertToast';
import Loader from '../components/Loader';

const Thread = () => {
	// Get the thread id from url.
	const { id } = useParams();
	const navigate = useNavigate();

	// Get the thread data.
	const { loading, data, error } = useQuery(GET_QUOTE_BY_ID, {
		variables: { id },
		onError: (error) => console.log(error), // eslint-disable-line
	});

	if (error) {
		SweetAlert.fire({
			icon: 'error',
			title: 'Thread not found!',
			confirmButtonColor: '#4cbb17',
			backdrop: `
				rgba(0,0,0,0.62)
			`,
		});
		return;
	}

	// If loading, show loader.
	if (loading) return <Loader />;

	// Destructure data.
	const { name, by, createdAt } = data?.quote || {};

	return (
		<div className="home">
			<ol className="timeline">
				<li className="timeline__timeline-item extra-space">
					<span className="timeline__timeline-item-icon filled-icon-white">
						<i className="avatar">
							<img src={by?.profileImage} alt="user-avatar" />
						</i>
					</span>
					<div className="timeline__timeline-item-wrapper">
						<div className="timeline__timeline-item-description">
							<span>
								<Link to={`/profile/${by?._id}`}>
									{`${by?.firstName} ${by?.lastName || ''}`}
								</Link>{' '}
								threaded{' '}
								<time dateTime={createdAt}>
									{format(createdAt)}
								</time>
							</span>
						</div>
						<div className="timeline__thread">
							<p
								dangerouslySetInnerHTML={{
									__html: MentionRegex(name),
								}}
							/>
						</div>
					</div>
				</li>
			</ol>
		</div>
	);
};

export default Thread;
