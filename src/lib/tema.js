// Tema claro / oscuro. Oscuro es el de la marca; se recuerda lo que elige cada uno.
export function temaInicial() {
  try {
    const g = localStorage.getItem('gga-tema')
    if (g === 'claro' || g === 'oscuro') return g
  } catch {
    /* nada */
  }
  return 'oscuro'
}

export function aplicarTema(tema) {
  document.documentElement.classList.toggle('claro', tema === 'claro')
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', tema === 'claro' ? '#F3F6F9' : '#07090D')
  try {
    localStorage.setItem('gga-tema', tema)
  } catch {
    /* nada */
  }
}
