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

export const logoUrl = Object.values(archivos)[0] ?? null
export const logoAnimadoUrl = Object.values(animados)[0] ?? null
