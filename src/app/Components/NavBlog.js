"use client";
import React from "react";
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
import logo from "/public/SYL talento especialistas en Reclutamiento de personal para vacantes de empresas en México.png";
function NavBlog() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
          <Link href="/">
            <Image
            src={logo}
            alt="Encuentre las mejores prácticas de reclutamiento de personal en México con SYL talento para ayudar a encontrar el candidato perfecto para tu empresa. "
              width={150}
              title="Encuentre las mejores prácticas de reclutamiento de personal en México con SYL talento para ayudar a encontrar el candidato perfecto para tu empresa. "

              height={100}
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden gap-4 sm:flex font-bold"
        justify="center"
      >
        <NavbarItem>
          <Link href="/" className="text-black hover:text-blue-500">
            Regresar al inicio
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="/" className="text-black hover:text-blue-500">
            Regresar al inicio
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default NavBlog;
