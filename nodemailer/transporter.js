import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

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
		user: process.env.SMTP_MAIL, // user email
		pass: process.env.SMTP_PASSWORD, // user app password
	},
});

export default transporter;