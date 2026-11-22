import { discord, reglasDiscord } from '../data/gga'
import { irA } from '../lib/scroll'
import Aparece from './Aparece'
import { Marca, Flecha } from './Iconos'
import { t } from '../i18n'

// Reglas del Discord: se cargan en gga.js (reglasDiscord.lista). Mientras esté vacía, se muestra el aviso.
export default function ReglasDiscord() {
  const { lista, basicas } = reglasDiscord
  return (
    <section id="reglas" className="border-t border-white/10 bg-noche px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="titulo-reglas">
      <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-12">
        <Aparece className="lg:col-span-4">
          <p className="etiqueta">{t('Convivencia')}</p>
          <h2 id="titulo-reglas" className="titulo">
            {t('Reglas del')} <span className="text-cian">Discord</span>
          </h2>
          <p className="mt-4 text-white/65">{reglasDiscord.texto}</p>
        </Aparece>

        <div className="lg:col-span-8">
          {lista.length > 0 ? (
            <ol className="grid gap-3">
              {lista.map((r, i) => (
                <Aparece as="li" key={r.titulo + i} delay={i * 0.04} className="tarjeta flex gap-5">
                  <span className="font-titulo text-[40px] font-black leading-none text-cian">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <b className="block font-titulo text-[24px] font-black uppercase leading-tight">{r.titulo}</b>
                    {r.texto && <span className="mt-1 block text-white/70">{r.texto}</span>}
                  </span>
                </Aparece>
              ))}
            </ol>
          ) : (
            <Aparece className="tarjeta flex flex-col items-start gap-4 border-cian/40 bg-[linear-gradient(120deg,#0f2238,#0b111a)]">
              <p className="text-[18px]">
                {t('Las reglas completas del server se leen')} <b className="text-cian">{t('adentro del Discord')}</b>. {t('Leelas apenas entres: valen para el chat, los lobbys y los torneos.')}
              </p>
              <a href={discord.link} target="_blank" rel="noreferrer" className="boton boton-cian">
                <Marca red="discord" className="h-4 w-4" /> {t('Entrar y leer las reglas')}
              </a>
            </Aparece>
          )}

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {basicas.map((b) => (
              <a key={b.link} href={b.link} target="_blank" rel="noreferrer" className="tarjeta group transition hover:border-cian">
                <b className="block text-[16px]">{b.titulo}</b>
                <span className="mt-1 block text-[14px] text-white/60">{b.texto}</span>
                <span className="mt-3 inline-flex text-cian transition group-hover:translate-x-1">
                  <Flecha />
                </span>
              </a>
            ))}
            <button onClick={() => irA('eventos')} className="tarjeta group text-left transition hover:border-cian">
              <b className="block text-[16px]">{t('Reglamento de los torneos')}</b>
              <span className="mt-1 block text-[14px] text-white/60">{t('Las reglas de Wake up, Throw! están en Eventos.')}</span>
              <span className="mt-3 inline-flex text-cian transition group-hover:translate-x-1">
                <Flecha />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
