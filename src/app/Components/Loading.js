"use client";
import React from "react";
import { motion } from "framer-motion";
export default function Loading() {
  return (
    <div
      className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-screen h-screen bg-white"
      
    >
      <motion.img
        src="/SYL talento especialistas en Reclutamiento de personal para vacantes de empresas en México.png"
alt="Loading Logo"
        initial="out"
        transition={{
          duration: 0.5,
          yoyo: Infinity,
          ease: "easeInOut",
        }}
        className="w-96"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="text-2xl md:text-4xl px-4 flex justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-500 to-orange-500"
      >
        Soluciones en reclutamiento y selección.
      </motion.p>
    </div>
  );
}
