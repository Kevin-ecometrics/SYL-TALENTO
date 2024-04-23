/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect } from "react";
import { Roboto } from "next/font/google";
import axios from "axios";
const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
import Estado from "../datos/estados";

function page() {
  const [estado, setEstado] = useState("");
  const [ciudades, setCiudades] = useState([]);

  const handleEstadoChange = (e) => {
    const estadoSeleccionado = e.target.value;
    setEstado(estadoSeleccionado);
    setCiudades(Estado[estadoSeleccionado] || []);
  }; // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState({}); // Nuevo estado para los datos del formulario
  const [options, setOptions] = useState([]);
  const [showCartilla, setShowCartilla] = useState("");
  const [showTratamiento, setShowTratamiento] = useState("");
  const [showPadre, setShowPadre] = useState("");
  const [showMadre, setShowMadre] = useState("");
  const [showEsposa, setShowEsposa] = useState("");
  const [showHijos, setShowHijos] = useState("");
  const [showEmpleos, setShowEmpleos] = useState("");
  const [elector, setElector] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(true);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
  const [isVerificationAccepted, setIsVerificationAccepted] = useState(false);

  const sections = [
    "Datos personales",
    "Escolaridad",
    "Experiencia laboral",
    "Disponibilidad",
    "Empleos anteriores",
  ];

  const nextSection = () => {
    if (activeSectionIndex < sections.length - 1) {
      setActiveSectionIndex(activeSectionIndex + 1);
    }
  };

  const prevSection = () => {
    if (activeSectionIndex > 0) {
      setActiveSectionIndex(activeSectionIndex - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (window.confirm("¿Estás seguro de que quieres enviar el formulario?")) {
      const newData = new FormData(e.target); // Recoge los datos del formulario
      const updatedFormData = { ...formData, ...Object.fromEntries(newData) };
      setFormData({ ...formData, ...Object.fromEntries(newData) }); // Actualiza el estado con los nuevos datos
      nextSection();
      if (activeSectionIndex === sections.length - 1) {
        try {
          await axios.post(
            "https://syltalento.com/api/solicitudes_empleo",
            updatedFormData
          );
          // console.log(response.data);
          setIsModalOpen(true);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://syltalento.com/vacantes");
      setOptions(response.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("privacyAccepted") === "true") {
      setIsPrivacyModalOpen(false);
      setIsPrivacyAccepted(true);
    }
    if (localStorage.getItem("verificationAccepted") === "true") {
      setIsVerificationModalOpen(false);
      setIsVerificationAccepted(true);
    } else if (localStorage.getItem("privacyAccepted") === "true") {
      setIsVerificationModalOpen(true);
    }
  }, []);

  const handleAcceptPrivacy = () => {
    localStorage.setItem("privacyAccepted", "true");
    setIsPrivacyModalOpen(false);
    setIsPrivacyAccepted(true);
    setIsVerificationModalOpen(true);
  };

  const handleAcceptVerification = () => {
    if (isVerificationAccepted) {
      localStorage.setItem("verificationAccepted", "true");
      setIsVerificationModalOpen(false);
    } else {
      alert("Por favor, acepta la verificación de información para continuar.");
    }
  };

  return (
    <>
      {isPrivacyModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="bg-white rounded-lg p-5 shadow-lg relative z-20 max-w-lg mx-auto">
            <img
              src="/SYL talento especialistas en Reclutamiento de personal para vacantes de empresas en México.png"
              alt="Logo de la empresa"
              className="w-full h-48 object-cover object-center mb-4 rounded"
            />
            <h2 className="text-2xl mb-4 text-black uppercase">
              Aviso de privacidad
            </h2>
            <p className="text-gray-600 mb-4">
              <span className="font-bold">SYL TALENTO S.A. DE C.V.</span> y las
              empresas que pertenecen al grupo, Declara la empresa en este acto
              que es responsable de recabar los datos personales del Titular,
              para que les de seguridad administrativas, tecnicas y fusucas que
              permiten proteger los datos personales contra daño, informacion
              personal sera utilizada para los procesos de Reclutamiento,
              Seleccion y Evaluaciones los departamentos de Recursos Humanos de
              los clientes de esta empresa.
              <br />
              Asimismo, le informamos que sus datos personales pueden ser
              transferidos y tratados dentro y fuera del país, por personas
              distintas a esta empresa. En ese sentido, su información puede ser
              compartida con los clientes de esta empresa exclusivamente para
              los fines ya indicados
            </p>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="acceptPrivacy"
                name="acceptPrivacy"
                className="mr-2"
                onChange={(e) => setIsPrivacyAccepted(e.target.checked)}
              />
              <label htmlFor="acceptPrivacy" className="text-black">
                Acepto el aviso de privacidad
              </label>
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded w-full"
              onClick={handleAcceptPrivacy}
              disabled={!isPrivacyAccepted}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
      {isVerificationModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="bg-white rounded-lg p-5 shadow-lg relative z-20 max-w-lg mx-auto">
            <img
              src="/SYL talento especialistas en Reclutamiento de personal para vacantes de empresas en México.png"
              alt="Logo de la empresa"
              className="w-full h-48 object-cover object-center mb-4 rounded"
            />
            <h2 className="text-2xl mb-4 text-black">
              Verificación de información
            </h2>
            <p className="text-gray-600 mb-4">
              Bajo protesta de decir verdad, declaro que la información que les
              estoy proporcionando es total y completamente veridica, toda vez
              que estoy consciente de que en caso de brindar informacion falsa y
              ser contratado, la empresa se reserva el derecho de rescindirme de
              mis labores de manera y justificada segun lo estipulado en el
              articulo 47 de la Ley Federal del Trabajo vigente.
            </p>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="acceptVerification"
                name="acceptVerification"
                className="mr-2"
                onChange={(e) => setIsVerificationAccepted(e.target.checked)}
              />
              <label htmlFor="acceptVerification" className="text-black">
                Acepto la verificación de información
              </label>
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded w-full"
              onClick={handleAcceptVerification}
              disabled={!isVerificationAccepted}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
      {!isPrivacyModalOpen && !isVerificationModalOpen && (
        <main className="bg-white text-black">
          <div className={`${roboto.className} md:w-[90%] mx-auto py-4 `}>
            <div className="flex gap-4 justify-center items-center">
              {sections.map((section, index) => (
                <div key={section}>
                  <h1>{section}</h1>
                  <div className="h-2 w-full bg-gray-200 mt-1">
                    <div
                      className="h-full bg-blue-500 rounded-xl"
                      style={{
                        width: index <= activeSectionIndex ? "100%" : "0",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              {activeSectionIndex > 0 && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                  onClick={prevSection}
                >
                  Anterior
                </button>
              )}{" "}
              {activeSectionIndex === 0 && (
                <section>
                  <h1 className="text-4xl text-center mb-2">
                    Datos personales
                  </h1>
                  <hr className="mb-2" />
                  <div className="flex flex-col gap-8">
                    <form onSubmit={handleSubmit}>
                      <div>
                        <select
                          id="puesto"
                          name="puesto"
                          defaultValue={formData.puesto || ""}
                          className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        >
                          <option disabled value="">
                            Puesto a solicitar
                          </option>
                          {options.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.puesto}
                            </option>
                          ))}
                        </select>
                      </div>
                      <label>Nombre Completo:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-2 gap-2">
                        <div className="relative z-0 w-full group">
                          <input
                            type="text"
                            name="paterno"
                            id="paterno"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            defaultValue={formData.paterno || ""}
                          />
                          <label
                            htmlFor="paterno"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Apellido Paterno
                          </label>
                        </div>
                        <div className="relative z-0 w-full  group">
                          <input
                            type="text"
                            name="materno"
                            id="materno"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            defaultValue={formData.materno || ""}
                            required
                          />
                          <label
                            htmlFor="materno"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Apellido Materno
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            defaultValue={formData.nombre || ""}
                            required
                          />
                          <label
                            htmlFor="nombre"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Nombre (s)
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="edad"
                            id="edad"
                            maxLength={2}
                            onKeyPress={(e) => {
                              // Permitir sólo números
                              const re = /^[0-9\b]+$/;
                              if (!re.test(e.key)) {
                                e.preventDefault();
                                alert(
                                  "Por favor, introduce sólo números en el campo de edad."
                                );
                              }
                            }}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                edad: e.target.value,
                              });
                            }}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            defaultValue={formData.edad || ""}
                            required
                          />
                          <label
                            htmlFor="edad"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Edad
                          </label>
                        </div>
                      </div>
                      <label>Domicilio Actual:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-2 gap-2">
                        <div className="relative z-0 w-full group mb-4">
                          <input
                            type="text"
                            name="calle"
                            id="calle"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            defaultValue={formData.calle || ""}
                          />
                          <label
                            htmlFor="calle"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Calle
                          </label>
                        </div>{" "}
                        <div className="relative z-0 w-full group mb-4">
                          <input
                            type="text"
                            name="numero"
                            id="numero"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            defaultValue={formData.numero || ""}
                            inputMode="numeric"
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/[^0-9]/g.test(value)) {
                                alert(
                                  "Por favor, ingrese solo números en el campo de Numero exterior."
                                );
                                e.target.value = value.replace(/[^0-9]/g, "");
                              }
                            }}
                          />
                          <label
                            htmlFor="numero"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Numero Exterior
                          </label>
                        </div>{" "}
                        <div className="relative z-0 w-full group mb-4">
                          <input
                            type="text"
                            name="colonia"
                            id="colonia"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            defaultValue={formData.colonia || ""}
                          />
                          <label
                            htmlFor="colonia"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Colonia
                          </label>
                        </div>{" "}
                        <div className="relative z-0 w-full group mb-4">
                          <input
                            type="text"
                            name="celular"
                            id="celular"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            defaultValue={formData.celular || ""}
                            maxLength={13}
                            required
                            inputMode="numeric"
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/[^0-9]/g.test(value)) {
                                alert(
                                  "Por favor, ingrese solo números en el campo de Telefono celular."
                                );
                                e.target.value = value.replace(/[^0-9]/g, "");
                              }
                            }}
                          />
                          <label
                            htmlFor="celular"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Telefono Celular
                          </label>
                        </div>{" "}
                        <div className="relative z-0 w-full group mb-4">
                          <input
                            type="text"
                            name="emergencia"
                            maxLength={13}
                            id="emergencia"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            defaultValue={formData.emergencia || ""}
                            inputMode="numeric"
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/[^0-9]/g.test(value)) {
                                alert(
                                  "Por favor, ingrese solo números en el campo de Telefono de emergencia."
                                );
                                e.target.value = value.replace(/[^0-9]/g, "");
                              }
                            }}
                          />
                          <label
                            htmlFor="emergencia"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Telefono de Emergencia
                          </label>
                        </div>{" "}
                        <div className="relative z-0 w-full group mb-4">
                          <select
                            defaultValue={formData.estado || ""}
                            value={estado}
                            required
                            onChange={handleEstadoChange}
                            name="estado"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option disabled value="">
                              Selecciona un estado
                            </option>
                            {Object.keys(Estado).map((estado) => (
                              <option key={estado} value={estado}>
                                {estado}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="relative z-0 w-full group mb-4">
                          <select
                            name="ciudad"
                            disabled={!estado}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            defaultValue={formData.ciudad || ""}
                          >
                            <option value="">Selecciona una ciudad</option>
                            {Array.isArray(ciudades) &&
                              ciudades.map((ciudad) => (
                                <option key={ciudad} value={ciudad}>
                                  {ciudad}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="relative z-0 w-full group mb-4">
                          <input
                            type="text"
                            name="cp"
                            id="cp"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            defaultValue={formData.cp || ""}
                          />
                          <label
                            htmlFor="cp"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            C.P.
                          </label>
                        </div>{" "}
                      </div>
                      <label>Documentacion:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-2 gap-2">
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="rfc"
                            id="rfc"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer uppercase"
                            placeholder=" "
                            maxLength={13}
                            required
                            defaultValue={formData.rfc || ""}
                          />
                          <label
                            htmlFor="rfc"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            RFC
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="imss"
                            id="imss"
                            maxLength={11}
                            minLength={11}
                            onKeyPress={(e) => {
                              // Permitir sólo números
                              const re = /^[0-9\b]+$/;
                              if (!re.test(e.key)) {
                                e.preventDefault();
                                alert(
                                  "Por favor, introduce sólo números en el campo IMSS."
                                );
                              }
                            }}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                imss: e.target.value,
                              });
                            }}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer uppercase"
                            placeholder=" "
                            required
                            defaultValue={formData.imss || ""}
                          />
                          <label
                            htmlFor="imss"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            IMSS
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="curp"
                            id="curp"
                            maxLength={18}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer uppercase"
                            placeholder=" "
                            required
                            defaultValue={formData.curp || ""}
                          />
                          <label
                            htmlFor="curp"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            CURP
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            id="genero"
                            name="genero"
                            defaultValue={formData.genero || ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option disabled value="">
                              Seleccione un genero
                            </option>
                            <option value="Femenino">Femenino</option>
                            <option value="Masculino">Masculino</option>
                          </select>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            id="elector"
                            name="elector"
                            value={elector}
                            onChange={(e) => setElector(e.target.value)}
                            defaultValue={formData.elector || ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option disabled value="">
                              Cuenta con INE
                            </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        {elector === "Si" ? (
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="numero_credencial"
                              id="numero_credencial"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              defaultValue={formData.numero_credencial || ""}
                            />
                            <label
                              htmlFor="numero_credencial"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Numero de Credencial
                            </label>
                          </div>
                        ) : (
                          <input
                            type="hidden"
                            name="numero_credencial"
                            value="No"
                          />
                        )}
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="email"
                            name="correo"
                            id="correo"
                            defaultValue={formData.correo || ""}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="correo"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Correo electronico
                          </label>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-2 gap-2">
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            id="lugar_nacimiento"
                            name="lugar_nacimiento"
                            defaultValue={formData.lugar_nacimiento || ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => {
                              setNacionalidad(
                                e.target.value === "Extranjero"
                                  ? "Extranjero"
                                  : "Mexicano"
                              );
                            }}
                          >
                            <option disabled value="">
                              Lugar de nacimiento
                            </option>
                            <option value="Aguascalientes">
                              Aguascalientes
                            </option>
                            <option value="Baja California">
                              Baja California
                            </option>
                            <option value="Baja California Sur">
                              Baja California Sur
                            </option>
                            <option value="Campeche">Campeche</option>
                            <option value="Chiapas">Chiapas</option>
                            <option value="Chihuahua">Chihuahua</option>
                            <option value="Coahuila">Coahuila</option>
                            <option value="Colima">Colima</option>
                            <option value="Durango">Durango</option>
                            <option value="Estado de México">
                              Estado de México
                            </option>
                            <option value="Guanajuato">Guanajuato</option>
                            <option value="Guerrero">Guerrero</option>
                            <option value="Hidalgo">Hidalgo</option>
                            <option value="Jalisco">Jalisco</option>
                            <option value="Michoacán">Michoacán</option>
                            <option value="Morelos">Morelos</option>
                            <option value="Nayarit">Nayarit</option>
                            <option value="Nuevo León">Nuevo León</option>
                            <option value="Oaxaca">Oaxaca</option>
                            <option value="Puebla">Puebla</option>
                            <option value="Querétaro">Querétaro</option>
                            <option value="Quintana Roo">Quintana Roo</option>
                            <option value="San Luis Potosí">
                              San Luis Potosí
                            </option>
                            <option value="Sinaloa">Sinaloa</option>
                            <option value="Sonora">Sonora</option>
                            <option value="Tabasco">Tabasco</option>
                            <option value="Tamaulipas">Tamaulipas</option>
                            <option value="Tlaxcala">Tlaxcala</option>
                            <option value="Veracruz">Veracruz</option>
                            <option value="Yucatán">Yucatán</option>
                            <option value="Zacatecas">Zacatecas</option>
                            <option value="Extranjero">Extranjero</option>
                          </select>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="date"
                            name="fecha_nacimiento"
                            id="fecha_nacimiento"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            defaultValue={formData.fecha_nacimiento || ""}
                          />
                          <label
                            htmlFor="fecha_nacimiento"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Fecha de nacimiento
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="nacionalidad"
                            id="nacionalidad"
                            value={nacionalidad}
                            readOnly
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            defaultValue={formData.nacionalidad || ""}
                          />
                          <label
                            htmlFor="nacionalidad"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Nacionalidad
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            id="infonavit"
                            name="infonavit"
                            defaultValue={formData.infonavit || ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option disabled value="">
                              Cuenta con Infonavit
                            </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            id="civil"
                            name="civil"
                            defaultValue={formData.civil || ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option disabled value="">
                              Estado civil
                            </option>
                            <option value="Soltero">Soltero</option>
                            <option value="Casado">Casado</option>
                            <option value="Otro">Otro</option>
                          </select>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            id="militar"
                            name="militar"
                            defaultValue={formData.militar || ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={showCartilla}
                            onChange={(e) => setShowCartilla(e.target.value)}
                          >
                            <option disabled value="">
                              Cartilla Militar
                            </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        {showCartilla === "Si" ? (
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="number"
                              name="numero_cartilla"
                              id="numero_cartilla"
                              defaultValue={formData.numero_cartilla || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="numero_cartilla"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              No. De Cartilla Militar
                            </label>
                          </div>
                        ) : (
                          <input
                            type="hidden"
                            name="numero_cartilla"
                            value="No"
                          />
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-2 gap-2">
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="estatura"
                            id="estatura"
                            defaultValue={formData.estatura || ""}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="estatura"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Estatura en Metros
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="peso"
                            id="peso"
                            defaultValue={formData.peso || ""}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="peso"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Peso en kg
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            id="enfermedad"
                            name="enfermedad"
                            defaultValue={formData.enfermedad || ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={showTratamiento}
                            onChange={(e) => setShowTratamiento(e.target.value)}
                          >
                            <option disabled value="">
                              Tiene alguna enfermedad cronica
                            </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        {showTratamiento === "Si" ? (
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="tratamiento"
                              id="tratamiento"
                              defaultValue={formData.tratamiento || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="tratamiento"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Que tipo de tratamiento recibe?
                            </label>
                          </div>
                        ) : (
                          <input type="hidden" name="tratamiento" value="No" />
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 py-2 gap-2">
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            id="padre"
                            name="padre"
                            defaultValue={formData.padre || ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={showPadre}
                            onChange={(e) => setShowPadre(e.target.value)}
                          >
                            <option disabled value="">
                              Tienes Padre
                            </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        {showPadre === "Si" ? (
                          <>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="nombre_padre"
                                id="nombre_padre"
                                defaultValue={formData.nombre_padre || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="nombre_padre"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Nombre del Padre
                              </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="vive_padre"
                                id="vive_padre"
                                defaultValue={formData.vive_padre || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="vive_padre"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Vive Padre
                              </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="finado_padre"
                                id="finado_padre"
                                defaultValue={formData.finado_padre || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="finado_padre"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Finado
                              </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="domicilio_padre"
                                id="domicilio_padre"
                                defaultValue={formData.domicilio_padre || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="domicilio_padre"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Domicilio
                              </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="ocupacion_padre"
                                id="ocupacion_padre"
                                defaultValue={formData.ocupacion_padre || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="ocupacion_padre"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Ocupacion
                              </label>
                            </div>
                          </>
                        ) : (
                          <>
                            <input
                              type="hidden"
                              name="nombre_padre"
                              value="No"
                            />
                            <input type="hidden" name="vive_padre" value="No" />
                            <input
                              type="hidden"
                              name="finado_padre"
                              value="No"
                            />
                            <input
                              type="hidden"
                              name="domicilio_padre"
                              value="No"
                            />
                            <input
                              type="hidden"
                              name="ocupacion_padre"
                              value="No"
                            />
                          </>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 py-2 gap-2">
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            id="madre"
                            name="madre"
                            defaultValue={formData.madre || ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={showMadre}
                            onChange={(e) => setShowMadre(e.target.value)}
                          >
                            <option disabled value="">
                              Tienes Madre
                            </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        {showMadre === "Si" ? (
                          <>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="nombre_madre"
                                id="nombre_madre"
                                defaultValue={formData.nombre_madre || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="nombre_madre"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Nombre de la madre
                              </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="vive_madre"
                                id="vive_madre"
                                defaultValue={formData.vive_madre || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="vive_madre"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Vive Madre
                              </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="finado_madre"
                                id="finado_madre"
                                defaultValue={formData.finado_madre || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="finado_madre"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Finado
                              </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="domicilio_madre"
                                id="domicilio_madre"
                                defaultValue={formData.domicilio_madre || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="domicilio_madre"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Domicilio
                              </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="ocupacion_madre"
                                id="ocupacion_madre"
                                defaultValue={formData.ocupacion_madre || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="ocupacion_madre"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Ocupacion
                              </label>
                            </div>
                          </>
                        ) : (
                          <>
                            <input
                              type="hidden"
                              name="nombre_madre"
                              value="No"
                            />
                            <input type="hidden" name="vive_madre" value="No" />
                            <input
                              type="hidden"
                              name="finado_madre"
                              value="No"
                            />
                            <input
                              type="hidden"
                              name="domicilio_madre"
                              value="No"
                            />
                            <input
                              type="hidden"
                              name="ocupacion_madre"
                              value="No"
                            />
                          </>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 py-2 gap-2">
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            id="esposa"
                            name="esposa"
                            defaultValue={formData.esposa || ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={showEsposa}
                            onChange={(e) => setShowEsposa(e.target.value)}
                          >
                            <option disabled value="">
                              Tienes Esposa (o)
                            </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        {showEsposa === "Si" ? (
                          <>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="nombre_esposa"
                                id="nombre_esposa"
                                defaultValue={formData.nombre_esposa || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="nombre_esposa"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Nombre del esposa
                              </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="vive_esposa"
                                id="vive_esposa"
                                defaultValue={formData.vive_esposa || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="vive_esposa"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Vive esposa
                              </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="finado_esposa"
                                id="finado_esposa"
                                defaultValue={formData.finado_esposa || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="finado_esposa"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Finado
                              </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="domicilio_esposa"
                                id="domicilio_esposa"
                                defaultValue={formData.domicilio_esposa || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="domicilio_esposa"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Domicilio
                              </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="ocupacion_esposa"
                                id="ocupacion_esposa"
                                defaultValue={formData.ocupacion_esposa || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="ocupacion_esposa"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Ocupacion
                              </label>
                            </div>
                          </>
                        ) : (
                          <>
                            <input
                              type="hidden"
                              name="nombre_esposa"
                              value="No"
                            />
                            <input
                              type="hidden"
                              name="vive_esposa"
                              value="No"
                            />
                            <input
                              type="hidden"
                              name="finado_esposa"
                              value="No"
                            />
                            <input
                              type="hidden"
                              name="domicilio_esposa"
                              value="No"
                            />
                            <input
                              type="hidden"
                              name="ocupacion_esposa"
                              value="No"
                            />
                          </>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 py-2 gap-2">
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            id="hijos"
                            name="hijos"
                            defaultValue={formData.hijos || ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={showHijos}
                            onChange={(e) => setShowHijos(e.target.value)}
                          >
                            <option disabled value="">
                              Tienes Hijos
                            </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        {showHijos === "Si" ? (
                          <>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="nombre_hijos"
                                id="nombre_hijos"
                                defaultValue={formData.nombre_hijos || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="nombre_hijos"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Nombre de los hijos
                              </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                name="edad_hijos"
                                id="edad_hijos"
                                defaultValue={formData.edad_hijos || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="edad_hijos"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Edad de los hijos
                              </label>
                            </div>
                          </>
                        ) : (
                          <>
                            <input
                              type="hidden"
                              name="nombre_hijos"
                              value="No"
                            />
                            <input type="hidden" name="edad_hijos" value="No" />
                          </>
                        )}
                      </div>

                      <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl w-full"
                        type="submit"
                      >
                        Siguiente etapa
                      </button>
                    </form>
                  </div>
                </section>
              )}
              {activeSectionIndex === 1 && (
                <section>
                  <h1 className="text-4xl text-center mb-2">Escolaridad</h1>
                  <hr className="mb-4" />
                  <form onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="escolaridad"
                        id="escolaridad"
                        defaultValue={formData.escolaridad || ""}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option disabled value="">
                          Seleccione su escolaridad
                        </option>
                        <option value="Primaria">Primaria</option>
                        <option value="Secundaria">Secundaria</option>
                        <option value="Preparatoria">Preparatoria</option>
                        <option value="Universidad">Universidad</option>
                      </select>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        required
                        name="documento"
                        id="documento"
                        defaultValue={formData.documento || ""}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option disabled value="">
                          Documento obtenido
                        </option>
                        <option value="Certificado">Certificado</option>
                        <option value="Titulo">Titulo</option>
                        <option value="Cedula">Cedula</option>
                        <option value="Constancia">Constancia</option>
                      </select>
                    </div>{" "}
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="carrera"
                        id="carrera"
                        defaultValue={formData.documento || ""}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option disabled value="">
                          Carrera cursada
                        </option>
                        <option value="Actuaría">Actuaría</option>
                        <option value="Administración y gestión empresarial">
                          Administración y gestión empresarial
                        </option>
                        <option value="Antropología">Antropología</option>
                        <option value="Artes plásticas">Artes plásticas</option>
                        <option value="Biblioteconomía">Biblioteconomía</option>
                        <option value="Biología">Biología</option>
                        <option value="Biología marina">Biología marina</option>
                        <option value="Biotecnología">Biotecnología</option>
                        <option value="Contabilidad">Contabilidad</option>
                        <option value="Danza">Danza</option>
                        <option value="Desarrollo de videojuegos">
                          Desarrollo de videojuegos
                        </option>
                        <option value="Desarrollo software">
                          Desarrollo software
                        </option>
                        <option value="Diseño automotriz">
                          Diseño automotriz
                        </option>
                        <option value="Diseño de interiores">
                          Diseño de interiores
                        </option>
                        <option value="Diseño gráfico">Diseño gráfico</option>
                        <option value="Diseño industrial">
                          Diseño industrial
                        </option>
                        <option value="Ecología y ciencias ambientales">
                          Ecología y ciencias ambientales
                        </option>
                        <option value="Economía">Economía</option>
                        <option value="Enfermería general y obstetricia">
                          Enfermería general y obstetricia
                        </option>
                        <option value="Filosofía">Filosofía</option>
                        <option value="Física">Física</option>
                        <option value="Gastronomía">Gastronomía</option>
                        <option value="Geólogo">Geólogo</option>
                        <option value="Historia">Historia</option>
                        <option value="Idiomas y lenguas extranjeras">
                          Idiomas y lenguas extranjeras
                        </option>
                        <option value="Informática">Informática</option>
                        <option value="Ingeniería aeroespacial y mecánica">
                          Ingeniería aeroespacial y mecánica
                        </option>
                        <option value="Ingeniería biomédica">
                          Ingeniería biomédica
                        </option>
                        <option value="Ingeniería civil">
                          Ingeniería civil
                        </option>
                        <option value="Ingeniería electrónica">
                          Ingeniería electrónica
                        </option>
                        <option value="ingeniería en aeronáutica">
                          Ingeniería en aeronáutica
                        </option>
                        <option value="Ingeniería en agronomía">
                          Ingeniería en agronomía
                        </option>
                        <option value="Ingeniería en electricidad">
                          Ingeniería en electricidad
                        </option>
                        <option value="Ingeniería en energías renovables">
                          Ingeniería en energías renovables
                        </option>
                        <option value="Ingeniería en sistemas">
                          Ingeniería en sistemas
                        </option>
                        <option value="Ingeniería mecatrónica">
                          Ingeniería mecatrónica
                        </option>
                        <option value="Literatura">Literatura</option>
                        <option value="Matemáticas">Matemáticas</option>
                        <option value="Medicina">Medicina</option>
                        <option value="Mercadotecnia">Mercadotecnia</option>
                        <option value="Música">Música</option>
                        <option value="Negocios y comercio">
                          Negocios y comercio
                        </option>
                        <option value="Pedagogía">Pedagogía</option>
                        <option value="Periodismo">Periodismo</option>
                        <option value="Publicidad">Publicidad</option>
                        <option value="Química">Química</option>
                        <option value="Teatro">Teatro</option>
                        <option value="Terapia y rehabilitación">
                          Terapia y rehabilitación
                        </option>
                        <option value="Topógrafo">Topógrafo</option>
                        <option value="Turismo">Turismo</option>
                        <option value="Veterinaria">Veterinaria</option>
                      </select>
                    </div>{" "}
                    <button
                      className="bg-blue-500 px-4 py-2 text-white w-full rounded-xl"
                      type="submit"
                    >
                      Enviar
                    </button>
                  </form>{" "}
                </section>
              )}
              {activeSectionIndex === 2 && (
                <section>
                  <h1 className="text-4xl text-center mb-2">
                    Experiencia Laboral
                  </h1>
                  <hr className="mb-4" />
                  <form onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 mt-4 group">
                      <input
                        type="text"
                        name="experiencia"
                        id="experiencia"
                        defaultValue={formData.experiencia || ""}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="experiencia"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Experiencia
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="funciones"
                        id="funciones"
                        defaultValue={formData.funciones || ""}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="funciones"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Funciones que domina
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="software"
                        id="software"
                        defaultValue={formData.software || ""}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="software"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Software que domina
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="maquinas"
                        id="maquinas"
                        defaultValue={formData.maquinas || ""}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="maquinas"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Maquinas de oficina o taller que sepa manejar
                      </label>
                    </div>
                    <button
                      className="bg-blue-500 px-4 py-2 text-white w-full rounded-xl"
                      type="submit"
                    >
                      Enviar
                    </button>
                  </form>
                </section>
              )}
              {activeSectionIndex === 3 && (
                <section>
                  <h1 className="text-4xl text-center mb-2">Disponibilidad</h1>
                  <hr className="mb-4" />
                  <form onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        id="turno_rotativo"
                        name="turno_rotativo"
                        defaultValue={formData.turno_rotativo || ""}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option disabled value="">
                          Puedes trabajar en turnos diferentes
                        </option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        id="fin_semana"
                        name="fin_semana"
                        defaultValue={formData.fin_semana || ""}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option disabled value="">
                          Trabajar en fin de semana
                        </option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                      </select>
                    </div>{" "}
                    <button
                      className="bg-blue-500 px-4 py-2 text-white w-full rounded-xl"
                      type="submit"
                    >
                      Enviar
                    </button>
                  </form>{" "}
                </section>
              )}{" "}
              {activeSectionIndex === 4 && (
                <section>
                  <h1 className="text-4xl text-center mb-2">
                    Empleos Anteriores
                  </h1>
                  <hr className="mb-4" />
                  <label>Actual o ultimos trabajos</label>{" "}
                  <div className="relative z-0 w-full mb-5 group">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={showEmpleos}
                      onChange={(e) => setShowEmpleos(e.target.value)}
                    >
                      <option disabled value="">
                        Empleos anteriores
                      </option>
                      <option value="1">1 trabajo</option>
                      <option value="2">2 trabajo</option>
                      <option value="3">3 trabajo</option>
                    </select>
                  </div>
                  {showEmpleos === "1" ? (
                    <form className="px-4" onSubmit={handleSubmit}>
                      <div className="relative z-0 w-full mb-5 mt-4 group ">
                        <input
                          type="text"
                          name="empresa"
                          id="empresa"
                          defaultValue={formData.empresa || ""}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="empresa"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Nombre de la empresa
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="empresa_direccion"
                          id="empresa_direccion"
                          defaultValue={formData.empresa_direccion || ""}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="empresa_direccion"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Direccion
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="empresa_telefono"
                          id="empresa_telefono"
                          defaultValue={formData.empresa_telefono || ""}
                          maxLength={13}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/[^0-9]/g.test(value)) {
                              alert(
                                "Por favor, ingrese solo números en el campo de teléfono."
                              );
                              e.target.value = value.replace(/[^0-9]/g, "");
                            }
                          }}
                        />
                        <label
                          htmlFor="empresa_telefono"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Telefono
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="empresa_puesto"
                          id="empresa_puesto"
                          defaultValue={formData.empresa_puesto || ""}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="empresa_puesto"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Puesto desempeñado
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="date"
                          name="ingreso"
                          id="ingreso"
                          defaultValue={formData.ingreso || ""}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="ingreso"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Fecha de ingreso
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="date"
                          name="baja"
                          id="baja"
                          defaultValue={formData.baja || ""}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="baja"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Fecha de baja
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="sueldo"
                          id="sueldo"
                          defaultValue={formData.sueldo || ""}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          inputMode="numeric"
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/[^0-9]/g.test(value)) {
                              alert(
                                "Por favor, ingrese solo números en el campo de sueldo."
                              );
                              e.target.value = value.replace(/[^0-9]/g, "");
                            }
                          }}
                        />
                        <label
                          htmlFor="sueldo"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Sueldo semanal
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="empresa_jefe"
                          id="empresa_jefe"
                          defaultValue={formData.empresa_jefe || ""}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="empresa_jefe"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Nombre del jefe inmediato
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="motivo"
                          id="motivo"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          defaultValue={formData.motivo || ""}
                        />
                        <label
                          htmlFor="motivo"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Motivo de su separacion
                        </label>
                      </div>
                      <button
                        className="bg-blue-500 px-4 py-2 text-white w-full rounded-xl"
                        type="submit"
                      >
                        Enviar
                      </button>
                    </form>
                  ) : showEmpleos === "2" ? (
                    <section>
                      <form
                        className="grid grid-cols-1 md:grid-cols-2 px-4 gap-4"
                        onSubmit={handleSubmit}
                      >
                        <div>
                          <div className="relative z-0 w-full mb-5 mt-4 group">
                            <input
                              type="text"
                              name="empresa"
                              id="empresa"
                              defaultValue={formData.empresa || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Nombre de la empresa
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_direccion"
                              id="empresa_direccion"
                              defaultValue={formData.empresa_direccion || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa_direccion"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Direccion
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_telefono"
                              id="empresa_telefono"
                              defaultValue={formData.empresa_telefono || ""}
                              maxLength={13}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/[^0-9]/g.test(value)) {
                                  alert(
                                    "Por favor, ingrese solo números en el campo de teléfono."
                                  );
                                  e.target.value = value.replace(/[^0-9]/g, "");
                                }
                              }}
                            />
                            <label
                              htmlFor="empresa_telefono"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Telefono
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_puesto"
                              id="empresa_puesto"
                              defaultValue={formData.empresa_puesto || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa_puesto"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Puesto desempeñado
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="date"
                              name="ingreso"
                              id="ingreso"
                              defaultValue={formData.ingreso || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="ingreso"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Fecha de ingreso
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="date"
                              name="baja"
                              id="baja"
                              defaultValue={formData.baja || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="baja"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Fecha de baja
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="sueldo"
                              id="sueldo"
                              defaultValue={formData.sueldo || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              inputMode="numeric"
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/[^0-9]/g.test(value)) {
                                  alert(
                                    "Por favor, ingrese solo números en el campo de sueldo."
                                  );
                                  e.target.value = value.replace(/[^0-9]/g, "");
                                }
                              }}
                            />
                            <label
                              htmlFor="sueldo"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Sueldo semanal
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_jefe"
                              id="empresa_jefe"
                              defaultValue={formData.empresa_jefe || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa_jefe"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Nombre del jefe inmediato
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="motivo"
                              id="motivo"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              defaultValue={formData.motivo || ""}
                            />
                            <label
                              htmlFor="motivo"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Motivo de su separacion
                            </label>
                          </div>
                        </div>
                        <div>
                          <div className="relative z-0 w-full mb-5 mt-4 group">
                            <input
                              type="text"
                              name="empresa2"
                              id="empresa2"
                              defaultValue={formData.empresa2 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Nombre de la empresa
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_direccion2"
                              id="empresa_direccion2"
                              defaultValue={formData.empresa_direccion2 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa_direccion2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Direccion
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_telefono2"
                              id="empresa_telefono2"
                              defaultValue={formData.empresa_telefono2 || ""}
                              maxLength={13}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/[^0-9]/g.test(value)) {
                                  alert(
                                    "Por favor, ingrese solo números en el campo de teléfono."
                                  );
                                  e.target.value = value.replace(/[^0-9]/g, "");
                                }
                              }}
                            />
                            <label
                              htmlFor="empresa_telefono2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Telefono
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_puesto2"
                              id="empresa_puesto2"
                              defaultValue={formData.empresa_puesto2 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa_puesto2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Puesto desempeñado
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="date"
                              name="ingreso2"
                              id="ingreso2"
                              defaultValue={formData.ingreso2 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="ingreso2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Fecha de ingreso
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="date"
                              name="baja2"
                              id="baja2"
                              defaultValue={formData.baja2 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="baja2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Fecha de baja
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="sueldo2"
                              id="sueldo2"
                              defaultValue={formData.sueldo2 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              inputMode="numeric"
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/[^0-9]/g.test(value)) {
                                  alert(
                                    "Por favor, ingrese solo números en el campo de sueldo."
                                  );
                                  e.target.value = value.replace(/[^0-9]/g, "");
                                }
                              }}
                            />
                            <label
                              htmlFor="sueldo2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Sueldo semanal
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_jefe2"
                              id="empresa_jefe2"
                              defaultValue={formData.empresa_jefe2 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa_jefe2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Nombre del jefe inmediato
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="motivo2"
                              id="motivo2"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              defaultValue={formData.motivo2 || ""}
                            />
                            <label
                              htmlFor="motivo2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Motivo de su separacion
                            </label>
                          </div>
                        </div>
                        <button
                          className="bg-blue-500 px-4 py-2 text-white w-full rounded-xl md:col-span-2"
                          type="submit"
                        >
                          Enviar
                        </button>
                      </form>
                    </section>
                  ) : showEmpleos === "3" ? (
                    <section>
                      <form
                        className="grid grid-cols-1 md:grid-cols-3 px-4 gap-4"
                        onSubmit={handleSubmit}
                      >
                        <div>
                          <div className="relative z-0 w-full mb-5 mt-4 group">
                            <input
                              type="text"
                              name="empresa"
                              id="empresa"
                              defaultValue={formData.empresa || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Nombre de la empresa
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_direccion"
                              id="empresa_direccion"
                              defaultValue={formData.empresa_direccion || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa_direccion"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Direccion
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_telefono"
                              id="empresa_telefono"
                              defaultValue={formData.empresa_telefono || ""}
                              maxLength={13}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/[^0-9]/g.test(value)) {
                                  alert(
                                    "Por favor, ingrese solo números en el campo de teléfono."
                                  );
                                  e.target.value = value.replace(/[^0-9]/g, "");
                                }
                              }}
                            />
                            <label
                              htmlFor="empresa_telefono"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Telefono
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_puesto"
                              id="empresa_puesto"
                              defaultValue={formData.empresa_puesto || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa_puesto"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Puesto desempeñado
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="date"
                              name="ingreso"
                              id="ingreso"
                              defaultValue={formData.ingreso || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="ingreso"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Fecha de ingreso
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="date"
                              name="baja"
                              id="baja"
                              defaultValue={formData.baja || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="baja"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Fecha de baja
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="sueldo"
                              id="sueldo"
                              defaultValue={formData.sueldo || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              inputMode="numeric"
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/[^0-9]/g.test(value)) {
                                  alert(
                                    "Por favor, ingrese solo números en el campo de sueldo."
                                  );
                                  e.target.value = value.replace(/[^0-9]/g, "");
                                }
                              }}
                            />
                            <label
                              htmlFor="sueldo"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Sueldo semanal
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_jefe"
                              id="empresa_jefe"
                              defaultValue={formData.empresa_jefe || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa_jefe"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Nombre del jefe inmediato
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="motivo"
                              id="motivo"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              defaultValue={formData.motivo || ""}
                            />
                            <label
                              htmlFor="motivo"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Motivo de su separacion
                            </label>
                          </div>
                        </div>
                        <div>
                          <div className="relative z-0 w-full mb-5 mt-4 group">
                            <input
                              type="text"
                              name="empresa2"
                              id="empresa2"
                              defaultValue={formData.empresa2 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Nombre de la empresa
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_direccion2"
                              id="empresa_direccion2"
                              defaultValue={formData.empresa_direccion2 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa_direccion2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Direccion
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_telefono2"
                              id="empresa_telefono2"
                              defaultValue={formData.empresa_telefono2 || ""}
                              maxLength={13}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/[^0-9]/g.test(value)) {
                                  alert(
                                    "Por favor, ingrese solo números en el campo de teléfono."
                                  );
                                  e.target.value = value.replace(/[^0-9]/g, "");
                                }
                              }}
                            />
                            <label
                              htmlFor="empresa_telefono2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Telefono
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_puesto2"
                              id="empresa_puesto2"
                              defaultValue={formData.empresa_puesto2 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa_puesto2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Puesto desempeñado
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="date"
                              name="ingreso2"
                              id="ingreso2"
                              defaultValue={formData.ingreso2 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="ingreso2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Fecha de ingreso
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="date"
                              name="baja2"
                              id="baja2"
                              defaultValue={formData.baja2 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="baja2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Fecha de baja
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="sueldo2"
                              id="sueldo2"
                              defaultValue={formData.sueldo2 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              inputMode="numeric"
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/[^0-9]/g.test(value)) {
                                  alert(
                                    "Por favor, ingrese solo números en el campo de sueldo."
                                  );
                                  e.target.value = value.replace(/[^0-9]/g, "");
                                }
                              }}
                            />
                            <label
                              htmlFor="sueldo2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Sueldo semanal
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_jefe2"
                              id="empresa_jefe2"
                              defaultValue={formData.empresa_jefe2 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa_jefe2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Nombre del jefe inmediato
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="motivo2"
                              id="motivo2"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              defaultValue={formData.motivo2 || ""}
                            />
                            <label
                              htmlFor="motivo2"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Motivo de su separacion
                            </label>
                          </div>
                        </div>
                        <div>
                          <div className="relative z-0 w-full mb-5 mt-4 group">
                            <input
                              type="text"
                              name="empresa3"
                              id="empresa3"
                              defaultValue={formData.empresa3 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa3"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Nombre de la empresa
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_direccion3"
                              id="empresa_direccion3"
                              defaultValue={formData.empresa_direccion3 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa_direccion3"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Direccion
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_telefono3"
                              id="empresa_telefono3"
                              defaultValue={formData.empresa_telefono3 || ""}
                              maxLength={13}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/[^0-9]/g.test(value)) {
                                  alert(
                                    "Por favor, ingrese solo números en el campo de teléfono."
                                  );
                                  e.target.value = value.replace(/[^0-9]/g, "");
                                }
                              }}
                            />
                            <label
                              htmlFor="empresa_telefono3"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Telefono
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_puesto3"
                              id="empresa_puesto3"
                              defaultValue={formData.empresa_puesto3 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa_puesto3"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Puesto desempeñado
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="date"
                              name="ingreso3"
                              id="ingreso3"
                              defaultValue={formData.ingreso3 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="ingreso3"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Fecha de ingreso
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="date"
                              name="baja3"
                              id="baja3"
                              defaultValue={formData.baja3 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="baja3"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Fecha de baja
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="sueldo3"
                              id="sueldo3"
                              defaultValue={formData.sueldo3 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              inputMode="numeric"
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/[^0-9]/g.test(value)) {
                                  alert(
                                    "Por favor, ingrese solo números en el campo de sueldo."
                                  );
                                  e.target.value = value.replace(/[^0-9]/g, "");
                                }
                              }}
                            />
                            <label
                              htmlFor="sueldo3"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Sueldo semanal
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="empresa_jefe3"
                              id="empresa_jefe3"
                              defaultValue={formData.empresa_jefe3 || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="empresa_jefe3"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Nombre del jefe inmediato
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="motivo3"
                              id="motivo3"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              defaultValue={formData.motivo3 || ""}
                            />
                            <label
                              htmlFor="motivo3"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Motivo de su separacion
                            </label>
                          </div>
                        </div>
                        <button
                          className="bg-blue-500 px-4 py-2 text-white w-full rounded-xl md:col-span-3"
                          type="submit"
                        >
                          Enviar
                        </button>
                      </form>
                    </section>
                  ) : (
                    <section>
                      <h1 className="font-bold text-2xl">
                        Seleccione una opcion de trabajo para continuar
                      </h1>
                    </section>
                  )}
                </section>
              )}{" "}
              {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                  <div className="fixed inset-0 bg-black bg-opacity-50"></div>
                  <div className="bg-white rounded-lg p-5 shadow-lg relative z-20 max-w-lg mx-auto">
                    <img
                      src="/SYL talento especialistas en Reclutamiento de personal para vacantes de empresas en México.png"
                      alt="Logo de la empresa"
                      className="w-full h-48 object-cover object-center mb-4 rounded"
                    />
                    <h2 className="text-2xl mb-4">
                      Información enviada con éxito
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Gracias por enviar tu solicitud. Nuestro equipo revisará
                      tu información y se pondrá en contacto contigo lo antes
                      posible.
                    </p>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded w-full"
                      onClick={() => {
                        setIsModalOpen(false);
                        window.location.reload();
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default page;
