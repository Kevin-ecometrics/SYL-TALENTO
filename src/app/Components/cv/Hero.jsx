"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

function Hero() {
  const formRef = useRef();

  const [totalItems, setTotalItems] = useState(0);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [vacantepdf, setVacantepdf] = useState(null);
  const handleSumbit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("correo", correo);
    formData.append("celular", celular);
    formData.append("vacantepdf", vacantepdf);
    formData.append("vacanteId", selectedVacancy.id);

    try {
      await axios.post("http://localhost:3001/solicitudes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Resetear los campos
      setNombre("");
      setCorreo("");
      setCelular("");
      setVacantepdf(null);
      formRef.current.reset(); // Restablecer el formulario

      // Mostrar un toast
      toast.success("Informacion de la vacante enviada exitosamente");

      // Cerrar el drawer
      setIsDrawerOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al enviar la información");
    }
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const toggleDrawer = (vacante) => {
    setIsDrawerOpen(!isDrawerOpen);
    setSelectedVacancy(vacante);
  };
  const [valor, setValor] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 9;
  const firstItemIndex = page * itemsPerPage + 1;
  const lastItemIndex = Math.min((page + 1) * itemsPerPage, totalItems);
  let displayRange;
  if (firstItemIndex === lastItemIndex) {
    displayRange = `${firstItemIndex}`;
  } else {
    displayRange = `${firstItemIndex}-${lastItemIndex}`;
  }
  const totalPages = Math.ceil(valor.length / itemsPerPage);

  useEffect(() => {
    getVacantes();
  }, []);

  const getVacantes = () => {
    axios.get("http://localhost:3001/vacantes").then((response) => {
      setValor(response.data);
      setTotalItems(response.data.length);
    });
  };

  return (
    <div>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <a href="https://flowbite.com/" class="flex items-center ps-2.5 mb-5">
            {/* <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-6 me-3 sm:h-7"
              alt="Flowbite Logo"
            /> */}
            <span class="self-center text-xl font-semibold whitespace-nowrap text-[#2557A7]">
              SYL TALENTO
            </span>
          </a>
          <ul class="space-y-2 font-medium">
            <li>
              <a
                href="/"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
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
                <span class="ms-3">INICIO</span>
              </a>
            </li>
            <li>
              <a
                href="ver-vacante"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap uppercase">
                  Ver Vacantes
                </span>
                {/* <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full  dark:text-gray-300">
                  Pro
                </span> */}
              </a>
            </li>
            <li>
              <a
                href="crear-vacante"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="flex-1 uppercase ms-3 whitespace-nowrap">
                  Crear Vacantes
                </span>
                {/* <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full  dark:text-blue-300">
                  3
                </span> */}
              </a>
            </li>
            {/* <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Products</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Sign In</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
              </a>
            </li> */}
          </ul>
        </div>
      </aside>

      <div class="p-4 sm:ml-64 bg-white text-center">
        <h1 className="mb-4 font-bold text-3xl text-black">Vacantes</h1>
        <hr className="mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:w-[70%] mx-auto gap-8">
          {valor.length > 0 ? (
            valor
              .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
              .map((vacante, index) => (
                <div
                  key={index}
                  className="rounded-xl border shadow shadow-black border-gray-300 px-4 py-8"
                >
                  <h5 className="mb-4 text-start text-base md:text-xl font-bold uppercase tracking-tight text-gray-900 dark:text-white">
                    {vacante.puesto}
                  </h5>
                  <hr className="mb-4" />
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-bold text-[#2557A7] text-start">
                      Sueldo promedio ${vacante.sueldo} por semana
                    </p>
                    <a href={`vacante/${vacante.puesto}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-arrow-narrow-right hover:bg-[#2557A7] rounded-full hover:stroke-white cursor-pointer"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#000000"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l14 0" />
                        <path d="M15 16l4 -4" />
                        <path d="M15 8l4 4" />
                      </svg>
                    </a>
                  </div>
                  <div className="flex justify-start items-center gap-4">
                    <Link
                      href={`http://localhost:3001/syl-talento/vacante-pdf/${vacante.id}`}
                      target="_blank"
                    >
                      <Button color="primary">Ver Vacante</Button>
                    </Link>
                    <Button
                      color="warning"
                      className="text-white"
                      onClick={() => toggleDrawer(vacante)}
                    >
                      Aplicar Vacante
                    </Button>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-black">Cargando...</p>
          )}
        </div>
        <div
          className={`fixed top-0 right-0 w-96 h-full bg-white border border-black p-6 transform transition-transform duration-200 ease-in-out ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <h1 className="text-black mb-4 text-start">
            Vacante: {selectedVacancy?.puesto}
          </h1>
          <p className="text-black text-start mb-4">
            Sueldo {selectedVacancy?.sueldo}
          </p>
          <hr className="mb-4" />
          <form ref={formRef} onSubmit={handleSumbit}>
            <div className="mb-4">
              <label
                for="nombre"
                class="block mb-2 text-xl font-medium text-gray-900 text-start dark:text-white"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div className="mb-4">
              <label
                for="correo"
                class="block mb-2 text-lg font-medium text-gray-900 text-start dark:text-white"
              >
                Correo electronico
              </label>
              <input
                type="email"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div className="mb-4">
              <label
                for="celular"
                class="block mb-2 text-lg font-medium text-gray-900 text-start dark:text-white"
              >
                Numero de telefono
              </label>
              <input
                type="number"
                id="celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <label
              class="block mb-2 text-lg font-medium text-start text-gray-900 dark:text-white"
              for="file_input"
            >
              Subir Archivo
            </label>

            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="vacantepdf"
              type="file"
              name="vacantepdf"
              onChange={(e) => setVacantepdf(e.target.files[0])}
              accept=".pdf"
            />
            <p
              class="mt-1 mb-4 text-sm text-gray-500 text-start dark:text-gray-300"
              id="file"
            >
              Solo se admite archivos .pdf
            </p>
            <button
              type="submit"
              className="bg-blue-500 w-full rounded-xl px-2 py-2 mb-4"
            >
              Enviar informacion
            </button>
          </form>

          <Button onClick={toggleDrawer} color="danger" className="w-full">
            Cerrar
          </Button>
        </div>
        <nav
          className="flex items-center flex-wrap justify-between pt-4 sm:ml-52 sm:mr-52"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 mb-4 block w-full md:inline md:w-auto">
            Mostrando{" "}
            <span className="font-semibold text-gray-900">{displayRange}</span>{" "}
            de <span className="font-semibold text-gray-900">{totalItems}</span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <li key={num}>
                <button
                  className={`flex items-center justify-center px-6 h-8 leading-tight ${
                    page === num - 1
                      ? "text-blue-800 border rounded-xl border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                      : "text-gray-500 bg-white border rounded-xl border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  onClick={() => setPage(num - 1)}
                >
                  {num}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default Hero;
