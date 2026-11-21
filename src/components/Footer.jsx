import { sitio, discord, eventos, vods, redes, aviso } from '../data/gga'
import { irA } from '../lib/scroll'
import Logo from './Logo'
import { Marca } from './Iconos'
import { useRef } from 'react'
import { lanzarInstantKill } from './efectos/InstantKill'

const links = [
  { red: 'discord', texto: 'Discord', sub: 'Servidor de GGA', link: discord.link },
  ...eventos.lista.map((e) => ({ red: 'twitch', texto: 'Twitch', sub: `/${e.canal}`, link: e.link })),
  ...vods.canales.map((c) => ({ red: 'youtube', texto: 'YouTube', sub: c.usuario, link: c.link })),
  ...redes.otras.map((r) => ({ red: r.red, texto: `${r.nombre} GGA`, sub: r.usuario, link: r.link })),
  { red: 'x', texto: 'X', sub: redes.principal.usuario, link: redes.principal.link },
  ...redes.organizadores.map((o) => ({ red: 'x', texto: 'X', sub: o.usuario, link: o.link })),
]

export default function Footer() {
  const toques = useRef([])
  const tocar = () => {
    const ahora = Date.now()
    toques.current = [...toques.current.filter((t) => ahora - t < 900), ahora]
    if (toques.current.length >= 3) {
      toques.current = []
      lanzarInstantKill()
    }
  }
  return (
    <footer className="relative overflow-hidden bg-noche pb-28 pt-20 lg:pb-12">
      <div className="pointer-events-none absolute inset-0 lineas" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center gap-5">
            <Logo className="h-24 w-24 shrink-0" />
            <div>
              <p className="font-titulo text-[34px] font-black uppercase leading-[0.9]">{sitio.nombre}</p>
              <p className="mt-2 text-[15px] text-white/60">Comunidad sudamericana de fighting games</p>
            </div>
          </div>
          <button onClick={() => irA('arriba')} className="boton boton-borde self-start lg:self-auto">
            Continue? ▲ Volver arriba
          </button>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {links.map((l) => (
            <li key={l.link}>
              <a href={l.link} target="_blank" rel="noreferrer" className="flex min-h-[56px] items-center gap-3 bg-white/[.04] px-3 py-3 sm:px-4 ring-1 ring-inset ring-white/5 transition hover:bg-cian hover:text-noche">
                <Marca red={l.red} className="h-5 w-5 shrink-0" />
                <span className="min-w-0">
                  <span className="block font-titulo text-[17px] font-extrabold uppercase leading-tight">{l.texto}</span>
                  <span className="block truncate text-[13px] opacity-70">{l.sub}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p
          onClick={tocar}
          className="contorno mt-16 cursor-default select-none text-center font-titulo text-[clamp(4rem,19vw,13rem)] font-black uppercase leading-[0.8] [--trazo:rgba(2,190,254,.45)]"
          aria-hidden="true"
        >
          Let's rock
        </p>
        <p className="mt-3 text-center font-mono text-[12px] uppercase tracking-[0.14em] text-white/35">
          <span className="hidden sm:inline">Secreto de la comunidad: escribí 236236H</span>
          <span className="sm:hidden">Secreto: tocá 3 veces el Let's rock</span>
        </p>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-[13px] text-white/45 sm:flex-row sm:justify-between">
          <p>{aviso}</p>
          <a href={sitio.credito.link} target="_blank" rel="noreferrer" className="hover:text-cian">
            {sitio.credito.texto}
          </a>
        </div>
      </div>
    </footer>
  )
}
