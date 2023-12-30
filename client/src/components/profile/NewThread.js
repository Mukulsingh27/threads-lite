import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_QUOTE } from '../gql-operations/mutations';
import { GET_USER_BY_QUERY } from '../gql-operations/queries';
import { MentionsInput, Mention } from 'react-mentions';
import mentionStyles from './MentionStyles';
import Loader from '../Loader';

const NewThread = ({ avatar }) => {
	// Local States.
	const [newThread, setNewThread] = useState('');
	const [emojis, setEmojis] = useState([]);
	const neverMatchingRegex = /($a)/;

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

	const {
		loading: userLoading,
		data: userData,
		refetch,
	} = useQuery(GET_USER_BY_QUERY, {
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

		// Refetch the query.
		const data = refetch({
			query,
		});

		// Transform the users to what react-mentions expects
		data.then((res) => {
			console.log(res);
			return res.data.fetchUsers.map((user) => ({
				id: user._id,
				display: `${user.firstName} ${user.lastName}`,
			}));
		})
			.then((users) => {
				console.log('asdasd', users);
				callback(users);
			})
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
						<textarea
							value={newThread}
							className="thread-input"
							onChange={(e) =>
								setNewThread(e.target.value.trim())
							}
							type="text"
							placeholder="What's on your mind?"
							rows={5}
							required
						/>
						<button className="thread-button">Post</button>
					</form>
					<MentionsInput
						value={newThread}
						onChange={(e) => setNewThread(e.target.value)}
						style={mentionStyles}
						placeholder={
							"Press ':' for emojis, mention people using '@'"
						}
					>
						<Mention
							data={fetchUsers}
							trigger="@"
							appendSpaceOnAdd
							style={{ backgroundColor: '#d1c4e9' }}
						/>
						<Mention
							trigger=":"
							markup="__id__"
							regex={neverMatchingRegex}
							data={queryEmojis}
						/>
					</MentionsInput>
					<div className="error">
						{error && <p>{error.message}</p>}
					</div>
				</div>
			</li>
		</>
	);
};

export default NewThread;
