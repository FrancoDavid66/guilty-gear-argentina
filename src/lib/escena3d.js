// Portada 3D tranquila: el logo de GGA en 3D (sólido) que se mueve de a poco, solo.
// No reacciona al mouse ni a los clics. Sin placa de video, devuelve null y se muestra el logo plano.
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import svgLogo from '../assets/logo3d/gga-logo.svg?raw'
import { sinMovimiento } from './movimiento'

// Colores del logo 3D (cambiar acá): azul oscuro y acabado satinado
const AZUL_LOGO = 0x0b5aa8
const BLANCO_LOGO = 0xdde6ee
const NEGRO_LOGO = 0x0a0f15
const CIAN = 0x02befe

export function crearEscena({ caja }) {
  const esCelu = matchMedia('(max-width: 700px)').matches

  let renderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: !esCelu, alpha: true, powerPreference: 'high-performance' })
  } catch {
    return null
  }
  // Sin placa de video (lo dibujaría el procesador): mejor el logo plano
  try {
    const gl = renderer.getContext()
    const info = gl.getExtension('WEBGL_debug_renderer_info')
    const placa = info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : ''
    if (/swiftshader|llvmpipe|software|basic render/i.test(placa)) {
      renderer.dispose()
      return null
    }
  } catch {
    /* si no se puede saber, se sigue con el 3D */
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, esCelu ? 1.5 : 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.92
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%'
  caja.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
  camera.position.set(0, 0, 10)

  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture
  const luzClave = new THREE.DirectionalLight(0xffffff, 1.8)
  luzClave.position.set(4, 6, 8)
  const luzCian = new THREE.PointLight(CIAN, 30, 30)
  luzCian.position.set(-5, -1, 4)
  const luzAtras = new THREE.PointLight(0x2f6fff, 40, 30)
  luzAtras.position.set(3, 3, -4)
  scene.add(luzClave, luzCian, luzAtras)

  const mat = {
    contorno: new THREE.MeshPhysicalMaterial({ color: NEGRO_LOGO, metalness: 0.3, roughness: 0.45, clearcoat: 0.35, clearcoatRoughness: 0.35, envMapIntensity: 0.55 }),
    celeste: new THREE.MeshPhysicalMaterial({ color: AZUL_LOGO, metalness: 0.1, roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.3, emissive: 0x03182e, emissiveIntensity: 0.25, envMapIntensity: 0.6 }),
    blanco: new THREE.MeshPhysicalMaterial({ color: BLANCO_LOGO, metalness: 0, roughness: 0.5, clearcoat: 0.25, clearcoatRoughness: 0.4, envMapIntensity: 0.5 }),
  }

  // ---------------------------------------------------------------- logo (3 capas del SVG, extruidas)
  const logo = new THREE.Group()
  const interno = new THREE.Group()
  logo.add(interno)
  scene.add(logo)
  const capas = { contorno: { z: 0, depth: 14 }, celeste: { z: 14, depth: 5 }, blanco: { z: 14, depth: 3.5 } }
  for (const path of new SVGLoader().parse(svgLogo).paths) {
    const c = capas[path.userData.node.id]
    if (!c) continue
    for (const forma of SVGLoader.createShapes(path)) {
      const geo = new THREE.ExtrudeGeometry(forma, { depth: c.depth, bevelEnabled: true, bevelThickness: 1.4, bevelSize: 0.7, bevelSegments: 3, curveSegments: 8 })
      geo.translate(0, 0, c.z)
      interno.add(new THREE.Mesh(geo, mat[path.userData.node.id]))
    }
  }
  const cajaLogo = new THREE.Box3().setFromObject(interno)
  interno.position.copy(cajaLogo.getCenter(new THREE.Vector3()).negate())
  const anchoLogo = cajaLogo.max.x - cajaLogo.min.x
  const altoLogo = cajaLogo.max.y - cajaLogo.min.y

  // ---------------------------------------------------------------- medidas: el logo ocupa casi toda la caja
  function medir() {
    const ancho = caja.clientWidth || 1
    const alto = caja.clientHeight || 1
    camera.aspect = ancho / alto
    camera.updateProjectionMatrix()
    renderer.setSize(ancho, alto, false)
    const mitadAlto = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 10
    const mitadAncho = mitadAlto * camera.aspect
    const escala = Math.min((mitadAncho * 2 * 0.86) / anchoLogo, (mitadAlto * 2 * 0.86) / altoLogo)
    logo.scale.set(escala, -escala, escala)
  }

  let visible = true
  const obsTam = new ResizeObserver(medir)
  obsTam.observe(caja)
  const obsVista = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  obsVista.observe(caja)

  // ---------------------------------------------------------------- movimiento lento, siempre igual
  const reloj = new THREE.Clock()
  let tiempo = 0
  let acumulado = 0
  let raf = 0
  function animar() {
    raf = requestAnimationFrame(animar)
    acumulado += reloj.getDelta()
    if (!visible) {
      acumulado = 0
      return
    }
    if (esCelu && acumulado < 1 / 31) return // en el celu alcanza con 30 cuadros por segundo
    tiempo += Math.min(acumulado, 0.05)
    acumulado = 0
    if (!sinMovimiento) {
      logo.rotation.y = Math.sin(tiempo * 0.35) * 0.32
      logo.rotation.x = Math.sin(tiempo * 0.27) * 0.07
      logo.position.y = Math.sin(tiempo * 0.8) * 0.06
    }
    renderer.render(scene, camera)
  }
  medir()
  animar()

  return () => {
    cancelAnimationFrame(raf)
    obsTam.disconnect()
    obsVista.disconnect()
    renderer.dispose()
    pmrem.dispose()
    renderer.domElement.remove()
  }
}
