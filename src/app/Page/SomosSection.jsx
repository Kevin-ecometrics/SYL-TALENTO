"use client"
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React, {useRef} from 'react';

function SomosSection() {

    const slideInFromRightH2 = {
        hidden: { x: 300, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }
    };
    const slideInFromLeftH2 = {
        hidden: { x: -300, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }
    };

    const slideInFromUpH2 = {
        hidden: { y: -300, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }
    };

    // Use the useInView hook
    const ref = useRef(null)
    const isInView = useInView(ref)

    return (
        <div 
            id='quienesSomos' 
            ref={ref}  // Add the ref to this main container
            className="flex flex-col items-center justify-center max-w-6xl min-h-screen py-2 mx-auto bg-white border-t-2 border-black"
        >
            <main className="flex flex-col items-center w-full px-4 mt-20 space-y-8 text-center bg-white sm:mt-20"> 
                <motion.h1 
                    className="mx-auto mb-16 text-5xl font-bold tracking-normal text-orange-700 max-w-1xl font-display sm:text-7xl"
                    variants={slideInFromUpH2}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}  // Animate based on visibility
                >
                    Quiénes somos
                </motion.h1>
                <div className="flex flex-col items-center justify-between w-full space-y-4 sm:flex-row sm:space-y-0"> 
                    <motion.div 
                        className="flex-1"
                        variants={slideInFromLeftH2}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}  // Animate based on visibility
                    >
                        <Image src="/ubicaciones.webp" alt="Ubicaciones de SYL Talento" width={500} height={300} />
                    </motion.div>
                    <motion.h2 
                        className="flex-1 text-xl leading-7 text-black sm:text-black"
                        variants={slideInFromRightH2}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}  // Animate based on visibility
                    >
                        Nos dedicamos a dar lo mejor de nosotros, innovando siempre nuestros procesos con gran cooperación y trabajo en equipo en integridad y calidad para que nuestros clientes nos perciban, definan y midan por nuestros productos                        
                    </motion.h2>
                </div>
            </main>
        </div>
    )
}

export default SomosSection;
