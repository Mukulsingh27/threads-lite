import express from 'express';
import { sendEmail } from '../controllers/emailControllers.js';

// Router.
const router = express.Router();

// Send email.
router.post('/mail', sendEmail);

export default router;
