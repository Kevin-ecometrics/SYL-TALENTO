import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  element: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    textAlign: "left",
    marginBottom: 10,
    marginTop: 10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 1,
    marginBottom: 0,
    fontSize: 10,
    padding: 5,
  },
});

// Create Document Component
const MyDocument = ({ solicitud }) => {
  const date = new Date(solicitud.created_at);
  const fecha_nacimiento = new Date(solicitud.fecha_nacimiento);
  const ingreso = new Date(solicitud.ingreso);
  const baja = new Date(solicitud.baja);
  // Define an array of month names
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Format the date
  const formattedDate = `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  const formattedFechaNacimiento = `${
    monthNames[fecha_nacimiento.getMonth()]
  } ${fecha_nacimiento.getDate()}, ${fecha_nacimiento.getFullYear()}`;

  const formattedIngreso = `${
    monthNames[ingreso.getMonth()]
  } ${ingreso.getDate()}, ${ingreso.getFullYear()}`;
  const formattedBaja = `${
    monthNames[baja.getMonth()]
  } ${baja.getDate()}, ${baja.getFullYear()}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>SOLICITUD DE EMPLEO</Text>
          <Image
            style={styles.logo}
            alt="SYL talento especialistas en Reclutamiento de personal para vacantes de empresas en México"
            src="/SYL talento especialistas en Reclutamiento de personal para vacantes de empresas en México.png"
          />
        </View>
        <View style={styles.element}>
          <Text style={styles.title}>DATOS PERSONALES</Text>
        </View>
        <View style={styles.section}>
          <Text>Puesto a solicitar: {solicitud.puesto}</Text>
          <Text>Fecha: {formattedDate}</Text>
        </View>
        <View style={styles.section}>
          <Text>Apellido Paterno: {solicitud.paterno}</Text>
          <Text>Apellido Materno: {solicitud.materno}</Text>
          <Text>Nombre (s): {solicitud.nombre}</Text>
          <Text>Edad: {solicitud.edad}</Text>
        </View>
        <View style={styles.section}>
          <Text>Calle: {solicitud.calle}</Text>
          <Text>Numero: {solicitud.numero}</Text>
          <Text>Colonia: {solicitud.colonia}</Text>
        </View>
        <View style={styles.section}>
          <Text>Telefono Celular: {solicitud.celular}</Text>
          <Text>Telefono de Emergencia: {solicitud.emergencia}</Text>
        </View>
        <View style={styles.section}>
          <Text>RFC: {solicitud.rfc}</Text>
          <Text>IMSS: {solicitud.imss}</Text>
          <Text>CURP: {solicitud.curp}</Text>
          <Text>SEXO: {solicitud.genero}</Text>
        </View>
        <View style={styles.section}>
          <Text>Credencial de Elector: {solicitud.elector}</Text>
          <Text>No. De crendencial: {solicitud.numero_credencial}</Text>
          <Text>Correo Electronico: {solicitud.correo}</Text>
        </View>
        <View style={styles.section}>
          <Text>Lugar de Nacimiento: {solicitud.lugar_nacimiento}</Text>
          <Text>Fecha de Nacimiento: {formattedFechaNacimiento}</Text>
          <Text>Nacionalidad: {solicitud.nacionalidad}</Text>
          <Text>Infonavit: {solicitud.infonavit}</Text>
        </View>
        <View style={styles.section}>
          <Text>Estado Civil: {solicitud.civil}</Text>
          <Text>Cuenta con cartilla Militar: {solicitud.militar}</Text>
          <Text>No. De Cartilla Militar: {solicitud.numero_cartilla}</Text>
        </View>
        <View style={styles.section}>
          <Text>Estatura: {solicitud.estatura}</Text>
          <Text>Peso: {solicitud.peso}</Text>
          <Text>
            Padece de alguna enfermedad cronica: {solicitud.enfermedad}
          </Text>
          <Text>Que tipo de tratamiento recibe?: {solicitud.tratamiento}</Text>
        </View>
        <View style={styles.element}>
          <Text style={styles.title}>ESCOLARIDAD</Text>
        </View>
        <View style={styles.section}>
          <Text>Nivel de escolaridad: {solicitud.escolaridad}</Text>
          <Text>Documento: {solicitud.documento}</Text>
        </View>
        <View style={styles.element}>
          <Text style={styles.title}>DISPONIBILIDAD</Text>
        </View>
        <View style={styles.section}>
          <Text>
            Puede trabajar en turnos diferentes?: {solicitud.turno_rotativo}
          </Text>
          <Text>Puede trabajar en fin de semana?: {solicitud.fin_semana}</Text>
        </View>
        <View style={styles.element}>
          <Text style={styles.title}>EMPLEO ANTERIOR</Text>
        </View>
        <View style={styles.section}>
          <Text>Nombre de la empresa: {solicitud.empresa}</Text>
          <Text>Direccion: {solicitud.empresa_direccion}</Text>
          <Text>Telefono: {solicitud.empresa_telefono}</Text>
        </View>
        <View style={styles.section}>
          <Text>Puesto desempeñado: {solicitud.empresa_puesto} </Text>
          <Text>Fecha de ingreso: {formattedIngreso} </Text>
          <Text>Fecha de baja: {formattedBaja}</Text>
        </View>
        <View style={styles.section}>
          <Text>Sueldo semanal: {solicitud.sueldo} </Text>
          <Text>Nombre del jefe inmediato: {solicitud.empresa_jefe}</Text>
          <Text>Motivo de su separacion: {solicitud.motivo} </Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
