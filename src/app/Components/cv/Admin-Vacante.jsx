"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Page() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;
  const [puesto, setPuesto] = useState("");
  const puestos = [...new Set(data.map((item) => item.puesto))];
  const filteredData = data.filter((item) => !puesto || item.puesto === puesto);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const firstItemIndex = page * itemsPerPage + 1;
  const lastItemIndex = Math.min(
    (page + 1) * itemsPerPage,
    filteredData.length
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/solicitudes_vacantes"
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white">
      <section className="bg-[#2557A7] h-[250px] rounded-br-[1200px]">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold">
            Mostrar Postulaciones de nuestras vacantes
          </h1>
        </div>
      </section>
      <section className="text-black w-screen md:w-[1050px] py-8 mx-auto">
        <div className="flex justify-end items-center">
          <select
            className="border border-gray-600 rounded-lg py-2 px-4 mb-4 cursor-pointer"
            value={puesto}
            onChange={(e) => setPuesto(e.target.value)}
          >
            <option value="">Todos los puestos</option>
            {puestos.map((puesto) => (
              <option value={puesto} key={puesto}>
                {puesto}
              </option>
            ))}
          </select>
        </div>

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" class="px-6 py-3">
                Nombre
              </th>
              <th scope="col" class="px-6 py-3">
                Correo electrónico
              </th>
              <th scope="col" class="px-6 py-3">
                Numero de celular
              </th>
              <th scope="col" class="px-6 py-3">
                Puesto
              </th>
              <th scope="col" class="px-6 py-3">
                Sueldo
              </th>
              <th scope="col" class="px-6 py-3">
                Hora de solicitud
              </th>
              <th scope="col" class="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData
              .sort((a, b) => b.solicitud_id - a.solicitud_id)
              .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
              .map((item, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 text-center"
                  key={index}
                >
                  <td className="px-6 py-4">{item.nombre}</td>
                  <td className="px-6 py-4">{item.correo}</td>
                  <td className="px-6 py-4">{item.celular}</td>
                  <td className="px-6 py-4">{item.puesto}</td>
                  <td className="px-6 py-4">{item.sueldo}</td>
                  <td className="px-6 py-4">
                    {" "}
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-4">
                    <a
                      href={`http://localhost:3001/syl-talento/ver-pdf/${item.solicitud_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md bg-blue-500 hover:bg-blue-700 text-white px-4 py-2"
                    >
                      Ver solicitud
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <nav
          className="flex items-center flex-wrap justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 mb-4 block w-full md:inline md:w-auto">
            Mostrando{" "}
            <span className="font-semibold text-gray-900">{`${firstItemIndex}-${lastItemIndex}`}</span>{" "}
            de{" "}
            <span className="font-semibold text-gray-900">
              {filteredData.length}
            </span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <li key={num}>
                <button
                  className={`flex items-center justify-center px-6 h-8 leading-tight ${
                    page === num - 1
                      ? "text-blue-800 border rounded-xl border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                      : "text-gray-500 bg-white border rounded-xl border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                  onClick={() => setPage(num - 1)}
                >
                  {num}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </div>
  );
}

export default Page;
