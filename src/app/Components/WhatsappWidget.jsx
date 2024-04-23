import React, { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") {
      alert("Por favor, escribe un mensaje antes de enviar.");
      return;
    }

    const url = `https://wa.me/+526642145977?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-8 right-8">
      <button onClick={toggleModal} className="rounded-full bg-green-500 p-2">
        <FaWhatsapp size={32} color="white" />
      </button>
      {isOpen && (
        <motion.div
          className="bg-white rounded-lg p-4 w-64 h-96 border-2 border-green-500 absolute bottom-14 right-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <FaWhatsapp size={32} color="green" />
              <div>
                <div className="font-bold text-black">SYL TALENTO</div>
                <div className="text-xs text-gray-800">En línea</div>
              </div>
            </div>
            <button onClick={toggleModal} className="text-gray-500">
              <FaTimes />
            </button>
          </div>
          <hr className="border border-gray-700 mb-2" />
          <div className="mb-4 text-green-500">
            En que podemos ayudarte hoy?
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-40 text-black mb-4 border border-gray-700 p-2 rounded-lg resize-none focus:outline-none"
            placeholder="Escribe tu mensaje aquí..."
            required
          />
          <button
            onClick={handleSend}
            className="w-full text-white bg-green-500 py-2 rounded-lg focus:outline-none"
          >
            Enviar
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default WhatsAppWidget;
