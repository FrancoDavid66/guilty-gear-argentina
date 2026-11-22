import { useEffect } from 'react'
import { iniciarScroll, usePagina, arriba, tomarAncla, irA } from './lib/scroll'
import { paginas, sitio } from './data/gga'
import Header from './components/Header'
import Hero3D from './components/Hero3D'
import Inicio from './components/Inicio'
import Cabecera from './components/Cabecera'
import Nosotros from './components/Nosotros'
import Discord from './components/Discord'
import ReglasDiscord from './components/ReglasDiscord'
import Juegos from './components/Juegos'
import Personajes from './components/Personajes'
import Escuelita from './components/Escuelita'
import Eventos from './components/Eventos'
import Replay from './components/Replay'
import Redes from './components/Redes'
import Footer from './components/Footer'
import DiscordFlotante from './components/DiscordFlotante'
import GolpesCanvas from './components/efectos/GolpesCanvas'
import WallBreak from './components/efectos/WallBreak'
import InstantKill from './components/efectos/InstantKill'
import Transicion from './components/efectos/Transicion'

// Cada página: qué secciones lleva
const CONTENIDO = {
  inicio: () => (
    <>
      <Hero3D />
      <Inicio />
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
      <WallBreak seccion="eventos" />
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

export default function App() {
  const pagina = usePagina()

  useEffect(() => {
    iniciarScroll()
  }, [])

  // al cambiar de página: arriba de todo (o a la sección pedida) y título de la pestaña
  useEffect(() => {
    arriba(true)
    const ancla = tomarAncla()
    if (ancla) setTimeout(() => irA(ancla), 400)
    document.title = pagina === 'inicio' ? `${sitio.nombre} · Comunidad de Guilty Gear en Sudamérica` : `${paginas[pagina].titulo} · ${sitio.nombre}`
  }, [pagina])

  const Contenido = CONTENIDO[pagina]
  return (
    <>
      <Header pagina={pagina} />
      <main key={pagina}>
        {pagina !== 'inicio' && <Cabecera id={pagina} />}
        <Contenido />
      </main>
      <Footer />
      <DiscordFlotante />
      <GolpesCanvas />
      <InstantKill />
      <Transicion />
    </>
  )
}
