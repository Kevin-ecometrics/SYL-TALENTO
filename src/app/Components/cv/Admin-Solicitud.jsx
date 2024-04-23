import React, { useState, useEffect } from "react";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";
import MyDocument from "./Admin-Pdf";

function ClienteSolicitud() {
  const [solicitud, setSolicitud] = useState([]);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [puestos, setPuestos] = useState([]);
  const [selectedPuesto, setSelectedPuesto] = useState("0");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const openInfoModal = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setInfoModalOpen(false);
  };

  const openDocModal = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setDocModalOpen(true);
  };

  const closeDocModal = () => {
    setDocModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/solicitudes_empleo"
        );
        setSolicitud(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPuestos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/vacantes");
        setPuestos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPuestos();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedPuesto(e.target.value);
  };

  const filteredSolicitudes = solicitud.filter(
    (solicitud) => selectedPuesto === "0" || solicitud.puesto === selectedPuesto
  );

  const descartarSolicitud = async (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres descartar esta solicitud?")
    ) {
      try {
        await axios.delete(
          `http://localhost:3001/api/solicitudes_empleo/${id}`
        );
        setSolicitud(solicitud.filter((solicitud) => solicitud.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  function handleClick(solicitudData) {
    pdf(<MyDocument solicitud={solicitudData} />)
      .toBlob()
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      });
  }

  return (
    <div className="flex flex-row-reverse">
      <main className="flex-grow">
        <section className="bg-[#2557A7] h-[250px] rounded-br-[1200px] mb-8">
          <div className="flex items-center justify-center h-full">
            <h1 className="text-white text-4xl font-bold">
              Nuestras solicitudes de empleo
            </h1>
          </div>
        </section>
        <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative container mx-auto">
          <nav class="text-black flex justify-end items-center">
            <select class="border" onChange={handleSelectChange}>
              <option value="0">Todos los puestos</option>
              {puestos.map((puesto) => (
                <option key={puesto.id} value={puesto.puesto}>
                  {puesto.puesto}
                </option>
              ))}
            </select>
          </nav>
          <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
            <thead>
              <tr className="text-left text-black">
                <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
                  #
                </th>
                <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
                  Nombre
                </th>
                <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
                  Correo
                </th>
                <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
                  Telefono
                </th>
                <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
                  Puesto
                </th>
                <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {solicitud
                .filter(
                  (solicitud) =>
                    selectedPuesto === "0" ||
                    solicitud.puesto === selectedPuesto
                )
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((solicitud, index) => (
                  <tr key={solicitud.id} className="text-gray-700">
                    <td className="py-2 px-3">{index + 1}</td>
                    <td className="p-3">{solicitud.nombre}</td>
                    <td className="p-3">{solicitud.correo}</td>
                    <td className="p-3">{solicitud.celular}</td>
                    <td className="p-3">{solicitud.puesto}</td>
                    <td className="p-3">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => openInfoModal(solicitud)}
                      >
                        Ver Información Básica
                      </button>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => openDocModal(solicitud)}
                      >
                        Ver Documentación
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => descartarSolicitud(solicitud.id)}
                      >
                        Eliminar Solicitud
                      </button>
                      <button
                        onClick={() => handleClick(solicitud)}
                        className=" text-black font-bold py-2 px-4 rounded mr-2 border"
                      >
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <nav className="py-2">
            <ul className="flex justify-end px-4 gap-2">
              {Math.ceil(filteredSolicitudes.length / itemsPerPage) > 1 &&
                [
                  ...Array(
                    Math.ceil(filteredSolicitudes.length / itemsPerPage)
                  ),
                ].map((_, index) => (
                  <li key={index}>
                    <button
                      className={`px-3 py-2 border rounded ${
                        index + 1 === currentPage
                          ? "bg-blue-500 text-white"
                          : "bg-blue-200 text-white"
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </nav>
          {solicitud.filter(
            (solicitud) =>
              selectedPuesto === "0" || solicitud.puesto === selectedPuesto
          ).length === 0 && (
            <p className="text-center text-black">
              No tenemos solicitudes para este puesto
            </p>
          )}
        </div>
      </main>
      {infoModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  text-black">
              <img
                src="/SYL talento especialistas en Reclutamiento de personal para vacantes de empresas en México.png"
                className="h-64 w-full object-cover sm:h-72 sm:w-full"
                alt=""
              />
              <div className="flex gap-2 bg-white px-4 mb-2">
                <span className="font-bold">Nombre completo: </span>
                {selectedSolicitud && (
                  <p>
                    {selectedSolicitud.nombre} {selectedSolicitud.materno}{" "}
                    {selectedSolicitud.paterno}
                  </p>
                )}
                <span className="font-bold">Celular: </span>
                {selectedSolicitud && <p>{selectedSolicitud.celular}</p>}
              </div>
              <div className="flex gap-2 bg-white px-4 mb-2">
                <span className="font-bold">CURP: </span>
                {selectedSolicitud && <p>{selectedSolicitud.curp}</p>}
                <span className="font-bold">RFC: </span>
                {selectedSolicitud && <p>{selectedSolicitud.rfc}</p>}
              </div>
              <div className="flex gap-2 bg-white px-4 mb-2">
                <span className="font-bold">Fecha de nacimiento: </span>
                {selectedSolicitud && (
                  <p>
                    {new Date(
                      selectedSolicitud.fecha_nacimiento
                    ).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
                <span className="font-bold">Solicitud enviada: </span>
                <p>
                  {new Date(selectedSolicitud.created_at).toLocaleDateString(
                    undefined,
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </p>
              </div>
              <div className="flex gap-2 bg-white px-4 mb-2">
                <span className="font-bold">IMSS: </span>
                {selectedSolicitud && <p>{selectedSolicitud.imss}</p>}

                <span className="font-bold">Tiene infonavit: </span>
                {selectedSolicitud && <p>{selectedSolicitud.infonavit}</p>}

                <span className="font-bold">Tiene Cartilla: </span>
                {selectedSolicitud && <p>{selectedSolicitud.militar}</p>}
              </div>
              <div className="flex gap-2 bg-white px-4 mb-2">
                <span className="font-bold">Colonia: </span>
                {selectedSolicitud && <p>{selectedSolicitud.colonia}</p>}

                <span className="font-bold">Lugar de nacimiento: </span>
                {selectedSolicitud && (
                  <p>{selectedSolicitud.lugar_nacimiento}</p>
                )}

                <span className="font-bold">Ciudad Actual: </span>
                {selectedSolicitud && <p>{selectedSolicitud.ciudad}</p>}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeInfoModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {docModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  text-black">
              <img
                src="/SYL talento especialistas en Reclutamiento de personal para vacantes de empresas en México.png"
                className="h-64 w-full object-cover sm:h-72 sm:w-full"
                alt=""
              />
              <div className="flex gap-2 bg-white px-4 mb-2">
                <span className="font-bold">Puesto solicitado: </span>
                {selectedSolicitud && <p>{selectedSolicitud.puesto}</p>}
                <span className="font-bold">Turno Rotativo: </span>
                {selectedSolicitud && <p>{selectedSolicitud.turno_rotativo}</p>}
              </div>
              <div className="flex gap-2 bg-white px-4 mb-2">
                <span className="font-bold">Fin de semana: </span>
                {selectedSolicitud && <p>{selectedSolicitud.fin_semana}</p>}
                <span className="font-bold">Escolaridad: </span>
                {selectedSolicitud && <p>{selectedSolicitud.escolaridad}</p>}
                <span className="font-bold">Documento: </span>
                {selectedSolicitud && <p>{selectedSolicitud.documento}</p>}
                <span className="font-bold">Carrera: </span>
                {selectedSolicitud && <p>{selectedSolicitud.carrera}</p>}
              </div>
              <div className="flex gap-2 bg-white px-4 mb-2">
                <span className="font-bold">Ultimo trabajo: </span>
                <p>{selectedSolicitud.empresa}</p>
                <span className="font-bold">Puesto: </span>
                <p>{selectedSolicitud.empresa_puesto}</p>
                <span className="font-bold">Ingreso: </span>
                <p>
                  {" "}
                  {new Date(selectedSolicitud.ingreso).toLocaleDateString(
                    undefined,
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </p>
                <span className="font-bold">Baja: </span>
                <p>
                  {" "}
                  {new Date(selectedSolicitud.baja).toLocaleDateString(
                    undefined,
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </p>{" "}
              </div>
              <div className="flex gap-2 bg-white px-4 mb-2">
                <span className="font-bold">Sueldo que tenia:</span>
                {selectedSolicitud && <p>{selectedSolicitud.sueldo}</p>}
                <span className="font-bold">Motivo de su salida:</span>
                {selectedSolicitud && <p>{selectedSolicitud.motivo}</p>}
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeDocModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClienteSolicitud;
