import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// HTML único con todo adentro (fuentes, logo, código): npm run build:single -> dist-single/index.html
// Se abre con doble clic, sirve para mandar la vista previa al cliente.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  publicDir: false,
  build: {
    outDir: 'dist-single',
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
  },
})
