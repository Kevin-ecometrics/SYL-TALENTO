"use client";
import Image from "next/image";
import React from "react";

function SomosSection() {
  return (
    <div
      id="quienesSomos"
      className="flex flex-col items-center justify-center max-w-6xl min-h-screen py-2 mx-auto bg-white border-t-2 border-black"
    >
      <main className="flex flex-col items-center w-full px-4 mt-20 space-y-8 text-center bg-white sm:mt-20">
        <h1 className="mx-auto mb-16 text-5xl font-bold tracking-normal text-orange-700 max-w-1xl font-display sm:text-7xl">
          Quiénes somos
        </h1>
        <div className="flex flex-col items-center justify-between w-full space-y-4 sm:flex-row sm:space-y-0">
          <div className="flex-1">
            <Image
              src="/SYL en Baja California y parte de Sonora para publicar vacantes por zona personal.png"
              alt="Estamos en toda Baja California y parte de Sonora enfocados en publicar vacantes para estas zonas, abarcando más áreas de oportunidad. Ubicaciones de SYL Talento."
              title="Estamos en toda Baja California y parte de Sonora enfocados en publicar vacantes para estas zonas, abarcando más áreas de oportunidad. Ubicaciones de SYL Talento."
              width={500}
              height={300}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl  text-black sm:text-black">
              Nos dedicamos a dar lo mejor de nosotros, innovando siempre
              nuestros procesos con gran cooperación y trabajo en equipo en
              integridad y calidad para que nuestros clientes nos perciban,
              definan y midan por nuestros productos y servicios.
            </h2>
            <h2 className="text-xl  text-black sm:text-black py-8">
            Somos una empresa 100% mexicana, enfocada a brindar soluciones en reclutamiento y selección a nuestros clientes en toda la región de Baja California y al interior de la República. 
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SomosSection;
