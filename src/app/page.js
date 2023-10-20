"use client"
import React, { useState, useEffect } from "react";
import ClientesSection from "./Pages/ClientesSection";
import ContactoSection from "./Pages/ContactoSection";
import Nav from "./components/Nav";
import NosotroSection from "./Pages/Nosotros";
import SomosSection from "./Pages/SomosSection";
import HeroSection from "./Pages/herosection";
import ServicioSection from "./Pages/Servicios";
import Footer from "./Pages/FooterSection";
import Loading from "./components/Loading";
export default function Home() {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <main className="flex flex-col min-h-screen p-8 bg-white">
      <Nav />
      <div className="bg-white">
        <HeroSection />
        <NosotroSection />
        <ServicioSection />
        <SomosSection />
        <ClientesSection />
        <ContactoSection />
        <Footer />
      </div>
    </main>
  )
}
