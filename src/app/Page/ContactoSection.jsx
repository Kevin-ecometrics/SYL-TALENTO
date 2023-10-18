"use client"
import Image from 'next/image'
import React from 'react'
import { MapPinIcon, DevicePhoneMobileIcon, EnvelopeIcon, ClockIcon} from '@heroicons/react/24/solid'
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Textarea,
} from "@material-tailwind/react";
import facebook from '../../../public/facebook.svg'
import whatsapp from '../../../public/whatsapp.svg'
import Link from 'next/link';

function ContactoSection() {

    return (
        <div id='contacto' className="flex flex-col items-center justify-center max-w-6xl min-h-screen py-2 mx-auto bg-white border-t-2 border-black">
            <main className="flex flex-col items-center w-full px-4 mt-20 space-y-8 text-center bg-white sm:mt-20">
                <h1 className="mx-auto text-5xl font-bold tracking-normal text-transparent max-w-1xl font-display sm:text-7xl bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-orange-500">
                    Contacto
                </h1>
                <h3 className='text-black'>
                Confía en SYL Talento para encontrar a los mejores profesionales que impulsarán el éxito de tu empresa. Contáctanos hoy mismo y descubre el futuro del reclutamiento.                 </h3>
                <div className="flex flex-col items-center justify-between w-full gap-8 space-y-4 sm:flex-row sm:space-y-0">
                    <div className="flex-col items-center flex-1 w-full gap-8 space-y-4 sm:flex-row sm:space-y-0">
                        <div className="flex-1 space-y-8 text-black">
                            <div className="flex items-center space-x-4">
                                <ClockIcon className="w-8 h-8 text-black"/>
                                <span>Horario: 8:30 am a 17:00hrs</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <DevicePhoneMobileIcon className="w-8 h-8 text-blue-500"/>
                                <span>664-879-1510</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <MapPinIcon className="w-8 h-8 text-red-500"/>
                                <span>Centro, Tijuana, Baja California</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <EnvelopeIcon className="w-8 h-8 text-orange-500"/>
                                <span>contacto@syltalento.com</span>
                            </div>
                            <div className="flex items-center space-x-4">
                            <Button className='bg-blue-500 rounded-full hover:bg-blue-800'>
                                <Link target="_blank" href="https://www.facebook.com/SYLTalento1">
                                    <Image src={facebook}   className="w-8 h-8 text-white"/>
                                </Link>
                            </Button>
                            <Button className='bg-red-500 rounded-full hover:bg-red-800'>
                                <Link target="_blank" href="https://www.facebook.com/profile.php?id=100063574134270&mibextid=ZbWKwL">
                                    <Image src={facebook}   className="w-8 h-8 text-white"/>
                                </Link>                            
                            </Button>
                            <Button className='bg-orange-300 rounded-full hover:bg-orange-500'>
                                <Link target="_blank" href="https://api.whatsapp.com/send?phone=5216642145977&text=Hola%20Syltalento">
                                    <Image src={whatsapp}   className="w-8 h-8 text-white"/>
                                </Link>                              
                            </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 text-xl leading-7 text-black sm:text-black">
                        <Card className="w-full border max-w-[24rem] shadow-black">
                            <CardHeader
                                color="gray"
                                floated={false}
                                shadow={false}
                                className="grid px-4 py-2 m-0 text-center rounded-b-none place-items-center"
                            >
                                <div className="p-6 mb-4 text-white bg-white border border-white rounded-full">
                                    <Image src='/SYL.png' width={100} height={100} />
                                </div>
                            </CardHeader>
                            <CardBody>
                                <form className="flex flex-col gap-4">
                                    <div>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="mb-4 font-medium text-start"
                                        >
                                            Ingresa datos de contacto
                                        </Typography>
                                        <div className="flex flex-col gap-6 mb-4">
                                            <Input size="lg" label="Nombre" />
                                            <Input size="lg" label="Correo" />
                                            <Input size="lg" label="Asunto" />
                                            <div className="w-82">
                                                <Textarea label="Message" />
                                            </div>
                                        </div>
                                    </div>
                                    <Button size="lg">Enviar</Button>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </main>
        </div>)
}

export default ContactoSection