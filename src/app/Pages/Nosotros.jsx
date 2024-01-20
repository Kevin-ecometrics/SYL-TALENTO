"use client";
import React, { useRef } from "react";
import { Card, CardBody, Accordion, AccordionItem } from "@nextui-org/react";
import { motion, useInView } from "framer-motion";
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

  const cardStyle = {
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
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
          {[
            {
              title: "Dedicación",
              description:
                "Es cuando nos consagramos a una causa. Esta involucra dar lo mejor de nosotros y hacer nuestro mayor esfuerzo.",
            },
            {
              title: "Innovación",
              description:
                "Mantener una actitud vanguardista y proactiva ante las oportunidades en un proceso de desarrollo continuo.",
            },
            {
              title: "Cooperación",
              description:
                "Colaborar e involucrar el trabajo en equipo. Incluso las tareas más difíciles pueden hacerse rápidamente cuando se coopera.",
            },
            {
              title: "Integridad",
              description:
                "Es cuando las acciones corresponden con nuestras palabras y cuando estas mismas se rigen por valores éticos.",
            },
            {
              title: "Calidad",
              description:
                "La forma en que nuestros clientes perciben, definen y miden nuestros productos y servicios.",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/4 max-w-[400px] p-2"
              variants={zoomEffect}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              style={cardStyle}
            >
              <Card className="w-full h-full">
                <CardBody>
                  <h2 className="mb-2 text-2xl font-bold text-center">
                    {value.title}
                  </h2>
                  <p>{value.description}</p>
                </CardBody>
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
              Crear relaciones positivas entre nuestros clientes y candidatos
              para el éxito de ambos.
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
