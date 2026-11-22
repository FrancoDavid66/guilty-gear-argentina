// Busca el logo del team en src/assets/logo/ (png, webp, svg, jpg).
// Si no hay ninguno, devuelve null y la web muestra el logo provisorio.
const archivos = import.meta.glob('../assets/logo/*.{png,webp,svg,jpg,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// Versión animada (la de la portada): src/assets/logo-animado/
const animados = import.meta.glob('../assets/logo-animado/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

// Si hay webp se usa ese (pesa mucho menos que el png)
const ordenados = Object.entries(archivos).sort(([a], [b]) => (b.endsWith('.webp') ? 1 : 0) - (a.endsWith('.webp') ? 1 : 0))
export const logoUrl = ordenados[0]?.[1] ?? null
export const logoAnimadoUrl = Object.values(animados)[0] ?? null
