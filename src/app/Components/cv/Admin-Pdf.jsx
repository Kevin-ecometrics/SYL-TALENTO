import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Poppins",
  src: "https://fonts.gstatic.com/s/poppins/v1/TDTjCH39JjVycIF24TlO-Q.ttf", // URL de la fuente Poppins
});

Font.register({
  family: "Bebas Neue",
  src: "/BebasNeue-Regular.ttf", // URL de la fuente Acme
});
// Create styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
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
    marginTop: 10,
    height: 50,
  },
  title: {
    fontSize: 14,
    textAlign: "left",
    marginBottom: 10,
    marginTop: 10,
    color: "#000", // Hace que el color del texto
    fontFamily: "Bebas Neue",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 1,
    marginBottom: 0,
    fontSize: 8,
    color: "gray",
    padding: 5,
    fontFamily: "Poppins",
  },
  recuadroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recuadro: {
    flex: 0.4, // Cambiado de 1 a 0.4
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginTop: 10,
    marginRight: 2,
    marginBottom: 10,
    marginLeft: 2,
    fontSize: 7,
  },
  recuadro2: {
    flex: 0.6, // Cambiado de 1 a 0.4
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginTop: 10,
    marginRight: 2,
    marginBottom: 10,
    marginLeft: 2,
    fontSize: 7,
  },
  titleRecuadro: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 4,
    fontWeight: "bold",
    color: "#000", // Hace que el color del texto sea negro
    fontFamily: "Bebas Neue",
  },
  sectionEmpleos: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
    flexWrap: "wrap", // Añadido para permitir el ajuste de los elementos
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 1,
    marginBottom: 0,
    fontSize: 8,
    padding: 5,
  },
  label: {
    color: "black",
    fontWeight: "bold", // Esto hará que el texto de la etiqueta sea en negrita
  },
  value: {
    color: "gray",
  },
  empleoItem: {
    width: "33.33%", // Cada elemento ocupará un tercio del espacio
    padding: 5, // Añade un poco de espacio alrededor de cada elemento
  },
  row: {
    flexDirection: "row",
  },
});

// Create Document Component
const MyDocument = ({ solicitud }) => {
  const date = new Date(solicitud.created_at);
  const fecha_nacimiento = new Date(solicitud.fecha_nacimiento);
  const ingreso = new Date(solicitud.ingreso);
  const baja = new Date(solicitud.baja);
  const ingreso2 = new Date(solicitud.ingreso2);
  const baja2 = new Date(solicitud.baja2);
  const ingreso3 = new Date(solicitud.ingreso3);
  const baja3 = new Date(solicitud.baja3);
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

  const formattedIngreso2 = `${
    monthNames[ingreso2.getMonth()]
  } ${ingreso2.getDate()}, ${ingreso2.getFullYear()}`;

  const formattedBaja2 = `${
    monthNames[baja2.getMonth()]
  } ${baja2.getDate()}, ${baja2.getFullYear()}`;

  const formattedIngreso3 = `${
    monthNames[ingreso3.getMonth()]
  } ${ingreso3.getDate()}, ${ingreso3.getFullYear()}`;

  const formattedBaja3 = `${
    monthNames[baja3.getMonth()]
  } ${baja3.getDate()}, ${baja3.getFullYear()}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>SOLICITUD DE EMPLEO</Text>
          <Image
            style={styles.logo}
            alt="SYL talento especialistas en Reclutamiento de personal para vacantes de empresas en México"
            src="/SYL_TALENTO_LOGO_PDF.jpeg"
          />
        </View>
        <View style={styles.element}>
          <Text style={styles.title}>DATOS PERSONALES</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Puesto solicitado: </Text>
            <Text style={styles.value}>{solicitud.puesto}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha: </Text>
            <Text style={styles.value}>{formattedDate}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Apellido Paterno: </Text>
            <Text style={styles.value}>{solicitud.paterno}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Apellido Materno: </Text>
            <Text style={styles.value}>{solicitud.materno}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Nombre(s): </Text>
            <Text style={styles.value}>{solicitud.nombre}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Edad: </Text>
            <Text style={styles.value}>{solicitud.edad}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Calle: </Text>
            <Text style={styles.value}>{solicitud.calle}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Número:</Text>
            <Text style={styles.value}>{solicitud.numero}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Colonia:</Text>
            <Text style={styles.value}>{solicitud.colonia}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Teléfono Celular: </Text>
            <Text style={styles.value}>{solicitud.celular}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Teléfono de Emergencia: </Text>
            <Text style={styles.value}>{solicitud.emergencia}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>RFC: </Text>
            <Text style={styles.value}>{solicitud.rfc}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>IMSS: </Text>
            <Text style={styles.value}>{solicitud.imss}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>CURP: </Text>
            <Text style={styles.value}>{solicitud.curp}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Género: </Text>
            <Text style={styles.value}>{solicitud.genero}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Credencial de Elector: </Text>
            <Text style={styles.value}>{solicitud.elector}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>No. De credencial: </Text>
            <Text style={styles.value}>{solicitud.numero_credencial}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Correo Electrónico: </Text>
            <Text style={styles.value}>{solicitud.correo}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Lugar de Nacimiento: </Text>
            <Text style={styles.value}>{solicitud.lugar_nacimiento}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Fecha de Nacimiento: </Text>
            <Text style={styles.value}>{formattedFechaNacimiento}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Nacionalidad: </Text>
            <Text style={styles.value}>{solicitud.nacionalidad}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Infonavit: </Text>
            <Text style={styles.value}>{solicitud.infonavit}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Estado Civil: </Text>
            <Text style={styles.value}>{solicitud.civil}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Cuenta con cartilla Militar: </Text>
            <Text style={styles.value}>{solicitud.militar}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>No. De Cartilla Militar: </Text>
            <Text style={styles.value}>{solicitud.numero_cartilla}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Estatura: </Text>
            <Text style={styles.value}>{solicitud.estatura}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Peso: </Text>
            <Text style={styles.value}>{solicitud.peso}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              ¿Padece alguna enfermedad crónica?:{" "}
            </Text>
            <Text style={styles.value}>{solicitud.enfermedad}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>¿Qué tipo de tratamiento recibe?: </Text>
            <Text style={styles.value}>{solicitud.tratamiento}</Text>
          </View>
        </View>

        <View style={styles.element}>
          <Text style={styles.title}>ESCOLARIDAD</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Nivel de escolaridad: </Text>
            <Text style={styles.value}>{solicitud.escolaridad}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Documento: </Text>
            <Text style={styles.value}>{solicitud.documento}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Carrera: </Text>
            <Text style={styles.value}>{solicitud.carrera}</Text>
          </View>
        </View>

        <View style={styles.element}>
          <Text style={styles.title}>DISPONIBILIDAD</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>
              ¿Puede trabajar en turnos diferentes?:{" "}
            </Text>
            <Text style={styles.value}>{solicitud.turno_rotativo}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              ¿Puede trabajar en fin de semana?:{" "}
            </Text>
            <Text style={styles.value}>{solicitud.fin_semana}</Text>
          </View>
        </View>

        <View style={styles.element}>
          <Text style={styles.title}>EXPERIENCIA LABORAL</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Experiencia: </Text>
            <Text style={styles.value}>{solicitud.experiencia}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Funciones principales: </Text>
            <Text style={styles.value}>{solicitud.funciones}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Software principales: </Text>
            <Text style={styles.value}>{solicitud.software}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Herramientas principales: </Text>
            <Text style={styles.value}>{solicitud.maquinas}</Text>
          </View>
        </View>
        <View style={styles.element}>
          <Text style={styles.title}>EMPLEO ANTERIOR</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.sectionEmpleos}>
            <View style={styles.row}>
              <Text style={styles.label}>Nombre de la empresa: </Text>
              <Text style={styles.value}>{solicitud.empresa}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Dirección: </Text>
              <Text style={styles.value}>{solicitud.empresa_direccion}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Teléfono: </Text>
              <Text style={styles.value}>{solicitud.empresa_telefono}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Puesto desempeñado: </Text>
              <Text style={styles.value}>{solicitud.empresa_puesto}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Fecha de ingreso: </Text>
              <Text style={styles.value}>{formattedIngreso}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Fecha de baja: </Text>
              <Text style={styles.value}>{formattedBaja}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Sueldo semanal: </Text>
              <Text style={styles.value}>{solicitud.sueldo}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Nombre del jefe inmediato: </Text>
              <Text style={styles.value}>{solicitud.empresa_jefe}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Motivo de su separación: </Text>
              <Text style={styles.value}>{solicitud.motivo}</Text>
            </View>
          </View>

          {solicitud.empresa2 ? (
            <View style={styles.sectionEmpleos}>
              <View style={styles.row}>
                <Text style={styles.label}>Nombre de la empresa: </Text>
                <Text style={styles.value}>{solicitud.empresa2}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Dirección: </Text>
                <Text style={styles.value}>{solicitud.empresa_direccion2}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Teléfono: </Text>
                <Text style={styles.value}>{solicitud.empresa_telefono2}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Puesto desempeñado: </Text>
                <Text style={styles.value}>{solicitud.empresa_puesto2}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Fecha de ingreso: </Text>
                <Text style={styles.value}>{formattedIngreso2}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Fecha de baja: </Text>
                <Text style={styles.value}>{formattedBaja2}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Sueldo semanal: </Text>
                <Text style={styles.value}>{solicitud.sueldo2}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Nombre del jefe inmediato: </Text>
                <Text style={styles.value}>{solicitud.empresa_jefe2}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Motivo de su separación: </Text>
                <Text style={styles.value}>{solicitud.motivo2}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.sectionEmpleos}>
              <Text>No se proporcionó información para un empleo anterior</Text>
            </View>
          )}
          {solicitud.empresa3 ? (
            <View style={styles.sectionEmpleos}>
              <View style={styles.row}>
                <Text style={styles.label}>Nombre de la empresa: </Text>
                <Text style={styles.value}>{solicitud.empresa3}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Dirección: </Text>
                <Text style={styles.value}>{solicitud.empresa_direccion3}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Teléfono: </Text>
                <Text style={styles.value}>{solicitud.empresa_telefono3}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Puesto desempeñado: </Text>
                <Text style={styles.value}>{solicitud.empresa_puesto3}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Fecha de ingreso: </Text>
                <Text style={styles.value}>{formattedIngreso3}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Fecha de baja: </Text>
                <Text style={styles.value}>{formattedBaja3}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Sueldo semanal: </Text>
                <Text style={styles.value}>{solicitud.sueldo3}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Nombre del jefe inmediato: </Text>
                <Text style={styles.value}>{solicitud.empresa_jefe3}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Motivo de su separación: </Text>
                <Text style={styles.value}>{solicitud.motivo3}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.sectionEmpleos}>
              <Text>No se proporcionó información para un empleo anterior</Text>
            </View>
          )}
        </View>
        <View style={styles.recuadroContainer}>
          <View style={styles.recuadro}>
            <Text style={styles.titleRecuadro}>INFORMACIÓN VERÍDICA</Text>
            <Text>
              Bajo protesta de decir verdad, declaro que la información que les
              estoy proporcionando es total y completamente verídica, toda vez
              que estoy consciente de que en caso de brindar información falsa y
              ser contratado, la empresa se reserva el derecho de rescindirme de
              mis labores de manera justificada según lo estipulado en el
              artículo 47 de la Ley Federal del Trabajo vigente.
            </Text>
          </View>
          <View style={styles.recuadro2}>
            <Text style={styles.titleRecuadro}>AVISO DE PRIVACIDAD</Text>
            <Text>
              SYL TALENTO S.A. DE C.V. y las empresas que pertenecen al grupo,
              declara la empresa en este acto que es responsable de recabar los
              datos personales del Titular, para que les de seguridad
              administrativas, técnicas y físicas que permitan proteger los
              datos personales contra daño. La información personal será
              utilizada para los procesos de Reclutamiento, Selección y
              Evaluaciones de los departamentos de Recursos Humanos de los
              clientes de esta empresa. Asimismo, le informamos que sus datos
              personales pueden ser transferidos y tratados dentro y fuera del
              país, por personas distintas a esta empresa. En ese sentido, su
              información puede ser compartida con los clientes de esta empresa
              exclusivamente para los fines ya indicados.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
