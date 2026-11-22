import { useEffect, useRef, useState } from 'react'
import { discord, hero } from '../data/gga'
import { logoUrl } from '../lib/logo'
import { irA } from '../lib/scroll'
import { Resaltar } from '../lib/texto'
import Aparece from './Aparece'
import { Marca } from './Iconos'
import { t } from '../i18n'

// Portada: lo primero que se ve es el logo del team (en 3D, moviéndose de a poco) y la presentación.
// El logo no reacciona al mouse ni a los clics.
export default function Hero3D() {
  const caja = useRef(null)
  const [cargado, setCargado] = useState(false)
  const [sinWebGL, setSinWebGL] = useState(false)

  useEffect(() => {
    // three.js (el 3D) se baja aparte: así la página aparece rápido, sobre todo en el celu
    let cerrar = null
    let vivo = true
    import('../lib/escena3d')
      .then(({ crearEscena }) => {
        if (!vivo) return
        cerrar = crearEscena({ caja: caja.current })
        if (!cerrar) setSinWebGL(true)
        setCargado(true)
      })
      .catch(() => {
        setSinWebGL(true)
        setCargado(true)
      })
    return () => {
      vivo = false
      cerrar?.()
    }
  }, [])

  return (
    <section id="inicio" className="relative overflow-hidden bg-noche pt-[96px]" aria-labelledby="titulo-portada">
      <div aria-hidden="true" className="halo absolute inset-0 bg-[radial-gradient(60%_55%_at_30%_45%,rgba(25,78,129,.45),transparent_70%)]" />
      <div aria-hidden="true" className="lineas absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid min-h-[calc(100svh-96px)] max-w-[1240px] items-center gap-4 px-5 pb-14 pt-4 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:pb-20">
        {/* el logo del team, primero */}
        <div ref={caja} className="relative mx-auto aspect-[10/9] w-full max-w-[min(100%,46svh)] lg:max-w-[560px]">
          {logoUrl && (sinWebGL || !cargado) && (
            <img src={logoUrl} alt="" fetchpriority="high" className="absolute inset-0 m-auto h-[86%] w-[86%] object-contain" />
          )}
        </div>

        <Aparece className="text-center lg:text-left">
          <p className="etiqueta">{hero.bajada}</p>
          <h1 id="titulo-portada" className="font-titulo text-[clamp(44px,9vw,92px)] font-black uppercase leading-[0.88]">
            {hero.titulo[0]} <span className="text-cian">{hero.titulo.slice(1).join(' ')}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[40ch] text-[17px] leading-relaxed text-white/80 sm:text-[19px] lg:mx-0">
            <Resaltar texto={hero.texto} />
          </p>
          <p className="mx-auto mt-3 max-w-[40ch] text-[17px] leading-relaxed text-white/80 sm:text-[19px] lg:mx-0">
            <Resaltar texto={hero.objetivo} />
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
            <a href={discord.link} target="_blank" rel="noreferrer" className="boton boton-cian">
              <Marca red="discord" className="h-4 w-4" /> {t('Unite al Discord')}
            </a>
            <button onClick={() => irA('escuelita')} className="boton boton-borde">
              {t('Jugá y aprendé')} ↓
            </button>
          </div>
        </Aparece>
      </div>
    </section>
  )
}
