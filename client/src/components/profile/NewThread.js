import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_QUOTE } from '../gql-operations/mutations';
import { GET_USER_BY_QUERY } from '../gql-operations/queries';
import { MentionsInput, Mention } from 'react-mentions';
// import mentionStyles from './MentionStyles';
import classNames from './mention.module.css';
import Loader from '../Loader';

const NewThread = ({ avatar }) => {
	// Local States.
	const [newThread, setNewThread] = useState('');
	const [emojis, setEmojis] = useState([]);
	const neverMatchingRegex = /($a)/;

	// Fetch emojis.
	useEffect(() => {
		fetch(
			'https://gist.githubusercontent.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb/raw/d8e4b78cfe66862cf3809443c1dba017f37b61db/emojis.json'
		)
			.then((response) => {
				return response.json();
			})
			.then((jsonData) => {
				setEmojis(jsonData.emojis);
			});
	}, []);

	// Get user by query.
	const { refetch } = useQuery(GET_USER_BY_QUERY, {
		variables: {
			query: '',
		},
		skip: true,
		onError: (error) => {
			console.log(error);
		},
		onCompleted: (data) => {
			console.log(data);
		},
	});

	// Fetch users.
	const fetchUsers = (query, callback) => {
		// If the query is empty, return.
		if (query.length === 0) return;

		// Refetch the query and transform the users.
		refetch({
			query,
		})
			.then((res) =>
				res.data.fetchUsers.map((user) => ({
					id: user._id,
					display: `${user.firstName} ${user.lastName}`,
				}))
			)
			.then(callback)
			.catch((err) => {
				console.log(err);
			});
	};

	const queryEmojis = (query) => {
		if (query.length === 0) return;

		const matches = emojis
			.filter((emoji) => {
				return emoji.name.indexOf(query.toLowerCase()) > -1;
			})
			.slice(0, 10);
		return matches.map(({ emoji }) => ({ id: emoji }));
	};

	// Create Quote Mutation Hook.
	const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
		onCompleted: (data) => {
			console.log(data);
			setNewThread('');
		},
		onError: (error) => {
			console.log(error);
		},
		refetchQueries: ['getAllQuotes', 'getMyProfile'],
	});

	// Handle Form Submit.
	const handleThreadSubmit = (e) => {
		e.preventDefault();

		// check if the thread is empty.
		if (newThread === '') {
			window.alert('Oops! Thread cannot be empty.');
			return;
		}

		// If thread is not empty, proceed with the mutation.
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
						<MentionsInput
							value={newThread}
							onChange={(e) => setNewThread(e.target.value)}
							className="mentions"
							classNames={classNames}
							required
							placeholder={
								"Post something, using '@' to mention or ':' to add emojis."
							}
						>
							<Mention
								data={fetchUsers}
								trigger="@"
								appendSpaceOnAdd
								className={classNames.mentions__mention}
							/>
							<Mention
								trigger=":"
								markup="__id__"
								regex={neverMatchingRegex}
								appendSpaceOnAdd
								data={queryEmojis}
							/>
						</MentionsInput>
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
