import express from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our API!' });
});

export default (req, res) => app(req, res);