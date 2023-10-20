"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow min-h-screen bg-white mx-autp">
      <Image src="/SYL.png" width={300} height={300} />
      <p className="text-2xl font-medium text-gray-600"> Acceso denegado</p>
      <Link href="/" className="mt-4 text-blue-500 hover:text-blue-700">
        <Button
          radius="full"
          className="text-white shadow-lg bg-gradient-to-tr from-blue-500 via-red-500 to-orange-500 hover:from-blue-700 hover:via-red-700 hover:to-orange-700"
        >
          Regresar al inicio
        </Button>
      </Link>
    </div>
  );
}

