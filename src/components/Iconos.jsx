import { siDiscord, siTwitch, siYoutube, siX, siInstagram } from 'simple-icons'

const marcas = { discord: siDiscord, twitch: siTwitch, youtube: siYoutube, x: siX, instagram: siInstagram }

export function Marca({ red, className = 'h-5 w-5' }) {
  const icono = marcas[red]
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={icono.path} />
    </svg>
  )
}

export function Flecha({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
      <path d="M4 12h15M13 5l7 7-7 7" strokeLinecap="square" />
    </svg>
  )
}

export function Play({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5z" />
    </svg>
  )
}

export function Rebobinar({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M11 6v12L2 12zM21 6v12l-9-6z" />
    </svg>
  )
}
