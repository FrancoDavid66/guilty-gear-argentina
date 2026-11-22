import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { discord, menu, redes, eventos, vods } from '../data/gga'
import { irA, frenarScroll } from '../lib/scroll'
import { golpe } from '../lib/movimiento'
import Logo from './Logo'
import { Marca } from './Iconos'
import { fechaArg } from '../lib/agenda'
import { juegoCorto, useProximo } from '../lib/useProximo'

// Barra fina arriba de todo (estilo Fnatic): qué hay en vivo o qué viene
function BarraVivo() {
  const { ev } = useProximo()
  if (!ev) return null
  const torneo = ev.tipo === 'torneo' || /torneo/i.test(ev.nombre)
  const titulo = torneo ? (ev.nombre && !/torneo/i.test(ev.nombre) ? ev.nombre : 'Wake up, Throw!') : 'Lobby abierto'
  const { dia, hora } = fechaArg(ev.inicio)
  const num = new Date(ev.inicio.getTime() - 3 * 3600_000).getUTCDate()
  return (
    <a
      href={ev.link ?? 'https://www.twitch.tv/nabbori'}
      target="_blank"
      rel="noreferrer"
      className="flex h-8 items-center justify-center gap-2.5 border-b border-white/5 bg-carbon px-4 text-[13px] transition hover:text-cian"
    >
      <span className={`h-2 w-2 shrink-0 rounded-full ${ev.enVivo ? 'animate-pulse bg-[#FF4054]' : 'bg-cian'}`} />
      <b className="truncate font-semibold">
        {ev.enVivo ? 'EN VIVO' : 'Próximo'}: {titulo}
        {ev.juego ? ` · ${juegoCorto(ev.juego)}` : ''}
      </b>
      <span className="hidden shrink-0 text-white/50 sm:inline">
        {ev.hoy ? 'hoy' : `${dia.toLowerCase()} ${num}`} · {hora} hs{ev.canal ? ` · twitch.tv/${ev.canal}` : ''}
      </span>
    </a>
  )
}

export default function Header({ pagina = 'inicio' }) {
  const [abierto, setAbierto] = useState(false)
  const [max, setMax] = useState(false)
  const { scrollYProgress } = useScroll()
  const tension = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setMax(v > 0.985))

  useEffect(() => {
    frenarScroll(abierto)
    document.documentElement.style.overflow = abierto ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && setAbierto(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [abierto])

  const ir = (id) => {
    setAbierto(false)
    setTimeout(() => irA(id), abierto ? 280 : 0)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-noche/80 backdrop-blur-md">
        <BarraVivo />
        <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6">
          <button onClick={() => ir('inicio')} className="flex min-h-[44px] items-center gap-2.5" aria-label="Ir al inicio">
            <Logo className="h-9 w-9" />
            <span className="font-titulo text-[22px] font-black leading-none tracking-wide">GGA</span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Secciones">
            {menu.map((m) => (
              <button
                key={m.id}
                onClick={() => ir(m.id)}
                aria-current={pagina === m.id ? 'page' : undefined}
                className={`relative px-3 py-2 font-titulo text-[17px] font-bold uppercase tracking-wide transition hover:text-cian ${pagina === m.id ? 'text-cian' : 'text-white/75'}`}
              >
                {m.nombre}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={discord.link} target="_blank" rel="noreferrer" className="boton boton-cian hidden !min-h-[40px] !px-5 !text-[16px] sm:inline-flex">
              <Marca red="discord" className="h-4 w-4" /> Discord
            </a>
            <button
              onClick={() => setAbierto(true)}
              className="flex h-11 items-center gap-2 px-2 font-titulo text-[17px] font-bold uppercase tracking-wide lg:hidden"
              aria-label="Abrir menú"
              aria-expanded={abierto}
            >
              Menú
              <span className="flex w-7 flex-col items-end gap-[5px]">
                <span className="h-[3px] w-7 bg-cian" />
                <span className="h-[3px] w-5 bg-white" />
                <span className="h-[3px] w-6 bg-cian" />
              </span>
            </button>
          </div>
        </div>

        {/* Barra de tensión: se llena a medida que bajás */}
        <div className="relative h-[5px] bg-white/5" aria-hidden="true">
          <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-azul via-cian to-white" style={{ scaleX: tension }} />
          <AnimatePresence>
            {max && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: [1, 0.4, 1], x: 0, transition: { opacity: { repeat: Infinity, duration: 0.8 } } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="absolute right-3 top-2 bg-cian px-1.5 font-titulo text-[13px] font-black leading-tight text-noche"
              >
                TENSIÓN MAX
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Menú tipo pausa del juego */}
      <AnimatePresence>
        {abierto && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-noche lineas lg:hidden"
            initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            exit={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
            transition={{ duration: 0.45, ease: golpe }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
          >
            <div className="flex h-14 items-center justify-between px-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-cian">Pausa</span>
              <button onClick={() => setAbierto(false)} className="flex h-11 items-center gap-2 px-2 font-titulo text-[17px] font-bold uppercase" aria-label="Cerrar menú">
                Volver
                <span className="relative block h-6 w-6">
                  <span className="absolute left-0 top-1/2 h-[3px] w-6 -translate-y-1/2 rotate-45 bg-cian" />
                  <span className="absolute left-0 top-1/2 h-[3px] w-6 -translate-y-1/2 -rotate-45 bg-white" />
                </span>
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-6" aria-label="Secciones">
              {[{ id: 'inicio', nombre: 'Inicio' }, ...menu].map((m, i) => (
                <motion.button
                  key={m.id}
                  onClick={() => ir(m.id)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, ease: golpe, duration: 0.5 }}
                  aria-current={pagina === m.id ? 'page' : undefined}
                  className="group flex items-center gap-4 py-1.5 text-left"
                >
                  <span className={`w-5 font-titulo text-[22px] font-black text-cian transition group-hover:opacity-100 group-focus-visible:opacity-100 ${pagina === m.id ? 'opacity-100' : 'opacity-0'}`}>▶</span>
                  <span className={`font-titulo text-[46px] font-black uppercase leading-none tracking-tight transition group-hover:translate-x-1 group-hover:text-cian ${pagina === m.id ? 'text-cian' : ''}`}>
                    {m.nombre}
                  </span>
                </motion.button>
              ))}
            </nav>

            <div className="pb-seguro flex flex-wrap gap-2 px-6 pt-4">
              <a href={discord.link} target="_blank" rel="noreferrer" className="boton boton-cian brillo flex-1">
                <Marca red="discord" /> Discord
              </a>
              <a href={eventos.lista[0].link} target="_blank" rel="noreferrer" className="flex h-[52px] w-[52px] items-center justify-center bg-white/10" aria-label="Twitch">
                <Marca red="twitch" />
              </a>
              <a href={vods.canales[0].link} target="_blank" rel="noreferrer" className="flex h-[52px] w-[52px] items-center justify-center bg-white/10" aria-label="YouTube">
                <Marca red="youtube" />
              </a>
              <a href={redes.principal.link} target="_blank" rel="noreferrer" className="flex h-[52px] w-[52px] items-center justify-center bg-white/10" aria-label="X">
                <Marca red="x" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
