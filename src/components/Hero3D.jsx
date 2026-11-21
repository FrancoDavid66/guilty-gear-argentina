import { useEffect, useRef, useState } from 'react'
import { hero, sitio } from '../data/gga'
import { crearEscena } from '../lib/escena3d'
import { sinMovimiento } from '../lib/movimiento'
import { logoUrl } from '../lib/logo'
import { TIPOS_GOLPE, alCambiarGolpe, elegirGolpe, golpeActual } from './efectos/GolpesCanvas'

const NOMBRES = { azar: 'Al azar', tajo: 'Tajo', impacto: 'Impacto', rayo: 'Rayo', fuego: 'Fuego' }

function SelectorGolpe() {
  const [tipo, setTipo] = useState(golpeActual())
  useEffect(() => alCambiarGolpe(setTipo), [])
  if (sinMovimiento) return null
  return (
    <div
      data-sin-golpe
      role="group"
      aria-label="Tipo de golpe al hacer clic"
      className="pointer-events-auto absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1 rounded-xl border border-white/10 bg-carbon/85 p-1 backdrop-blur-md"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      {['azar', ...TIPOS_GOLPE].map((t) => (
        <button
          key={t}
          onClick={() => elegirGolpe(t)}
          aria-pressed={tipo === t}
          className={`min-h-[40px] whitespace-nowrap rounded-lg px-2.5 text-[13px] font-semibold transition sm:px-4 ${tipo === t ? 'bg-cian text-noche' : 'text-white/60 hover:text-white'}`}
        >
          {NOMBRES[t]}
        </button>
      ))}
    </div>
  )
}

// Portada estilo Igloo: el logo se arma de líneas a sólido mientras bajás. Cada clic es un golpe.
export default function Hero3D() {
  const portada = useRef(null)
  const caja = useRef(null)
  const [pct, setPct] = useState(sinMovimiento ? 100 : 0)
  const [listo, setListo] = useState(sinMovimiento)
  const [sinWebGL, setSinWebGL] = useState(false)

  useEffect(() => {
    const cerrar = crearEscena({
      caja: caja.current,
      portada: portada.current,
      alAvanzar: (p, A) => {
        setPct(p)
        setListo(A > 0.82)
      },
    })
    if (!cerrar) {
      setSinWebGL(true)
      setPct(100)
      setListo(true)
    }
    return () => cerrar?.()
  }, [])

  const alto = sinMovimiento || sinWebGL ? 'h-[100svh]' : 'h-[260vh]'

  return (
    <section id="inicio" ref={portada} className={`relative ${alto} bg-noche`} aria-labelledby="titulo-portada">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_45%,rgba(25,78,129,.45),transparent_70%),linear-gradient(#07090d,#08101c)]" />
        <div ref={caja} aria-hidden="true" className="absolute inset-0" />
        {sinWebGL && logoUrl && (
          <img src={logoUrl} alt="" className="absolute left-1/2 top-1/2 w-[min(70vw,420px)] -translate-x-1/2 -translate-y-[60%]" />
        )}

        <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between px-4 pb-[86px] pt-[112px] sm:px-8">
          <h1 id="titulo-portada" className="text-center font-titulo text-[15px] font-black uppercase tracking-[0.32em] text-cian sm:text-[18px]">
            {sitio.nombre}
          </h1>
          <div className={`flex items-end justify-between gap-4 transition-opacity duration-500 ${listo ? 'max-sm:opacity-0' : ''}`}>
            <p className="hidden max-w-[32ch] text-[14px] text-white/55 sm:block">
              {sinMovimiento ? hero.bajada : 'Bajá para armar el logo. Tocá en cualquier lado para pegar.'}
            </p>
            <div className="ml-auto text-right font-texto text-[13px] font-bold tracking-[0.1em] text-white/55" aria-hidden="true">
              ARMADO
              <b className="block font-titulo text-[44px] font-black leading-none tracking-normal text-white tabular-nums">{pct}%</b>
            </div>
          </div>
        </div>

        <p
          className={`pointer-events-none absolute inset-x-3 bottom-[170px] z-10 text-center font-titulo text-[clamp(32px,4.8vw,64px)] font-black uppercase leading-[0.95] transition duration-500 sm:bottom-[15vh] ${listo ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
        >
          Comunidad <span className="text-cian">sudamericana</span>
          <br />
          de fighting games
        </p>

        <SelectorGolpe />
      </div>
    </section>
  )
}
