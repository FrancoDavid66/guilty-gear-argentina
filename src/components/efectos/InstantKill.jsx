import { useEffect, useState } from 'react'

// Easter egg: escribí 236236 + H (o ↓→↓→ + H) y te comés un Instant Kill.
// En el celu: tocá 3 veces seguidas el "LET'S ROCK" del footer.
export function lanzarInstantKill() {
  window.dispatchEvent(new Event('gga:ik'))
}

const FLECHAS = { ArrowDown: '2', ArrowRight: '6', ArrowLeft: '4', ArrowUp: '8' }

export default function InstantKill() {
  const [activo, setActivo] = useState(false)

  useEffect(() => {
    let buffer = ''
    const tecla = (e) => {
      if (e.target.closest?.('input, textarea')) return
      const k = FLECHAS[e.key] ?? (/^[1-9]$/.test(e.key) ? e.key : e.key?.toLowerCase())
      if (/^[1-9]$/.test(k)) {
        buffer = (buffer + k).slice(-12)
        return
      }
      if (['h', 'p', 'k', 's', 'd'].includes(k)) {
        const limpio = buffer.replace(/[13]/g, '')
        if (limpio.endsWith('2626')) lanzarInstantKill()
        buffer = ''
      }
    }
    const lanzar = () => {
      setActivo(true)
      document.body.classList.remove('temblor-pantalla')
      void document.body.offsetWidth
      document.body.classList.add('temblor-pantalla')
      setTimeout(() => setActivo(false), 2600)
      setTimeout(() => document.body.classList.remove('temblor-pantalla'), 800)
    }
    window.addEventListener('keydown', tecla)
    window.addEventListener('gga:ik', lanzar)
    return () => {
      window.removeEventListener('keydown', tecla)
      window.removeEventListener('gga:ik', lanzar)
    }
  }, [])

  if (!activo) return null
  return (
    <div className="ik" onClick={() => setActivo(false)} role="presentation">
      <div className="ik-rayos" />
      <div className="ik-texto">DESTROYED</div>
    </div>
  )
}
