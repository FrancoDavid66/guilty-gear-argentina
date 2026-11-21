import { motion } from 'framer-motion'
import { golpe, sinMovimiento } from '../lib/movimiento'

// Título de sección: cada línea entra con un "tajo" de color que la cruza.
export default function Titulo({ lineas, className = '', barra = '#02BEFE', as = 'h2' }) {
  const Etiqueta = motion[as]
  const lista = Array.isArray(lineas) ? lineas : [lineas]
  if (sinMovimiento) {
    const T = as
    return <T className={`titulo ${className}`}>{lista.map((l, i) => <span key={i} className="block">{l}</span>)}</T>
  }
  return (
    <Etiqueta className={`titulo ${className}`} initial="oculto" whileInView="visible" viewport={{ once: true, amount: 0.6 }}>
      {lista.map((linea, i) => (
        <span key={i} className="relative block w-fit max-w-full">
          <motion.span
            className="block"
            variants={{ oculto: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.18 + i * 0.09, duration: 0.01 } } }}
          >
            {linea}
          </motion.span>
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: barra }}
            variants={{
              oculto: { clipPath: 'inset(0 100% 0 0)' },
              visible: {
                clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0 0 100%)'],
                transition: { duration: 0.55, times: [0, 0.45, 1], delay: i * 0.09, ease: golpe },
              },
            }}
          />
        </span>
      ))}
    </Etiqueta>
  )
}
