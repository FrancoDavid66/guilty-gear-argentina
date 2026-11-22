import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { golpe } from '../lib/movimiento'
import { escuelita } from '../data/gga'
import { irA, pendiente } from '../lib/scroll'
import Titulo from './Titulo'
import Aparece from './Aparece'
import { Marca, Play, Flecha } from './Iconos'
import Diccionario from './Diccionario'

// Dentro de otro marco (vista previa) o abierta con doble clic (file://), YouTube no deja
// reproducir ahí mismo: en esos casos el video se abre en YouTube
const enMarco = typeof window !== 'undefined' && (window.self !== window.top || location.protocol === 'file:')

function Video({ v, n }) {
  const [jugando, setJugando] = useState(false)
  const [miniatura, setMiniatura] = useState(false)
  const link = `https://www.youtube.com/watch?v=${v.id}`

  const reproducir = (e) => {
    if (enMarco) return // deja que el link abra YouTube
    e.preventDefault()
    setJugando(true)
  }

  return (
    <article className="flex h-full flex-col bg-white shadow-[0_18px_40px_-20px_rgba(7,9,13,.45)] ring-1 ring-noche/10">
      <div className="relative aspect-video overflow-hidden bg-noche">
        {jugando ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
            title={v.titulo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <a href={link} target="_blank" rel="noreferrer" onClick={reproducir} className="group absolute inset-0 block" aria-label={`Ver: ${v.titulo}`}>
            {/* Portada propia (se ve si no carga la miniatura de YouTube) */}
            <div className="absolute inset-0 lineas" />
            <div className="absolute inset-0 bg-gradient-to-br from-azul/70 to-transparent" />
            <span className="contorno absolute -bottom-6 -right-2 font-titulo text-[150px] font-black leading-none [--trazo:rgba(2,190,254,.55)]">{v.corto}</span>
            <img
              src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              onLoad={() => setMiniatura(true)}
              className={`absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 ${miniatura ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noche/80 via-noche/10 to-transparent" />
            <span className="chip absolute left-3 top-3 bg-cian text-noche">Clase {String(n).padStart(2, '0')}</span>
            <span
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-cian text-noche transition group-hover:scale-110 group-hover:bg-white"
              style={{ clipPath: 'polygon(25% 0, 100% 0, 75% 100%, 0 100%)' }}
            >
              <Play className="ml-1 h-7 w-7" />
            </span>
            <span className="absolute bottom-3 left-3 right-3 truncate text-[13px] font-medium text-white/90">{v.video}</span>
          </a>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="bajada text-azul">{v.etiqueta}</p>
        <h3 className="mt-2 font-titulo text-[26px] font-extrabold uppercase leading-[1.02] text-noche">{v.titulo}</h3>
        <p className="mt-3 flex-1 text-[16px] text-noche/70">{v.texto}</p>
        <a href={link} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-[44px] items-center gap-2 font-titulo text-[18px] font-extrabold uppercase text-azul hover:text-cian">
          <Marca red="youtube" className="h-5 w-5 text-[#FF0033]" /> Ver en YouTube <Flecha className="h-4 w-4" />
        </a>
      </div>
    </article>
  )
}

// Todas las clases del canal, por serie
function Series() {
  const [actual, setActual] = useState(() => {
    // si venís de "Aprendé a jugarlo" en Juegos, abre esa serie
    const s = pendiente.serie
    pendiente.serie = null
    return s ?? escuelita.series[0].id
  })
  const serie = escuelita.series.find((s) => s.id === actual)
  // la sección de juegos puede elegir la serie ("Aprendé a jugarlo")
  useEffect(() => {
    const elegir = (e) => escuelita.series.some((s) => s.id === e.detail) && setActual(e.detail)
    window.addEventListener('gga:serie', elegir)
    return () => window.removeEventListener('gga:serie', elegir)
  }, [])
  const total = escuelita.series.reduce((n, s) => n + s.clases.length, 0)
  return (
    <div id="clases" className="relative mx-auto mt-16 max-w-[1240px] scroll-mt-20 px-5 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="bajada text-azul">Todas las clases · {total} videos</p>
          <h3 className="mt-1 font-titulo text-[clamp(2rem,8vw,3rem)] font-black uppercase leading-none">Elegí por dónde arrancar</h3>
        </div>
        <a href={escuelita.canal} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-2 font-titulo text-[18px] font-extrabold uppercase text-azul hover:text-cian">
          <Marca red="youtube" className="h-5 w-5 text-[#FF0033]" /> Canal de GGA <Flecha className="h-4 w-4" />
        </a>
      </div>

      <div className="sin-barra -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="tablist" aria-label="Series de La Escuelita">
        {escuelita.series.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={actual === s.id}
            onClick={() => setActual(s.id)}
            className={`flex min-h-[48px] shrink-0 items-center gap-2 px-5 font-titulo text-[19px] font-extrabold uppercase transition ${
              actual === s.id ? 'bg-noche text-cian' : 'bg-noche/[.06] text-noche hover:bg-noche/10'
            }`}
            style={{ borderRadius: 12 }}
          >
            {s.nombre}
            <span className={`font-mono text-[12px] ${actual === s.id ? 'text-white/60' : 'text-noche/50'}`}>{s.clases.length}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={serie.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: golpe }}>
          <p className="mt-5 text-[16px] text-noche/70">{serie.bajada}</p>
          <ol className="mt-4 grid gap-2 md:grid-cols-2">
            {serie.clases.map((c, i) => (
              <li key={c.id}>
                <a
                  href={`https://www.youtube.com/watch?v=${c.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid min-h-[64px] grid-cols-[40px_1fr_auto] items-center gap-3 bg-white px-3 py-2.5 ring-1 ring-inset ring-noche/10 transition hover:bg-noche hover:text-white"
                >
                  <span className="font-titulo text-[26px] font-black leading-none text-cian">{String(i + 1).padStart(2, '0')}</span>
                  <span className="min-w-0">
                    <span className="line-clamp-2 block font-titulo text-[19px] font-extrabold uppercase leading-tight">{c.titulo}</span>
                    <span className="block font-mono text-[12px] uppercase tracking-[0.08em] opacity-60">{c.tag}</span>
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[13px] tabular-nums opacity-70">
                    {c.dura}
                    <Play className="h-4 w-4 text-[#FF0033] group-hover:text-cian" />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// completa = false (inicio): solo los 3 videos destacados y el link a Aprendé
export default function Escuelita({ completa = true }) {
  const riel = useRef(null)
  const [actual, setActual] = useState(0)
  const total = escuelita.videos.length

  useEffect(() => {
    const el = riel.current
    if (!el) return
    const medir = () => {
      const tarjeta = el.firstElementChild
      if (!tarjeta) return
      const paso = tarjeta.getBoundingClientRect().width + 16
      setActual(Math.min(total - 1, Math.round(el.scrollLeft / paso)))
    }
    el.addEventListener('scroll', medir, { passive: true })
    return () => el.removeEventListener('scroll', medir)
  }, [total])

  const mover = (dir) => {
    const el = riel.current
    const tarjeta = el?.firstElementChild
    if (!tarjeta) return
    const paso = tarjeta.getBoundingClientRect().width + 16
    el.scrollTo({ left: Math.max(0, Math.min(total - 1, actual + dir)) * paso, behavior: 'smooth' })
  }

  return (
    <section id="escuelita" className="relative overflow-hidden bg-blanco pb-24 pt-20 text-noche lg:pb-32 lg:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 trama-oscura opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="bajada text-azul">{escuelita.bajada}</p>
            <Titulo lineas={escuelita.titulo} className="mt-3 max-w-[14ch]" barra="#02BEFE" />
            <div className="raya bg-cian" />
          </div>

          {/* contador y flechas, como en YPF Agro (solo celu/tablet) */}
          <div className="flex items-center gap-4 lg:hidden">
            <span className="font-mono text-[15px] font-medium tabular-nums">
              <span className="text-azul">{String(actual + 1).padStart(2, '0')}</span>
              <span className="text-noche/40"> / {String(total).padStart(2, '0')}</span>
            </span>
            <div className="flex gap-1">
              <button onClick={() => mover(-1)} disabled={actual === 0} className="flex h-11 w-11 items-center justify-center bg-noche text-white transition disabled:opacity-25" aria-label="Video anterior">
                <Flecha className="h-5 w-5 rotate-180" />
              </button>
              <button onClick={() => mover(1)} disabled={actual === total - 1} className="flex h-11 w-11 items-center justify-center bg-cian text-noche transition disabled:opacity-25" aria-label="Video siguiente">
                <Flecha className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Aparece className="relative mx-auto mt-10 max-w-[1240px]">
        <div
          ref={riel}
          className="sin-barra flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 sm:scroll-px-8 sm:px-8 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible"
        >
          {escuelita.videos.map((v, i) => (
            <div key={v.id} className="w-[86%] shrink-0 snap-start xs:w-[80%] sm:w-[58%] lg:w-auto">
              <Video v={v} n={i + 1} />
            </div>
          ))}
        </div>
      </Aparece>

      {completa ? (
        <>
          <Diccionario />
          <Series />
        </>
      ) : (
        <div className="relative mx-auto mt-8 max-w-[1240px] px-5 sm:px-8">
          <button onClick={() => irA('aprende')} className="boton boton-negro">
            Ver todas las clases y el diccionario <Flecha />
          </button>
        </div>
      )}
    </section>
  )
}
