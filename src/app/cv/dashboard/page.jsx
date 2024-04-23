"use client";
import React, { useEffect, useState } from "react";
import Vacante from "../../Components/cv/Crear-Vacante";
import Vervacante from "../../Components/cv/Admin-Vacante";
import HeroVacante from "../../Components/cv/Chart-Vacante";
import VerSolicitud from "../../Components/cv/Admin-Solicitud";
import EditarVacante from "../../Components/cv/Editar-Vacante";
import Puesto from "../../Components/cv/Crear-Puesto";
import EditarPuesto from "../../Components/cv/Editar-Puesto";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
function Aside() {
  const [selectedOption, setSelectedOption] = useState("Inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // const logout = async () => {
  //   try {
  //     await axios.post(
  //       "https://syltalento.com/logout",
  //       {},
  //       { withCredentials: true }
  //     );
  //     setUser(null);
  //     router.push("/login");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const response = await axios.get("https://syltalento.com/api/user", {
  //         withCredentials: true,
  //       });
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   getUser();
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className="h-screen flex justify-center items-center text-black text-4xl bg-white">
  //       Cargando...
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return (
  //     <div className="flex text-xl md:text-4xl flex-col justify-center items-center h-screen bg-white text-black">
  //       <img
  //         src="/SYL talento especialistas en Reclutamiento de personal para vacantes de empresas en México.png"
  //         alt=""
  //         className="w-64 h-32 md:w-64 md:h-64"
  //       />
  //       <p className="mb-12">
  //         Por favor, inicia sesión para acceder a más contenido.
  //       </p>
  //       <button className="bg-blue-500 px-4 py-2 text-white rounded-xl hover:bg-blue-700">
  //         <a href="/login">Iniciar sesión</a>
  //       </button>
  //     </div>
  //   );
  // }

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
              onClick={() => setSelectedOption("puesto")}
              className={selectedOption === "puesto" ? "bg-gray-200" : ""}
            >
              <div class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 group">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
                <span class="flex-1 uppercase ms-3 whitespace-nowrap text-black">
                  Crear Puestos
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
            <li
              onClick={() => setSelectedOption("editarPuesto")}
              className={selectedOption === "editarPuesto" ? "bg-gray-200" : ""}
            >
              <div class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13.586 3.586a2 2 0 0 1 2.828 0l2 2a2 2 0 0 1 0 2.828l-10 10a2 2 0 0 1-1.414.586H5a2 2 0 0 1-2-2v-1.172c0-.53.21-1.039.586-1.414l10-10zm0 2.828L6.172 14.828l-.707.707v.586h.586l.707-.707L16.414 6.414l-2.828-2.828z" />
                  <path
                    fill-rule="evenodd"
                    d="M13 4a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V5a1 1 0 0 1 1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="flex-1 uppercase ms-3 whitespace-nowrap text-black">
                  Editar Puesto
                </span>
              </div>
            </li>
            <li

            // onClick={logout}
            >
              <div class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 9.9 12.96 10 12.5 10H10v2h2.5c.33 0 .67-.1.92-.26l1.58-1.59L18 13V8l-2.93 2.25z" />
                </svg>
                <span class="flex-1 uppercase ms-3 whitespace-nowrap text-black">
                  Cerrar Sesión
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
        {selectedOption === "puesto" && <Puesto />}
        {selectedOption === "editarPuesto" && <EditarPuesto />}
      </section>
    </div>
  );
}

export default Aside;
