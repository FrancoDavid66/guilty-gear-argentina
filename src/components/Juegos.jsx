import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { juegos, calendario, eventos } from '../data/gga'
import { armarCalendario, diaCorto } from '../lib/agenda'
import { golpe, sinMovimiento } from '../lib/movimiento'
import { irA, pendiente } from '../lib/scroll'
import Titulo from './Titulo'
import Aparece from './Aparece'
import { Marca, Play, Flecha } from './Iconos'
import { t } from '../i18n'

// Imágenes propias opcionales: src/assets/juegos/<id>.jpg|png|webp
const fotos = import.meta.glob('../assets/juegos/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' })
const fotoDe = (id) => Object.entries(fotos).find(([ruta]) => ruta.split('/').pop().split('.')[0] === id)?.[1] ?? null

// En la vista previa (marco) o abierta con doble clic, YouTube no deja reproducir ahí mismo
const enMarco = typeof window !== 'undefined' && (window.self !== window.top || location.protocol === 'file:')

// Para que otras secciones (la portada) puedan elegir un juego
export function elegirJuego(id) {
  window.dispatchEvent(new CustomEvent('gga:juego', { detail: id }))
  irA('juegos')
}

function Trailer({ j }) {
  const [jugando, setJugando] = useState(false)
  const [mini, setMini] = useState(false)
  const foto = fotoDe(j.id)
  const link = `https://www.youtube.com/watch?v=${j.trailer}`
  useEffect(() => {
    setJugando(false)
    setMini(false)
  }, [j.id])

  return (
    <div className="relative aspect-video overflow-hidden bg-noche ring-1 ring-cian/30">
      {jugando ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${j.trailer}?autoplay=1&rel=0`}
          title={`${t('Trailer de')} ${j.nombre}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            if (enMarco) return
            e.preventDefault()
            setJugando(true)
          }}
          className="group absolute inset-0 block"
          aria-label={`${t('Ver el trailer de')} ${j.nombre}`}
        >
          {/* portada propia, por si no carga la de YouTube */}
          <div className="absolute inset-0 lineas" />
          <div className="absolute inset-0 bg-gradient-to-br from-azul/80 via-noche/40 to-transparent" />
          <span className="contorno absolute -bottom-8 right-2 font-titulo text-[clamp(7rem,30vw,13rem)] font-black leading-none [--trazo:rgba(2,190,254,.5)]">
            {j.corto}
          </span>
          <img
            src={foto ?? `https://i.ytimg.com/vi/${j.trailer}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            onLoad={() => setMini(true)}
            className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 ${mini ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/20 to-transparent" />
          <span className="chip absolute left-3 top-3 bg-cian text-noche">{t('Trailer oficial')}</span>
          <span
            className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-cian text-noche transition group-hover:scale-110 group-hover:bg-white"
            style={{ clipPath: 'polygon(25% 0, 100% 0, 75% 100%, 0 100%)' }}
          >
            <Play className="ml-1 h-8 w-8" />
          </span>
          <span className="absolute bottom-3 left-3 font-titulo text-[clamp(1.4rem,5vw,2rem)] font-black uppercase leading-none">{j.nombre}</span>
        </a>
      )}
    </div>
  )
}

function ProximoDelJuego({ j }) {
  const lista = armarCalendario(calendario, eventos.lista, eventos.duracionHoras, new Date())
  const e = lista.find((x) => x.juego === j.juego && x.estado !== 'terminado')
  if (!e)
    return (
      <button onClick={() => irA('eventos')} className="flex w-full items-center justify-between gap-3 bg-white/[.06] px-4 py-3 text-left text-[15px] text-white/75 hover:bg-white/10">
        Mirá el calendario del mes para ver cuándo se juega <Flecha className="h-4 w-4 shrink-0" />
      </button>
    )
  const d = diaCorto(e.inicio)
  return (
    <button
      onClick={() => irA('eventos')}
      className="grid w-full grid-cols-[52px_1fr_auto] items-center gap-3 bg-white/[.06] px-3 py-3 text-left transition hover:bg-white/10"
      style={{ borderRadius: 12 }}
    >
      <span className="flex flex-col items-center bg-noche py-1 text-cian">
        <span className="font-titulo text-[26px] font-black leading-none">{d.num}</span>
        <span className="font-mono text-[12px] uppercase">{d.dia}</span>
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[12px] uppercase tracking-[0.12em] text-cian">
          {e.estado === 'vivo' ? t('En vivo ahora') : t('Próximo evento de este juego')}
        </span>
        <span className="block truncate font-titulo text-[20px] font-black uppercase leading-tight">
          {e.nombre} · {e.hora} {t('hs')}
        </span>
      </span>
      <Flecha className="h-5 w-5" />
    </button>
  )
}

function Ficha({ j }) {
  return (
    <motion.div
      key={j.id}
      initial={sinMovimiento ? false : { opacity: 0, x: 40, skewX: -4 }}
      animate={{ opacity: 1, x: 0, skewX: 0 }}
      exit={sinMovimiento ? {} : { opacity: 0, x: -40, skewX: 4 }}
      transition={{ duration: 0.35, ease: golpe }}
      className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10"
    >
      <div>
        <Trailer j={j} />

        {/* datos como pantalla de stats */}
        <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {j.datos.map((d) => (
            <div key={d.que} className="bg-white/[.05] p-3 ring-1 ring-inset ring-white/10" title={d.nota}>
              <dt className="font-mono text-[12px] uppercase tracking-[0.12em] text-white/55">{d.que}</dt>
              <dd className="mt-1 font-titulo text-[34px] font-black leading-none text-cian">{d.valor}</dd>
              {d.nota && <dd className="mt-1 text-[12px] leading-snug text-white/55">{d.nota}</dd>}
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col">
        <span className="chip w-fit bg-cian text-noche">{j.tag}</span>
        <h3 className="mt-3 font-titulo text-[clamp(2.2rem,9vw,3.4rem)] font-black uppercase leading-[0.9]">{j.nombre}</h3>
        <p className="mt-4 text-[17px] text-white/80">{j.resumen}</p>

        <p className="bajada mt-7 text-cian">{t('Lo que lo hace único')}</p>
        <ul className="mt-3 grid gap-2">
          {j.mecanicas.map((m) => (
            <li key={m.nombre} className="border-l-4 border-cian bg-white/[.04] px-4 py-2.5">
              <span className="font-titulo text-[20px] font-extrabold uppercase leading-tight">{m.nombre}</span>
              <span className="block text-[15px] text-white/70">{m.texto}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[16px] font-medium text-white">{j.ideal}</p>

        <div className="mt-5">
          <ProximoDelJuego j={j} />
        </div>

        <div className="mt-4 flex flex-col gap-2 xs:flex-row">
          <button
            onClick={() => {
              pendiente.serie = j.clases // por si la Escuelita todavía no está en pantalla (otra página)
              window.dispatchEvent(new CustomEvent('gga:serie', { detail: j.clases }))
              irA('clases')
            }}
            className="boton boton-cian brillo flex-1"
          >
            {t('Aprendé a jugarlo')} <Flecha />
          </button>
          <a href={j.steam} target="_blank" rel="noreferrer" className="boton boton-borde flex-1">
            {t('Conseguilo en Steam')} <Flecha />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Juegos() {
  const [actual, setActual] = useState(juegos.lista[0].id)
  const j = juegos.lista.find((x) => x.id === actual)

  useEffect(() => {
    const elegir = (e) => juegos.lista.some((x) => x.id === e.detail) && setActual(e.detail)
    window.addEventListener('gga:juego', elegir)
    return () => window.removeEventListener('gga:juego', elegir)
  }, [])

  return (
    <section id="juegos" className="relative overflow-hidden bg-carbon pb-24 pt-20 lg:pb-32 lg:pt-28">
      <div className="pointer-events-none absolute inset-0 lineas" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-azul/40 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <p className="bajada text-cian">{juegos.bajada}</p>
        <Titulo lineas={juegos.titulo} className="mt-3" />
        <div className="raya bg-cian" />
        <Aparece>
          <p className="mt-6 max-w-[38rem] text-[17px] text-white/80">{juegos.texto}</p>
        </Aparece>

        {/* Selección de juego, como la pantalla de selección de personaje */}
        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3" role="tablist" aria-label={t('Juegos')}>
          {juegos.lista.map((x, i) => {
            const activo = x.id === actual
            return (
              <button
                key={x.id}
                role="tab"
                aria-selected={activo}
                onClick={() => setActual(x.id)}
                className={`relative flex min-h-[92px] flex-col justify-between overflow-hidden px-3 py-3 text-left transition sm:min-h-[110px] sm:px-5 ${
                  activo ? 'bg-cian text-noche' : 'bg-white/[.06] text-white ring-1 ring-inset ring-white/10 hover:bg-white/10'
                }`}
                style={{ borderRadius: 12 }}
              >
                <span className={`font-mono text-[12px] uppercase tracking-[0.14em] ${activo ? 'text-noche/70' : 'text-cian'}`}>
                  {activo ? '▶ P1' : `0${i + 1}`}
                </span>
                <span className="font-titulo text-[clamp(1.3rem,6vw,2.4rem)] font-black leading-none">
                  <span className="sm:hidden">{x.corto.split(' ')[0]}</span>
                  <span className="hidden sm:inline">{x.corto}</span>
                </span>
                <span className={`hidden font-mono text-[12px] uppercase tracking-[0.1em] sm:block ${activo ? 'text-noche/70' : 'text-white/50'}`}>{x.tag}</span>
                {activo && !sinMovimiento && (
                  <motion.span layoutId="juego-activo" className="absolute inset-x-0 bottom-0 h-1 bg-noche" transition={{ duration: 0.3, ease: golpe }} />
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <Ficha key={j.id} j={j} />
          </AnimatePresence>
        </div>

        <p className="mt-8 text-[13px] text-white/40">{t('Trailers oficiales de Arc System Works en YouTube.')}</p>
      </div>
    </section>
  )
}
