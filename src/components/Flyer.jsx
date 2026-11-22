import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { frenarScroll } from '../lib/scroll'
import { sinMovimiento } from '../lib/movimiento'
import { t } from '../i18n'

// Flyers de GGA. Si hay un archivo en src/assets/flyers/<nombre>.jpg|png|webp se usa ese;
// si no, el link de X que está en gga.js.
const locales = import.meta.glob('../assets/flyers/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' })
export function flyerDe(nombre, remoto) {
  const local = Object.entries(locales).find(([ruta]) => ruta.split('/').pop().split('.')[0] === nombre)?.[1]
  return local ?? remoto ?? null
}

// Imagen del flyer: al tocarla se abre en grande. Si no carga, no se muestra nada.
export default function Flyer({ src, alt, className = '', imgClassName = '' }) {
  const [abierto, setAbierto] = useState(false)
  const [falla, setFalla] = useState(false)

  useEffect(() => {
    if (!abierto) return
    frenarScroll(true)
    const tecla = (e) => e.key === 'Escape' && setAbierto(false)
    addEventListener('keydown', tecla)
    return () => {
      frenarScroll(false)
      removeEventListener('keydown', tecla)
    }
  }, [abierto])

  if (!src || falla) return null
  return (
    <>
      <button
        type="button"
        data-sin-golpe
        onClick={() => setAbierto(true)}
        className={`group relative block w-full overflow-hidden rounded-[16px] border border-white/10 bg-carbon text-left ${className}`}
        aria-label={`${t('Ver en grande')}: ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFalla(true)}
          className={`block w-full transition duration-500 group-hover:scale-[1.02] ${imgClassName}`}
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-noche/85 px-3 py-1.5 text-[12px] font-semibold text-white backdrop-blur transition group-hover:bg-cian group-hover:text-noche">
          {t('Ver en grande')}
        </span>
      </button>

      <AnimatePresence>
        {abierto && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            data-sin-golpe
            className="fixed inset-0 z-[85] flex items-center justify-center bg-noche/92 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: sinMovimiento ? 0 : 0.2 }}
            onClick={() => setAbierto(false)}
          >
            <motion.img
              src={src}
              alt={alt}
              className="max-h-full max-w-full rounded-[12px] object-contain shadow-[0_30px_80px_rgba(0,0,0,.6)]"
              initial={sinMovimiento ? false : { scale: 0.94 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute right-4 top-4 flex gap-2">
              <a href={src} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="boton boton-borde !min-h-[40px] !px-4 !text-[14px]">
                {t('Abrir original')}
              </a>
              <button onClick={() => setAbierto(false)} className="boton boton-cian !min-h-[40px] !px-4 !text-[14px]" autoFocus>
                {t('Cerrar')} ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
