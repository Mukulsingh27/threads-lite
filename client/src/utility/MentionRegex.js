// Handle Output String.
const MentionRegex = (string) => {
	const mentionRegex = /@\[([^\]]+)\]\(([^)]+)\)/g;

	const outputString = string.replace(
		mentionRegex,
		(_, mentionName, userId) => {
			const user = {
				_id: userId,
				firstName: mentionName,
			};

			// Construct the desired output
			return `<a
					href="/profile/${user._id}"
					style="text-decoration: underline;"
				>${user.firstName}</a>`;
		}
	);

	return outputString;
};

export default MentionRegex;
