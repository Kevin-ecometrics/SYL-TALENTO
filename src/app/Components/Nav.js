"use client"
import React, {useState, useEffect} from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import Image from "next/image";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = useState("");

  const menuItems = [
    { name: "Inicio", link: "#inicio" },
    { name: "Nosotros", link: "#nosotros" },
    { name: "Servicios", link: "#servicios" },
    { name: "Quienes Somos", link: "#quienesSomos" },
    { name: "Clientes", link: "#clientes" },
    { name: "Blogs", link: "#blogs"}, 
    { name: "Contacto", link: "#contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => item.link);
      let currentSection = "";

      sections.forEach((section, i) => {
        const element = document.querySelector(section);
        if (element) {
          const y = element.getBoundingClientRect().top;
          if (y <= 50) currentSection = section;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  
  function handleClick(event, link) {
    event.preventDefault();
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); 
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-white border-b border-black">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="sm:hidden"
          style={{ color: "#000" }}
        />
        <NavbarBrand>
          <Image src="/SYL.png" width={150} height={100} alt="Logo" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              color="foreground"
                className={`w-full ${activeSection === item.link ? "text-blue-500" : ""} hover:text-blue-500`}
              href={item.link}
              size="lg"
              onClick={(event) => handleClick(event, item.link)}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color="foreground"
              className="w-full hover:text-blue-500"
              href={item.link}
              onClick={(event) => handleClick(event, item.link)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Nav;
