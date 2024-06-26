import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function EditarVacante() {
  const [vacante, setVacante] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingVacante, setEditingVacante] = useState(null);
  const [puestos, setPuestos] = useState([]);

  const fetchVacante = async () => {
    try {
      const response = await axios.get("https://syltalento.com/vacantes");
      setVacante(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVacante();
  }, []);

  const handleUpdateClick = (vacante) => {
    setEditingVacante(vacante);
    setIsSidebarOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingVacante({ ...editingVacante, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
        `https://syltalento.com/vacantes/${editingVacante.id}`,
        editingVacante
      );
      setIsSidebarOpen(false);
      toast.success("Vacante actualizada con éxito");
      fetchVacante();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getPuestos = async () => {
      try {
        const response = await axios.get("https://syltalento.com/puestos");
        setPuestos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getPuestos();
  }, []);

  return (
    <div className="flex text-black">
      <div className="w-full">
        <section className="bg-[#2557A7] h-[250px] mb-4 rounded-br-[1200px]">
          <div className="flex items-center justify-center h-full">
            <h1 className="text-white text-4xl font-bold">
              Editar vacantes disponibles
            </h1>
          </div>
        </section>
        <table className="container mx-auto w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Puestos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sueldos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vacante.map((vacante) => (
              <tr key={vacante.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {vacante.puesto}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {vacante.sueldo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleUpdateClick(vacante)}
                    className="bg-blue-600 text-white px-4 py-2 border rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                  >
                    Actualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isSidebarOpen && (
        <div className="w-64 h-full bg-white p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Actualizar Vacante</h2>
          <select
            name="puesto"
            value={editingVacante.puesto}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {puestos.map((puesto) => (
              <option key={puesto.id} value={puesto.puesto}>
                {puesto.puesto}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="sueldo"
            value={editingVacante.sueldo}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleSaveClick}
            className="bg-blue-600 text-white px-4 py-2 border rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Guardar
          </button>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default EditarVacante;
