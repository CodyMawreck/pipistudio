import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const MIN_SUBMIT_TIME_MS = 2_500;
const MAX_SUBMIT_AGE_MS = 1000 * 60 * 60 * 12;

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_ORIGINS = (process.env.FRONTEND_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || FRONTEND_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function assertFormShield(payload) {
  const website = typeof payload.website === 'string' ? payload.website.trim() : '';
  const startedAt =
    typeof payload.startedAt === 'number'
      ? payload.startedAt
      : typeof payload.startedAt === 'string'
        ? Number(payload.startedAt)
        : NaN;

  if (website) {
    return 'Nieprawidłowe dane formularza';
  }

  if (!Number.isFinite(startedAt)) {
    return 'Nieprawidłowe dane formularza';
  }

  const elapsed = Date.now() - startedAt;

  if (elapsed < MIN_SUBMIT_TIME_MS || elapsed > MAX_SUBMIT_AGE_MS) {
    return 'Nieprawidłowe dane formularza';
  }

  return '';
}

app.post('/send', async (req, res) => {
  console.log('Request body:', req.body);
  const { name, email, subject = '', message = '', date } = req.body;
  const shieldError = assertFormShield(req.body);

  if (shieldError) {
    return res.status(400).json({ message: shieldError });
  }

  if (!name || !email || !date) {
    return res.status(400).json({ message: 'Brakuje wymaganych pól formularza.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Podaj poprawny adres e-mail.' });
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
      from: `"Pipistudio formularz" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL,
      replyTo: email,
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
  console.log(`Server running on port ${PORT}`);
});
