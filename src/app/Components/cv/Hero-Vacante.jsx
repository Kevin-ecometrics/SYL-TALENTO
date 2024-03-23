import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

function HeroVacante() {
  const data = [
    { name: "Enero", clientes: 20 },
    { name: "Febrero", clientes: 15 },
    { name: "Marzo", clientes: 22 },
    { name: "Abril", clientes: 25 },
    { name: "Mayo", clientes: 30 },
    { name: "Junio", clientes: 35 },
    { name: "Julio", clientes: 40 },
    { name: "Agosto", clientes: 45 },
    { name: "Septiembre", clientes: 50 },
    { name: "Octubre", clientes: 55 },
    { name: "Noviembre", clientes: 60 },
    { name: "Diciembre", clientes: 65 },
  ];

  return (
    <main>
      <section className="bg-[#2557A7] h-[250px] rounded-br-[1200px]">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold">
            Bienvenido a tu panel de control
          </h1>
        </div>
      </section>
      <article className="w-auto md:w-[90%] mx-auto py-8">
        <div className="mt-8 flex justify-center items-center flex-col">
          <h2 className="text-3xl font-bold text-black text-center mb-8">
            Estadísticas de clientes generados
          </h2>
          <BarChart
            width={800}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="clientes"
              fill="#2557A7"
              isAnimationActive={true}
              animationBegin={200}
            >
              <LabelList dataKey="clientes" position="top" />
            </Bar>{" "}
          </BarChart>
        </div>
      </article>
    </main>
  );
}

export default HeroVacante;
