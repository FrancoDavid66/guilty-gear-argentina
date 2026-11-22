// Idiomas de la web: español (original), inglés y portugués.
// - Los textos de src/data/gga.js se traducen con en.js y pt.js (solo los textos; links y datos quedan igual).
// - Los textos fijos de los componentes se traducen con t('texto en español') usando ui.js.
import * as datos from '../data/gga'
import en from './en'
import pt from './pt'
import { ui } from './ui'

export const IDIOMAS = [
  { id: 'es', corto: 'ES', nombre: 'Español', locale: 'es-AR' },
  { id: 'en', corto: 'EN', nombre: 'English', locale: 'en-US' },
  { id: 'pt', corto: 'PT', nombre: 'Português', locale: 'pt-BR' },
]
const capas = { en, pt }

// copia de los textos originales (para volver al español)
const original = {}
for (const [k, v] of Object.entries(datos)) if (v && typeof v === 'object') original[k] = structuredClone(v)

let actual = 'es'
export const idiomaActual = () => actual
export const localeActual = () => IDIOMAS.find((i) => i.id === actual)?.locale ?? 'es-AR'

// pisa en "destino" solo lo que trae "capa" (objetos y listas, posición por posición)
function mezclar(destino, capa) {
  for (const [k, v] of Object.entries(capa)) {
    if (v && typeof v === 'object' && destino[k] && typeof destino[k] === 'object') mezclar(destino[k], v)
    else if (v !== undefined) destino[k] = v
  }
}

export function aplicarIdioma(id) {
  for (const [k, copia] of Object.entries(original)) mezclar(datos[k], structuredClone(copia))
  if (capas[id]) for (const [k, capa] of Object.entries(capas[id])) if (datos[k] && typeof datos[k] === 'object') mezclar(datos[k], capa)
  actual = IDIOMAS.some((i) => i.id === id) ? id : 'es'
  document.documentElement.lang = actual === 'es' ? 'es-AR' : actual === 'pt' ? 'pt-BR' : 'en'
  try {
    localStorage.setItem('gga-idioma', actual)
  } catch {
    /* sin almacenamiento: no pasa nada */
  }
}

export function idiomaInicial() {
  try {
    const guardado = localStorage.getItem('gga-idioma')
    if (IDIOMAS.some((i) => i.id === guardado)) return guardado
  } catch {
    /* nada */
  }
  const nav = (navigator.language || 'es').toLowerCase()
  if (nav.startsWith('pt')) return 'pt'
  if (nav.startsWith('en')) return 'en'
  return 'es'
}

// Texto fijo de un componente: se escribe en español y se traduce acá
export function t(texto, vars) {
  let s = actual === 'es' ? texto : (ui[texto]?.[actual] ?? texto)
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v)
  return s
}
