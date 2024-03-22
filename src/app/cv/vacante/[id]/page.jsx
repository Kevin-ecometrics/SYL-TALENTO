export function generateStaticParams() {
  return [
    { id: "Programador" },
    { id: "Contador" },
    { id: "Ingeniero Civil" },
    { id: "Arquitecto" },
    { id: "Medico" },
    { id: "Enfermero" },
    { id: "Dentista" },
    { id: "Farmacéutico" },
    { id: "Psicólogo" },
    { id: "Veterinario" },
    { id: "Profesor" },
    { id: "Policía" },
    { id: "Bombero" },
    { id: "Chef" },
    { id: "Piloto" },
    { id: "Abogado" },
    { id: "Periodista" },
    { id: "Fotógrafo" },
    { id: "Diseñador Gráfico" },
    { id: "Traductor" },
  ];
}

export default function Page({ params }) {
  const { id } = params;
  return <div className="bg-white text-black ">{id}</div>;
}
