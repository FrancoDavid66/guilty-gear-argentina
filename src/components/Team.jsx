import { team } from '../data/gga'
import Aparece from './Aparece'
import Flyer from './Flyer'
import { Marca } from './Iconos'
import { t } from '../i18n'

// Tarjeta de cada jugador (la de Instagram): src/assets/team/<id>.jpg|png|webp
const tarjetas = import.meta.glob('../assets/team/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' })
const tarjetaDe = (id) => Object.entries(tarjetas).find(([ruta]) => ruta.split('/').pop().split('.')[0] === id)?.[1] ?? null

export const iniciales = (n) =>
  n
    .replace(/\/.*$/, '')
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export function BotonX({ usuario, nombre, className = '' }) {
  if (!usuario) return null
  return (
    <a
      href={`https://x.com/${usuario}`}
      target="_blank"
      rel="noreferrer"
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-cian hover:text-cian ${className}`}
      aria-label={`${nombre} ${t('en X')} (@${usuario})`}
    >
      <Marca red="x" className="h-4 w-4" />
    </a>
  )
}

function Jugador({ j, i, chico = false }) {
  const foto = tarjetaDe(j.id)
  const rol = j.rol ?? t('Jugador')
  return (
    <Aparece delay={Math.min(i, 8) * 0.04} className="flex flex-col">
      {foto ? (
        <Flyer src={foto} alt={`${t('Tarjeta de')} ${j.nick}`} imgClassName={chico ? 'aspect-square object-cover' : 'aspect-[4/5] object-cover'} />
      ) : (
        <div
          className={`relative flex flex-col justify-end overflow-hidden rounded-[16px] border border-white/10 bg-carbon ${
            chico ? 'aspect-square p-3' : 'aspect-[16/10] p-4 sm:aspect-[4/5]'
          }`}
        >
          <div aria-hidden="true" className="lineas absolute inset-0" />
          <span
            aria-hidden="true"
            className={`contorno absolute inset-0 flex items-center justify-center font-titulo font-black leading-none [--trazo:rgba(2,190,254,.45)] ${
              chico ? 'pb-4 text-[clamp(56px,14vw,84px)]' : 'pb-6 text-[clamp(84px,10vw,128px)]'
            }`}
          >
            {iniciales(j.nick)}
          </span>
          <span className="relative font-mono text-[12px] uppercase tracking-[0.14em] text-cian">{rol}</span>
        </div>
      )}
      <div className="mt-3 flex items-center justify-between gap-2">
        <b className={`min-w-0 font-titulo font-black uppercase leading-none ${chico ? 'text-[19px]' : 'text-[26px]'}`}>{j.nick}</b>
        <BotonX usuario={j.x} nombre={j.nick} />
      </div>
    </Aparece>
  )
}

// "El team": capitanes y jugadores del equipo semi-profesional de GGA
export default function Team() {
  return (
    <section id="team" className="border-t border-white/10 bg-noche px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="titulo-team">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="etiqueta">{t('Equipo semi-profesional')}</p>
            <h2 id="titulo-team" className="titulo">
              {t('El')} <span className="text-cian">{t('team')}</span>
            </h2>
          </div>
          <p className="max-w-[46ch] text-[17px] text-white/65">{team.texto}</p>
        </div>

        <h3 className="mt-12 font-mono text-[13px] uppercase tracking-[0.16em] text-white/55">
          {t('Capitanes')} · {team.capitanes.length}
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {team.capitanes.map((j, i) => (
            <Jugador key={j.id} j={j} i={i} />
          ))}
        </div>

        <h3 className="mt-12 font-mono text-[13px] uppercase tracking-[0.16em] text-white/55">
          {t('Jugadores')} · {team.jugadores.length}
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-6">
          {team.jugadores.map((j, i) => (
            <Jugador key={j.id} j={j} i={i} chico />
          ))}
        </div>
      </div>
    </section>
  )
}
