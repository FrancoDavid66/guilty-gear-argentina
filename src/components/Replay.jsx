import { vods } from '../data/gga'
import Titulo from './Titulo'
import Aparece from './Aparece'
import Logo from './Logo'
import { Marca, Rebobinar, Flecha, Play } from './Iconos'

function Barra({ avance = '38%' }) {
  return (
    <div className="mt-6 flex items-center gap-3 font-mono text-[12px] text-white/50">
      <span className="relative h-1.5 flex-1 bg-white/15">
        <span className="absolute inset-y-0 left-0 bg-[#FF0033] transition-all duration-700 group-hover:!w-full" style={{ width: avance }} />
        <span
          className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white transition-all duration-700 group-hover:!left-[calc(100%-7px)]"
          style={{ left: `calc(${avance} - 7px)` }}
        />
      </span>
      <span>∞</span>
    </div>
  )
}

function Momento({ m, oculto }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${m.id}`}
      target="_blank"
      rel="noreferrer"
      tabIndex={oculto ? -1 : undefined}
      className="group relative block aspect-video w-[250px] shrink-0 overflow-hidden bg-noche ring-1 ring-white/10 sm:w-[320px]"
      style={{ borderRadius: 12 }}
    >
      <div className="absolute inset-0 lineas" />
      <div className="absolute inset-0 bg-gradient-to-br from-azul/70 to-transparent" />
      <img
        src={`https://i.ytimg.com/vi/${m.id}/mqdefault.jpg`}
        alt=""
        loading="lazy"
        onError={(e) => (e.currentTarget.style.display = 'none')}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/30 to-transparent" />
      <span className="chip absolute left-2 top-2 bg-cian !text-[11px] text-noche">{m.tag}</span>
      <span className="absolute bottom-2.5 left-3 right-10 font-titulo text-[19px] font-black uppercase leading-[1.02] text-white">{m.titulo}</span>
      <Play className="absolute bottom-3 right-3 h-6 w-6 text-white/80 transition group-hover:text-cian" />
    </a>
  )
}

// Tiras de videos del canal de GGA que corren en sentidos opuestos
function Momentos() {
  const mitad = Math.ceil(vods.momentos.length / 2)
  const filas = [vods.momentos.slice(0, mitad), vods.momentos.slice(mitad)]
  return (
    <div className="relative mt-20">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-end justify-between gap-4 px-5 sm:px-8">
        <div>
          <p className="bajada text-cian">Momentos de GGA</p>
          <h3 className="mt-1 font-titulo text-[clamp(2rem,8vw,3rem)] font-black uppercase leading-none">Así se vive la comunidad</h3>
        </div>
        <a href={vods.principal.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-titulo text-[18px] font-extrabold uppercase text-white hover:text-cian">
          <Marca red="youtube" className="h-5 w-5 text-[#FF0033]" /> Ver todos los videos <Flecha className="h-4 w-4" />
        </a>
      </div>
      {filas.map((fila, i) => (
        <div key={i} className="momentos sin-barra mt-4 overflow-hidden">
          <div className={`flex w-max gap-3 px-3 ${i ? 'pista-reves' : 'pista'}`}>
            {[...fila, ...fila].map((m, j) => (
              <div key={m.id + j} aria-hidden={j >= fila.length ? 'true' : undefined}>
                <Momento m={m} oculto={j >= fila.length} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Replay() {
  const p = vods.principal
  return (
    <section id="replay" className="relative overflow-hidden bg-azul pb-24 pt-24 lg:pb-32 lg:pt-32">
      {/* líneas de video viejo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,.35) 0 1px, transparent 1px 4px)' }}
        aria-hidden="true"
      />
      <Rebobinar className="pointer-events-none absolute -right-10 top-10 h-64 w-64 text-white/[.06] lg:h-96 lg:w-96" />

      <div className="relative mx-auto grid max-w-[1240px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.3fr] lg:items-end lg:gap-16">
        <div>
          <p className="bajada flex items-center gap-2 text-cian">
            <Rebobinar className="h-4 w-4" /> {vods.bajada}
          </p>
          <Titulo lineas={vods.titulo} className="mt-3" />
          <div className="raya bg-cian" />
          <Aparece>
            <p className="mt-6 max-w-[30rem] text-[17px] text-white/85">{vods.texto}</p>
          </Aparece>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Canal oficial de GGA */}
          <Aparece className="sm:col-span-2">
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="tarjeta-corte group relative flex flex-col gap-5 bg-noche p-6 ring-1 ring-inset ring-cian/40 transition hover:bg-black sm:flex-row sm:items-center sm:p-7"
            >
              <Logo className="h-20 w-20 shrink-0" alt="" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between font-mono text-[12px] font-medium uppercase tracking-[0.14em]">
                  <span className="flex items-center gap-1.5 text-cian">
                    <Rebobinar className="h-3.5 w-3.5" /> Replay
                  </span>
                  <span className="bg-cian px-1.5 text-noche">{p.que}</span>
                </div>
                <p className="mt-3 font-titulo text-[clamp(2rem,8vw,2.8rem)] font-black uppercase leading-[0.9]">{p.nombre}</p>
                <p className="mt-1 font-mono text-[14px] text-white/60">{p.usuario}</p>
                <p className="mt-2 text-[15px] text-white/75">{p.detalle}</p>
                <Barra avance="62%" />
              </div>
              <span className="boton boton-cian brillo shrink-0">
                <Marca red="youtube" className="h-5 w-5" /> Ir al canal <Flecha />
              </span>
            </a>
          </Aparece>

          {vods.canales.map((c, i) => (
            <Aparece key={c.link} delay={(i + 1) * 0.08}>
              <a
                href={c.link}
                target="_blank"
                rel="noreferrer"
                className="tarjeta-corte group relative flex h-full flex-col bg-noche/85 p-6 ring-1 ring-inset ring-white/10 transition hover:bg-noche"
              >
                <div className="flex items-center justify-between font-mono text-[12px] font-medium uppercase tracking-[0.14em]">
                  <span className="flex items-center gap-1.5 text-cian">
                    <Rebobinar className="h-3.5 w-3.5" /> Replay
                  </span>
                  <span className="text-white/45">{c.que}</span>
                </div>
                <p className="mt-8 font-titulo text-[44px] font-black uppercase leading-[0.9]">{c.nombre}</p>
                <p className="mt-1 font-mono text-[14px] text-white/60">{c.usuario}</p>
                <Barra />
                <span className="boton boton-blanco mt-6 w-full">
                  <Marca red="youtube" className="h-5 w-5 text-[#FF0033]" /> Ir al canal <Flecha />
                </span>
              </a>
            </Aparece>
          ))}
        </div>
      </div>

      <Momentos />
    </section>
  )
}
