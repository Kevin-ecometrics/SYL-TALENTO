"use client"
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import Image from "next/image";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Inicio", link: "#inicio" },
    { name: "Nosotros", link: "#nosotros" },
    { name: "Servicios", link: "#servicios" },
    { name: "Quienes Somos", link: "#quienesSomos" },
    { name: "Clientes", link: "#clientes" },
    { name: "Contacto", link: "#contacto" },
    { name: "Trabajos", link: "#trabajos" }
  ];
  
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
              className="w-full hover:text-blue-500"
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
