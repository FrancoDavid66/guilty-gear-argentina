import { discord, galeria } from '../data/gga'
import Aparece from './Aparece'
import Flyer from './Flyer'
import { Marca } from './Iconos'
import { t } from '../i18n'

// Fotos de la comunidad: todo lo que esté en src/assets/comunidad/ (ordenado por nombre)
const archivos = import.meta.glob('../assets/comunidad/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' })
const fotos = Object.entries(archivos)
  .map(([ruta, url]) => ({ nombre: ruta.split('/').pop(), url }))
  .sort((a, b) => a.nombre.localeCompare(b.nombre))

// Galería "La comunidad". Sin fotos todavía, muestra el pedido para mandarlas.
export default function Galeria() {
  return (
    <section id="galeria" className="border-t border-white/10 bg-carbon px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="titulo-galeria">
      <div className="mx-auto max-w-[1240px]">
        <p className="etiqueta">{t('Fotos')}</p>
        <h2 id="titulo-galeria" className="titulo">
          {t('La')} <span className="text-cian">{t('comunidad')}</span>
        </h2>

        {fotos.length > 0 ? (
          <div className="mt-10 columns-2 gap-3 sm:gap-4 lg:columns-3">
            {fotos.map((f, i) => (
              <Aparece key={f.nombre} delay={(i % 6) * 0.04} className="mb-3 break-inside-avoid sm:mb-4">
                <Flyer src={f.url} alt={galeria.epigrafes[f.nombre] ?? t('Foto de la comunidad de GGA')} />
                {galeria.epigrafes[f.nombre] && <p className="mt-2 text-[14px] text-white/60">{galeria.epigrafes[f.nombre]}</p>}
              </Aparece>
            ))}
          </div>
        ) : (
          <Aparece className="mt-10 grid gap-3 sm:grid-cols-[1.2fr_1fr] sm:gap-4">
            <div className="grid grid-cols-3 gap-3" aria-hidden="true">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="lineas aspect-square rounded-[14px] border border-dashed border-white/15 bg-noche/60" />
              ))}
            </div>
            <div className="tarjeta flex flex-col justify-between gap-6 !bg-noche">
              <div>
                <b className="font-titulo text-[34px] font-black uppercase leading-none">{t('Pronto, fotos de los presenciales')}</b>
                <p className="mt-3 text-[16px] text-white/65">{t('¿Fuiste a un evento de GGA o tenés fotos jugando con la comunidad? Mandalas por el Discord y las sumamos acá.')}</p>
              </div>
              <a href={discord.link} target="_blank" rel="noreferrer" className="boton boton-cian self-start">
                <Marca red="discord" className="h-4 w-4" /> {t('Mandar fotos')}
              </a>
            </div>
          </Aparece>
        )}
      </div>
    </section>
  )
}
