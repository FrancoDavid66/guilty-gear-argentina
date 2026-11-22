import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { eventos, calendario } from '../data/gga'
import { proximoGeneral, armarCalendario, fechaArg, horaLocal, partes, diasTexto, diaCorto } from '../lib/agenda'
import Flyer, { flyerDe } from './Flyer'
import { irA } from '../lib/scroll'
import { t } from '../i18n'
import { golpe, sinMovimiento } from '../lib/movimiento'
import Titulo from './Titulo'
import Aparece from './Aparece'
import { Marca, Flecha } from './Iconos'

const dos = (n) => String(n).padStart(2, '0')

// Un reloj compartido para toda la sección
function useAhora() {
  const [ahora, setAhora] = useState(() => new Date())
  useEffect(() => {
    const reloj = setInterval(() => setAhora(new Date()), 1000)
    return () => clearInterval(reloj)
  }, [])
  return ahora
}

const JUEGO = {
  STRIVE: 'bg-white text-noche',
  XRD: 'bg-cian text-noche',
  '+R': 'bg-azul text-white',
}

// Reloj de ronda: próximo evento o "EN VIVO"
function Reloj({ ahora }) {
  const prox = proximoGeneral(calendario, eventos.lista, eventos.duracionHoras, ahora)
  if (!prox) return null
  const f = fechaArg(prox.inicio)
  const local = horaLocal(prox.inicio)
  const p = partes(prox.inicio - ahora)
  const hoy = p.d === 0 && !prox.enVivo && fechaArg(ahora).dia === f.dia
  const peligro = !prox.enVivo && prox.inicio - ahora < 3600_000

  return (
    <div className={`tarjeta-corte relative overflow-hidden ring-1 ring-inset ${peligro ? 'bg-[#2a0d14] ring-[#FF4054]/60' : 'bg-pizarra/70 ring-white/10'}`}>
      {peligro && (
        <div className="flex items-center justify-between bg-[#FF4054] px-5 py-1.5 font-titulo text-[18px] font-black uppercase tracking-[0.12em] text-white sm:px-7">
          <span className="peligro whitespace-nowrap">Danger time</span>
          <span className="hidden font-mono text-[12px] font-medium tracking-[0.1em] sm:inline">{t('Arranca en menos de 1 hora')}</span>
        </div>
      )}
      <div className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-7 lg:grid-cols-1">
        <div className="min-w-0">
          {prox.enVivo ? (
            <p className="flex items-center gap-2 font-titulo text-[18px] font-black uppercase tracking-wide text-[#FF4054]">
              <span className="en-vivo h-3 w-3 rounded-full bg-[#FF4054]" /> {t('En vivo ahora')}
              <span className="ml-1 -skew-x-12 bg-cian px-2 text-noche">Let's rock</span>
            </p>
          ) : (
            <p className="bajada flex items-center gap-2 text-cian">
              {t('Próximo evento')} {hoy && <span className="bg-cian px-1.5 py-0.5 text-noche">{t('Hoy')}</span>}
            </p>
          )}
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-titulo text-[clamp(2rem,9vw,3rem)] font-black uppercase leading-none">
            {prox.nombre}
            {prox.juego && <span className={`chip !text-[13px] ${JUEGO[prox.juego]}`}>{prox.juego}</span>}
          </p>
          <p className="mt-2 text-[16px] text-white/75">
            {f.dia} {f.hora} {t('hs')} ({t('hora argentina')}) · twitch.tv/{prox.canal}
          </p>
          {local && <p className="mt-0.5 text-[14px] text-white/50">{t('En tu hora')}: {local}</p>}
          {prox.inscripcion && !prox.enVivo && (
            <a href={prox.inscripcion} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 font-titulo text-[18px] font-extrabold uppercase text-cian hover:text-white">
              {t('Inscribite en Challonge')} <Flecha className="h-4 w-4" />
            </a>
          )}
        </div>

        {prox.enVivo ? (
          <a href={prox.link} target="_blank" rel="noreferrer" className="boton boton-cian brillo">
            <Marca red="twitch" /> {t('Mirar en vivo')}
          </a>
        ) : (
          <div className="flex items-end gap-1.5 font-titulo font-black leading-none" aria-label={t('Faltan {d} días, {h} horas y {m} minutos', { d: p.d, h: p.h, m: p.m })}>
            {[
              [p.d, t('días')],
              [p.h, t('hs')],
              [p.m, t('min')],
              [p.s, t('seg')],
            ].map(([v, l], i) => (
              <div key={l} className="flex items-end gap-1.5">
                {i > 0 && <span className="pb-6 text-[28px] text-cian/60">:</span>}
                <div className="text-center">
                  <span className={`block min-w-[2ch] bg-noche px-2 py-1.5 text-[clamp(2.1rem,10vw,3.2rem)] tabular-nums ${peligro ? 'text-[#FF4054]' : 'text-cian'}`}>{dos(v)}</span>
                  <span className="mt-1 block font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-white/50">{l}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Calendario del mes, como el que publican en X
function Calendario({ ahora }) {
  const lista = armarCalendario(calendario, eventos.lista, eventos.duracionHoras, ahora)
  const [verTodo, setVerTodo] = useState(false)
  const quedan = lista.filter((e) => e.estado !== 'terminado').length
  const terminados = lista.filter((e) => e.estado === 'terminado')
  const visibles = verTodo ? lista : lista.filter((e) => e.estado !== 'terminado')

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="bajada text-cian">{t('Calendario del mes')}</p>
          <h3 className="mt-1 font-titulo text-[34px] font-black uppercase leading-none">{calendario.mes}</h3>
        </div>
        <a href={calendario.post} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-2 text-[14px] text-white/60 hover:text-cian">
          <Marca red="x" className="h-3.5 w-3.5" /> {t('Ver el post del calendario')}
        </a>
      </div>

      {quedan === 0 && (
        <p className="mt-4 bg-white/5 p-4 text-[15px] text-white/75">
          {t('Terminó el calendario de {mes}. El del mes que viene sale primero en X y en el Discord.', { mes: calendario.mes.toLowerCase() })}
        </p>
      )}

      <ol className="mt-4 grid gap-2">
        <AnimatePresence initial={false}>
          {visibles.map((e) => {
            const d = diaCorto(e.inicio)
            const destacado = e.estado === 'vivo' || e.estado === 'proximo'
            return (
              <motion.li
                key={e.fecha + e.tipo}
                layout={!sinMovimiento}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: golpe }}
                className="overflow-hidden"
              >
                <a
                  href={e.estado === 'terminado' ? e.link : e.inscripcion ?? e.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`grid grid-cols-[56px_1fr_auto] items-center gap-3 px-3 py-3 transition sm:grid-cols-[64px_1fr_auto_auto] sm:gap-5 sm:px-5 ${
                    destacado ? 'bg-cian text-noche' : e.estado === 'terminado' ? 'bg-white/[.03] text-white/40' : 'bg-white/[.06] text-white hover:bg-white/10'
                  }`}
                  style={{ borderRadius: 12 }}
                >
                  <span className={`flex flex-col items-center justify-center py-1 ${destacado ? 'bg-noche text-cian' : 'bg-noche/60'}`}>
                    <span className="font-titulo text-[30px] font-black leading-none tabular-nums">{d.num}</span>
                    <span className="font-mono text-[12px] uppercase tracking-[0.12em]">{d.dia}</span>
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className={`font-titulo text-[22px] font-black uppercase leading-none ${e.estado === 'terminado' ? 'line-through decoration-2' : ''}`}>{e.nombre}</span>
                      {e.estado === 'vivo' && (
                        <span className="flex items-center gap-1.5 bg-[#FF4054] px-1.5 py-0.5 font-mono text-[12px] font-medium uppercase text-white">
                          <span className="en-vivo h-1.5 w-1.5 rounded-full bg-white" /> {t('En vivo')}
                        </span>
                      )}
                      {e.estado === 'proximo' && <span className="bg-noche px-1.5 py-0.5 font-mono text-[12px] font-medium uppercase text-cian">{e.hoy ? t('Hoy') : t('Próximo')}</span>}
                    </span>
                    <span className={`mt-1 block truncate text-[14px] ${destacado ? 'text-noche/75' : ''}`}>
                      {e.hora} {t('hs')} · twitch.tv/{e.canal}
                      {e.inscripcion && e.estado !== 'terminado' ? ` · ${t('Inscripción abierta')}` : ''}
                    </span>
                  </span>
                  <span className={`chip ${destacado ? 'bg-noche text-cian' : e.estado === 'terminado' ? 'bg-white/5' : JUEGO[e.juego]}`}>{e.juego}</span>
                  <Flecha className="hidden h-5 w-5 sm:block" />
                </a>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ol>

      {terminados.length > 0 && (
        <button onClick={() => setVerTodo((v) => !v)} className="mt-2 inline-flex min-h-[44px] items-center font-mono text-[13px] uppercase tracking-[0.1em] text-white/55 hover:text-cian">
          {verTodo ? t('Ocultar los que ya pasaron') : t('Ver los {n} que ya pasaron', { n: terminados.length })}
        </button>
      )}
    </div>
  )
}

function Reglamento() {
  const [abierto, setAbierto] = useState(false)
  return (
    <div className="relative mt-5 border-t border-noche/15 pt-4">
      <button onClick={() => setAbierto((v) => !v)} className="flex min-h-[44px] w-full items-center justify-between font-titulo text-[19px] font-extrabold uppercase" aria-expanded={abierto}>
        {t('Reglamento')}
        <span className={`text-[22px] leading-none transition ${abierto ? 'rotate-45' : ''}`}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {abierto && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: golpe }}
            className="overflow-hidden"
          >
            {eventos.reglamento.map((r) => (
              <li key={r} className="mt-2 flex gap-2 text-[15px] font-medium text-noche/80">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-cian" />
                {r}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

// Flyer del mes (la placa que GGA publica en X), en una franja propia
function FlyerDelMes() {
  const src = flyerDe('mes', calendario.flyer)
  if (!src) return null
  return (
    <div className="mt-10 grid items-center gap-6 rounded-[22px] border border-white/10 bg-carbon/80 p-5 sm:p-8 md:grid-cols-[minmax(0,380px)_1fr] md:gap-10">
      <Flyer src={src} alt={`${t('Calendario de actividades de Guilty Gear Argentina')}, ${calendario.mes}`} />
      <div>
        <p className="bajada text-cian">{t('Flyer del mes')}</p>
        <h3 className="mt-2 font-titulo text-[clamp(40px,5vw,64px)] font-black uppercase leading-[0.9]">{calendario.mes}</h3>
        <p className="mt-4 max-w-[46ch] text-[17px] text-white/70">
          {t('La placa con todas las actividades del mes, la misma que publicamos en X. Guardala o compartila con quien quiera arrancar.')}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <a href={src} target="_blank" rel="noreferrer" className="boton boton-cian">
            {t('Abrir el flyer')}
          </a>
          <a href={calendario.post} target="_blank" rel="noreferrer" className="boton boton-borde">
            <Marca red="x" className="h-4 w-4" /> {t('Ver el post')}
          </a>
        </div>
      </div>
    </div>
  )
}

function Tarjeta({ ev, i, inscripcion }) {
  const p1 = ev.lado === 'P1'
  const flyer = flyerDe(ev.id, ev.flyer)
  return (
    <motion.article
      initial={sinMovimiento ? false : { opacity: 0, x: p1 ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: golpe, delay: i * 0.08 }}
      className={`tarjeta-corte relative flex flex-col overflow-hidden p-6 sm:p-8 ${p1 ? 'bg-cian text-noche' : 'bg-white text-noche'}`}
    >
      <div className={`pointer-events-none absolute inset-0 ${p1 ? 'lineas-oscuras' : 'trama-oscura opacity-30'}`} aria-hidden="true" />
      <span className="contorno pointer-events-none absolute -right-3 -top-6 font-titulo text-[150px] font-black leading-none [--trazo:rgba(7,9,13,.14)]" aria-hidden="true">
        {ev.lado}
      </span>

      {flyer && <Flyer src={flyer} alt={`Flyer: ${ev.nombre}`} className="relative mb-6 !border-noche/15 shadow-[0_18px_40px_-20px_rgba(7,9,13,.6)]" />}

      <div className="relative flex items-center gap-2">
        <span className={`chip ${p1 ? 'bg-noche text-cian' : 'bg-azul text-white'}`}>{ev.lado}</span>
        <span className="chip bg-noche/10 text-noche">
          <Marca red="twitch" className="h-3.5 w-3.5" /> /{ev.canal}
        </span>
      </div>

      <h3 className="relative mt-5 font-titulo text-[clamp(2.4rem,11vw,3.6rem)] font-black uppercase leading-[0.9]">{ev.nombre}</h3>
      <p className="relative mt-3 font-titulo text-[24px] font-extrabold leading-tight">{ev.gancho}</p>
      <p className="relative mt-3 flex-1 text-[16px] font-medium text-noche/80">{ev.texto}</p>

      <p className="relative mt-5 flex items-center gap-2 border-t border-noche/15 pt-4 font-mono text-[13px] font-medium uppercase tracking-[0.08em]">
        <span className="h-2 w-2 bg-noche" />
        {diasTexto(ev.dias)} · {ev.hora} {t('hs')}
      </p>
      {p1 && <p className="relative mt-1 font-mono text-[12px] uppercase tracking-[0.08em] text-noche/65">{t('Cada semana, un Guilty distinto')}</p>}

      {!p1 && <Reglamento />}

      <div className="relative mt-5 flex flex-col gap-2">
        {inscripcion && (
          <a href={inscripcion} target="_blank" rel="noreferrer" className="boton boton-negro">
            {t('Inscribite en Challonge')} <Flecha />
          </a>
        )}
        <a href={ev.link} target="_blank" rel="noreferrer" className={`boton ${p1 ? 'boton-negro' : 'boton-cian'}`}>
          <Marca red="twitch" /> {t('Ver en Twitch')} <Flecha />
        </a>
      </div>
    </motion.article>
  )
}

// completa = false (inicio): solo las dos tarjetas (lobbys y torneos) y el link a la página de Eventos
export default function Eventos({ completa = true }) {
  const ahora = useAhora()
  const [a, b] = eventos.lista
  const cal = armarCalendario(calendario, eventos.lista, eventos.duracionHoras, ahora)
  const torneoAbierto = cal.find((e) => e.tipo === 'torneo' && e.estado !== 'terminado' && e.inscripcion)

  return (
    <section id="eventos" className="relative overflow-hidden bg-noche pb-24 pt-20 lg:pb-32 lg:pt-28">
      <div className="pointer-events-none absolute inset-0 lineas" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-azul/40 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <p className="bajada flex items-center gap-2 text-cian">
          <Marca red="twitch" className="h-4 w-4" /> {eventos.bajada}
        </p>
        <Titulo lineas={eventos.titulo} className="mt-3" />
        <div className="raya bg-cian" />

        {completa && (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <Aparece>
            <Reloj ahora={ahora} />
          </Aparece>
          <Aparece delay={0.08} className="lg:row-span-2">
            <Calendario ahora={ahora} />
          </Aparece>
        </div>

        )}

        {completa && (
          <Aparece>
            <FlyerDelMes />
          </Aparece>
        )}

        {/* P1 VS P2 */}
        <div className="relative mt-10 grid gap-4 lg:grid-cols-2 lg:gap-6">
          <Tarjeta ev={a} i={0} />
          <div
            className="pointer-events-none relative z-10 -my-9 flex justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:my-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
            aria-hidden="true"
          >
            <motion.span
              initial={sinMovimiento ? false : { scale: 2.6, opacity: 0, rotate: -14 }}
              whileInView={{ scale: 1, opacity: 1, rotate: -8 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: golpe, delay: 0.2 }}
              className="block font-titulo text-[88px] font-black leading-none text-white [text-shadow:4px_4px_0_#194E81,-3px_-2px_0_#02BEFE]"
              style={{ transform: 'skewX(-10deg)' }}
            >
              VS
            </motion.span>
          </div>
          <Tarjeta ev={b} i={1} inscripcion={torneoAbierto?.inscripcion} />
        </div>

        {!completa && (
          <div className="mt-8">
            <button onClick={() => irA('eventos')} className="boton boton-cian">
              {t('Ver el calendario del mes')} <Flecha />
            </button>
          </div>
        )}
        <p className="mt-6 text-[14px] text-white/50">{t('Horarios en hora argentina (UTC-3). Los avisos y cambios salen primero en el Discord y en X.')}</p>
      </div>
    </section>
  )
}
