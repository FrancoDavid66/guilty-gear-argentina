import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { personajes } from '../data/gga'
import { golpe, sinMovimiento } from '../lib/movimiento'
import Aparece from './Aparece'

// Imagen opcional de cada personaje: src/assets/personajes/<id>.webp|png|jpg
// (imágenes propias o fan art con permiso; no arte oficial: ver gga.js)
const fotos = import.meta.glob('../assets/personajes/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' })
const fotoDe = (id) => Object.entries(fotos).find(([ruta]) => ruta.split('/').pop().split('.')[0] === id)?.[1] ?? null

const TANDAS = ['Todos', ...new Set(personajes.lista.map((p) => p.tanda))]
const iniciales = (n) =>
  n
    .replace(/[^A-Za-zÀ-ÿ\s-]/g, '')
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
// Perfil oficial del personaje en la web de Guilty Gear -Strive-
const perfilDe = (p) => `${personajes.perfiles}${p.perfil}/`

function Tarjeta({ p, i }) {
  const foto = fotoDe(p.id)
  return (
    <motion.a
      layout={!sinMovimiento}
      initial={sinMovimiento ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35, ease: golpe }}
      href={perfilDe(p)}
      target="_blank"
      rel="noreferrer"
      className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[18px] border border-white/10 bg-carbon p-4 transition-colors hover:border-cian"
    >
      {foto ? (
        <img src={foto} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      ) : (
        <span aria-hidden="true" className="contorno absolute inset-x-0 top-8 text-center font-titulo text-[clamp(72px,9vw,104px)] font-black leading-none opacity-40 transition duration-500 [--trazo:#194E81] group-hover:opacity-90 group-hover:[--trazo:#02BEFE]">
          {iniciales(p.nombre)}
        </span>
      )}
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-noche via-noche/40 to-transparent" />
      <span className="absolute left-4 top-4 font-mono text-[12px] text-white/45">#{String(i + 1).padStart(2, '0')}</span>
      <span className="relative">
        <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-cian">{p.tanda}</span>
        <span className="mt-1 block font-titulo text-[24px] font-black uppercase leading-[0.95] sm:text-[26px]">{p.nombre}</span>
        {p.nota && <span className="mt-1 block text-[12px] text-white/50">{p.nota}</span>}
        <span className="mt-2 block text-[12px] text-white/0 transition group-hover:text-white/70">Ver perfil oficial →</span>
      </span>
    </motion.a>
  )
}

// Plantel completo del Guilty más actual (Strive), con filtro por temporada
export default function Personajes() {
  const [tanda, setTanda] = useState('Todos')
  const lista = personajes.lista.map((p, i) => ({ ...p, i })).filter((p) => tanda === 'Todos' || p.tanda === tanda)
  return (
    <section id="personajes" className="relative border-t border-white/10 bg-noche px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="titulo-personajes">
      <div className="mx-auto max-w-[1240px]">
        <Aparece className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="etiqueta">{personajes.juego}</p>
            <h2 id="titulo-personajes" className="titulo">
              El plantel <span className="text-cian">completo</span>
            </h2>
            <p className="mt-4 max-w-[52ch] text-white/65">
              {personajes.lista.length} personajes: 15 de base y {personajes.lista.length - 15} de las temporadas de DLC. Tocá uno para ver su perfil en la web oficial del juego.
            </p>
          </div>
          <p className="chip self-start bg-white/[.06] text-white/70 lg:self-auto">Próximamente · {personajes.proximo}</p>
        </Aparece>

        <div className="sin-barra -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filtrar por temporada">
          {TANDAS.map((t) => (
            <button
              key={t}
              onClick={() => setTanda(t)}
              aria-pressed={tanda === t}
              className={`min-h-[40px] shrink-0 rounded-full border px-4 text-[14px] font-semibold transition ${tanda === t ? 'border-cian bg-cian text-noche' : 'border-white/15 text-white/70 hover:border-white hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <motion.div layout={!sinMovimiento} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {lista.map((p) => (
              <Tarjeta key={p.id} p={p} i={p.i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
