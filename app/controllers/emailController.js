
import { query } from '../config/db.js';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


export const scheduleDemoEmail = async (req, res) => {

  const { name, email, company, title, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {

    // Store email details in MySQL
    const result = await query(
      'INSERT INTO schedule_demo (name, email, company, title, message, createdAt) VALUES (?, ?, ?, ?, ?,?)',
      [name, email, company, title, message, new Date()]
    );

    const mailOptions = {
      from: 'avinashdahariya@gmail.com',
      to: 'avinash@radlabs.tech',
      subject: 'Schedule Demo Email',
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Company: ${company}</p><p>Tilte: ${title}</p><p>Message: ${message}</p>`,
    };

    const emailResponse = await transporter.sendMail(mailOptions);

    if (result && mailOptions) {

      res.json({
        message: 'Email details saved and email sent successfully',
        emailResponse,
      });
    } else {

      res.status(400).json({
        message: 'Failed to send email',
        emailResponse,
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database error' });
  }
};

export const subscribeEmail = async (req, res) => {
  const { email } = req.body;

  try {

    const existingEmail = await query(
      'SELECT * FROM subscriber WHERE email = ?',
      [email]
    );

    if (existingEmail.length > 0) {
      return res.status(400).json({
        message: 'Email is already subscribed.',
      });
    }

    const result = await query(
      'INSERT INTO subscriber (email, createdAt) VALUES (?,?)',
      [email, new Date()]
    );


    const mailOptions = {
      from: 'avinashdahariya@gmail.com',
      to: 'avinash@radlabs.tech',
      subject: 'New Subscriber Email',
      html: `<p>Email: ${email}</p>`,
    };

    const emailResponse = await transporter.sendMail(mailOptions);

    if (result && mailOptions) {

      res.json({
        message: 'Mail subscribed',
        emailResponse,
      });
    } else {

      res.status(400).json({
        message: 'Failed to send email',
        emailResponse,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database error' });
  }
};
