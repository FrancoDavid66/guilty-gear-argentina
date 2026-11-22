import { paginas } from '../data/gga'
import { irA } from '../lib/scroll'
import Aparece from './Aparece'
import { t } from '../i18n'

// Cabecera de cada página interna: migas, título gigante y bajada (estilo Fnatic, grilla de Igloo)
export default function Cabecera({ id }) {
  const p = paginas[id]
  if (!p) return null
  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-noche lineas pb-14 pt-[132px] sm:pb-20 sm:pt-[156px]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(2,190,254,.22),transparent_65%)]" />
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <nav aria-label={t('Estás en')} className="mb-6 flex items-center gap-2 text-[13px] text-white/50">
          <button onClick={() => irA('inicio')} className="inline-flex min-h-[44px] items-center transition hover:text-cian">
            {t('Inicio')}
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-white" aria-current="page">
            {p.titulo}
          </span>
        </nav>
        <Aparece>
          <p className="etiqueta">{p.bajada}</p>
          <h1 className="font-titulo text-[clamp(64px,13vw,168px)] font-black uppercase leading-[0.85] tracking-[-0.01em]">{p.titulo}</h1>
          <p className="mt-5 max-w-[56ch] text-[17px] text-white/70 sm:text-[19px]">{p.texto}</p>
        </Aparece>
      </div>
    </header>
  )
}
