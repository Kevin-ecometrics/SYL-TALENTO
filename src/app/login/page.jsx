"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
function LoginPage() {
  const [view, setView] = useState("register");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userKey, setUserKey] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    setEmail(email);
    setPassword(password);
    setConfirmPassword(confirmPassword);
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    } else {
      setIsModalOpen(true);
      setUserKey("");
    }
  };

  const handleModalSubmit = async () => {
    setIsModalOpen(false);

    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

    if (userKey === secretKey) {
      try {
        const response = await axios.post("https://syltalento.com/api/create", {
          email,
          password,
        });
        if (response.data === "Usuario creado con éxito") {
          toast.success("Usuario creado con éxito");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        } else if (response.data === "El correo electrónico ya está en uso") {
          toast.error("El correo electrónico ya está en uso");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Clave incorrecta");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://syltalento.com/api/login",
        {
          email: event.target.email.value,
          password: event.target.password.value,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.message === "Usuario autenticado con éxito") {
        toast.success("Usuario autenticado con éxito");
        router.push("/cv/dashboard");
      } else if (
        response.data === "Correo electrónico o contraseña incorrectos"
      ) {
        toast.error("Correo electrónico o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="bg-white text-black">
      <div className="container mx-auto">
        <h1 className="text-3xl text-black font-bold text-center mt-10">
          Bienvenido
        </h1>
        <div className="flex justify-center mt-10 text-black">
          <button
            className={`px-4 py-2 border-b-2 ${
              view === "register" ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setView("register")}
          >
            Registrar
          </button>
          <button
            className={`px-4 py-2 border-b-2 ${
              view === "login" ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setView("login")}
          >
            Iniciar sesión
          </button>
        </div>
        {view === "register" ? (
          <section>
            <form
              className="flex flex-col w-1/2 mx-auto mt-10 border p-4 border-gray-400 rounded-lg shadow-lg"
              onSubmit={handleRegister}
            >
              <label className="text-black font-bold" htmlFor="email">
                Email
              </label>
              <input
                className="border border-gray-400 p-2"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="text-black font-bold mt-4" htmlFor="password">
                Password
              </label>
              <input
                className="border border-gray-400 p-2 text-black "
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                className="text-black font-bold mt-4"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="border border-gray-400 p-2 text-black"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4"
                type="submit"
              >
                Registrar usuario
              </button>
            </form>
            <Toaster position="top-right" />
          </section>
        ) : (
          <section>
            <form
              className="flex flex-col w-1/2 mx-auto mt-10 border p-4 border-gray-400 rounded-lg shadow-lg"
              onSubmit={handleLogin}
            >
              <label className="text-black font-bold" htmlFor="email">
                Email
              </label>
              <input
                className="border border-gray-400 p-2"
                type="email"
                id="email"
                name="email"
                required
              />
              <label className="text-black font-bold mt-4" htmlFor="password">
                Password
              </label>
              <input
                className="border border-gray-400 p-2 text-black"
                type="password"
                id="password"
                name="password"
                required
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4"
                type="submit"
              >
                Iniciar sesión
              </button>
            </form>
            <Toaster position="top-right" />
          </section>
        )}
        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    Ingresa la clave de confirmación
                  </h2>
                  <input
                    type="password"
                    value={userKey}
                    onChange={(e) => setUserKey(e.target.value)}
                    required
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleModalSubmit}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Crear usuario
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default LoginPage;
