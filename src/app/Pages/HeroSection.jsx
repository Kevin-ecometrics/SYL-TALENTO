"use client"
import React from 'react'
import Image from 'next/image'; // Importar Image de 'next/image'
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

function HeroSection() {

    
    const slideInFromLeftH2 = {
        hidden: { x: -300, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }
    };

    const slideInFromRightH2 = {
        hidden: { x: 300, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }
    };

    return (
        <div id='inicio' className="flex flex-col items-center justify-center max-w-6xl min-h-screen py-2 mx-auto bg-white">
            <main className="flex flex-col items-center w-full px-4 mt-20 space-y-8 text-center bg-white sm:mt-20">
                <div className="mx-auto mb-16 tracking-normal text-blue-500 text-md max-w-1xl font-display sm:text-7xl">
                    <TypeAnimation
                        sequence={[
                            // Same substring at the start will only be typed out once, initially
                            'Bienvenido a SYL Talento'
                            ,
                            1000, // wait 1s before replacing "Mice" with "Hamsters"
                            'Bienvenido a SYL Contadores',
                            1000,
                            'Bienvenido a SYL Suministro',
                            1000,
                        ]}
                        wrapper="span"
                        speed={10}
                        style={{ fontSize: 'roboto-mono', display: 'inline-block' }}
                        repeat={Infinity}
                    />
                </div>
                <div className="flex flex-col items-center justify-between w-full space-y-4 sm:flex-row sm:space-y-0">
                    <motion.h2 className="flex-1 text-xl leading-7 text-black sm:text-black"
                        variants={slideInFromLeftH2}
                        initial="hidden"
                        animate="visible">
                        Nos dedicamos a brindar soluciones de reclutamiento y selección de personal, así como suministros de materiales y contaduría en Baja California y en toda la República Mexicana.
                        <br />
                        Somos una empresa 100% comprometida con la innovación, la integridad y la calidad.
                    </motion.h2>
                    <motion.div className="flex-1 ml-10"
                        variants={slideInFromRightH2}
                        initial="hidden"
                        animate="visible">
                        <Image src="/logo.png" alt="Descripción de la imagen" width={125} height={200} />
                    </motion.div>
                </div>
            </main>
        </div>
    )
}

export default HeroSection;
