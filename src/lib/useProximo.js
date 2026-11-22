import { useEffect, useState } from 'react'
import { calendario, eventos } from '../data/gga'
import { proximoGeneral } from './agenda'

// Próximo evento (o el que está en vivo), recalculado cada segundo
export function useProximo() {
  const [ahora, setAhora] = useState(() => new Date())
  useEffect(() => {
    const reloj = setInterval(() => setAhora(new Date()), 1000)
    return () => clearInterval(reloj)
  }, [])
  const ev = proximoGeneral(calendario, eventos.lista, eventos.duracionHoras, ahora)
  return { ev, ahora }
}

const NOMBRE_JUEGO = { '+R': '+R', XRD: 'Xrd', STRIVE: 'Strive' }
export const juegoCorto = (j) => NOMBRE_JUEGO[j] ?? j ?? ''
