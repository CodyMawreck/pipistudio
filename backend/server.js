import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/send', async (req, res) => {
  console.log('Request body:', req.body);
  const { name, email, subject = '', message = '', date } = req.body;

  if (!name || !email || !date) {
    return res.status(400).json({ message: 'Missing required fields', received: req.body });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.SMTP_EMAIL,
      subject: subject || 'Wiadomość z formularza kontaktowego Pipistudio',
      html: `
        <h3>Nowe zapytanie o sesję:</h3>
        <p><strong>Imię i nazwisko:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Data i godzina sesji:</strong> ${date}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'E-mail został wysłany pomyślnie!' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ message: 'Nie udało się wysłać e-maila.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});