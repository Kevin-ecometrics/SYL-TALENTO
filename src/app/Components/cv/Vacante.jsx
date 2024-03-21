"use client";
import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Vacante() {
  const handleSumbit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const vacante = data.get("vacante");
    const sueldo = data.get("sueldo");
    const file_input = data.get("file_input");
    // console.log(data.get("vacante"));
    // console.log(data.get("sueldo"));
    // console.log(data.get("file_input"));
    if (vacante && sueldo && file_input) {
      try {
        const response = await axios.post(
          "http://localhost:3001/crear-vacantes",
          data
        );
        console.log(response.data);
        e.target.reset();
        toast.success("Vacante creada exitosamente");
      } catch (err) {
        console.error(err);
      }
    } else {
      // Si alguno de los campos está vacío, muestra un mensaje de error
      toast.error("Por favor, completa todos los campos");
    }
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center h-screen">
      <h1 className="uppercase text-2xl mb-8 font-bold text-black">
        Crear vacante
      </h1>
      <form
        onSubmit={handleSumbit}
        class="w-64 mx-auto border border-gray-600 rounded-xl p-4 flex flex-col gap-4 dark:border-white dark:text-white dark:bg-gray-800"
      >
        <div class="relative z-0 w-full mb-5 group">
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Vacante
          </label>
          <select
            name="vacante"
            id="vacante"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" selected>
              Elige un puesto
            </option>
            <option value="Programador">Programador</option>
            <option value="Contador">Contador</option>
            <option value="Ingeniero Civil">Ingeniero Civil</option>
            <option value="Arquitecto">Arquitecto</option>
            <option value="Medico">Médico</option>
            <option value="Enfermero">Enfermero</option>
            <option value="Dentista">Dentista</option>
            <option value="Farmacéutico">Farmacéutico</option>
            <option value="Psicólogo">Psicólogo</option>
            <option value="Veterinario">Veterinario</option>
            <option value="Profesor">Profesor</option>
            <option value="Policía">Policía</option>
            <option value="Bombero">Bombero</option>
            <option value="Chef">Chef</option>
            <option value="Piloto">Piloto</option>
            <option value="Abogado">Abogado</option>
            <option value="Periodista">Periodista</option>
            <option value="Fotógrafo">Fotógrafo</option>
            <option value="Diseñador Gráfico">Diseñador Gráfico</option>
            <option value="Traductor">Traductor</option>
          </select>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="sueldo"
            id="sueldo"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="sueldo"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Sueldo de la vacante
          </label>
        </div>

        <div className="mb-8">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
          >
            Upload file
          </label>
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            name="file_input"
            type="file"
            accept="application/pdf"
          />
        </div>

        <button
          type="submit"
          class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Crear Vacante
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default Vacante;
