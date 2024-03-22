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
  const sql = "SELECT id, puesto, sueldo FROM vacantes";

  db.query(sql, (err, results) => {
    if (err) throw err;

    res.send(results);
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

app.get("/syl-talento/vacante-pdf/:id", (req, res) => {
  const sql = `SELECT pdf FROM vacantes WHERE id = ?`;

  db.query(sql, [req.params.id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error fetching PDF from database");
    }

    res.contentType("application/pdf");
    res.send(results[0].pdf);
  });
});

app.post("/solicitudes", upload.single("vacantepdf"), (req, res) => {
  const { nombre, correo, celular, vacanteId } = req.body; // Usa 'vacanteId' en lugar de 'vacante.id'
  const vacantepdf = req.file.buffer;

  if (!nombre || !correo || !celular || !vacantepdf || !vacanteId) {
    return res.status(400).send("Missing fields");
  }

  const sql =
    "INSERT INTO solicitudes (nombre, correo, celular, pdf, vacante_id, created_at) VALUES (?, ?, ?, ?, ?, NOW())";
  const values = [nombre, correo, celular, vacantepdf, vacanteId];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error inserting into database");
    }

    const solicitudId = results.insertId;
    const sqlRelational =
      "INSERT INTO solicitudes_vacantes (solicitud_id, vacante_id) VALUES (?, ?)";
    const valuesRelational = [solicitudId, vacanteId];

    db.query(sqlRelational, valuesRelational, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error inserting into relational database");
      }

      res.status(200).send("Solicitud added successfully");
    });
  });
});

app.get("/solicitudes_vacantes", (req, res) => {
  const sql = `
    SELECT *
    FROM solicitudes_vacantes sv
    INNER JOIN solicitudes s ON sv.solicitud_id = s.id
    INNER JOIN vacantes v ON sv.vacante_id = v.id
  `;

  db.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error fetching data from database");
    }

    res.status(200).json(results);
  });
});

app.get("/syl-talento/ver-pdf/:id", (req, res) => {
  const sql = `SELECT pdf FROM solicitudes WHERE id = ?`;

  db.query(sql, [req.params.id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error fetching PDF from database");
    }

    res.contentType("application/pdf");
    res.send(results[0].pdf);
  });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
