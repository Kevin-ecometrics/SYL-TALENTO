"use client"
import React from 'react'
import Image from 'next/image'; // Importar Image de 'next/image'
import { motion } from 'framer-motion';

function HeroSection() {
    const slideInFromRightH1 = {
        hidden: { x: 300, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
    };
    
    const slideInFromRightH2 = {
        hidden: { x: 300, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }
    };

    return (
        <div id='inicio' className="flex flex-col items-center justify-center max-w-6xl min-h-screen py-2 mx-auto bg-white">
            <main  className="flex flex-col items-center w-full px-4 mt-20 space-y-8 text-center bg-white sm:mt-20"> 
                <motion.h1  className="mx-auto mb-16 text-5xl font-bold tracking-normal text-blue-500 max-w-1xl font-display sm:text-7xl"
                    variants={slideInFromRightH1}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.1 }} 
                >
                    Bienvenidos
                </motion.h1>
                <div className="flex flex-col items-center justify-between w-full space-y-4 sm:flex-row sm:space-y-0"> 
                    <motion.h2 className="flex-1 text-xl leading-7 text-black sm:text-black"
                        variants={slideInFromRightH2}
                        initial="hidden"
                        animate="visible">
                        En SYL Talento, nos dedicamos a brindar soluciones de reclutamiento y selección de personal, así como suministros de materiales en Baja California y en toda la República Mexicana. Somos una empresa 100% comprometida con la innovación, la integridad y la calidad.                    </motion.h2>
                        <motion.div className="flex-1"
                        variants={slideInFromRightH2}
                        initial="hidden"
                        animate="visible">
                        <Image src="/hero.svg" alt="Descripción de la imagen" width={500} height={300} />
                    </motion.div>
                </div>
            </main>
        </div>
    )
}

export default HeroSection;
