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
      <div class="p-4 bg-white text-center">
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
