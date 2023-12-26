import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import confirmation from '../templates/confirmation.js';

// Read the .env file
if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

// Create the transporter
const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: false, // true for 465, false for other ports
	auth: {
		user: process.env.SMTP_MAIL, // generated ethereal user
		pass: process.env.SMTP_PASSWORD, // generated ethereal password
	},
});

// Send the email
export const sendEmail = async (req, res) => {
	const { name, email } = req.body;

	console.log(req.body);

	// Define the email
	var mailConfigs = {
		from: process.env.SMTP_MAIL,
		to: email,
		subject: subject,
		html: confirmation({
			name,
			token,
		}),
	};

	transporter.sendMail(mailConfigs, (error, info) => {
		if (error) {
			console.log(error);
			res.status(500).send('Something went wrong.');
		} else {
			window.alert('Email sent successfully: ' + info.response);
			res.status(200).send('Email Sent');
		}
	});
};
