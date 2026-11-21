# Guilty Gear Argentina (GGA) — web

Web de la comunidad sudamericana de Guilty Gear. Hecha con **Vite 6 + React 19**, Tailwind 3, Framer Motion 12, Lenis y three.js (portada 3D).

Web hecha por [Franco David](https://www.instagram.com/francodavid_66/).

## Para arrancar

Hace falta [Node.js](https://nodejs.org/) 18 o más nuevo.

```bash
npm install        # la primera vez
npm run dev        # ver en vivo mientras se edita (http://localhost:5173)
npm run build      # genera dist/ para subir
npm run preview    # ver el build terminado
npm run build:single   # todo en un solo dist-single/index.html (doble clic / mandar por WhatsApp)
```

## Páginas

Las rutas usan `#` (ej. `#/juegos`) para que la web funcione igual en Hostinger, en GitHub Pages y abierta con doble clic.

| Ruta | Página | Qué tiene |
|---|---|---|
| `#/` | Inicio | Barra en vivo, portada 3D (el logo se arma al bajar), panel con el próximo evento y accesos |
| `#/nosotros` | Nosotros | Quiénes somos, números, qué hacemos, historia y organizadores |
| `#/juegos` | Juegos | Strive, Xrd REV 2 y +R + plantel completo de Strive |
| `#/eventos` | Eventos | Reloj, calendario del mes, reglamento, lobbys vs torneos y replays |
| `#/aprende` | Aprendé | La Escuelita, Diccionario Guilty y todas las clases |
| `#/comunidad` | Comunidad | Discord, reglas del Discord y redes |

Cada clic en la web es un "golpe" (tajo, impacto, rayo o fuego). Con "reducir movimiento" activado en el sistema se apagan las animaciones.

## Dónde se cambia cada cosa

Casi todo está en **`src/data/gga.js`**:

- **Calendario del mes** → `calendario` (la barra en vivo, el panel y el reloj salen de ahí)
- **Personajes de Strive** → `personajes.lista` (sumar cuando salga un DLC)
- **Reglas del Discord** → `reglasDiscord.lista` (`{ titulo, texto }`, una por regla)
- **Videos** → `escuelita`, `vods.momentos`, `panel.ultimos`
- **Textos de cada página** → `paginas`, `nosotros`, `hero`
- **Redes y números** → `redes`, `discord`

Imágenes:

- **Logo:** `src/assets/logo/` (PNG), `src/assets/logo-animado/` (SVG animado), `src/assets/logo3d/gga-logo.svg` (vector de 3 capas para el 3D)
- **Juegos (opcional):** `src/assets/juegos/strive.jpg`, `xrd.jpg`, `acpr.jpg`
- **Personajes (opcional):** `src/assets/personajes/<id>.webp` (los `id` están en `personajes.lista`)
- **Íconos y OG:** `public/`

> Imágenes de personajes: usar fan art con permiso del artista o imágenes propias. Las guías de contenido de fans de Arc System Works no permiten usar ilustraciones, logos ni contenido del juego oficiales directamente.

**Colores:** `tailwind.config.js` · **Dominio:** reemplazar `TU-DOMINIO.com.ar` en `index.html`, `public/robots.txt`, `public/sitemap.xml` y `src/data/gga.js`.

## Publicar

- **Hostinger:** `npm run build` y subir el contenido de `dist/` a `public_html` (incluye `.htaccess`).
- **GitHub Pages:** `npm run build` y publicar `dist/` (por ejemplo con GitHub Actions → "Static HTML" apuntando a `dist`). Como la base es relativa (`./`), anda en `usuario.github.io/nombre-del-repo`.

## Estructura

```
src/
  App.jsx              páginas y qué secciones lleva cada una
  data/gga.js          todos los textos, links y datos
  lib/                 scroll y rutas, calendario, escena 3D, Discord en vivo
  components/          secciones (Hero3D, Panel, Nosotros, Juegos, Personajes, Eventos…)
  components/efectos/  golpes al clic, Wall Break, Instant Kill
public/                íconos, manifest, robots, sitemap, .htaccess
```

Guilty Gear es una marca de Arc System Works. Sitio de la comunidad, sin afiliación oficial.
