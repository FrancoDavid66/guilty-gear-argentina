import { useEffect } from 'react'
import { sinMovimiento } from '../../lib/movimiento'

// Cada clic es un golpe: tajo, impacto, rayo o fuego (o al azar), con un mini freeze y temblor.
// Avisa con el evento "gga:golpe" para que la portada 3D haga saltar las piezas del logo.
export const TIPOS_GOLPE = ['tajo', 'impacto', 'rayo', 'fuego']
let tipoElegido = 'azar'
const oyentes = new Set()
export function elegirGolpe(tipo) {
  tipoElegido = tipo
  oyentes.forEach((f) => f(tipo))
}
export function golpeActual() {
  return tipoElegido
}
export function alCambiarGolpe(f) {
  oyentes.add(f)
  return () => oyentes.delete(f)
}

function rayoPuntos(x, y, ang, largo) {
  const pts = [[x, y]]
  let cx = x
  let cy = y
  for (let i = 0; i < 7; i++) {
    const a = ang + (Math.random() - 0.5) * 1.1
    cx += Math.cos(a) * (largo / 7)
    cy += Math.sin(a) * (largo / 7)
    pts.push([cx, cy])
  }
  return pts
}

function crearEfecto(tipo, x, y) {
  const ef = { tipo, x, y, t: 0 }
  if (tipo === 'tajo') {
    ef.ang = Math.random() * Math.PI * 2
    ef.R = 120 + Math.random() * 70
    ef.barrido = Math.PI * (0.65 + Math.random() * 0.3)
  } else if (tipo === 'impacto') {
    ef.puas = Array.from({ length: 11 }, (_, i) => ({ a: (i / 11) * Math.PI * 2 + Math.random() * 0.3, l: 50 + Math.random() * 90 }))
    ef.chispas = Array.from({ length: 16 }, () => {
      const a = Math.random() * Math.PI * 2
      const v = 250 + Math.random() * 450
      return { x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v }
    })
  } else if (tipo === 'rayo') {
    ef.rayos = Array.from({ length: 4 }, () => ({ a: Math.random() * Math.PI * 2, l: 120 + Math.random() * 130 }))
  } else {
    ef.llamas = Array.from({ length: 34 }, () => {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.4
      const v = 120 + Math.random() * 380
      return { x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, s: 10 + Math.random() * 22, vida: 0.45 + Math.random() * 0.35 }
    })
  }
  return ef
}

function dibujar(g, ef, dt) {
  ef.t += dt
  const t = ef.t
  if (t < 0.09) {
    const gr = g.createRadialGradient(ef.x, ef.y, 0, ef.x, ef.y, 90)
    gr.addColorStop(0, `rgba(255,255,255,${0.9 * (1 - t / 0.09)})`)
    gr.addColorStop(1, 'rgba(2,190,254,0)')
    g.fillStyle = gr
    g.beginPath()
    g.arc(ef.x, ef.y, 90, 0, Math.PI * 2)
    g.fill()
  }
  if (ef.tipo === 'tajo') {
    const p = Math.min(t / 0.1, 1)
    const alfa = t < 0.12 ? 1 : Math.max(0, 1 - (t - 0.12) / 0.28)
    if (alfa <= 0) return false
    const R = ef.R * (1 + Math.max(0, t - 0.1) * 0.25)
    const cx = ef.x - Math.cos(ef.ang) * R
    const cy = ef.y - Math.sin(ef.ang) * R
    const a0 = ef.ang - ef.barrido / 2
    for (const [grueso, color] of [[30, `rgba(2,190,254,${0.55 * alfa})`], [14, `rgba(255,255,255,${0.95 * alfa})`]]) {
      const ext = []
      const int = []
      for (let k = 0; k <= 40; k++) {
        const f = k / 40
        const a = a0 + ef.barrido * p * f
        const w = grueso * Math.sin(Math.PI * f)
        ext.push([cx + Math.cos(a) * (R + w / 2), cy + Math.sin(a) * (R + w / 2)])
        int.push([cx + Math.cos(a) * (R - w / 2), cy + Math.sin(a) * (R - w / 2)])
      }
      g.beginPath()
      g.moveTo(...ext[0])
      ext.forEach((q) => g.lineTo(...q))
      int.reverse().forEach((q) => g.lineTo(...q))
      g.closePath()
      g.fillStyle = color
      g.shadowColor = '#02befe'
      g.shadowBlur = 24
      g.fill()
    }
    g.shadowBlur = 0
    return true
  }
  if (ef.tipo === 'impacto') {
    const entra = Math.min(t / 0.06, 1)
    const alfa = t < 0.08 ? 1 : Math.max(0, 1 - (t - 0.08) / 0.3)
    g.fillStyle = `rgba(255,255,255,${alfa})`
    g.shadowColor = '#02befe'
    g.shadowBlur = 20
    for (const pu of ef.puas) {
      const l = pu.l * entra
      const ca = Math.cos(pu.a)
      const sa = Math.sin(pu.a)
      g.beginPath()
      g.moveTo(ef.x + ca * l, ef.y + sa * l)
      g.lineTo(ef.x - sa * 7, ef.y + ca * 7)
      g.lineTo(ef.x + sa * 7, ef.y - ca * 7)
      g.closePath()
      g.fill()
    }
    g.shadowBlur = 0
    g.strokeStyle = `rgba(2,190,254,${alfa})`
    g.lineWidth = 4
    g.beginPath()
    g.arc(ef.x, ef.y, 14 + t * 380, 0, Math.PI * 2)
    g.stroke()
    g.strokeStyle = `rgba(255,236,170,${Math.max(0, 1 - t / 0.45)})`
    g.lineWidth = 2.5
    for (const c of ef.chispas) {
      c.vy += 900 * dt
      c.x += c.vx * dt
      c.y += c.vy * dt
      g.beginPath()
      g.moveTo(c.x, c.y)
      g.lineTo(c.x - c.vx * 0.03, c.y - c.vy * 0.03)
      g.stroke()
    }
    return t < 0.5
  }
  if (ef.tipo === 'rayo') {
    const alfa = t < 0.14 ? 1 : Math.max(0, 1 - (t - 0.14) / 0.22)
    if (alfa <= 0) return false
    if (t >= 0.14 || Math.floor(t * 45) % 2 === 0) {
      for (const r of ef.rayos) {
        const pts = rayoPuntos(ef.x, ef.y, r.a, r.l)
        for (const [ancho, color, blur] of [[7, `rgba(2,190,254,${0.7 * alfa})`, 22], [2.4, `rgba(255,255,255,${alfa})`, 0]]) {
          g.strokeStyle = color
          g.lineWidth = ancho
          g.shadowColor = '#02befe'
          g.shadowBlur = blur
          g.beginPath()
          g.moveTo(...pts[0])
          pts.slice(1).forEach((q) => g.lineTo(...q))
          g.stroke()
        }
        const m = pts[3]
        const rama = rayoPuntos(m[0], m[1], r.a + (Math.random() < 0.5 ? 0.9 : -0.9), r.l * 0.4)
        g.lineWidth = 1.6
        g.strokeStyle = `rgba(190,240,255,${0.8 * alfa})`
        g.beginPath()
        g.moveTo(...rama[0])
        rama.slice(1).forEach((q) => g.lineTo(...q))
        g.stroke()
      }
      g.shadowBlur = 0
    }
    return true
  }
  let alguna = false
  for (const f of ef.llamas) {
    const v = t / f.vida
    if (v >= 1) continue
    alguna = true
    f.vx *= 0.97
    f.vy = f.vy * 0.96 - 420 * dt
    f.x += f.vx * dt
    f.y += f.vy * dt
    const s = f.s * (1 - v * 0.6)
    const color = v < 0.25 ? '255,243,176' : v < 0.6 ? '255,138,30' : '212,42,26'
    const gr = g.createRadialGradient(f.x, f.y, 0, f.x, f.y, s)
    gr.addColorStop(0, `rgba(${color},${0.9 * (1 - v)})`)
    gr.addColorStop(1, `rgba(${color},0)`)
    g.fillStyle = gr
    g.beginPath()
    g.arc(f.x, f.y, s, 0, Math.PI * 2)
    g.fill()
  }
  return alguna
}

export default function GolpesCanvas() {
  useEffect(() => {
    if (sinMovimiento) return
    const lienzo = document.createElement('canvas')
    lienzo.setAttribute('aria-hidden', 'true')
    lienzo.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:70'
    document.body.appendChild(lienzo)
    const g = lienzo.getContext('2d')
    const efectos = []
    let raf = 0
    let ultimo = performance.now()

    const medir = () => {
      lienzo.width = innerWidth * devicePixelRatio
      lienzo.height = innerHeight * devicePixelRatio
    }
    const loop = (ahora) => {
      const dt = Math.min((ahora - ultimo) / 1000, 0.05)
      ultimo = ahora
      g.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      g.clearRect(0, 0, innerWidth, innerHeight)
      g.globalCompositeOperation = 'lighter'
      for (let i = efectos.length - 1; i >= 0; i--) if (!dibujar(g, efectos[i], dt) || efectos[i].t > 1.2) efectos.splice(i, 1)
      g.globalCompositeOperation = 'source-over'
      raf = efectos.length ? requestAnimationFrame(loop) : 0
    }
    const tocar = (e) => {
      if (e.button > 0 || e.target.closest('[data-sin-golpe]')) return
      const tipo = tipoElegido === 'azar' ? TIPOS_GOLPE[Math.floor(Math.random() * TIPOS_GOLPE.length)] : tipoElegido
      efectos.push(crearEfecto(tipo, e.clientX, e.clientY))
      if (!raf) {
        ultimo = performance.now()
        raf = requestAnimationFrame(loop)
      }
      window.dispatchEvent(new CustomEvent('gga:golpe', { detail: { x: e.clientX, y: e.clientY, tipo } }))
      // temblor (solo el contenido, así el menú fijo no salta)
      const main = document.querySelector('main')
      if (main) {
        main.classList.remove('sacudir')
        void main.offsetWidth
        main.classList.add('sacudir')
      }
    }
    medir()
    addEventListener('resize', medir)
    addEventListener('pointerdown', tocar)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', medir)
      removeEventListener('pointerdown', tocar)
      lienzo.remove()
    }
  }, [])
  return null
}
