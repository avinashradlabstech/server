import express from 'express';
import { scheduleDemoEmail, subscribeEmail } from '../controllers/emailController.js'

const router = express.Router();

router.post('/schedule-demo', scheduleDemoEmail);

router.post('/subscribe', subscribeEmail);


export default router;
