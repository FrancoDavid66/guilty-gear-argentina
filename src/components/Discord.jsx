import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { discord } from '../data/gga'
import { useDiscord } from '../lib/discord'
import { sinMovimiento } from '../lib/movimiento'
import Titulo from './Titulo'
import Aparece from './Aparece'
import Logo from './Logo'
import { Marca, Flecha } from './Iconos'

const fmt = (n) => n.toLocaleString('es-AR')

// Número que sube como contador de combo
function Combo({ valor }) {
  const ref = useRef(null)
  const visto = useInView(ref, { once: true, amount: 0.6 })
  const [n, setN] = useState(sinMovimiento ? valor : 0)
  useEffect(() => {
    if (!visto) return
    if (sinMovimiento) return setN(valor)
    const c = animate(0, valor, { duration: 1.6, ease: [0.2, 0.8, 0.2, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [visto, valor])
  return (
    <span ref={ref} className="tabular-nums">
      {fmt(n)}
    </span>
  )
}

export default function Discord() {
  const vivo = useDiscord(discord.codigo)
  const miembros = vivo?.miembros ?? discord.miembrosRespaldo

  return (
    <section id="discord" className="relative overflow-hidden bg-cian pb-20 pt-24 text-noche lg:pb-28 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 lineas-oscuras" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1240px] gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <p className="bajada flex items-center gap-2 text-noche/70">
            <Marca red="discord" className="h-4 w-4" /> Discord
          </p>
          <Titulo lineas={discord.titulo} className="mt-3 !text-[clamp(2.4rem,10vw,4.6rem)]" barra="#07090D" />
          <div className="raya bg-noche" />
          <Aparece>
            <p className="mt-6 max-w-[36rem] text-[17px] font-medium text-noche/85">{discord.texto}</p>
          </Aparece>
          <Aparece delay={0.1}>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Para qué sirve el Discord">
              {discord.usos.map((u) => (
                <li key={u} className="chip bg-noche text-white">
                  {u}
                </li>
              ))}
            </ul>
          </Aparece>
        </div>

        {/* Tarjeta de invitación con números en vivo */}
        <Aparece delay={0.1}>
          <div className="tarjeta-corte relative bg-noche p-6 text-white shadow-2xl sm:p-8">
            <div className="flex items-center gap-4">
              {vivo?.icono ? (
                <img src={vivo.icono} alt="" className="h-16 w-16 rounded-2xl" loading="lazy" />
              ) : (
                <Logo className="h-16 w-16" alt="" />
              )}
              <div className="min-w-0">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/50">Te invitaron a unirte a</p>
                <p className="truncate font-titulo text-[26px] font-black uppercase leading-tight">{vivo?.nombre ?? 'Guilty Gear Argentina'}</p>
              </div>
            </div>

            <div className="mt-6 border-y border-white/10 py-5">
              <p className="font-titulo text-[clamp(4.2rem,22vw,7rem)] font-black leading-[0.85] text-cian">
                {!vivo && '+'}
                <Combo valor={miembros} />
              </p>
              <p className="mt-2 font-titulo text-[22px] font-extrabold uppercase tracking-wide">miembros y contando</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[15px] text-white/70">
                {vivo?.conectados ? (
                  <span className="flex items-center gap-2">
                    <span className="conectado h-2.5 w-2.5 rounded-full bg-[#23A55A]" />
                    {fmt(vivo.conectados)} conectados ahora
                  </span>
                ) : null}
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
                  Sudamérica entera
                </span>
              </div>
            </div>

            <a href={discord.link} target="_blank" rel="noreferrer" className="boton boton-cian brillo mt-6 w-full">
              <Marca red="discord" /> {discord.boton} <Flecha />
            </a>
            <p className="mt-3 text-center font-mono text-[12px] text-white/45">discord.gg/{discord.codigo}</p>
          </div>
        </Aparece>
      </div>
    </section>
  )
}
