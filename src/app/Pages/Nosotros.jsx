"use client";
import React, { useRef, useState } from "react";
import { Card, CardBody, Accordion, AccordionItem, CardFooter } from "@nextui-org/react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Banner from '/public/banner.png';
function NosotroSection() {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const zoomEffect = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
  };

  const cascadeEffect = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.3,
      },
    }),
  };

  const ref = useRef(null);
  const isInView = useInView(ref);
  const [activeCard, setActiveCard] = useState(null);

  const valores = [
    {
      title: "Dedicación",
      description:
        "Es cuando nos consagramos a una causa que nos motiva a poner todo de nosotros en todo lo que hacemos. Significa estar comprometido con un objetivo y hacer un gran esfuerzo para lograrlo. Se refleja en nuestro compromiso con la excelencia, nuestro esfuerzo por superar las expectativas y nuestra voluntad de ir más allá de lo que se espera de nosotros."
    },
    {
      title: "Innovación",
        description:
        
        "Es mantener una actitud vanguardista y proactiva que nos, impulsa a buscar nuevas formas de hacer las cosas. Siempre, abiertos a nuevas ideas, dispuestos a experimentar y correr, riesgos. Está en nuestro trabajo cuando buscamos formas, de mejorar nuestros productos y servicios, nuestros, procesos y nuestras prácticas."
    },
    {
      title: "Cooperación",
      description:
      "Implica colaborar e involucrar al equipo, y nos impulsa a trabajar juntos para alcanzar un objetivo común. Significa ser respetuosos, colaborativos y dispuestos a ayudar a los demás. En nuestro trabajo, la cooperación se refleja en nuestra capacidad de trabajar en equipo, de compartir información y de resolver problemas juntos."
    },
    {
      title: "Integridad",
      description:
        "Es cuando las acciones corresponden con nuestras palabras siendo éticos y honestos en todo lo que hacemos. Significa tener coherencia entre lo que decimos y lo que hacemos. La integridad la proyectamos siendo honestos con nuestros clientes."
    },
    {
      title: "Calidad",
      description:
      "Significa cumplir con los estándares establecidos, superar las expectativas de los clientes y buscar constantemente la mejora que se refleja en nuestra atención al detalle, nuestro compromiso con la excelencia y nuestra búsqueda de la mejora continua."
    },
  ]
  const toggleCard = (index) => {
    if (activeCard === index) {
      setActiveCard(null);
    } else {
      setActiveCard(index);
    }
  };
  return (
    <div
      id="nosotros"
      className="flex flex-col items-center justify-center min-h-screen py-2 mx-auto bg-white border-t-2 border-black"
    >
      <section
        className="flex flex-col items-center w-full px-4 mt-8 space-y-8 text-center bg-white sm:mt-20"
        ref={ref}
      >
        <h1 className="mx-auto mb-6 text-4xl font-bold tracking-normal text-blue-500 sm:text-5xl md:text-6xl">
          Nuestros Valores
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
        {valores.map((valores, index) => (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.5 + index * 0.1 },
              }}
              exit={{
                opacity: 0,
                y: -20,
                transition: { delay: 0.5 + index * 0.1 },
              }}
              key={index}
              onClick={() => toggleCard(index)}
              className={`w-full sm:w-1/2 lg:w-72 xl:w-96 p-2 cursor-pointer ${
                activeCard === index ? "max-w-xl" : "max-w-[500px]"
              }`}
            >
              <Card
                isFooterBlurred
                radius="lg"
                className="w-full text-center border-4 border-blue-200 shadow-blue-500"
              >
                <CardBody
                  variant="gradient"
                  color="white"
                  className="grid h-24 mt-2 text-center border place-items-center"
                >
                  <h6 className="text-md md:text-2xl text-black font-bold">{valores.title}</h6>
                </CardBody>
                <CardFooter>
                  <AnimatePresence>
                    {activeCard === index && (
                      <motion.p
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                      >
                        {valores.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        <div>
          <Image src={Banner} alt="Banner Syl Talento" layout="responsive" width={1920} height={720} />       
        </div>
        <motion.div
          className="w-full mt-8 "
          variants={cascadeEffect}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Accordion>
            <AccordionItem key="1" aria-label="Accordion 1" title="Misión" className="text-blue-500 text-2xl text-start">
            Nuestra misión es ser el socio estratégico preferido de empresas de alto nivel que buscan talento excepcional. Trabajamos en estrecha colaboración con nuestros clientes para identificar candidatos que se alineen no solo con sus necesidades técnicas, sino también con su cultura y valores. 
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Visión" className="text-red-500 text-2xl text-start">
              Ser el proveedor de Talento Humano y asesoría de Recursos Humanos
              a nivel nacional de gran entrega.
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Accordion 3"
              title="Cultura de Servicio"
              className="text-orange-500 text-2xl text-start"
            >
              Nos dedicamos a dar lo mejor de nosotros, innovando siempre
              nuestros procesos con gran cooperación y trabajo en equipo en
              integridad y calidad para que nuestros clientes nos perciban,
              definan y midan por nuestros productos.
            </AccordionItem>
          </Accordion>
        </motion.div>
      </section>
    </div>
  );
}

export default NosotroSection;
