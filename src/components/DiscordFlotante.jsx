import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { discord } from '../data/gga'
import { Marca } from './Iconos'
import { t } from '../i18n'

// Botón fijo de Discord: aparece después de la portada
export default function DiscordFlotante() {
  const { scrollY } = useScroll()
  const [ver, setVer] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => {
    const fin = document.documentElement.scrollHeight - window.innerHeight - 160
    // aparece cuando termina la portada 3D
    const portada = document.getElementById('inicio')
    const desde = portada ? portada.offsetHeight - window.innerHeight * 0.4 : window.innerHeight * 0.9
    setVer(y > desde && y < fin)
  })
  return (
    <AnimatePresence>
      {ver && (
        <motion.a
          href={discord.link}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.8 }}
          className="fixed bottom-4 right-4 z-40 flex h-14 items-center gap-2 rounded-full bg-cian px-4 font-titulo text-[18px] font-black uppercase text-noche shadow-[0_10px_30px_rgba(2,190,254,.35)] sm:bottom-6 sm:right-6"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
          aria-label={t('Unite al Discord')}
        >
          <Marca red="discord" className="h-6 w-6" />
          <span>{t('Unite')}</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
