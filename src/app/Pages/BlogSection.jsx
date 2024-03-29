import React from "react";
import Image from "next/image";
import Link from "next/link";
function BlogSection() {
  return (
    <div
      id="blogs"
      className="flex flex-col items-center justify-center max-w-6xl py-8 mx-auto bg-white border-t-2 border-black"
    >
      <main className="flex flex-col items-center w-full text-center bg-white mt-5">
        <h1 className="text-4xl font-bold sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-500 to-orange-500">
          BLOGS
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 [&>article]:text-black font gap-8 my-8">
          <article>
            <Image
              src="/SYL especialistas en publicar vacantes globalmente para buscar y conseguir el talento necesario hacia tu empresa.webp"
              width={700}
              height={50}
              alt="En SYL nos especializamos en publicar vacantes globalmente, ayudando a la búsqueda del talento que estas buscando para tu empresa."
              title="En SYL nos especializamos en publicar vacantes globalmente, ayudando a la búsqueda del talento que estas buscando para tu empresa."

            />
            <div className="flex justify-between font-semibold font">
              <span>Por: Syl Talento</span>
              <span> 20 de noviembre de 2023</span>
            </div>
            <div className="text-left mt-2">
              <Link target="_blank" title="Reclutamiento Ejecutivo" href="/blog-talento/reclutamiento-ejecutivo">
                <h1 className="text-blue-500 hover:underline hover:text-blue-800 text-3xl">
                  Reclutamiento Ejecutivo
                </h1>
              </Link>
              <span>
                SYL Talento va más allá del reclutamiento; estamos construyendo
                asociaciones duraderas que transforman la forma en que las
                empresas atraen y evalúan el talento de alto nivel.
              </span>
            </div>
            <div className="flex mt-4">
              <Link target="_blank" title="Reclutamiento Ejecutivo" href="/blog-talento/reclutamiento-ejecutivo">
                <button className="bg-orange-500 text-white p-2 hover:bg-orange-700 rounded-lg">
                  Leer este blog
                </button>
              </Link>
            </div>
          </article>
          <article>
            <Image
              src="/Nuestras páginas de reclutamiento se enfocan en una selección de personal altamente especializada para cualquier ámbito.png"
              width={900}
              height={50}
              alt="Nuestras páginas de reclutamiento facilitan el proceso de selección de personal masivo, ahorrando tiempo y recursos, siendo más eficaz. "
              title="Nuestras páginas de reclutamiento facilitan el proceso de selección de personal masivo, ahorrando tiempo y recursos, siendo más eficaz. "
            />
            <div className="flex justify-between font-semibold">
              <span>Por: Syl Talento</span>
              <span> 11 de diciembre de 2023</span>
            </div>
            <div className="text-left mt-2">
              <Link target="_blank" title="Recursos Empresariales" href="/blog-talento/recursos-empresariales">
                <h1 className="text-blue-500 hover:underline hover:text-blue-800 text-3xl">
                  Optimizando Recursos Empresariales
                </h1>
              </Link>
              <span>
                La subcontratación especializada es una excelente manera de
                reducir costos, mejorar la eficiencia y liberar recursos
                internos para que se concentren en las actividades principales
                del negocio.
              </span>
            </div>
            <div className="flex mt-4">
              <Link target="_blank" title="Recursos Empresariales" href="/blog-talento/recursos-empresariales">
                <button className="bg-orange-500 text-white p-2 hover:bg-orange-700 rounded-lg">
                  Leer este blog
                </button>
              </Link>
            </div>
          </article>
        </div>
        <article className="font gap-8 my-8 text-black">
          <Image
            src="/Con nuestras plataformas de empleo manejamos el tiempo y recursos del proceso de selección de personal.png"
            width={1200}
            height={10}
            alt="SYL talento agiliza y organiza los medios necesarios para gestionar una   contratación eficaz. La estructuración de los procesos de reclutamiento de personal de SYL agilizan los procesos y ahorran gastos."
            title="SYL talento agiliza y organiza los medios necesarios para gestionar una   contratación eficaz. La estructuración de los procesos de reclutamiento de personal de SYL agilizan los procesos y ahorran gastos."
         />
          <div className="flex font-semibold justify-between">
            <span>Por: Syl Talento</span>
            <span>19 de enero de 2024</span>
          </div>
          <div className="text-left mt-2">
            <Link target="_blank" title="Estructuracion Organizacional" href="/blog-talento/estructuracion-organizacional">
              <h1 className="text-blue-500 hover:underline hover:text-blue-800 text-3xl">
                Estructuración Organizacional Con SYL Talento{" "}
              </h1>
            </Link>
            <span>
              La estructuración organizacional es un proceso fundamental para el
              éxito de cualquier empresa. Se trata de definir la estructura, los
              roles y las responsabilidades de cada área y puesto de trabajo.
            </span>
          </div>
          <div className="flex mt-4">
            <Link target="_blank" title="Estructuracion Organizacional" href="/blog-talento/estructuracion-organizacional">
              <button className="bg-orange-500 text-white p-2 hover:bg-orange-700 rounded-lg">
                Leer este blog
              </button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

export default BlogSection;
