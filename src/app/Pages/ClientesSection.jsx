"use client";
import React from "react";
import Image from "next/image";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";

function ClientesSection() {
  let allImages = [
    "/benchmark.png",
    "/ricoh.png",
    "/safa.png",
    "/jacuzzi.png",
    "/cardinal.png",
    "/ceva.png",
    "/eaton.png",
    "/calinor.png",
    "/fisher.png",
    "/oxxo.png",
    "/int.png",
    "/honey.png",
    "/cm.png",
    "/cemex.png",
    "/linde.png",
    "/arco.png",
    "/mac.png",
    "/silza.png",
    "/sds.png",
    "/us.png",
  ];

  let tabs = [
    {
      id: "Todos",
      label: "Nuestros Clientes",
      images: allImages
    },
    {
      id: "Electronica",
      label: "Electronica",
      images: ["/benchmark.png", "/ricoh.png", "/honey.png", "/safa.png", "/int.png", "/cm.png", "us.png"]
    },
    {
      id: "Medica",
      label: "Medica",
      images: ["/cardinal.png", "/int.png", "sds.png", "/fisher.png"]
    },
    {
      id: "Energeticos",
      label: "Energeticos",
      images: ["/arco.png", "/silza.png"]
    },
    {
      id: "Aeroespacial",
      label: "Aeroespacial",
      images: ["/eaton.png"]
    },
    {
      id: "Cedis y Logistica",
      label: "Cedis y Logistica",
      images: ["/oxxo.png", "/ceva.png"]
    },
    {
      id: "Costura y Tapiceria",
      label: "Costura y Tapiceria",
      images: ["/safa.png", "/calinor.png", "/mac.png" ,"/jacuzzi.png"]
    },
    {
      id: "Servicios y Conexos",
      label: "Servicios y Conexos",
      images: ["/arco.png", "/cemex.png", "/silza.png"]
    }
  ];

  return (
    <div
      id="clientes"
      className="flex flex-col items-center justify-center max-w-6xl min-h-screen py-2 mx-auto bg-white border-t-2 border-black"
    >
      <main className="flex flex-col items-center w-screen px-4 mt-20 space-y-8 text-center bg-white sm:mt-20">
        <h1 className="mx-auto text-5xl font-bold tracking-normal text-transparent max-w-1xl font-display sm:text-7xl bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-orange-500">
          Clientes
        </h1>
        <section className="flex flex-col items-center gap-4">
        <Tabs aria-label="Dynamic tabs" items={tabs} className="hidden md:block">
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <Card>
              <CardBody>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {item.images.map((image, index) => (
                    <Image key={index} src={image} width={120} height={40} alt="image-clients" />
                  ))}
                </div>
              </CardBody>
            </Card>  
          </Tab>
        )}
      </Tabs>
        </section>
      </main>
    </div>
  );
}

export default ClientesSection;
