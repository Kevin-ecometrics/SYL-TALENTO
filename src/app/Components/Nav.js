"use client";
import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Image from "next/image";
function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = useState("");

  const menuItems = [
    { name: "Inicio", link: "#inicio", title:"Inicio"},
    { name: "Nosotros", link: "#nosotros",title:"Nosotros" },
    { name: "Servicios", link: "#servicios", title:"Servicios" },
    { name: "Quienes Somos", link: "#quienesSomos", title:"Quienes Somos" },
    { name: "Clientes", link: "#clientes", title:"Clientes" },
    { name: "Blogs", link: "#blogs", title:"Blogs"},
    { name: "Contacto", link: "#contacto", title:"Contacto"},
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) => item.link);
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
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white border-b border-black"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="sm:hidden"
          style={{ color: "#000" }}
        />
        <NavbarBrand>
          <Image
            src="SYL talento especialistas en Reclutamiento de personal para vacantes de empresas en México.png"
            alt="Encuentre las mejores prácticas de reclutamiento de personal en México con SYL talento para ayudar a encontrar el candidato perfecto para tu empresa. "
            title="Encuentre las mejores prácticas de reclutamiento de personal en México con SYL talento para ayudar a encontrar el candidato perfecto para tu empresa. "
            width={150}
            height={100}
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden gap-4 sm:flex font-bold"
        justify="center"
      >
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              color="foreground"
              className={`w-full ${
                activeSection === item.link ? "text-blue-500" : ""
              } hover:text-blue-500`}
              href={item.link}
              size="lg"
              title={item.title}
              onClick={(event) => {
                handleClick(event, item.link);
                setIsMenuOpen(false); // Cierra el menú
              }}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu isOpen={isMenuOpen}>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color="foreground"
              className="w-full hover:text-blue-500"
              href={item.link}
              title={item.title}
              onClick={(event) => {
                handleClick(event, item.link);
                setIsMenuOpen(false); // Cierra el menú
              }}
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
