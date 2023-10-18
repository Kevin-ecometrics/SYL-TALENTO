"use client"
import React, { useState, useEffect } from "react";
import ClientesSection from "./pages/ClientesSection";
import ContactoSection from "./pages/ContactoSection";
import Nav from "./components/Nav";
import NosotroSection from "./pages/Nosotros";
import SomosSection from "./pages/SomosSection";
import HeroSection from "./pages/herosection";
import ServicioSection from "./pages/Servicios";
import Footer from "./pages/FooterSection";
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
