import express from 'express';
import { scheduleDemoEmail, subscribeEmail } from '../controllers/emailController';

const router = express.Router();

router.post('/schedule-demo', scheduleDemoEmail);

router.post('/subscribe', subscribeEmail);


export default router;
