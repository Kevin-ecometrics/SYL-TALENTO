"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardFooter, CardBody } from "@nextui-org/react";

function Servicios() {
  const [activeCard, setActiveCard] = useState(null);

  const serviciosData = [
    {
      title: "Subcontratación Especializada STPS: 17155",
      description:
        "Personal directo, indirecto y administrativo. Coordinamos los servicios profesionales y especializados que se requieran en la empresa. ¡Con ello, tu compañía reducirá costos y tiempo!",
    },
    {
      title: "Reclutamiento Masivo",
      description:
        "Facilitamos el proceso de selección de capital humano para los puestos que requieren. Esto te permite ahorrar tiempo y esfuerzo.",
    },
    {
      title: "Reclutamiento Ejecutivo",
      description:
        "Atracción de talento ejecutivo y posiciones de alta especialidad en el mercado laboral y aplicación de psicometrías.",
    },
    {
      title: "Maquila de Nómina",
      description:
        "Cálculo de nómina e impuestos, se lleva a cabo sin tener un departamento interno y se envía archivo para su dispersión.",
    },
    {
      title: "Onboarding",
      description:
        "Garantizamos la satisfacción profesional de los empleados, un mejor desempeño laboral y minimizar las cotas de rotación en la compañía.",
    },
    {
      title: "Estructuración Organizacional",
      description:
        "Asesoramos en estructuración de perfiles, análisis y descripción de puestos para tu organización y análisis de mercado.",
    },
  ];

  const toggleCard = (index) => {
    if (activeCard === index) {
      setActiveCard(null);
    } else {
      setActiveCard(index);
    }
  };

  return (
    <div
      id="servicios"
      className="flex flex-col items-center justify-center min-h-screen py-2 mx-auto bg-white border-t-2 border-black"
    >
      <main className="flex flex-col items-center w-full px-4 space-y-8 text-center bg-white sm:mt-20">
        <h1 className="mx-auto mb-6 text-4xl font-bold tracking-normal text-red-500 sm:text-5xl md:text-6xl">
          Servicios
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {serviciosData.map((servicio, index) => (
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
              className={`w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2 cursor-pointer ${
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
                  <h6 className="text-md md:text-2xl text-black">{servicio.title}</h6>
                </CardBody>
                <CardFooter>
                  <AnimatePresence>
                    {activeCard === index && (
                      <motion.p
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                      >
                        {servicio.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Servicios;
