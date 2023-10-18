"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardBody } from "@nextui-org/react";
import { motion, useInView } from 'framer-motion';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";


function NosotroSection() {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const zoomEffect = {
    initial: { scale: 1 },
    hover: { scale: 1.1 }
  };

  const cascadeEffect = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + (i * 0.3)
      }
    })
  };

  const ref = useRef(null)
  const isInView = useInView(ref)

  const cardStyle = {
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  };

  

  return (
    <div id='nosotros' className="flex flex-col items-center justify-center min-h-screen py-2 mx-auto bg-white border-t-2 border-black">
      <main className="flex flex-col items-center w-full px-4 mt-8 space-y-8 text-center bg-white sm:mt-20" ref={ref}>
        <h1 className="mx-auto mb-6 text-4xl font-bold tracking-normal text-blue-500 sm:text-5xl md:text-6xl">Nuestros Valores</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            {
              title: "Dedicación",
              description: "Es cuando nos consagramos a una causa. Esta involucra dar lo mejor de nosotros y hacer nuestro mayor esfuerzo."
            },
            {
              title: "Innovación",
              description: "Mantener una actitud vanguardista y proactiva ante las oportunidades en un proceso de desarrollo continuo."
            },
            {
              title: "Cooperación",
              description: "Colaborar e involucrar el trabajo en equipo. Incluso las tareas más difíciles pueden hacerse rápidamente cuando se coopera."
            },
            {
              title: "Integridad",
              description: "Es cuando las acciones corresponden con nuestras palabras y cuando estas mismas se rigen por valores éticos."
            },
            {
              title: "Calidad",
              description: "La forma en que nuestros clientes perciben, definen y miden nuestros productos y servicios."
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
                <h2 className="mb-2 text-xl font-bold text-center">{value.title}</h2>
                <p>{value.description}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.div className="w-full mt-8"           
        variants={cascadeEffect}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}>
        <Accordion open={open === 1} className="px-4 mb-2 border rounded-lg border-blue-gray-100">
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className={`border-b-0 transition-colors ${
            open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          Misión
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal text-start">
        Crear relaciones positivas entre nuestros clientes y candidatos para el éxito de ambos.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} className="px-4 mb-2 border rounded-lg border-blue-gray-100">
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className={`border-b-0 transition-colors ${
            open === 2 ? "text-red-500 hover:!text-red-700" : ""
          }`}
        >
          Visión
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal text-start">
          Ser el proveedor de Talento Humano y asesoría de Recursos Humanos a nivel nacional de gran entrega.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} className="px-4 border rounded-lg border-blue-gray-100">
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className={`border-b-0 transition-colors ${
            open === 3 ? "text-orange-500 hover:!text-orange-700" : ""
          }`}
        >
          Cultura de Servicio
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal text-start">
        Nos dedicamos a dar lo mejor de nosotros, innovando siempre nuestros procesos con gran cooperación y trabajo en equipo
            en integridad y calidad para que nuestros clientes nos perciban, definan y midan por nuestros productos.
        </AccordionBody>
      </Accordion>
      </motion.div>
    </main>
  </div>
)
}

export default NosotroSection;