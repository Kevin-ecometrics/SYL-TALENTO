"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardBody } from "@nextui-org/react";
import { motion } from 'framer-motion';
import {Accordion, AccordionItem} from "@nextui-org/react";

function useInView() {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isInView];
}

function NosotroSection() {
  const zoomEffect = {
    initial: { scale: 1 },
    hover: { scale: 1.1 }
  };

  const cardStyle = {
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
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

  const [ref, isInView] = useInView();

  return (
    <div id='nosotros' className="flex flex-col items-center justify-center max-w-6xl min-h-screen py-2 mx-auto bg-white border-t-2 border-black">
      <main className="flex flex-col items-center w-full px-4 mt-20 space-y-8 text-center bg-white sm:mt-20" ref={ref}>
        <h1 className="mb-8 text-5xl font-bold text-blue-500">Nuestros Valores</h1>
        <div className="flex flex-wrap justify-center gap-8">
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
              className="w-1/2 max-w-[400px] flex flex-col justify-between p-2"
              variants={zoomEffect}
              initial="initial"
              whileHover="hover"
              style={cardStyle}
            >
              <Card className="max-w-[400px] flex flex-col justify-between">
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
          <Accordion>
            <AccordionItem key="1" aria-label="Misión" title="Misión" className='text-black text-start'>
              Crear relaciones positivas entre nuestros clientes y candidatos para el éxito de ambos.
            </AccordionItem>
            <AccordionItem key="2" aria-label="Visión" title="Visión" className='text-black text-start'>
              Ser el proveedor de Talento Humano y asesoría de Recursos Humanos a nivel nacional de gran entrega.
            </AccordionItem>
          </Accordion>
        </motion.div>
      </main>
    </div>
  )
}

export default NosotroSection;