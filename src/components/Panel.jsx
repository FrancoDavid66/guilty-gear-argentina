import { discord, escuelita, eventos, hero, juegos, panel, redes, vods } from '../data/gga'
import { fechaArg, partes } from '../lib/agenda'
import { useDiscord } from '../lib/discord'
import { juegoCorto, useProximo } from '../lib/useProximo'
import { irA } from '../lib/scroll'
import { Resaltar } from '../lib/texto'
import { Marca } from './Iconos'
import Aparece from './Aparece'

const fmt = (n) => n.toLocaleString('es-AR')
const dd = (n) => String(n).padStart(2, '0')

function Evento() {
  const { ev, ahora } = useProximo()
  if (!ev) {
    return (
      <article className="tarjeta col-span-12 flex min-h-[320px] flex-col justify-between bg-[radial-gradient(90%_120%_at_100%_0%,rgba(2,190,254,.25),transparent_60%),linear-gradient(135deg,#0f2238,#0b111a_60%)] lg:col-span-8">
        <div>
          <p className="etiqueta">Calendario</p>
          <h2 className="font-titulo text-[clamp(40px,5.5vw,72px)] font-black uppercase leading-[0.92]">Se viene el calendario nuevo</h2>
          <p className="mt-2 text-white/75">Lo publicamos a principio de mes en X.</p>
        </div>
        <a className="boton boton-cian self-start" href={redes.principal.link} target="_blank" rel="noreferrer">
          <Marca red="x" className="h-4 w-4" /> Seguinos en X
        </a>
      </article>
    )
  }
  const torneo = ev.tipo === 'torneo' || /torneo/i.test(ev.nombre)
  const juego = juegoCorto(ev.juego)
  const { dia, hora } = fechaArg(ev.inicio)
  const num = new Date(ev.inicio.getTime() - 3 * 3600_000).getUTCDate()
  const falta = partes(ev.inicio - ahora)
  const titulo = torneo ? (ev.nombre && !/torneo/i.test(ev.nombre) ? ev.nombre : 'Wake up, Throw!') : 'Lobby abierto'
  const canal = ev.canal ? `twitch.tv/${ev.canal}` : 'Twitch'
  return (
    <article className="tarjeta col-span-12 flex min-h-[360px] flex-col justify-between bg-[radial-gradient(90%_120%_at_100%_0%,rgba(2,190,254,.25),transparent_60%),linear-gradient(135deg,#0f2238,#0b111a_60%)] lg:col-span-8">
      <div>
        <p className="etiqueta">{ev.enVivo ? '● En vivo ahora' : torneo ? 'Próximo evento · torneo de rookies' : 'Próximo evento · lobby semanal'}</p>
        <h2 className="font-titulo text-[clamp(40px,5.5vw,72px)] font-black uppercase leading-[0.92]">
          {titulo}
          {juego && (
            <>
              <br />
              <span className="text-cian">{juego}</span>
            </>
          )}
        </h2>
        <p className="mt-3 text-white/75">
          {ev.hoy ? 'Hoy' : dia} {num} · {hora} hs (Argentina) · en vivo por {canal}
        </p>
        <div className="mt-6 flex gap-4" aria-live="off">
          {ev.enVivo ? (
            <div>
              <b className="block font-titulo text-[clamp(38px,5vw,60px)] font-black leading-none text-[#FF4054]">LET’S ROCK</b>
              <span className="text-[12px] uppercase tracking-[0.1em] text-white/55">arrancó, entrá al stream</span>
            </div>
          ) : (
            [
              [falta.d, 'días'],
              [falta.h, 'horas'],
              [falta.m, 'min'],
              [falta.s, 'seg'],
            ].map(([n, t]) => (
              <div key={t} className="text-center">
                <b className="block font-titulo text-[clamp(38px,5vw,60px)] font-black leading-none tabular-nums">{dd(n)}</b>
                <span className="text-[12px] uppercase tracking-[0.1em] text-white/55">{t}</span>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {torneo && ev.inscripcion ? (
          <a className="boton boton-cian" href={ev.inscripcion} target="_blank" rel="noreferrer">Inscribite</a>
        ) : (
          <a className="boton boton-cian" href={discord.link} target="_blank" rel="noreferrer">
            <Marca red="discord" className="h-4 w-4" /> {torneo ? 'Inscribite en el Discord' : 'Sumate en el Discord'}
          </a>
        )}
        {ev.link && (
          <a className="boton boton-borde" href={ev.link} target="_blank" rel="noreferrer">
            <Marca red="twitch" className="h-4 w-4" /> Mirar en Twitch
          </a>
        )}
        <button className="boton boton-borde" onClick={() => irA('eventos')}>Calendario</button>
      </div>
    </article>
  )
}

function Ultimos() {
  return (
    <aside className="tarjeta col-span-12 flex flex-col lg:col-span-4">
      <h3 className="flex items-center gap-2 font-titulo text-[32px] font-black uppercase leading-none">
        Lo último <span className="text-cian">//</span>
      </h3>
      <p className="etiqueta mt-2">Del canal de YouTube de GGA</p>
      <ul className="mt-2 flex-1">
        {panel.ultimos.map((v) => (
          <li key={v.id}>
            <a
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-3 border-b border-white/10 py-3 text-[15px] font-semibold transition hover:text-cian"
            >
              <span className="min-w-0">{v.titulo}</span>
              <small className="shrink-0 text-[12px] font-medium text-white/50">{v.tag}</small>
            </a>
          </li>
        ))}
      </ul>
      <a className="boton boton-borde mt-4" href={vods.principal.link} target="_blank" rel="noreferrer">
        <Marca red="youtube" className="h-4 w-4" /> Ver el canal
      </a>
    </aside>
  )
}

function Dato({ etiqueta, numero, texto, onClick, href, destacada }) {
  const clase = `tarjeta group col-span-12 flex min-h-[170px] flex-col justify-between text-left transition duration-300 hover:-translate-y-1 hover:border-cian xs:col-span-6 lg:col-span-3 lg:min-h-[210px] ${
    destacada ? '!border-cian !bg-cian text-noche' : ''
  }`
  const cuerpo = (
    <>
      <p className={`etiqueta ${destacada ? '!text-noche/70' : ''}`}>{etiqueta}</p>
      <div>
        <div className="font-titulo text-[54px] font-black leading-none tabular-nums">{numero}</div>
        <p className={`mt-1 text-[14px] ${destacada ? 'text-noche/70' : 'text-white/55'}`}>{texto}</p>
      </div>
    </>
  )
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={clase}>
      {cuerpo}
    </a>
  ) : (
    <button onClick={onClick} className={clase}>
      {cuerpo}
    </button>
  )
}

// Panel estilo Fnatic: presentación + próximo evento + lo último + números de la comunidad
export default function Panel() {
  const vivo = useDiscord(discord.codigo)
  const miembros = vivo?.miembros ?? discord.miembrosRespaldo
  const clases = escuelita.series.reduce((t, s) => t + s.clases.length, 0)
  const twitch = redes.otras.find((r) => r.red === 'twitch')

  return (
    <section id="panel" className="relative border-t border-white/10 bg-noche px-3 py-16 sm:px-6 sm:py-24" aria-labelledby="titulo-panel">
      <div className="mx-auto max-w-[1240px]">
        <Aparece className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="etiqueta">{hero.bajada}</p>
            <h2 id="titulo-panel" className="titulo">
              {hero.titulo.slice(0, 1).join(' ')} <span className="text-cian">{hero.titulo.slice(1).join(' ')}</span>
            </h2>
          </div>
          <div className="space-y-3 text-[17px] text-white/80 lg:col-span-5">
            <p>
              <Resaltar texto={hero.texto} />
            </p>
            <p>
              <Resaltar texto={hero.objetivo} />
            </p>
          </div>
        </Aparece>

        <div className="grid grid-cols-12 gap-3 sm:gap-4">
          <Evento />
          <Ultimos />
          <Dato destacada etiqueta="Discord" numero={fmt(miembros)} texto="miembros en toda Sudamérica" href={discord.link} />
          <Dato etiqueta="La Escuelita" numero={clases} texto="clases gratis de Strive, Xrd y +R" onClick={() => irA('escuelita')} />
          <Dato etiqueta="Elegí tu Guilty" numero={juegos.lista.length} texto="juegos, con lobby y torneo cada semana" onClick={() => irA('juegos')} />
          <Dato etiqueta="Twitch" numero={twitch.numero} texto="seguidores en el canal de GGA" href={twitch.link} />
        </div>
      </div>
    </section>
  )
}
