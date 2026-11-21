import { useEffect, useState } from 'react'
import { sinMovimiento } from '../../lib/movimiento'

// "WALL BREAK": la primera vez que llegás a la sección indicada, la pantalla se rompe en pedazos.
function esquirlas() {
  const cx = 50 + (Math.random() * 10 - 5)
  const cy = 45 + (Math.random() * 10 - 5)
  const rayos = 14
  const angulos = Array.from({ length: rayos }, (_, i) => (i / rayos) * Math.PI * 2 + (Math.random() - 0.5) * 0.35)
  const radios = [0, 14 + Math.random() * 6, 34 + Math.random() * 8, 110]
  const punto = (a, r, j = 0) => [cx + Math.cos(a) * (r + j), cy + Math.sin(a) * (r + j) * 1.1]
  const out = []
  for (let k = 0; k < radios.length - 1; k++) {
    for (let i = 0; i < rayos; i++) {
      const a1 = angulos[i]
      const a2 = angulos[(i + 1) % rayos] + (i === rayos - 1 ? Math.PI * 2 : 0)
      const j1 = k ? (Math.random() - 0.5) * 4 : 0
      const j2 = (Math.random() - 0.5) * 4
      const pts = k === 0 ? [[cx, cy], punto(a1, radios[1], j2), punto(a2, radios[1], j2)] : [punto(a1, radios[k], j1), punto(a1, radios[k + 1], j2), punto(a2, radios[k + 1], j2), punto(a2, radios[k], j1)]
      const am = (a1 + a2) / 2
      const fuerza = 30 + k * 25 + Math.random() * 30
      out.push({
        p: pts.map((q) => q.map((v) => v.toFixed(2)).join(',')).join(' '),
        x: (Math.cos(am) * fuerza).toFixed(1) + 'vw',
        y: (Math.sin(am) * fuerza + 20).toFixed(1) + 'vh',
        r: ((Math.random() - 0.5) * 120).toFixed(0) + 'deg',
        d: (k * 0.04 + Math.random() * 0.06).toFixed(2) + 's',
      })
    }
  }
  return out
}

export default function WallBreak({ seccion = 'eventos' }) {
  const [piezas, setPiezas] = useState(null)
  useEffect(() => {
    if (sinMovimiento) return
    try {
      if (sessionStorage.getItem('gga-wallbreak')) return
    } catch {}
    const el = document.getElementById(seccion)
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        obs.disconnect()
        try {
          sessionStorage.setItem('gga-wallbreak', '1')
        } catch {}
        setPiezas(esquirlas())
        setTimeout(() => setPiezas(null), 1400)
      },
      { threshold: 0.18 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [seccion])

  if (!piezas) return null
  return (
    <div className="wb" aria-hidden="true">
      <div className="wb-flash" />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {piezas.map((s, i) => (
          <polygon key={i} points={s.p} style={{ '--x': s.x, '--y': s.y, '--r': s.r, '--d': s.d }} />
        ))}
      </svg>
      <div className="wb-texto">
        WALL
        <br />
        BREAK!
      </div>
    </div>
  )
}
