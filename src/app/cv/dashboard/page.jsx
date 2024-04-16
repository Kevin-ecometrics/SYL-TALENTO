"use client";
import React, { useState } from "react";
import Vacante from "../../Components/cv/Crear-Vacante";
import Vervacante from "../../Components/cv/Admin-Vacante";
import HeroVacante from "../../Components/cv/Chart-Vacante";
import VerSolicitud from "../../Components/cv/Admin-Solicitud";
import EditarVacante from "../../Components/cv/Editar-vacante";
import Image from "next/image";
function Aside() {
  const [selectedOption, setSelectedOption] = useState("Inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-end sm:hidden p-2">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:w-64`}
      >
        {" "}
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <a href="/" class="flex items-center ps-2.5 mb-5">
            <Image
              src="/SYL talento especialistas en Reclutamiento de personal para vacantes de empresas en México.png"
              alt="logo"
              width={100}
              height={50}
            />
          </a>
          <hr className="mb-4" />
          <ul class="space-y-2 font-medium">
            <li
              onClick={() => setSelectedOption("Inicio")}
              className={selectedOption === "Inicio" ? "bg-gray-200" : ""}
            >
              <div class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg
                  class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span class="ms-3 cursor-pointer">INICIO</span>
              </div>
            </li>

            <li
              onClick={() => setSelectedOption("crear")}
              className={selectedOption === "crear" ? "bg-gray-200" : ""}
            >
              <div class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 group">
                {" "}
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="flex-1 uppercase ms-3 whitespace-nowrap text-black">
                  Crear Vacantes
                </span>
              </div>
            </li>
            <li
              onClick={() => setSelectedOption("ver")}
              className={selectedOption === "ver" ? "bg-gray-200" : ""}
            >
              <div class="flex items-center p-2 text-gray-900 cursor-pointer rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap uppercase text-black">
                  Ver Postulantes
                </span>
              </div>
            </li>
            <li
              onClick={() => setSelectedOption("verSolicitud")}
              className={selectedOption === "verSolicitud" ? "bg-gray-200" : ""}
            >
              <div class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h4zm0 12c-2.21 0-4-1.79-4-4H2a8 8 0 0 0 16 0h-4c0 2.21-1.79 4-4 4z" />
                </svg>
                <span class="flex-1 uppercase ms-3 whitespace-nowrap text-black">
                  Ver Solicitud
                </span>
              </div>
            </li>
            <li
              onClick={() => setSelectedOption("editarVacante")}
              className={
                selectedOption === "editarVacante" ? "bg-gray-200" : ""
              }
            >
              <div class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M11.3 1.7a2.8 2.8 0 0 1 4 4L7.4 13.6l-4 1 1-4 7.9-7.9zm-9.6 16.6l4-1c.2-.1.4-.3.5-.5l1-1.9-2.9-2.9-1.9 1c-.2.2-.4.4-.5.5l-1 4z" />
                </svg>
                <span class="flex-1 uppercase ms-3 whitespace-nowrap text-black">
                  Editar Vacante
                </span>
              </div>
            </li>
          </ul>
        </div>
        <footer className="absolute bottom-0 w-full p-4 bg-gray-100">
          <p className="text-center text-black text-sm">
            © 2023 SYL Talentos. Todos los derechos reservados.
          </p>
        </footer>
      </aside>
      <section className="sm:ml-64 bg-white">
        {selectedOption === "crear" && <Vacante />}
        {selectedOption === "Inicio" && <HeroVacante />}
        {selectedOption === "ver" && <Vervacante />}
        {selectedOption === "verSolicitud" && <VerSolicitud />}
        {selectedOption === "editarVacante" && <EditarVacante />}
      </section>
    </div>
  );
}

export default Aside;
