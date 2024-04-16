import React, { useEffect, useState } from "react";
import axios from "axios";
function EditarVacante() {
  const [vacante, setVacante] = useState([]);
  useEffect(() => {
    const fetchVacante = async () => {
      try {
        const response = await axios.get("http://localhost:3001/vacantes");
        setVacante(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVacante();
  }, []);

  return (
    <div>
      <section className="bg-[#2557A7] h-[250px] rounded-br-[1200px]">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold">
            Editar vacantes disponibles
          </h1>
        </div>
      </section>
      {vacante.map((vacante) => (
        <div key={vacante.id}>
          <h1 className="text-black">{vacante.puesto}</h1>
        </div>
      ))}
    </div>
  );
}

export default EditarVacante;
