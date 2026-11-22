import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { diccionario } from '../data/gga'
import { golpe, sinMovimiento } from '../lib/movimiento'
import Aparece from './Aparece'
import { t } from '../i18n'

const FLECHA = { 1: '↙', 2: '↓', 3: '↘', 4: '←', 5: '•', 6: '→', 7: '↖', 8: '↑', 9: '↗' }
const ORDEN = [7, 8, 9, 4, 5, 6, 1, 2, 3]
// centro de cada celda en un cuadro de 300 x 300
const centro = (n) => {
  const i = ORDEN.indexOf(n)
  return [50 + (i % 3) * 100, 50 + Math.floor(i / 3) * 100]
}
const colorDe = (b) => diccionario.botones.find((x) => x.b === b)?.color ?? '#02BEFE'

function Tecla({ b, grande = false }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-titulo font-black text-noche ${grande ? 'h-14 w-14 text-[30px]' : 'h-9 w-9 text-[19px]'}`}
      style={{ background: colorDe(b), boxShadow: 'inset 0 -3px 0 rgba(0,0,0,.25)' }}
    >
      {b}
    </span>
  )
}

// Joystick numérico que dibuja el movimiento
function Numpad({ mov }) {
  const [paso, setPaso] = useState(sinMovimiento ? mov.input.length : 0)
  useEffect(() => {
    if (sinMovimiento) return setPaso(mov.input.length)
    setPaso(0)
    let p = 0
    const total = mov.input.length + 1 // +1 = botón
    const reloj = setInterval(() => {
      p = p >= total + 3 ? 0 : p + 1 // pausa al final y vuelve a empezar
      setPaso(p)
    }, 230)
    return () => clearInterval(reloj)
  }, [mov])

  const digitos = mov.input.split('').map(Number)
  const vistos = digitos.slice(0, Math.min(paso, digitos.length))
  const actual = paso > 0 && paso <= digitos.length ? digitos[paso - 1] : null
  const puntos = vistos.map((d) => centro(d).join(',')).join(' ')
  const boton = paso > digitos.length

  return (
    <div className="mx-auto w-full max-w-[260px]">
      <div className="relative grid grid-cols-3">
        {ORDEN.map((n) => (
          <div
            key={n}
            className={`numpad-celda flex aspect-square flex-col items-center justify-center bg-white/[.06] ring-1 ring-inset ring-noche ${actual === n ? 'activa' : ''}`}
          >
            <span className="font-titulo text-[30px] font-black leading-none">{n}</span>
            <span className="text-[16px] leading-none opacity-60">{FLECHA[n]}</span>
          </div>
        ))}
        <svg viewBox="0 0 300 300" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {vistos.length > 1 && <polyline points={puntos} fill="none" stroke="#02BEFE" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity=".55" />}
        {vistos.length > 0 && <circle cx={centro(vistos.at(-1))[0]} cy={centro(vistos.at(-1))[1]} r="16" fill="#fff" stroke="#02BEFE" strokeWidth="5" />}
        </svg>
      </div>
      <div className="mt-3 flex h-14 items-center justify-center gap-3">
        <span className="font-titulo text-[34px] font-black tabular-nums tracking-wider">{mov.input}</span>
        <span className="font-titulo text-[26px] font-black text-white/50">+</span>
        <motion.span animate={boton && !sinMovimiento ? { scale: [1, 1.35, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
          <Tecla b={mov.boton} grande />
        </motion.span>
      </div>
    </div>
  )
}

export default function Diccionario() {
  const [mov, setMov] = useState(diccionario.movimientos[0])
  const [todos, setTodos] = useState(false)
  const terminos = todos ? diccionario.terminos : diccionario.terminos.slice(0, 6)

  return (
    <div id="diccionario" className="relative mx-auto mt-16 max-w-[1240px] scroll-mt-20 px-5 sm:px-8">
      <p className="bajada text-azul">{diccionario.bajada}</p>
      <h3 className="mt-1 font-titulo text-[clamp(2rem,8vw,3rem)] font-black uppercase leading-none">{diccionario.titulo}</h3>
      <p className="mt-3 max-w-[40rem] text-[16px] text-noche/70">{diccionario.texto}</p>

      {/* Notación numérica */}
      <Aparece className="mt-6">
        <div className="tarjeta-corte grid gap-8 bg-noche p-6 text-white sm:p-8 lg:grid-cols-[300px_1fr] lg:items-center lg:gap-12">
          <Numpad mov={mov} />
          <div>
            <p className="bajada text-cian">{t('Notación numérica')}</p>
            <p className="mt-2 max-w-[34rem] text-[16px] text-white/75">
              {t('Pensá el joystick como el teclado numérico: el 5 es el medio y cada número es una dirección, mirando hacia la derecha. Así se escriben todos los movimientos.')}
            </p>

            <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label={t('Movimientos')}>
              {diccionario.movimientos.map((m) => (
                <button
                  key={m.input}
                  role="tab"
                  aria-selected={m === mov}
                  onClick={() => setMov(m)}
                  className={`min-h-[44px] px-4 font-titulo text-[20px] font-black tabular-nums transition ${m === mov ? 'bg-cian text-noche' : 'bg-white/[.07] hover:bg-white/15'}`}
                  style={{ borderRadius: 12 }}
                >
                  {m.input}
                  {m.boton}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={mov.input} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2, ease: golpe }} className="mt-5 min-h-[86px]">
                <p className="font-titulo text-[26px] font-black uppercase leading-tight">{mov.nombre}</p>
                <p className="mt-1 text-[16px] text-white/70">{mov.texto}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="bajada text-white/55">{t('Los 5 botones')}</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                {diccionario.botones.map((b) => (
                  <li key={b.b} className="flex items-center gap-2 text-[15px]">
                    <Tecla b={b.b} /> {b.nombre}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Aparece>

      {/* Términos */}
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {terminos.map((x) => (
            <motion.li
              key={x.t}
              layout={!sinMovimiento}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: golpe }}
              className="border-l-4 border-cian bg-white p-4 ring-1 ring-inset ring-noche/10"
            >
              <p className="font-titulo text-[21px] font-black uppercase leading-tight">{x.t}</p>
              <p className="mt-1 text-[15px] text-noche/70">{x.d}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {diccionario.terminos.length > 6 && (
        <button onClick={() => setTodos((v) => !v)} className="mt-4 inline-flex min-h-[44px] items-center font-titulo text-[18px] font-extrabold uppercase text-azul hover:text-cian">
          {todos ? t('Ver menos') : t('Ver los {n} términos', { n: diccionario.terminos.length })}
        </button>
      )}
    </div>
  )
}
