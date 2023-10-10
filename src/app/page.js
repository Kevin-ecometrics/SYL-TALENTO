import Navbar from './Components/Nav';
import Footer from './Pages/FooterSection';
import HeroSection from './Pages/HeroSection';
import NosotroSection from './Pages/Nosotros';
import ServiciosSection from './Pages/Servicios';

export default function Home() {
  return (
    <div className='bg-white'>
      <Navbar />
      <HeroSection />
      <NosotroSection />
      <ServiciosSection />
      <Footer/>
    </div>
  )
}
