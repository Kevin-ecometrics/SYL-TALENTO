import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function EditarPuesto() {
  const [puestos, setPuestos] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingPuesto, setEditingPuesto] = useState(null);

  const fetchPuestos = async () => {
    try {
      const response = await axios.get("https://syltalento.com/puestos");
      setPuestos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPuestos();
  }, []);

  const handleUpdateClick = (puesto) => {
    setEditingPuesto(puesto);
    setIsSidebarOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingPuesto({ ...editingPuesto, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
        `https://syltalento.com/puestos/${editingPuesto.id}`,
        editingPuesto
      );
      setIsSidebarOpen(false);
      toast.success("Puesto actualizado con éxito");
      fetchPuestos();
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
              Editar puestos disponibles
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
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {puestos.map((puesto) => (
              <tr key={puesto.id}>
                <td className="px-6 py-4 whitespace-nowrap">{puesto.puesto}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleUpdateClick(puesto)}
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
          <h2 className="text-xl font-bold mb-4">Actualizar Puesto</h2>
          <input
            type="text"
            name="puesto"
            value={editingPuesto.puesto}
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

export default EditarPuesto;
