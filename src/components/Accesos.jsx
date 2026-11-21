import { accesos } from '../data/gga'
import { irA } from '../lib/scroll'
import Aparece from './Aparece'
import { Flecha } from './Iconos'

// Inicio: tarjetas grandes que llevan a cada página
export default function Accesos() {
  return (
    <section className="bg-noche px-3 pb-20 sm:px-6 sm:pb-28" aria-labelledby="titulo-accesos">
      <div className="mx-auto max-w-[1240px]">
        <h2 id="titulo-accesos" className="etiqueta mb-4 px-1">
          Explorá GGA
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
          {accesos.map((a, i) => (
            <Aparece key={a.id} delay={i * 0.05}>
              <button
                onClick={() => irA(a.id)}
                className="tarjeta group flex h-full min-h-[190px] w-full flex-col justify-between text-left transition duration-300 hover:-translate-y-1 hover:border-cian lg:min-h-[240px]"
              >
                <span className="flex items-center justify-between font-mono text-[13px] text-white/45">
                  0{i + 1}
                  <span className="text-cian transition group-hover:translate-x-1">
                    <Flecha />
                  </span>
                </span>
                <span>
                  <span className="block font-titulo text-[34px] font-black uppercase leading-none transition group-hover:text-cian">{a.titulo}</span>
                  <span className="mt-2 block text-[14px] text-white/60">{a.texto}</span>
                </span>
              </button>
            </Aparece>
          ))}
        </div>
      </div>
    </section>
  )
}
