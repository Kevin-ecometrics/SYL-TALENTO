import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function CrearPuesto() {
  const [puesto, setPuesto] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://syltalento.com/puestos", {
        puesto,
      });
      toast.success("Puesto creado correctamente");
      setPuesto("");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex text-black">
      <div className="w-full">
        <section className="bg-[#2557A7] h-[250px] mb-4 rounded-br-[1200px]">
          <div className="flex items-center justify-center h-full">
            <h1 className="text-white text-4xl font-bold">
              Crear puestos disponibles
            </h1>
          </div>
        </section>
        <div className="flex items-center justify-center py-16  ">
          <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
            {" "}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700 uppercase">
                  Nombre del puesto:
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                  value={puesto}
                  onChange={(e) => setPuesto(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                  value="Crear"
                />
              </div>
            </form>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearPuesto;
