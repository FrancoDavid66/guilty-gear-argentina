import { lazy, Suspense, useEffect, useState } from 'react'
import { iniciarScroll, usePagina, arriba, tomarAncla, irA } from './lib/scroll'
import { paginas, sitio } from './data/gga'
import { aplicarIdioma, idiomaInicial, t } from './i18n'
import { aplicarTema, temaInicial } from './lib/tema'
import Header from './components/Header'
import Hero3D from './components/Hero3D'
import Cabecera from './components/Cabecera'
import Footer from './components/Footer'
import DiscordFlotante from './components/DiscordFlotante'
import InstantKill from './components/efectos/InstantKill'
import Transicion from './components/efectos/Transicion'

// Las páginas internas se bajan recién cuando se entra (la primera carga es más liviana en el celu)
const Nosotros = lazy(() => import('./components/Nosotros'))
const Discord = lazy(() => import('./components/Discord'))
const ReglasDiscord = lazy(() => import('./components/ReglasDiscord'))
const Juegos = lazy(() => import('./components/Juegos'))
const Personajes = lazy(() => import('./components/Personajes'))
const Escuelita = lazy(() => import('./components/Escuelita'))
const Eventos = lazy(() => import('./components/Eventos'))
const Replay = lazy(() => import('./components/Replay'))
const Redes = lazy(() => import('./components/Redes'))

// Cada página: qué secciones lleva
const CONTENIDO = {
  inicio: () => (
    <>
      {/* el orden del pedido: logo y presentación, Discord, jugá y aprendé, eventos, replays y redes */}
      <Hero3D />
      <Discord />
      <Escuelita completa={false} />
      <Eventos completa={false} />
      <Replay completa={false} />
      <Redes />
    </>
  ),
  nosotros: () => <Nosotros />,
  juegos: () => (
    <>
      <Juegos />
      <Personajes />
    </>
  ),
  eventos: () => (
    <>
      <Eventos />
      <Replay />
    </>
  ),
  aprende: () => <Escuelita />,
  comunidad: () => (
    <>
      <Discord />
      <ReglasDiscord />
      <Redes />
    </>
  ),
}

// idioma y tema se aplican antes del primer dibujo
const IDIOMA_INICIAL = idiomaInicial()
aplicarIdioma(IDIOMA_INICIAL)
const TEMA_INICIAL = temaInicial()
aplicarTema(TEMA_INICIAL)

export default function App() {
  const pagina = usePagina()
  const [idioma, setIdiomaEstado] = useState(IDIOMA_INICIAL)
  const [tema, setTemaEstado] = useState(TEMA_INICIAL)
  const setIdioma = (id) => {
    aplicarIdioma(id)
    setIdiomaEstado(id)
  }
  const setTema = (x) => {
    aplicarTema(x)
    setTemaEstado(x)
  }

  useEffect(() => {
    iniciarScroll()
  }, [])

  // al cambiar de página: arriba de todo (o a la sección pedida) y título de la pestaña
  useEffect(() => {
    arriba(true)
    const ancla = tomarAncla()
    if (!ancla) return
    // la página puede tardar en bajar: esperar a que aparezca la sección (hasta 3 s)
    let intentos = 0
    const buscar = setInterval(() => {
      intentos++
      if (document.getElementById(ancla) || intentos > 30) {
        clearInterval(buscar)
        setTimeout(() => irA(ancla), 250)
      }
    }, 100)
    return () => clearInterval(buscar)
  }, [pagina])

  // título de la pestaña (cambia con la página y el idioma)
  useEffect(() => {
    document.title = pagina === 'inicio' ? `${sitio.nombre} · ${t('Comunidad de Guilty Gear en Sudamérica')}` : `${paginas[pagina].titulo} · ${sitio.nombre}`
  }, [pagina, idioma])

  const Contenido = CONTENIDO[pagina]
  return (
    <>
      <Header key={`h-${idioma}`} pagina={pagina} tema={tema} setTema={setTema} idioma={idioma} setIdioma={setIdioma} />
      {/* al cambiar de idioma se vuelve a dibujar todo con los textos nuevos */}
      <main key={`${pagina}-${idioma}`}>
        {pagina !== 'inicio' && <Cabecera id={pagina} />}
        <Suspense fallback={<div className="min-h-[100svh] bg-noche" />}>
          <Contenido />
        </Suspense>
      </main>
      <Footer key={`f-${idioma}`} />
      <DiscordFlotante key={`d-${idioma}`} />
      <InstantKill />
      <Transicion />
    </>
  )
}
