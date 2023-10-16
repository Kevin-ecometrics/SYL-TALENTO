import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

const LINKS = [
  {
    title: "Compañia",
    items: [
      {
        name: "Sobre nosotros",
        isModal: true,
        modalContent:
          "Nos dedicamos a dar lo mejor de nosotros, innovando siempre nuestros procesos con gran cooperación y trabajo en equipo en integridad y calidad para que nuestros clientes nos perciban, definan y midan por nuestros productos  ",
      },
      {
        name: "Terminos y servicios",
        isModal: true,
        modalContent:
          "La página de syltalento.com contiene el contacto directo con nuestro personal de atención a cliente. \n\n Toda reservación realizada en la página es directa a nuestra agenda en la recepción. \n\n Las citas son confirmadas por teléfono y deberán ser atendidas por el cliente en el periodo de 48hrs a 24hrs antes de la cita. \n\n Citas no confirmadas podrán ser consideradas como canceladas por el cliente. \n\n Toda situación que se presente por cambio o devolución deberán ser notificado por correo electrónico a contacto@syltalento.com enviando descripción del problema o razón de la cancelación. ",
      },
      {
        name: "Politica de privacidad",
        isModal: true,
        modalContent:
          "En Syltalento.com, accesible desde https://www.syltalento.com una de nuestras principales prioridades es la privacidad de nuestros visitantes. Este documento de Política de Privacidad contiene los tipos de información que son recopilados y registrados por SYL talento y cómo los usamos. \n\n Si tiene preguntas adicionales o requiere más información sobre nuestra Política de Privacidad, no dude en contactarnos. \n\n Esta Política de Privacidad se aplica únicamente a nuestras actividades en línea y es válida para los visitantes de nuestro sitio web en lo que respecta a la información que comparten y/o recopilan en syltalento.com. Esta política no es aplicable a ninguna información recolectada fuera de línea o a través de otros canales que no sean este sitio web. \n\n Consentimiento \n Al utilizar nuestro sitio web, usted acepta nuestra Política de Privacidad y está de acuerdo con sus términos. \n\n  La información que recogemos \n La información personal que se le pide que proporcione, y las razones por las que se le pide que la proporcione, se le aclarará en el momento en que le pidamos que proporcione su información personal. \n  Si se pone en contacto con nosotros directamente, es posible que recibamos información adicional sobre usted, como su nombre, dirección de correo electrónico, número de teléfono, el contenido del mensaje y/o los archivos adjuntos que nos envíe, y cualquier otra información que decida proporcionar. \n\n Cuando se registra en una Cuenta, podemos pedirle su información de contacto, incluyendo elementos como el nombre, el nombre de la empresa, la dirección, la dirección de correo electrónico y el número de teléfono. \n\n Cómo utilizamos su información \n Utilizamos la información que recogemos de varias maneras, incluyendo:\n\n Proporcionar, operar y mantener nuestra web\n Mejorar, personalizar y ampliar nuestra web\n Comprender y analizar cómo se utiliza nuestra web\n Desarrollar nuevos productos, servicios, características y funcionalidades \n  Comunicarse con usted, ya sea directamente o a través de uno de nuestros socios, incluyendo el servicio de atención al cliente, para proporcionarle actualizaciones y otra información relacionada con la web, y para fines de marketing y promoción. \n Enviarte emails \n Encontrar y prevenir el fraude \n\n Archivos de registro \nsyltalento.com sigue un procedimiento estándar de uso de archivos de registro. Estos archivos registran a los visitantes cuando visitan los sitios web. Todas las empresas de hosting hacen esto y una parte de los análisis de los servicios de hosting. La información recogida por los archivos de registro incluye las direcciones del protocolo de Internet (IP), el tipo de navegador, el proveedor de servicios de Internet (ISP), la fecha y la hora, las páginas de referencia/salida y posiblemente el número de clics. Éstas no están vinculadas a ninguna información que permita la identificación personal. El propósito de la información es analizar las tendencias, administrar el sitio, rastrear el movimiento de los usuarios en el sitio web y reunir información demográfica. Nuestra Política de Privacidad fue creada con la ayuda del Generador de Política de Privacidad y el Generador de Descargo de Responsabilidad. \n\n Cookies y Web Beacons \n Como cualquier otro sitio web, syltalento.com usa cookies. Estas cookies se utilizan para almacenar información, incluyendo las preferencias de los visitantes, y las páginas del sitio web que el visitante accedió o visitó. La información se utiliza para optimizar la experiencia de los usuarios personalizando el contenido de nuestra página web en función del tipo de navegador de los visitantes y/u otra información. \n\n Para obtener más información general sobre las cookies, lea ¿Qué son las cookies?\n Cookie DART de Google DoubleClick \n Google es uno de los terceros proveedores de nuestro sitio. También utiliza cookies, conocidas como cookies DART, para publicar anuncios a los visitantes de nuestro sitio en base a su visita a www.website.com y otros sitios en Internet. Sin embargo, los visitantes pueden optar por rechazar el uso de las cookies de DART visitando el anuncio de Google y la red de contenido de la Política de Privacidad en la siguiente URL - https://policies.google.com/technologies/ads \n\n Nuestros socios publicitarios\n Algunos de los anunciantes de nuestro sitio pueden usar cookies y web beacons. Nuestros socios publicitarios se enumeran a continuación. Cada uno de nuestros socios publicitarios tiene su propia política de privacidad para sus políticas de datos de usuario. Para facilitar el acceso, hemos creado un hipervínculo a sus políticas de privacidad a continuación.\n\n Google \n\n https://policies.google.com/technologies/ads \n\n Políticas de privacidad de los socios publicitarios \nPuede consultar esta lista para encontrar la política de privacidad de cada uno de los socios publicitarios de syltalento.com\n\n Los servidores o redes publicitarias de terceros utilizan tecnologías como cookies, JavaScript o Web Beacons que se utilizan en sus respectivos anuncios y enlaces que aparecen en syltalento.com, los cuales se envían directamente al navegador del usuario. Ellos reciben automáticamente su dirección IP cuando esto ocurre. Estas tecnologías se utilizan para medir la eficacia de sus campañas publicitarias y/o para personalizar el contenido publicitario que usted ve en los sitios web que visita.\n\n Tenga en cuenta que SYL talento no tiene acceso ni control sobre estas cookies que utilizan los anunciantes de terceros.\n\n  Políticas de privacidad de terceros\n La política de privacidad de SYL talento representada por David Solis Lizárraga no se aplica a otros anunciantes o sitios web. Por lo tanto, le aconsejamos que consulte las respectivas políticas de privacidad de estos servidores de anuncios de terceros para obtener información más detallada. Puede incluir sus prácticas e instrucciones acerca de cómo excluirse de ciertas opciones.",
      },
    ],
  },

  {
    title: "Seccion",
    items: [
      { name: "Nosotros", href: "#nosotros" },
      { name: "Servicios", href: "#servicios" },
      { name: "Quienes somos", href: "#quienesSomos" },
      { name: "Cliente", href: "#clientes" },
    ],
  },
  {
    title: "Recurso",
    items: [
      {
        name: "Syl Talento1",
        href: "https://www.facebook.com/SYLTalento1",
        target: "_blank",
      },
      {
        name: "Syl Talento mexicali",
        href: "https://www.facebook.com/profile.php?id=100063574134270&mibextid=ZbWKwL",
        target: "_blank",
      },
      {
        name: "Whatsapp",
        href: "https://api.whatsapp.com/send?phone=5216642145977&text=Hola%20Syltalento",
        target: "_blank",
      },
      {
        name: "Tijuana",
        href: "https://www.google.com/maps/place/SYL+TALENTO/@32.5265676,-117.0379149,19z/data=!3m1!4b1!4m6!3m5!1s0x80d9496b1dc83891:0x624ffaf809fcd4a1!8m2!3d32.5265665!4d-117.0366985!16s%2Fg%2F11s3xwnk7q?entry=ttu",
        target: "_blank",
      },
      {
        name: "Mexicali",
        href: "https://www.google.com/maps/place/SYL+TALENTO+MEXICALI/@32.6081827,-115.3850134,17z/data=!3m1!4b1!4m6!3m5!1s0x80d77786cb034bc9:0xd47058a0e5a7d5a4!8m2!3d32.6081782!4d-115.3824331!16s%2Fg%2F11t_q_47jg?entry=ttu",
        target: "_blank",
      },
    ],
  },
];

export default function Footer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeModal, setActiveModal] = React.useState(null);
  const [activeModalName, setActiveModalName] = React.useState(null);
  const [scrollBehavior] = React.useState("inside");

  const openModal = (modalContent, name) => {
    setActiveModal(modalContent);
    setActiveModalName(name);
    onOpen();
  };

  return (
    <footer className="relative w-full mt-8 border-t border-black">
      <div className="w-full px-8 mx-auto mt-8 max-w-7xl">
        <div className="grid justify-between grid-cols-1 gap-4 md:grid-cols-2">
          <Image src="/SYL.png" width={150} height={100} alt="LOGO" />
          <div className="grid justify-between grid-cols-3 gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  color="black"
                  className="mb-3 font-medium opacity-40"
                >
                  {title}
                </Typography>
                {items.map(({ name, href, target, modalContent, isModal }) => (
                  <li key={name}>
                    <Typography
                      as="a"
                      onClick={
                        isModal ? () => openModal(modalContent, name) : null
                      } 
                      href={href}
                      target={target}
                      color="gray"
                      className="py-1.5 font-normal transition-colors hover:text-blue-500"
                    >
                      {name}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full py-4 mt-12 border-t border-black md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 font-normal text-center text-blue-gray-900 md:mb-0"
          >
            Todos los derechos reservados SYL Talento 2023 &copy; ,
            syltalento.com es desarollado por{" "}
            <a
              className="text-red-500 hover:text-red-700"
              href="https://www.e-commetrics.com/"
            >
              e-commetrics.com
            </a>
          </Typography>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior={scrollBehavior}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <p className="text-center text-black">{activeModalName}</p>
                </ModalHeader>
                <ModalBody className="border border-black rounded-md">
                  <p className="text-black">
                    {activeModal.split("\n").map((str, index, array) => (
                      <React.Fragment key={index}>
                        {str}
                        {index === array.length - 1 ? null : <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </footer>
  );
}
