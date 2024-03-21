const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const upload = multer();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "syl_talento",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.ionos.mx",
    port: 587,
    secure: false,
    auth: {
      user: "contacto@syltalento.com",
      pass: "xArBytV#73Y2",
    },
  });

  const mailOptions = {
    from: email,
    to: "contacto@syltalento.com",
    subject: subject,
    text: `Nombre de contacto: ${name}\Correo electronico: ${email}\Mensaje: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.get("/vacantes", (req, res) => {
  const sql = "SELECT id, puesto, sueldo, pdf FROM vacantes";

  db.query(sql, (err, results) => {
    if (err) throw err;

    const vacantes = results.map((vacante) => {
      // Convertir el PDF a un Buffer
      const pdfBuffer = Buffer.from(vacante.pdf);
      return { ...vacante, pdf: pdfBuffer };
    });

    res.send(vacantes);
  });
});

app.post("/crear-vacantes", upload.single("file_input"), (req, res) => {
  const { vacante, sueldo } = req.body;
  const file = req.file;

  if (!vacante || !sueldo || !file) {
    return res.status(400).send("Missing fields");
  }

  const sql = "INSERT INTO vacantes (puesto, sueldo, pdf) VALUES (?, ?, ?)";
  const values = [vacante, sueldo, file.buffer];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error inserting into database");
    }

    res.status(200).send("Vacante added successfully");
  });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
