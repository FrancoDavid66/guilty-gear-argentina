/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta sacada del calendario de GGA en X (nov 2026) y del avatar
        noche: '#07090D', // fondo general
        carbon: '#0E131A',
        pizarra: '#242C37',
        azul: '#194E81', // azul profundo del logo
        cian: '#02BEFE', // el azul eléctrico de las placas
        hielo: '#E9F7FE',
        blanco: '#F8F8F8',
      },
      fontFamily: {
        titulo: ['"Saira Condensed"', 'Impact', 'sans-serif'],
        texto: ['Saira', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      screens: { xs: '400px' },
    },
  },
  plugins: [],
}
