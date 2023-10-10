"use client"
import React from 'react';
import { Card, CardBody } from "@nextui-org/react";
import { motion } from 'framer-motion';

function Servicios() {

    const fadeIn = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const serviciosData = [
        {
            title: "Subcontratación Especializada STPS: 17155",
            description: "Personal directo, indirecto y administrativo. Coordinamos los servicios profesionales y especializados que se requieran en la empresa. ¡Con ello, tu compañía reducirá costos y tiempo!"
        },
        {
            title: "Reclutamiento Masivo",
            description: "Facilitamos el proceso de selección de capital humano para los puestos que requieren. Esto te permite ahorrar tiempo y esfuerzo."
        },
        {
            title: "Reclutamiento Ejecutivo",
            description: "Atracción de talento ejecutivo y posiciones de alta especialidad en el mercado laboral y aplicación de psicometrías."
        },
        {
            title: "Maquila de Nómina",
            description: "Cálculo de nómina e impuestos, se lleva a cabo sin tener un departamento interno y se envía archivo para su dispersión."
        },
        {
            title: "Onboarding",
            description: "Garantizamos la satisfacción profesional de los empleados, un mejor desempeño laboral y minimizar las cotas de rotación en la compañía."
        },
        {
            title: "Estructuración Organizacional",
            description: "Asesoramos en estructuración de perfiles, análisis y descripción de puestos para tu organización y análisis de mercado."
        }
    ];
    const [zoomState, setZoomState] = React.useState({});


    const handleZoom = (index) => {
        if (zoomState[index] === "initial") {
            setZoomState(prev => ({ ...prev, [index]: "zoomed" }));
        } else {
            setZoomState(prev => ({ ...prev, [index]: "initial" }));
        }
    };

    return (
        <div id='servicios' className="flex flex-col items-center justify-center max-w-6xl min-h-screen py-2 mx-auto bg-white border-t-2 border-black">
            <main className="flex flex-col items-center w-full px-4 mt-20 space-y-8 text-center bg-white sm:mt-20">
                <h1 className="mb-8 text-5xl font-bold text-blue-500">Servicios</h1>
                <div className="flex flex-wrap justify-center gap-8">
                    {serviciosData.map((servicio, index) => (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            key={index}
                        >
                            <Card className="max-w-[400px] flex flex-col justify-between p-2">
                                <CardBody>
                                    <h2 className="mb-2 text-xl font-bold text-center">{servicio.title}</h2>
                                    <p>{servicio.description}</p>
                                </CardBody>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Servicios;
