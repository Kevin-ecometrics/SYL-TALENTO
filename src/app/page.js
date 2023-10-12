"use client"
import React, {useState, useEffect} from 'react'
import Navbar from './Components/Nav';
import Footer from './Pages/FooterSection';
import HeroSection from './Pages/HeroSection';
import NosotroSection from './Pages/Nosotros';
import ServiciosSection from './Pages/Servicios';
import Loading from './components/Loading' 
import SomoSection from './Pages/SomosSection'
import ClienteSection from './Pages/ClientesSection'
import ContactoSection from './Pages/ContactoSection'

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
    <div className='bg-white'>
      <Navbar />
      <HeroSection />
      <NosotroSection />
      <ServiciosSection />
      <SomoSection />
      <ClienteSection />
      <ContactoSection />
      <Footer/>
    </div>
  )
}
