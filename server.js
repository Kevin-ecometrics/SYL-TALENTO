const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.ionos.mx',
    port: 587,
    secure: false,
    auth: {
      user: 'contacto@syltalento.com',
      pass: 'xArBytV#73Y2'
    }
  });

  const mailOptions = {
    from: email,
    to: 'contacto@syltalento.com',
    subject: subject,
    text: `Nombre de contacto: ${name}\Correo electronico: ${email}\Mensaje: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});