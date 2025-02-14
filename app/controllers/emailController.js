
import { query } from '../db';
import { Resend } from '@resend/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export const scheduleDemoEmail = async (req, res) => {
  const { name, email, company, title, message } = req.body;

  try {
    // Store email details in MySQL
    const result = await query(
      'INSERT INTO schedule_demo (name, email, company, title, message, createdAt) VALUES (?, ?, ?, ?, ?,?)',
      [name, email, company, title, message, new Date()]
    );


    const emailResponse = await resend.emails.send({
      from: 'avinash@radlabs.tech',
      to: 'avinash@radlabs.tech',
      subject: 'Schedule Demo Email',
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Company: ${company}</p><p>Tilte: ${title}</p><p>Message: ${message}</p>`,
    });

    if (result && emailResponse && emailResponse.status === 200) {

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

    const emailResponse = await resend.emails.send({
      from: 'avinash@radlabs.tech',
      to: 'avinash@radlabs.tech',
      subject: 'New Subscriber Email',
      html: `<p>Email: ${email}</p>`,
    });

    if (result && emailResponse && emailResponse.status === 200) {

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
