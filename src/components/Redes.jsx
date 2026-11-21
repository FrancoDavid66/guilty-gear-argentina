import { redes } from '../data/gga'
import Titulo from './Titulo'
import Aparece from './Aparece'
import Logo from './Logo'
import { Marca, Flecha } from './Iconos'

export default function Redes() {
  const p = redes.principal
  return (
    <section id="redes" className="relative overflow-hidden bg-blanco pb-24 pt-24 text-noche lg:pb-32 lg:pt-28">
      <div className="pointer-events-none absolute inset-0 lineas-oscuras opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <p className="bajada flex items-center gap-2 text-azul">
          <Marca red="x" className="h-3.5 w-3.5" /> {redes.bajada}
        </p>
        <Titulo lineas={redes.titulo} className="mt-3" />
        <div className="raya bg-cian" />
        <Aparece>
          <p className="mt-6 max-w-[34rem] text-[17px] font-medium text-noche/80">{redes.texto}</p>
        </Aparece>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.25fr_1fr_1fr] lg:gap-5">
          {/* Cuenta oficial */}
          <Aparece>
            <a href={p.link} target="_blank" rel="noreferrer" className="tarjeta-corte group relative flex h-full flex-col overflow-hidden bg-noche p-6 text-white sm:p-8">
              <div className="pointer-events-none absolute inset-0 lineas" aria-hidden="true" />
              <div className="relative flex items-center gap-4">
                <Logo className="h-20 w-20 shrink-0 transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-105" alt="" />
                <div className="min-w-0">
                  <span className="chip bg-cian text-noche">{p.rol}</span>
                  <p className="mt-2 font-titulo text-[30px] font-black uppercase leading-[0.95]">{p.nombre}</p>
                  <p className="font-mono text-[14px] text-cian">{p.usuario}</p>
                </div>
              </div>
              <div className="relative mt-6 flex gap-6 border-t border-white/10 pt-5">
                <p>
                  <span className="block font-titulo text-[38px] font-black leading-none text-cian">{p.numero}</span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-white/55">seguidores</span>
                </p>
                <p>
                  <span className="block font-titulo text-[38px] font-black leading-none">{p.desde}</span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-white/55">en X desde</span>
                </p>
              </div>
              <span className="boton boton-cian brillo relative mt-8">
                <Marca red="x" className="h-4 w-4" /> Seguir a GGA <Flecha />
              </span>
            </a>
          </Aparece>

          {/* Organizadores, como selección de personaje */}
          {redes.organizadores.map((o, i) => (
            <Aparece key={o.link} delay={0.08 * (i + 1)}>
              <a
                href={o.link}
                target="_blank"
                rel="noreferrer"
                className="tarjeta-corte group relative flex h-full flex-col overflow-hidden bg-white p-6 ring-1 ring-inset ring-noche/10 transition hover:ring-cian sm:p-8"
              >
                <span className="contorno pointer-events-none absolute -right-2 -top-4 font-titulo text-[130px] font-black leading-none [--trazo:rgba(7,9,13,.1)] group-hover:[--trazo:#02BEFE]" aria-hidden="true">
                  {o.lado}
                </span>
                <span className={`chip relative w-fit ${i === 0 ? 'bg-cian text-noche' : 'bg-azul text-white'}`}>{o.lado} · Organizador</span>
                <p className="relative mt-6 font-titulo text-[42px] font-black uppercase leading-[0.9]">{o.nombre}</p>
                <p className="relative mt-1 font-mono text-[14px] text-azul">{o.usuario}</p>
                <p className="relative mt-3 flex-1 text-[16px] text-noche/70">{o.rol}</p>
                <span className="boton boton-negro relative mt-6">
                  <Marca red="x" className="h-4 w-4" /> Seguir <Flecha />
                </span>
              </a>
            </Aparece>
          ))}
        </div>

        {/* Más redes de GGA */}
        <p className="bajada mt-12 text-azul">Más redes de GGA</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {redes.otras.map((r, i) => (
            <Aparece key={r.link} delay={i * 0.06}>
              <a
                href={r.link}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-[88px] items-center gap-4 bg-noche px-5 py-4 text-white transition hover:bg-cian hover:text-noche"
                style={{ borderRadius: 12 }}
              >
                <Marca red={r.red} className="h-8 w-8 shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block font-titulo text-[22px] font-black uppercase leading-none">{r.nombre}</span>
                  <span className="mt-1 block truncate font-mono text-[13px] opacity-60">{r.usuario}</span>
                </span>
                <span className="text-right">
                  <span className="block font-titulo text-[30px] font-black leading-none text-cian group-hover:text-noche">{r.numero}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] opacity-60">{r.que}</span>
                </span>
              </a>
            </Aparece>
          ))}
        </div>
      </div>
    </section>
  )
}
