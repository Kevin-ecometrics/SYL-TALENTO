import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import SquigglyLines from '../Components/SquigglyLines';
import Footer from './FooterSection';

function HeroSection() {
    return (
        <div className="flex flex-col items-center justify-center max-w-6xl min-h-screen py-2 mx-auto bg-white">
            <main className="flex flex-col items-center justify-center flex-1 w-full px-4 mt-20 text-center bg-white sm:mt-20">
                <h1 className="mx-auto text-5xl font-bold tracking-normal text-blue-500 max-w-1xl font-display sm:text-7xl">
                    Bienvenidos a SYL Talento
                </h1>
                <h2 className="max-w-xl mx-auto mt-12 text-lg leading-7 text-black sm:text-black">
                    En SYL Talento, nos dedicamos a brindar soluciones de reclutamiento y selección de personal, así como suministros de materiales en Baja California y en toda la República Mexicana. Somos una empresa 100% comprometida con la innovación, la integridad y la calidad.
                </h2>
                <Link
                    className="px-4 py-3 mt-8 font-medium text-white transition bg-blue-600 rounded-xl sm:mt-10 hover:bg-blue-500"
                    href="/dream"
                >
                    btn
                </Link>
                {/* <div className="flex flex-col items-center justify-between w-full mt-6 sm:mt-10">
                    <div className="flex flex-col mt-4 mb-16 space-y-10">
                        <div className="flex flex-col sm:space-x-8 sm:flex-row">
                            <div>
                                <h3 className="mb-1 text-lg font-medium">Nostrud nulla aliquip</h3>
                                <Image
                                    alt="Original photo of a room with roomGPT.io"
                                    src="/sofa.avif"
                                    className="object-cover w-full h-96 rounded-2xl"
                                    width={400}
                                    height={400}
                                />
                            </div>
                            <div className="mt-8 sm:mt-0">
                                <h3 className="mb-1 text-lg font-medium">Proident dolor laborum</h3>
                                <Image
                                    alt="Generated photo of a room with roomGPT.io"
                                    width={400}
                                    height={400}
                                    src="/sofa.avif"
                                    className="object-cover w-full mt-2 h-96 rounded-2xl sm:mt-0"
                                />
                            </div>
                        </div>
                    </div>
                </div> */}
            </main>
            <Footer />
        </div>
    )
}

export default HeroSection