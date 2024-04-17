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

app.post("/api/solicitudes_empleo", (req, res) => {
  const formData = req.body;
  const sql = `
  INSERT INTO solicitudes_empleo (
    calle, celular, ciudad, civil, colonia, correo, cp, curp, documento, edad, elector, emergencia, enfermedad, escolaridad, estado, estatura, fecha_nacimiento, fin_semana, genero, imss, infonavit, lugar_nacimiento, materno, militar, nacionalidad, nombre, numero, numero_cartilla, numero_credencial, paterno, peso, rfc, tratamiento, turno_rotativo, vacante_id, created_at, empresa, empresa_direccion, empresa_telefono, empresa_puesto, ingreso, baja, sueldo, empresa_jefe, motivo
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

  db.query(
    sql,
    [
      formData.calle,
      formData.celular,
      formData.ciudad,
      formData.civil,
      formData.colonia,
      formData.correo,
      formData.cp,
      formData.curp,
      formData.documento,
      formData.edad,
      formData.elector,
      formData.emergencia,
      formData.enfermedad,
      formData.escolaridad,
      formData.estado,
      formData.estatura,
      formData.fecha_nacimiento,
      formData.fin_semana,
      formData.genero,
      formData.imss,
      formData.infonavit,
      formData.lugar_nacimiento,
      formData.materno,
      formData.militar,
      formData.nacionalidad,
      formData.nombre,
      formData.numero,
      formData.numero_cartilla,
      formData.numero_credencial,
      formData.paterno,
      formData.peso,
      formData.rfc,
      formData.tratamiento,
      formData.turno_rotativo,
      formData.puesto,
      formData.empresa,
      formData.empresa_direccion,
      formData.empresa_telefono,
      formData.empresa_puesto,
      formData.ingreso,
      formData.baja,
      formData.sueldo,
      formData.empresa_jefe,
      formData.motivo,
    ],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error saving data to database");
      }

      res.status(201).send("Data saved successfully");
    }
  );
});

app.get("/api/solicitudes_empleo", (req, res) => {
  const sql = `
  SELECT solicitudes_empleo.*, vacantes.puesto AS puesto
  FROM solicitudes_empleo
  LEFT JOIN vacantes ON solicitudes_empleo.vacante_id = vacantes.id
`;
  db.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error fetching data from database");
    }

    res.status(200).json(results);
  });
});

app.delete("/api/solicitudes_empleo/:id", (req, res) => {
  const sql = "DELETE FROM solicitudes_empleo WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;

    res.send(`Solicitud de empleo con id ${req.params.id} fue eliminada.`);
  });
});

app.put("/vacantes/:id", (req, res) => {
  let sql = "UPDATE vacantes SET ? WHERE id = ?";
  let data = [req.body, req.params.id];

  db.query(sql, data, (err, result) => {
    if (err) throw err;
    res.send("Vacante actualizada con éxito");
  });
});

app.get("/puestos", (req, res) => {
  const sql = "SELECT * FROM puestos";

  db.query(sql, (err, results) => {
    if (err) throw err;

    res.send(results);
  });
});

app.post("/puestos", (req, res) => {
  const { puesto } = req.body;

  if (!puesto) {
    return res.status(400).send("Missing fields");
  }

  const sql = "INSERT INTO puestos (puesto) VALUES (?)";

  db.query(sql, [puesto], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error inserting into database");
    }

    res.status(200).send("Puesto added successfully");
  });
});

app.put("/puestos/:id", (req, res) => {
  let sql = "UPDATE puestos SET ? WHERE id = ?";
  let data = [req.body, req.params.id];

  db.query(sql, data, (err, result) => {
    if (err) throw err;
    res.send("Puesto actualizado con éxito");
  });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
