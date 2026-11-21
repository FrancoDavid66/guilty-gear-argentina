import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build normal: npm run build -> carpeta dist/
// base './' = rutas relativas: anda en Hostinger, en GitHub Pages (usuario.github.io/repo) y en cualquier subcarpeta
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1600 }, // three.js pesa: evita el aviso
})
