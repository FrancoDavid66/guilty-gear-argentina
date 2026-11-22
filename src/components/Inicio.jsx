import { useState } from 'react'
import { discord, escuelita, inicio } from '../data/gga'
import { fechaArg, partes } from '../lib/agenda'
import { useDiscord } from '../lib/discord'
import { juegoCorto, useProximo } from '../lib/useProximo'
import { irA } from '../lib/scroll'
import { Marca, Play } from './Iconos'
import Aparece from './Aparece'

const dd = (n) => String(n).padStart(2, '0')

// Abierta con doble clic (file://) o dentro de otro marco, YouTube no deja reproducir ahí:
// en esos casos el video se abre en YouTube
const enMarco = typeof window !== 'undefined' && (window.self !== window.top || location.protocol === 'file:')

// Tarjeta grande: el último video del canal de GGA (se reproduce ahí mismo)
function UltimoVideo() {
  const v = inicio.ultimoVideo
  const [jugando, setJugando] = useState(false)
  const [foto, setFoto] = useState(`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`)
  const [cargo, setCargo] = useState(false)
  const link = `https://www.youtube.com/watch?v=${v.id}`

  return (
    <Aparece className="relative col-span-12 min-h-[300px] overflow-hidden rounded-[22px] border border-white/10 bg-carbon sm:min-h-[420px] lg:col-span-7 lg:row-span-2 lg:min-h-0">
      {jugando ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
          title={v.titulo}
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
          className="group absolute inset-0 flex flex-col justify-end"
          aria-label={`Ver el último video: ${v.titulo}`}
        >
          {/* fondo propio por si la miniatura no carga */}
          <div aria-hidden="true" className="lineas absolute inset-0 bg-[#12263d]" />
          <img
            src={foto}
            alt=""
            onLoad={(e) => {
              // YouTube devuelve un gris de 120 px cuando no hay versión grande: probar la otra
              if (e.currentTarget.naturalWidth <= 120 && foto.includes('maxres')) setFoto(`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`)
              else setCargo(true)
            }}
            onError={() => foto.includes('maxres') && setFoto(`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`)}
            className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03] ${cargo ? 'opacity-100' : 'opacity-0'}`}
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[42%] flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cian text-noche shadow-[0_0_40px_rgba(2,190,254,.45)] transition group-hover:scale-110 group-hover:bg-white sm:h-24 sm:w-24"
          >
            <Play className="ml-1 h-8 w-8" />
          </span>
          <div className="relative bg-gradient-to-t from-noche via-noche/85 to-transparent p-5 pt-16 sm:p-7 sm:pt-24">
            <p className="etiqueta">Último video · {v.tag}</p>
            <h2 className="font-titulo text-[clamp(34px,4.4vw,60px)] font-black uppercase leading-[0.9]">{v.titulo}</h2>
          </div>
        </a>
      )}
    </Aparece>
  )
}

// Próximo evento (sale solo del calendario del mes)
function Evento() {
  const { ev, ahora } = useProximo()
  if (!ev) {
    return (
      <Aparece className="tarjeta col-span-12 flex min-h-[300px] flex-col justify-between !border-cian/35 !bg-[#0f2238] lg:col-span-5">
        <p className="etiqueta">Calendario</p>
        <h2 className="font-titulo text-[56px] font-black uppercase leading-[0.9]">Se viene el calendario nuevo</h2>
        <button onClick={() => irA('eventos')} className="boton boton-cian self-start">
          Ver eventos
        </button>
      </Aparece>
    )
  }
  const torneo = ev.tipo === 'torneo' || /torneo/i.test(ev.nombre)
  const titulo = torneo ? (ev.nombre && !/torneo/i.test(ev.nombre) ? ev.nombre : 'Wake up, Throw!') : 'Lobby abierto'
  const { dia, hora } = fechaArg(ev.inicio)
  const num = new Date(ev.inicio.getTime() - 3 * 3600_000).getUTCDate()
  const f = partes(ev.inicio - ahora)
  return (
    <Aparece delay={0.06} className="tarjeta col-span-12 flex min-h-[300px] flex-col justify-between gap-6 !border-cian/35 !bg-[#0f2238] sm:col-span-12 lg:col-span-5">
      <p className="etiqueta !mb-0">
        {ev.enVivo ? '● En vivo ahora' : `Próximo evento · ${ev.hoy ? 'hoy' : `${dia.toLowerCase().slice(0, 3)} ${num}`} · ${hora} hs`}
      </p>
      <h2 className="font-titulo text-[clamp(48px,5vw,66px)] font-black uppercase leading-[0.88]">
        {titulo}
        {ev.juego && (
          <>
            <br />
            <span className="text-cian">{juegoCorto(ev.juego)}</span>
          </>
        )}
      </h2>
      <div className="flex flex-wrap items-center justify-between gap-4">
        {ev.enVivo ? (
          <b className="font-titulo text-[44px] font-black leading-none text-[#FF4054]">LET’S ROCK</b>
        ) : (
          <span className="font-titulo text-[clamp(36px,3.4vw,46px)] font-black leading-none tabular-nums" aria-label={`Faltan ${f.d} días, ${f.h} horas y ${f.m} minutos`}>
            {dd(f.d)}d {dd(f.h)}h {dd(f.m)}m
          </span>
        )}
        <div className="flex flex-wrap gap-2">
          {ev.enVivo && ev.link ? (
            <a className="boton boton-cian" href={ev.link} target="_blank" rel="noreferrer">
              <Marca red="twitch" className="h-4 w-4" /> Mirar
            </a>
          ) : torneo && ev.inscripcion ? (
            <a className="boton boton-cian" href={ev.inscripcion} target="_blank" rel="noreferrer">
              Inscribite
            </a>
          ) : (
            <button className="boton boton-cian" onClick={() => irA('eventos')}>
              Calendario
            </button>
          )}
        </div>
      </div>
    </Aparece>
  )
}

// Inicio estilo Fnatic: 4 tarjetas y casi sin texto
export default function Inicio() {
  const vivo = useDiscord(discord.codigo)
  const miembros = (vivo?.miembros ?? discord.miembrosRespaldo).toLocaleString('es-AR')
  const clases = escuelita.series.reduce((t, s) => t + s.clases.length, 0)

  return (
    <section aria-label="Lo destacado de GGA" className="bg-noche px-3 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto grid max-w-[1240px] grid-cols-12 gap-3 sm:gap-4 lg:grid-rows-[380px_340px]">
        <UltimoVideo />
        <Evento />
        <div className="col-span-12 grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-5">
          <Aparece delay={0.1} className="h-full">
            <a
              href={discord.link}
              target="_blank"
              rel="noreferrer"
              className="flex h-full min-h-[200px] flex-col justify-between rounded-[22px] bg-cian p-5 text-noche transition hover:-translate-y-1 sm:p-6"
            >
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-noche/70">Discord</span>
              <span>
                <b className="block font-titulo text-[clamp(52px,5vw,72px)] font-black leading-[0.9] tabular-nums">{miembros}</b>
                <span className="text-[14px] text-noche/75">Unite →</span>
              </span>
            </a>
          </Aparece>
          <Aparece delay={0.14} className="h-full">
            <button
              onClick={() => irA('aprende')}
              className="tarjeta flex h-full min-h-[200px] w-full flex-col justify-between text-left transition hover:-translate-y-1 hover:border-cian"
            >
              <span className="etiqueta !mb-0">La Escuelita</span>
              <span>
                <b className="block font-titulo text-[clamp(52px,5vw,72px)] font-black leading-[0.9]">{clases}</b>
                <span className="text-[14px] text-white/60">clases gratis →</span>
              </span>
            </button>
          </Aparece>
        </div>
      </div>
    </section>
  )
}
