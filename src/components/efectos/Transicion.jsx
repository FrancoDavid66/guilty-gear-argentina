import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { paginas } from '../../data/gga'
import { registrarTransicion } from '../../lib/scroll'
import { sinMovimiento } from '../../lib/movimiento'

// Cambio de página estilo pantalla de pelea: dos placas entran en diagonal, un tajo celeste
// las corta, aparece el nombre de la página con "LET'S ROCK" y se abren hacia el otro lado.
const T_CIERRA = 0.32
const T_PAUSA = 0.26
const T_ABRE = 0.38
const golpe = [0.76, 0, 0.24, 1]

// Diagonal del corte: de 62 % (izquierda) a 40 % (derecha) de la altura
const ARRIBA = 'polygon(0 0, 100% 0, 100% 40%, 0 62%)'
const ABAJO = 'polygon(0 62%, 100% 40%, 100% 100%, 0 100%)'

export default function Transicion() {
  const [fase, setFase] = useState('quieta') // quieta | cierra | muestra | abre
  const [nombre, setNombre] = useState('')
  const timers = useRef([])

  useEffect(() => {
    if (sinMovimiento) return
    return registrarTransicion((id, cambiar) => {
      timers.current.forEach(clearTimeout)
      setNombre(id === 'inicio' ? 'Inicio' : (paginas[id]?.titulo ?? id))
      setFase('cierra')
      timers.current = [
        setTimeout(() => {
          cambiar() // la página cambia tapada
          setFase('muestra')
        }, T_CIERRA * 1000),
        setTimeout(() => setFase('abre'), (T_CIERRA + T_PAUSA) * 1000),
        setTimeout(() => setFase('quieta'), (T_CIERRA + T_PAUSA + T_ABRE) * 1000 + 30),
      ]
    })
  }, [])

  if (fase === 'quieta') return null
  const tapado = fase === 'muestra'
  const abre = fase === 'abre'
  const tr = { duration: abre ? T_ABRE : T_CIERRA, ease: golpe }

  return (
    <div className="fixed inset-0 z-[90]" aria-hidden="true">
      {/* placa de arriba: entra desde la izquierda, sale por la derecha */}
      <motion.div
        className="lineas absolute inset-0 bg-noche"
        style={{ clipPath: ARRIBA }}
        initial={{ x: '-105%' }}
        animate={{ x: abre ? '105%' : '0%' }}
        transition={tr}
      />
      {/* placa de abajo: entra desde la derecha, sale por la izquierda */}
      <motion.div
        className="absolute inset-0 bg-carbon"
        style={{ clipPath: ABAJO }}
        initial={{ x: '105%' }}
        animate={{ x: abre ? '-105%' : '0%' }}
        transition={tr}
      />

      {/* el tajo celeste sobre la diagonal: se "corta" de izquierda a derecha */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
        animate={{ clipPath: tapado || abre ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)', opacity: abre ? 0 : 1 }}
        transition={{ duration: abre ? 0.22 : 0.16, ease: 'easeOut' }}
      >
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="62" x2="100" y2="40" stroke="#02BEFE" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 8, filter: 'drop-shadow(0 0 10px #02BEFE)' }} />
          <line x1="0" y1="62" x2="100" y2="40" stroke="#FFFFFF" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 2.5 }} />
        </svg>
      </motion.div>

      {/* nombre de la página + LET'S ROCK */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: tapado ? 1 : 0, scale: tapado ? 1 : abre ? 0.96 : 1.15 }}
        transition={{ duration: tapado ? 0.16 : 0.14, ease: 'easeOut' }}
      >
        <span className="font-titulo text-[clamp(64px,14vw,190px)] font-black uppercase leading-[0.85] text-white">{nombre}</span>
        <span className="mt-3 font-titulo text-[clamp(18px,2.4vw,30px)] font-black uppercase tracking-[0.35em] text-cian">Let’s rock</span>
      </motion.div>
    </div>
  )
}
