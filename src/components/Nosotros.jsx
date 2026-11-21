import { discord, escuelita, hero, juegos, nosotros, redes } from '../data/gga'
import { useDiscord } from '../lib/discord'
import { Resaltar } from '../lib/texto'
import { irA } from '../lib/scroll'
import Aparece from './Aparece'
import { Marca, Flecha } from './Iconos'

const fmt = (n) => n.toLocaleString('es-AR')

// Página "Nosotros": quiénes somos, qué hacemos, historia y organizadores
export default function Nosotros() {
  const vivo = useDiscord(discord.codigo)
  const miembros = vivo?.miembros ?? discord.miembrosRespaldo
  const clases = escuelita.series.reduce((t, s) => t + s.clases.length, 0)
  const x = redes.principal
  const numeros = [
    { n: fmt(miembros), t: 'personas en el Discord', destacado: true },
    { n: x.numero, t: `seguidores en X, desde ${x.desde}` },
    { n: clases, t: 'clases gratis en La Escuelita' },
    { n: juegos.lista.length, t: 'Guilty Gear que jugamos' },
    ...redes.otras.filter((r) => r.red !== 'instagram').map((r) => ({ n: r.numero, t: `${r.que} en ${r.nombre}` })),
  ]

  return (
    <>
      {/* Quiénes somos */}
      <section className="bg-noche px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="quienes">
        <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-12">
          <Aparece className="lg:col-span-6">
            <p className="etiqueta">Quiénes somos</p>
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
          <p className="etiqueta">Qué hacemos</p>
          <h2 id="hacemos" className="titulo">
            Hacemos crecer <span className="text-cian">la comunidad</span>
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
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

      {/* Historia */}
      <section id="historia" className="bg-noche px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="titulo-historia">
        <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="etiqueta">Historia</p>
            <h2 id="titulo-historia" className="titulo">
              Desde <span className="text-cian">2020</span>
            </h2>
            <p className="mt-4 text-white/60">Los hitos que se pueden ver en nuestro X y en el canal de YouTube.</p>
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

      {/* Organizadores */}
      <section className="border-t border-white/10 bg-carbon px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="equipo">
        <div className="mx-auto max-w-[1240px]">
          <p className="etiqueta">El equipo</p>
          <h2 id="equipo" className="titulo">
            Quiénes <span className="text-cian">organizan</span>
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {redes.organizadores.map((o) => (
              <a key={o.nombre} href={o.link} target="_blank" rel="noreferrer" className="tarjeta group flex items-center gap-5 bg-noche transition hover:border-cian">
                <span aria-hidden="true" className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-azul font-titulo text-[34px] font-black">
                  {o.nombre
                    .split(' ')
                    .map((p) => p[0])
                    .join('')}
                </span>
                <span className="min-w-0">
                  <span className="block font-titulo text-[34px] font-black uppercase leading-none">{o.nombre}</span>
                  <span className="mt-1 block text-[15px] text-white/60">
                    {o.rol} · {o.usuario}
                  </span>
                </span>
                <span className="ml-auto text-cian transition group-hover:translate-x-1">
                  <Flecha />
                </span>
              </a>
            ))}
          </div>
          <div className="tarjeta mt-4 flex flex-col items-start justify-between gap-4 border-cian/40 bg-[linear-gradient(120deg,#0f2238,#0b111a)] sm:flex-row sm:items-center">
            <p className="text-[17px]">
              ¿Querés jugar, aprender o dar una mano con los eventos? <b className="text-cian">Todo arranca en el Discord.</b>
            </p>
            <div className="flex flex-wrap gap-2">
              <a href={discord.link} target="_blank" rel="noreferrer" className="boton boton-cian">
                <Marca red="discord" className="h-4 w-4" /> Unite al Discord
              </a>
              <button onClick={() => irA('reglas')} className="boton boton-borde">
                Ver las reglas
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
