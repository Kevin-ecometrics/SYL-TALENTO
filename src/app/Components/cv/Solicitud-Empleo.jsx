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

function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState({}); // Nuevo estado para los datos del formulario
  const [options, setOptions] = useState([]);
  const [showCartilla, setShowCartilla] = useState("");
  const [showTratamiento, setShowTratamiento] = useState("");
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
                          <input
                            type="text"
                            name="ciudad"
                            id="ciudad"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            defaultValue={formData.ciudad || ""}
                          />
                          <label
                            htmlFor="ciudad"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Ciudad
                          </label>
                        </div>{" "}
                        <div className="relative z-0 w-full group mb-4">
                          <input
                            type="text"
                            name="estado"
                            id="estado"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            defaultValue={formData.estado || ""}
                          />
                          <label
                            htmlFor="estado"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Estado
                          </label>
                        </div>{" "}
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
                            Estatura en cm
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
              {activeSectionIndex === 3 && (
                <section>
                  <h1 className="text-4xl text-center mb-2">
                    Empleos Anteriores
                  </h1>
                  <hr className="mb-4" />
                  <label>Actual o ultimo:</label>{" "}
                  <form onSubmit={handleSubmit}>
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
                    <button
                      className="bg-blue-500 px-4 py-2 text-white w-full rounded-xl"
                      type="submit"
                    >
                      Enviar
                    </button>
                  </form>{" "}
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
