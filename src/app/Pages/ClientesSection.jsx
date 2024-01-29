"use client";
import React from "react";
import Image from "next/image";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

function ClientesSection() {
  let allImages = [
    "/Benchmark trabaja con Syl talento.svg",
    "/Ricoh trabaja con Syl talento.svg",
    "/Safariland trabaja con Syl talento.svg",
    "/Jacuzzi trabaja con Syl talento.png",
    "/Calinor trabaja con Syl talento.svg",
    "/Ceva trabaja con Syl talento.svg",
    "/Eaton trabaja junto a syl talento.svg",
    "/Calinor trabaja con Syl talento.svg",
    "/Fisher&oaykel trabaja con syl talento.svg",
    "/Oxxo cedis trabaja con syl talento.svg",
    "/Integer trabaja con syl talento.svg",
    "/Honeywell trabaja con syltalento.svg",
    "/CM PARTNER TRABAJA CON SYL TALENTO.png",
    "/Cemex trabaja con syl talento.svg",
    "/linde trabaja con syl talento.svg",
    "/Arco junto con syl talento.svg",
    "/maclin con syl talento.png",
    "/Silza trabaja con syl talento.png",
    "/sds de mexico con syl talento.svg",
    "/us comtech advanced con syl talento.svg",
  ];

  let tabs = [
    {
      id: "Todos",
      label: "Nuestros Clientes",
      images: allImages,
      alt: ["Client logo"]
    },
    {
      id: "Electronica",
      label: "Electronica",
      images: ["/Benchmark trabaja con Syl talento.svg", "/Ricoh trabaja con Syl talento.svg", "/Honeywell trabaja con syltalento.svg", "/Safariland trabaja con Syl talento.svg", "/Integer trabaja con syl talento.svg", "/CM PARTNER TRABAJA CON SYL TALENTO.png", "/us comtech advanced con syl talento.svg"]
      ,alt: ["Benchmark trabaja con Syl talento.svg", "Ricoh trabaja con Syl talento.svg", "Honeywell trabaja con syltalento.svg", "Safariland trabaja con Syl talento.svg", "Integer trabaja con syl talento.svg", "CM PARTNER TRABAJA CON SYL TALENTO.png", "us comtech advanced con syl talento.svg"]
    },
    {
      id: "Medica",
      label: "Medica",
      images: ["/CardinalHealth trabaja con Syl talento.svg", "/Integer trabaja con syl talento.svg", "sds de mexico con syl talento.svg", "/Fisher&oaykel trabaja con syl talento.svg"],
      alt: ["CardinalHealth trabaja con Syl talento.svg", "Integer trabaja con syl talento.svg", "sds de mexico con syl talento.svg", "Fisher&oaykel trabaja con syl talento.svg"]
    },
    {
      id: "Energeticos",
      label: "Energeticos",
      images: ["/Arco junto con syl talento.svg", "/Silza trabaja con syl talento.png"],
      alt: ["Arco junto con syl talento.svg", "Silza trabaja con syl talento.png"]
    },
    {
      id: "Aeroespacial",
      label: "Aeroespacial",
      images: ["/Eaton trabaja junto a syl talento.svg"],
      alt: ["Eaton trabaja junto a syl talento.svg"]
    },
    {
      id: "Cedis y Logistica",
      label: "Cedis y Logistica",
      images: ["/Oxxo cedis trabaja con syl talento.svg", "/Ceva trabaja con Syl talento.svg"],
      alt: ["Oxxo cedis trabaja con syl talento.svg", "Ceva trabaja con Syl talento.svg"]
    },
    {
      id: "Costura y Tapiceria",
      label: "Costura y Tapiceria",
      images: ["/Safariland trabaja con Syl talento.svg", "/Calinor trabaja con Syl talento.svg", "/maclin con syl talento.png" ,"/Jacuzzi trabaja con Syl talento.png"],
      alt: ["Safariland trabaja con Syl talento.svg", "Calinor trabaja con Syl talento.svg", "maclin con syl talento.png" ,"Jacuzzi trabaja con Syl talento.png"]
    },
    {
      id: "Servicios y Conexos",
      label: "Servicios y Conexos",
      images: ["/Arco junto con syl talento.svg", "/Cemex trabaja con syl talento.svg", "/Silza trabaja con syl talento.png"],
      alt:["Arco junto con syl talento.svg", "Cemex trabaja con syl talento.svg", "Silza trabaja con syl talento.png"]
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
                    <Image key={index} src={image} width={160} height={80} alt={item.alt} title={item.alt} />
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
