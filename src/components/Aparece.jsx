import { motion } from 'framer-motion'
import { golpe, sinMovimiento } from '../lib/movimiento'

export default function Aparece({ children, className = '', delay = 0, y = 28, as = 'div' }) {
  if (sinMovimiento) {
    const T = as
    return <T className={className}>{children}</T>
  }
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: golpe }}
    >
      {children}
    </M>
  )
}
