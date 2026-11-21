// Portada 3D estilo Igloo: el logo de GGA arranca desarmado en líneas y se arma a sólido con el scroll.
// Alrededor: constelación de líneas, grilla en perspectiva y figuras de alambre que se corren con el mouse.
// Escucha el evento "gga:golpe" (lo manda GolpesCanvas) para que las piezas salten con cada clic.
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import svgLogo from '../assets/logo3d/gga-logo.svg?raw'
import { sinMovimiento } from './movimiento'

const suave = (x) => x * x * (3 - 2 * x)
const tramo = (v, a, b) => THREE.MathUtils.clamp((v - a) / (b - a), 0, 1)
const CIAN = 0x02befe

export function crearEscena({ caja, portada, alAvanzar }) {
  const esCelu = matchMedia('(max-width: 700px)').matches

  let renderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  } catch {
    return null // sin WebGL: la portada muestra el logo plano
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%'
  caja.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0x07090d, 14, 34)
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
  camera.position.set(0, 0, 12)

  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture
  const luzClave = new THREE.DirectionalLight(0xffffff, 2.2)
  luzClave.position.set(4, 6, 8)
  const luzCian = new THREE.PointLight(CIAN, 60, 30)
  luzCian.position.set(-5, -1, 4)
  const luzAtras = new THREE.PointLight(0x2f6fff, 40, 30)
  luzAtras.position.set(3, 3, -4)
  scene.add(luzClave, luzCian, luzAtras)

  const mat = {
    contorno: new THREE.MeshPhysicalMaterial({ color: 0x0b1016, metalness: 0.55, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.12, transparent: true }),
    celeste: new THREE.MeshPhysicalMaterial({ color: 0x08bef9, metalness: 0.05, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.08, emissive: 0x024a6b, emissiveIntensity: 0.45, transparent: true }),
    blanco: new THREE.MeshPhysicalMaterial({ color: 0xf4f8fb, metalness: 0, roughness: 0.25, clearcoat: 0.9, transparent: true }),
  }
  const matLinea = new THREE.LineBasicMaterial({ color: CIAN, transparent: true })

  // ---------------------------------------------------------------- logo en piezas
  const logo = new THREE.Group()
  const logoInterno = new THREE.Group()
  logo.add(logoInterno)
  scene.add(logo)
  const capas = { contorno: { z: 0, depth: 14 }, celeste: { z: 14, depth: 5 }, blanco: { z: 14, depth: 3.5 } }
  const piezas = []
  for (const path of new SVGLoader().parse(svgLogo).paths) {
    const id = path.userData.node.id
    const c = capas[id]
    if (!c) continue
    for (const forma of SVGLoader.createShapes(path)) {
      const geo = new THREE.ExtrudeGeometry(forma, { depth: c.depth, bevelEnabled: true, bevelThickness: 1.4, bevelSize: 0.7, bevelSegments: 3, curveSegments: 8 })
      geo.translate(0, 0, c.z)
      geo.computeBoundingBox()
      const centro = geo.boundingBox.getCenter(new THREE.Vector3())
      const tam = geo.boundingBox.getSize(new THREE.Vector3()).length()
      if (tam < 6) continue
      geo.translate(-centro.x, -centro.y, -centro.z)
      const pieza = new THREE.Group()
      const bordes = new THREE.EdgesGeometry(geo, 28)
      const lin = new THREE.LineSegments(bordes, matLinea)
      pieza.add(new THREE.Mesh(geo, mat[id]), lin)
      const ang = Math.random() * Math.PI * 2
      const r = 120 + Math.random() * 160
      pieza.userData = {
        casa: centro.clone(),
        lejos: new THREE.Vector3(Math.cos(ang) * r, Math.sin(ang) * r * 0.7, (Math.random() - 0.62) * 420),
        giro: new THREE.Euler((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2),
        demora: Math.random() * 0.25,
        tam,
        empuje: new THREE.Vector3(),
        velEmpuje: new THREE.Vector3(),
        lin,
        total: bordes.attributes.position.count,
      }
      pieza.position.copy(centro)
      logoInterno.add(pieza)
      piezas.push(pieza)
    }
  }
  const cajaLogo = new THREE.Box3().setFromObject(logoInterno)
  logoInterno.position.copy(cajaLogo.getCenter(new THREE.Vector3()).negate())
  const anchoLogo = cajaLogo.max.x - cajaLogo.min.x
  const altoLogo = cajaLogo.max.y - cajaLogo.min.y

  // ---------------------------------------------------------------- constelación + grilla
  const fondo3d = new THREE.Group()
  scene.add(fondo3d)
  const nPuntos = esCelu ? 46 : 90
  const puntos = Array.from({ length: nPuntos }, () => new THREE.Vector3((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 12, -14 + Math.random() * 12))
  {
    const pos = []
    for (let i = 0; i < nPuntos; i++)
      for (let j = i + 1; j < nPuntos; j++) if (puntos[i].distanceTo(puntos[j]) < 3.1) pos.push(...puntos[i].toArray(), ...puntos[j].toArray())
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    fondo3d.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0x3a8fd0, transparent: true, opacity: 0.22 })))
    fondo3d.add(new THREE.Points(new THREE.BufferGeometry().setFromPoints(puntos), new THREE.PointsMaterial({ color: CIAN, size: 0.07, transparent: true, opacity: 0.9 })))
  }
  const grilla = new THREE.GridHelper(60, 60, 0x1d6fa8, 0x123a5c)
  grilla.material.transparent = true
  grilla.position.y = -3.4
  scene.add(grilla)

  const alambres = []
  const formas = [new THREE.IcosahedronGeometry(0.55, 0), new THREE.OctahedronGeometry(0.5, 0), new THREE.BoxGeometry(0.7, 0.7, 0.7), new THREE.TetrahedronGeometry(0.55, 0), new THREE.TorusGeometry(0.42, 0.12, 6, 12)]
  const nAlambres = esCelu ? 7 : 12
  for (let i = 0; i < nAlambres; i++) {
    const o = new THREE.LineSegments(new THREE.EdgesGeometry(formas[i % formas.length]), new THREE.LineBasicMaterial({ color: i % 3 ? CIAN : 0xffffff, transparent: true, opacity: 0.75 }))
    const ang = (i / nAlambres) * Math.PI * 2 + Math.random() * 0.3
    const r = 0.78 + Math.random() * 0.2
    o.userData = { casa: new THREE.Vector3(Math.cos(ang) * r, Math.sin(ang) * r, -3 + Math.random() * 3.5), vel: new THREE.Vector3(), giro: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, 0).multiplyScalar(0.8), fase: Math.random() * 9 }
    o.scale.setScalar((0.7 + Math.random() * 0.6) * (esCelu ? 0.75 : 1))
    scene.add(o)
    alambres.push(o)
  }

  // ---------------------------------------------------------------- medidas
  let ancho = 1
  let alto = 1
  let mitadAlto = 0
  let mitadAncho = 0
  let escala = 1
  function medir() {
    ancho = caja.clientWidth || innerWidth
    alto = caja.clientHeight || innerHeight
    camera.aspect = ancho / alto
    camera.updateProjectionMatrix()
    renderer.setSize(ancho, alto, false)
    mitadAlto = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 10
    mitadAncho = mitadAlto * camera.aspect
    escala = Math.min(4.4 / anchoLogo, (mitadAncho * 2 * 0.74) / anchoLogo, (mitadAlto * 2 * 0.46) / altoLogo)
    logo.scale.set(escala, -escala, escala)
    for (const o of alambres) {
      const c = o.userData.casa
      o.userData.destino = new THREE.Vector3(c.x * mitadAncho * 0.95, c.y * mitadAlto * 0.82, c.z)
      if (!o.userData.ok) {
        o.position.copy(o.userData.destino)
        o.userData.ok = true
      }
    }
  }

  // ---------------------------------------------------------------- scroll y mouse
  let avance = sinMovimiento ? 1 : 0
  let avanceSuave = avance
  function leerScroll() {
    if (sinMovimiento) return
    const r = portada.getBoundingClientRect()
    const total = r.height - innerHeight
    avance = THREE.MathUtils.clamp(-r.top / total, 0, 1)
  }
  const puntero = new THREE.Vector2()
  const punteroMundo = new THREE.Vector3(99, 99, 0)
  const ray = new THREE.Raycaster()
  const plano = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
  function aMundo(x, y, destino) {
    const r = caja.getBoundingClientRect()
    puntero.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1)
    ray.setFromCamera(puntero, camera)
    ray.ray.intersectPlane(plano, destino)
  }
  const alMover = (e) => aMundo(e.clientX, e.clientY, punteroMundo)
  const alSalir = () => punteroMundo.set(99, 99, 0)

  let pausaGolpe = 0
  let sacudida = 0
  let visible = true
  const alGolpe = (e) => {
    if (sinMovimiento || !visible) return
    const { x, y } = e.detail
    const r = caja.getBoundingClientRect()
    if (y < r.top || y > r.bottom) return
    pausaGolpe = 0.07
    const c = new THREE.Vector3()
    aMundo(x, y, c)
    const local = logoInterno.worldToLocal(c.clone())
    for (const p of piezas) {
      const d = p.position.clone().sub(local)
      d.z = 0
      const dist = Math.max(d.length() * escala, 0.25)
      const fuerza = (420 * Math.exp(-dist * 0.9)) / (1 + p.userData.tam / 70)
      d.normalize()
      p.userData.velEmpuje.addScaledVector(d, fuerza)
      p.userData.velEmpuje.z += (Math.random() - 0.75) * fuerza * 0.6
    }
    for (const o of alambres) {
      const d = o.position.clone().sub(c)
      const fuerza = 14 * Math.exp(-Math.max(d.length(), 0.3) * 0.45)
      d.normalize()
      o.userData.vel.addScaledVector(d, fuerza)
      o.userData.giro.x += (Math.random() - 0.5) * fuerza
      o.userData.giro.y += (Math.random() - 0.5) * fuerza
    }
    sacudida = c.length() < 2.6 ? 0.2 : 0.07
  }

  addEventListener('scroll', leerScroll, { passive: true })
  addEventListener('pointermove', alMover, { passive: true })
  document.addEventListener('pointerleave', alSalir)
  addEventListener('gga:golpe', alGolpe)
  const obsTam = new ResizeObserver(() => {
    medir()
    leerScroll()
  })
  obsTam.observe(caja)
  const obsVista = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  obsVista.observe(portada)

  // ---------------------------------------------------------------- loop
  const reloj = new THREE.Clock()
  const tmp = new THREE.Vector3()
  let tiempo = 0
  let intro = sinMovimiento ? 1 : 0
  let pctAnterior = -1
  let raf = 0
  function animar() {
    raf = requestAnimationFrame(animar)
    const dtReal = Math.min(reloj.getDelta(), 0.05)
    if (!visible) return
    let dt = dtReal
    if (pausaGolpe > 0) {
      pausaGolpe -= dtReal
      dt = 0
    }
    tiempo += dt
    intro = Math.min(1, intro + dt / 1.6)
    avanceSuave += (avance - avanceSuave) * Math.min(1, dtReal * 6)
    const A = avanceSuave

    for (const p of piezas) {
      const u = p.userData
      const f = 1 - suave(tramo(A, u.demora * 0.6, 0.62 + u.demora * 0.6))
      u.velEmpuje.addScaledVector(u.empuje, -60 * dt)
      u.velEmpuje.multiplyScalar(Math.exp(-7 * dt))
      u.empuje.addScaledVector(u.velEmpuje, dt)
      const flota = Math.sin(tiempo * 0.8 + u.demora * 20) * 10 * f
      p.position.set(u.casa.x + u.lejos.x * f + u.empuje.x, u.casa.y + u.lejos.y * f + flota + u.empuje.y, u.casa.z + u.lejos.z * f + u.empuje.z)
      p.rotation.set(u.giro.x * f + u.empuje.y * 0.004, u.giro.y * f + u.empuje.x * 0.004, u.giro.z * f)
      u.lin.geometry.setDrawRange(0, Math.floor(u.total * intro))
    }
    const solido = tramo(A, 0.5, 0.85)
    for (const m of Object.values(mat)) {
      m.opacity = solido
      m.depthWrite = solido > 0.6
    }
    matLinea.opacity = 1 - tramo(A, 0.7, 0.95) * 0.92

    camera.position.z = 12 - suave(A) * 2
    camera.position.y = 0.6 - A * 0.6
    camera.lookAt(0, 0, 0)
    const objY = (sinMovimiento ? 0 : puntero.x * 0.38) + (1 - suave(A)) * -0.7
    const objX = (sinMovimiento ? 0 : -puntero.y * 0.22) + (1 - suave(A)) * 0.25
    logo.rotation.y += (objY - logo.rotation.y) * 0.06
    logo.rotation.x += (objX - logo.rotation.x) * 0.06
    // al final sube ~30 px para dejar lugar a la frase de abajo sin tocar el título de arriba
    logo.position.y = suave(tramo(A, 0.7, 1)) * (30 / alto) * 2 * mitadAlto + (sinMovimiento ? 0 : Math.sin(tiempo * 1.2) * 0.06)
    if (sacudida > 0.001) {
      logo.position.x = (Math.random() - 0.5) * sacudida
      logo.position.y += (Math.random() - 0.5) * sacudida
      sacudida *= 0.86
    } else logo.position.x = 0

    fondo3d.rotation.y = tiempo * 0.025 + puntero.x * 0.05
    fondo3d.rotation.x = puntero.y * 0.03
    grilla.position.z = (tiempo * 0.6) % 1
    grilla.material.opacity = 0.5 * (1 - A * 0.5)

    if (dt > 0) {
      for (const o of alambres) {
        const u = o.userData
        tmp.copy(u.destino)
        tmp.y += Math.sin(tiempo * 0.9 + u.fase) * 0.18
        u.vel.addScaledVector(tmp.sub(o.position), 5 * dt)
        const dx = o.position.x - punteroMundo.x
        const dy = o.position.y - punteroMundo.y
        const d = Math.hypot(dx, dy)
        if (d < 1.6 && !sinMovimiento) {
          const f = ((1.6 - d) / 1.6) * 24 * dt
          u.vel.x += (dx / (d || 1)) * f
          u.vel.y += (dy / (d || 1)) * f
        }
        u.vel.multiplyScalar(Math.exp(-2.6 * dt))
        o.position.addScaledVector(u.vel, dt)
        o.rotation.x += u.giro.x * dt
        o.rotation.y += u.giro.y * dt
        u.giro.multiplyScalar(Math.exp(-1 * dt))
        if (u.giro.length() < 0.3) u.giro.addScalar(0.02)
      }
    }

    const pct = Math.round(suave(tramo(A, 0, 0.9)) * 100)
    if (pct !== pctAnterior) {
      pctAnterior = pct
      alAvanzar?.(pct, A)
    }
    renderer.render(scene, camera)
  }

  medir()
  leerScroll()
  animar()

  return () => {
    cancelAnimationFrame(raf)
    removeEventListener('scroll', leerScroll)
    removeEventListener('pointermove', alMover)
    document.removeEventListener('pointerleave', alSalir)
    removeEventListener('gga:golpe', alGolpe)
    obsTam.disconnect()
    obsVista.disconnect()
    renderer.dispose()
    pmrem.dispose()
    renderer.domElement.remove()
  }
}
