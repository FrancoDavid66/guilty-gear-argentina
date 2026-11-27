import { discord, escuelita, hero, juegos, nosotros, redes, team } from '../data/gga'
import { useDiscord } from '../lib/discord'
import { Resaltar } from '../lib/texto'
import { irA } from '../lib/scroll'
import Aparece from './Aparece'
import Team, { BotonX, iniciales } from './Team'
import Galeria from './Galeria'
import Flyer from './Flyer'
import { Marca } from './Iconos'
import { localeActual, t } from '../i18n'

// Obras de la artista de GGA (opcional): src/assets/arte/*.jpg|png|webp, ordenadas por nombre
const obras = Object.entries(import.meta.glob('../assets/arte/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' }))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)

const fmt = (n) => n.toLocaleString(localeActual())

// Página "Nosotros": quiénes somos, qué hacemos, historia y organizadores
export default function Nosotros() {
  const vivo = useDiscord(discord.codigo)
  const miembros = vivo?.miembros ?? discord.miembrosRespaldo
  const clases = escuelita.series.reduce((t, s) => t + s.clases.length, 0)
  const x = redes.principal
  const numeros = [
    { n: fmt(miembros), t: t('personas en el Discord'), destacado: true },
    { n: x.numero, t: t('seguidores en X, desde {anio}', { anio: x.desde }) },
    { n: clases, t: t('clases gratis en La Escuelita') },
    { n: juegos.lista.length, t: t('Guilty Gear que jugamos') },
    ...redes.otras.filter((r) => r.red !== 'instagram').map((r) => ({ n: r.numero, t: t('{que} en {red}', { que: r.que, red: r.nombre }) })),
  ]

  return (
    <>
      {/* Quiénes somos */}
      <section className="bg-noche px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="quienes">
        <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-12">
          <Aparece className="lg:col-span-6">
            <p className="etiqueta">{t('Quiénes somos')}</p>
            <h2 id="quienes" className="font-titulo text-[clamp(36px,5vw,64px)] font-black uppercase leading-[0.95]">
              “{nosotros.bio.replace(/\.$/, '')}”
            </h2>
          </Aparece>
          <Aparece className="space-y-4 text-[18px] text-white/80 lg:col-span-6 lg:pt-10" delay={0.1}>
            <p>
              <Resaltar texto={hero.texto} />
            </p>
            <p>
              <Resaltar texto={hero.objetivo} />
            </p>
          </Aparece>
        </div>

        {/* Números */}
        <div className="mx-auto mt-14 grid max-w-[1240px] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
          {numeros.map((d, i) => (
            <Aparece key={d.t} delay={i * 0.05} className={`tarjeta flex min-h-[150px] flex-col justify-end ${d.destacado ? '!border-cian !bg-cian text-noche' : ''}`}>
              <b className="font-titulo text-[48px] font-black leading-none tabular-nums">{d.n}</b>
              <span className={`mt-1 text-[14px] ${d.destacado ? 'text-noche/70' : 'text-white/55'}`}>{d.t}</span>
            </Aparece>
          ))}
        </div>
      </section>

      {/* Qué hacemos */}
      <section className="border-t border-white/10 bg-carbon px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="hacemos">
        <div className="mx-auto max-w-[1240px]">
          <p className="etiqueta">{t('Qué hacemos')}</p>
          <h2 id="hacemos" className="titulo">
            {t('Hacemos crecer')} <span className="text-cian">{t('la comunidad')}</span>
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {nosotros.pilares.map((p, i) => (
              <Aparece key={p.titulo} delay={i * 0.06} className="tarjeta flex min-h-[240px] flex-col bg-noche">
                <span className="font-mono text-[13px] text-cian">0{i + 1}</span>
                <h3 className="mt-auto font-titulo text-[30px] font-black uppercase leading-none">{p.titulo}</h3>
                <p className="mt-3 text-[15px] text-white/65">{p.texto}</p>
              </Aparece>
            ))}
          </div>
        </div>
      </section>

      <Team />

      {/* Historia */}
      <section id="historia" className="bg-noche px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="titulo-historia">
        <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="etiqueta">{t('Historia')}</p>
            <h2 id="titulo-historia" className="titulo">
              {t('Desde')} <span className="text-cian">{nosotros.historia[0].anio}</span>
            </h2>
            <p className="mt-4 text-white/60">{t('Los hitos que se pueden ver en nuestro X y en el canal de YouTube.')}</p>
          </div>
          <ol className="relative border-l border-white/15 lg:col-span-8">
            {nosotros.historia.map((h, i) => (
              <Aparece as="li" key={h.anio + i} delay={i * 0.05} className="relative pb-9 pl-8 last:pb-0">
                <span aria-hidden="true" className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full border-2 border-cian bg-noche" />
                <span className="font-titulo text-[40px] font-black leading-none text-cian">{h.anio}</span>
                <p className="mt-1 max-w-[60ch] text-[17px] text-white/80">{h.texto}</p>
              </Aparece>
            ))}
          </ol>
        </div>
      </section>

      <Galeria />

      {/* Organizadores */}
      <section className="border-t border-white/10 bg-carbon px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="equipo">
        <div className="mx-auto max-w-[1240px]">
          <p className="etiqueta">{t('El staff')}</p>
          <h2 id="equipo" className="titulo">
            {t('Quiénes')} <span className="text-cian">{t('organizan')}</span>
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {team.staff.map((o, i) => (
              <Aparece
                key={o.nick}
                delay={Math.min(i, 6) * 0.04}
                className={`tarjeta flex items-center gap-4 bg-noche ${i === 0 ? 'border-cian/60 sm:col-span-2 lg:col-span-3' : ''}`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-titulo text-[28px] font-black ${
                    i === 0 ? 'bg-cian text-noche' : 'bg-azul text-white'
                  }`}
                >
                  {iniciales(o.nick)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-titulo text-[28px] font-black uppercase leading-none">{o.nick}</span>
                  <span className="mt-1 block text-[15px] leading-snug text-white/60">{o.rol}</span>
                </span>
                <BotonX usuario={o.x} nombre={o.nick} />
              </Aparece>
            ))}
          </div>

          {/* La artista de GGA (sus obras opcionales: src/assets/arte/) */}
          <Aparece className="tarjeta mt-4 bg-noche">
            <div className="grid items-center gap-5 sm:grid-cols-[auto_1fr_auto]">
              <span aria-hidden="true" className="flex h-20 w-20 items-center justify-center rounded-2xl bg-cian text-noche">
                <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18.4 2.6a2 2 0 0 1 2.9 2.9L11 15.8 8.2 13z" />
                  <path d="M7.5 14.2c-2 0-3.5 1.6-3.5 3.6 0 1.5-.7 2.4-2 3.2 4.3.6 7.8-.6 8.3-3.9z" />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="etiqueta !mb-1 block">{team.artista.rol}</span>
                <span className="block font-titulo text-[clamp(36px,5vw,52px)] font-black uppercase leading-none">{team.artista.nick}</span>
                <span className="mt-2 block max-w-[52ch] text-[16px] text-white/65">{team.artista.texto}</span>
              </span>
              <a href={`https://x.com/${team.artista.x}`} target="_blank" rel="noreferrer" className="boton boton-borde justify-self-start">
                <Marca red="x" className="h-4 w-4" /> {t('Ver su arte')}
              </a>
            </div>
            {obras.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {obras.map((src, i) => (
                  <Flyer key={src} src={src} alt={`${t('Arte de')} ${team.artista.nick} ${i + 1}`} imgClassName="aspect-[4/3] object-cover" />
                ))}
              </div>
            )}
          </Aparece>

          <div className="fijo tarjeta mt-4 flex flex-col items-start justify-between gap-4 border-cian/40 bg-[linear-gradient(120deg,#0f2238,#0b111a)] sm:flex-row sm:items-center">
            <p className="text-[17px]">
              {t('¿Querés jugar, aprender o dar una mano con los eventos?')} <b className="text-cian">{t('Todo arranca en el Discord.')}</b>
            </p>
            <div className="flex flex-wrap gap-2">
              <a href={discord.link} target="_blank" rel="noreferrer" className="boton boton-cian">
                <Marca red="discord" className="h-4 w-4" /> {t('Unite al Discord')}
              </a>
              <button onClick={() => irA('reglas')} className="boton boton-borde">
                {t('Ver las reglas')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
