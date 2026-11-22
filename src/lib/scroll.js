import Lenis from 'lenis'
import { useEffect, useState } from 'react'
import { sinMovimiento } from './movimiento'

let lenis = null
const OFFSET = 96 // alto del menú fijo (barra en vivo + header)

export function iniciarScroll() {
  if (sinMovimiento || lenis) return lenis
  lenis = new Lenis({ duration: 1.1, smoothWheel: true })
  const loop = (t) => {
    lenis.raf(t)
    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)
  return lenis
}

export function frenarScroll(frenar) {
  if (!lenis) return
  frenar ? lenis.stop() : lenis.start()
}

// ---------------------------------------------------------------- páginas (#/juegos, #/eventos…)
// Con "#" funciona igual abierta con doble clic, en la vista previa y en Hostinger.
export const PAGINAS = ['inicio', 'nosotros', 'juegos', 'eventos', 'aprende', 'comunidad']

// En qué página está cada sección (para los botones que llevan a otra página)
const SECCIONES = {
  discord: 'comunidad',
  reglas: 'comunidad',
  redes: 'comunidad',
  personajes: 'juegos',
  escuelita: 'aprende',
  clases: 'aprende',
  diccionario: 'aprende',
  calendario: 'eventos',
  replay: 'eventos',
  historia: 'nosotros',
  team: 'nosotros',
  galeria: 'nosotros',
}

// Cosas que una página le deja a la siguiente (ej.: qué serie de clases abrir)
export const pendiente = { serie: null, juego: null }

export function paginaActual() {
  const h = location.hash.replace(/^#\/?/, '').split(/[/?]/)[0]
  return PAGINAS.includes(h) ? h : 'inicio'
}

export function usePagina() {
  const [pagina, setPagina] = useState(paginaActual)
  useEffect(() => {
    const cambio = () => setPagina(paginaActual())
    addEventListener('hashchange', cambio)
    return () => removeEventListener('hashchange', cambio)
  }, [])
  return pagina
}

// Transición entre páginas (la registra efectos/Transicion.jsx). Sin ella, el cambio es directo.
let transicion = null
export function registrarTransicion(fn) {
  transicion = fn
  return () => {
    if (transicion === fn) transicion = null
  }
}

let anclaPendiente = null
export function tomarAncla() {
  const a = anclaPendiente
  anclaPendiente = null
  return a
}

export function arriba(inmediato = false) {
  if (lenis) {
    lenis.resize()
    lenis.scrollTo(0, { immediate: inmediato, force: true })
  } else window.scrollTo({ top: 0, behavior: inmediato || sinMovimiento ? 'auto' : 'smooth' })
}

function bajarA(el) {
  if (lenis) {
    lenis.resize() // el alto de la página cambia con las animaciones: recalcular antes de ir
    lenis.scrollTo(el.getBoundingClientRect().top + window.scrollY - OFFSET, { force: true })
  } else el.scrollIntoView({ behavior: sinMovimiento ? 'auto' : 'smooth' })
}

export function irPagina(id, ancla = null) {
  if (id === paginaActual()) {
    const el = ancla && document.getElementById(ancla)
    return el ? bajarA(el) : arriba()
  }
  anclaPendiente = ancla
  const cambiar = () => {
    location.hash = id === 'inicio' ? '#/' : `#/${id}`
  }
  transicion ? transicion(id, cambiar) : cambiar()
}

// Lleva a una página ("juegos") o a una sección ("clases"), esté en la página que esté
export function irA(id) {
  if (id === 'arriba') return arriba()
  if (PAGINAS.includes(id)) return irPagina(id)
  const el = document.getElementById(id)
  if (el) return bajarA(el)
  if (SECCIONES[id]) irPagina(SECCIONES[id], id)
}
