import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { motion, useInView } from 'framer-motion';

function ClientesSection() {

    let allImages = ['/benchmark.png', '/ricoh.png', '/safa.png', '/jacuzzi.png', '/cardinal.png', '/ceva.png', '/eaton.png', '/calinor.png', '/fisher.png', '/oxxo.png', '/int.png', '/honey.png', '/cm.png', '/cemex.png', '/linde.png', '/arco.png', '/mac.png', '/silza.png', '/sds.png', '/us.png'];

    let tabs = [
        {
            id: "Todos",
            label: "Todos",
            images: allImages
        },
        {
            id: "Reclutamiento puro",
            label: "Reclutamiento Puro",
            images: allImages.slice(0, 10)
        },
        {
            id: "Administración de Nómina",
            label: "Nómina",
            images: allImages.slice(10, 20)
        }
    ];

    const slideInFromRightH2 = {
        hidden: { x: 300, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }
    };

    const tabContentVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.3 } }
    };

    const ref = useRef(null)
    const isInView = useInView(ref)
    
    return (
        <div id='clientes' ref={ref} className="flex flex-col items-center justify-center max-w-6xl min-h-screen py-2 mx-auto bg-white border-t-2 border-black">
            <main className="flex flex-col items-center w-full px-4 mt-20 space-y-8 text-center bg-white sm:mt-20">
            <motion.h1
                    className="mx-auto text-5xl font-bold tracking-normal text-transparent max-w-1xl font-display sm:text-7xl bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-orange-500"
                    variants={slideInFromRightH2}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    Clientes
                </motion.h1>
                <section className="flex flex-col items-center w-full gap-4">
                    <Tabs aria-label="Dynamic tabs" items={tabs}>
                        {(item) => (
                            <Tab key={item.id} title={item.label} className="px-4 py-2 whitespace-nowrap md:text-base">
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={tabContentVariants}
                                >
                                    <Card className="border border-blue-800 shadow-lg">
                                        <CardBody className="py-2 overflow-visible flex flex-wrap justify-start border border-blue-500 rounded-lg max-w-[810px]">
                                            <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-5">
                                                {item.images.map((imgSrc, index) => (
                                                    <div key={index} className="flex items-center justify-center">
                                                        <Image
                                                            alt="Card background"
                                                            className="object-cover rounded-xl"
                                                            src={imgSrc}
                                                            width={200}
                                                            height={200}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </CardBody>
                                    </Card>
                                </motion.div>
                            </Tab>
                        )}
                    </Tabs>
                </section>
            </main>
        </div>
    )
}

export default ClientesSection;