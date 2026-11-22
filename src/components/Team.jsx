import { team } from '../data/gga'
import Aparece from './Aparece'
import Flyer from './Flyer'
import { Marca } from './Iconos'

// Tarjeta de cada jugador (la de Instagram): src/assets/team/<id>.jpg|png|webp
const tarjetas = import.meta.glob('../assets/team/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' })
const tarjetaDe = (id) => Object.entries(tarjetas).find(([ruta]) => ruta.split('/').pop().split('.')[0] === id)?.[1] ?? null

const iniciales = (n) =>
  n
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)

function Jugador({ j, i }) {
  const foto = tarjetaDe(j.id)
  return (
    <Aparece delay={i * 0.05} className="flex flex-col">
      {foto ? (
        <Flyer src={foto} alt={`Tarjeta de ${j.nick}`} imgClassName="aspect-[4/5] object-cover" />
      ) : (
        <div className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[16px] border border-white/10 bg-[#0b1119] p-4">
          <div aria-hidden="true" className="lineas absolute inset-0" />
          <span
            aria-hidden="true"
            className="contorno absolute inset-x-0 top-6 text-center font-titulo text-[clamp(80px,9vw,120px)] font-black leading-none [--trazo:rgba(2,190,254,.45)]"
          >
            {iniciales(j.nick)}
          </span>
          <span className="relative font-mono text-[12px] uppercase tracking-[0.14em] text-cian">Jugador</span>
        </div>
      )}
      <div className="mt-3 flex items-center justify-between gap-2">
        <b className="font-titulo text-[24px] font-black uppercase leading-none">{j.nick}</b>
        {j.x && (
          <a
            href={`https://x.com/${j.x}`}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-cian hover:text-cian"
            aria-label={`${j.nick} en X (@${j.x})`}
          >
            <Marca red="x" className="h-4 w-4" />
          </a>
        )}
      </div>
    </Aparece>
  )
}

// "El team": los jugadores del equipo semi-profesional de GGA
export default function Team() {
  return (
    <section id="team" className="border-t border-white/10 bg-noche px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="titulo-team">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="etiqueta">Equipo semi-profesional</p>
            <h2 id="titulo-team" className="titulo">
              El <span className="text-cian">team</span>
            </h2>
          </div>
          <p className="max-w-[46ch] text-[17px] text-white/65">{team.texto}</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {team.jugadores.map((j, i) => (
            <Jugador key={j.id} j={j} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
