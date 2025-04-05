const nodemailer = require('nodemailer');

async function sendEmail({ to, subject, text, html }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // This should be your app-specific password
    },
    // Optional: if you encounter TLS issues, uncomment the following:
    // tls: {
    //   rejectUnauthorized: false,
    // },
  });

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
  });
}

module.exports = { sendEmail };
