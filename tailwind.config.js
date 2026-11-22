/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta sacada del calendario de GGA en X (nov 2026) y del avatar
        // noche / carbon / pizarra / white cambian con el tema (ver .claro en index.css)
        noche: 'rgb(var(--noche) / <alpha-value>)', // fondo general
        carbon: 'rgb(var(--carbon) / <alpha-value>)',
        pizarra: 'rgb(var(--pizarra) / <alpha-value>)',
        white: 'rgb(var(--white) / <alpha-value>)',
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
