"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  MapPinIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import { Card, CardBody, Input, Button, Textarea } from "@nextui-org/react";
import facebook from "../../../public/facebook.svg";
import whatsapp from "../../../public/whatsapp.svg";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

function ContactoSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("https://syltalento.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, subject, message }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Email sent successfully");
          toast.success("Se envio el correo correctamente", 
          {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
            duration: 5000,
          });
        resetForm();
        } else {
          console.log("Error sending email");
          toast.error("Algo ocurrio al enviar el correo", 
          {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
            duration: 5000,
          }
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };
  return (
    <div
      id="contacto"
      className="flex flex-col items-center justify-center max-w-6xl min-h-screen py-2 mx-auto bg-white border-t-2 border-black"
    >
          <Toaster position="bottom-right" reverseOrder={true} />
          <main className="flex flex-col items-center w-full px-4 mt-20 space-y-8 text-center bg-white sm:mt-20">
            <h1 className="mx-auto text-5xl font-bold tracking-normal text-transparent max-w-1xl font-display sm:text-7xl bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-orange-500">
              Contacto
            </h1>
            <h3 className="text-black">
              Confía en SYL Talento para encontrar a los mejores profesionales que
              impulsarán el éxito de tu empresa. Contáctanos hoy mismo y descubre el
              futuro del reclutamiento.{" "}
            </h3>
            <div className="flex flex-col items-center justify-between w-full gap-8 space-y-4 sm:flex-row sm:space-y-0">
              <div className="flex-col items-center flex-1 w-full gap-8 space-y-4 sm:flex-row sm:space-y-0">
                <div className="flex-1 space-y-8 text-black">
                  <div className="flex items-center space-x-4">
                    <ClockIcon className="w-8 h-8 text-black" />
                    <span>Horario: 8:30 am a 17:00hrs</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <DevicePhoneMobileIcon className="w-8 h-8 text-blue-500" />
                    <span>664-734-2954</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPinIcon className="w-8 h-8 text-red-500" />
                    <span>Centro, Tijuana, Baja California</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <EnvelopeIcon className="w-8 h-8 text-orange-500" />
                    <span>contacto@syltalento.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button className="bg-blue-500 rounded-full hover:bg-blue-800">
                      <Link
                        target="_blank"
                        href="https://www.facebook.com/SYLTalento1"
                      >
                        <Image src={facebook} className="w-8 h-8 text-white" />
                      </Link>
                    </Button>
                    <Button className="bg-red-500 rounded-full hover:bg-red-800">
                      <Link
                        target="_blank"
                        href="https://www.facebook.com/profile.php?id=100063574134270&mibextid=ZbWKwL"
                      >
                        <Image src={facebook} className="w-8 h-8 text-white" />
                      </Link>
                    </Button>
                    <Button className="bg-orange-300 rounded-full hover:bg-orange-500">
                      <Link
                        target="_blank"
                        href="https://api.whatsapp.com/send?phone=5216642145977&text=Hola%20Syltalento"
                      >
                        <Image src={whatsapp} className="w-8 h-8 text-white" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-xl leading-7 text-black sm:text-black">
                <Card className="w-full border max-w-[24rem] shadow-black border-black">
                  <CardBody>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                      <div>
                        <p
                          variant="small"
                          color="blue-gray"
                          className="mb-4 font-medium text-center text-black"
                        >
                          Ingresa datos de contacto
                        </p>
                        <div className="flex flex-col gap-6 mb-4">
                          <Input
                            size="lg"
                            label="Nombre"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="border border-blue-500 rounded-xl"
                            isRequired
                          />
                          <Input
                            size="lg"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            label="Correo"
                            type="email"
                            className="border border-blue-500 rounded-xl"
                            isRequired
                          />
                          <Input
                            size="lg"
                            value={subject}
                            onChange={(event) => setSubject(event.target.value)}
                            label="Asunto"
                            className="border border-blue-500 rounded-xl"
                            isRequired
                            />
                          <div className="w-82">
                            <Textarea
                              size="lg"
                              value={message}
                              onChange={(event) => setMessage(event.target.value)}
                              label="Mensaje"
                              className="border border-blue-500 rounded-xl"
                              isRequired
                            />
                          </div>
                        </div>
                      </div>
                      <Button
                        className="text-white bg-blue-500 hover:bg-blue-700"
                        type="submit"
                        size="lg"
                        
                      >
                        Enviar
                      </Button>
                    </form>
                  </CardBody>
                </Card>
              </div>
            </div>
          </main>
        </div>
      );
    }

    export default ContactoSection;
