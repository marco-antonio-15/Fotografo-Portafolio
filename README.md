# 📸 Fotógrafo Portfolio — Angular 19 + Tailwind CSS

Sitio web profesional para fotógrafo. Diseño negro elegante, minimalista y atemporal.
node 20.19.5
npm 11.11.0
---

## Setup rápido

```bash

ng new fotografo-portfolio --routing --style=css --standalone

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

npm install

ng serve
```

---

## Estructura del proyecto

```
src/app/
├── core/
│   ├── models/           # Interfaces: Photo, ServicePackage, Testimonial, etc.
│   └── services/
│       └── data.service.ts   # Datos centralizados + Signals reactivos
│
├── shared/
│   └── components/
│       ├── navbar/       # Navbar fija con scroll effect
│       ├── footer/       # Footer con links y redes sociales
│       └── lightbox/     # Lightbox para portafolio
│
└── features/             # Lazy-loaded pages
    ├── home/             # Landing principal
    │   └── components/
    │       ├── hero/             # Hero fullscreen + Ken Burns
    │       ├── featured-gallery/ # Masonry grid destacado
    │       └── testimonials-preview/
    ├── portfolio/        # Galería completa con filtros
    ├── about/            # Sobre mí
    ├── services-page/    # Servicios y paquetes
    └── contact/          # Formulario + WhatsApp + redes
```

---

## Personalización

### Cambiar datos del fotógrafo
Todo está centralizado en `src/app/core/services/data.service.ts`:
- Nombre, marca, tagline, bio
- Teléfono, email, WhatsApp
- Redes sociales
- Fotos del portafolio
- Servicios y paquetes
- Testimonios

### Cambiar fotos del portafolio
En `data.service.ts`, busca el array `photos` y reemplaza las URLs de Unsplash con las rutas de las fotos reales:
```typescript
{ id: '1', src: 'assets/images/bodas/foto-01.jpg', alt: 'Descripción', category: 'bodas', ... }
```

### Agregar categorías
En `models/index.ts` agrega al tipo `PhotoCategory`, luego en `data.service.ts` agrega al array `categories`.

---

## Stack técnico

| Herramienta | Versión | Uso |
|---|---|---|
| Angular | 19 | Framework principal |
| Tailwind CSS | 3.x | Estilos utilitarios |
| Angular Signals | Built-in | Estado reactivo (filtros, lightbox) |
| `@defer` | Angular 17+ | Lazy loading de secciones |
| `withViewTransitions()` | Angular 17+ | Transiciones entre rutas |
| `NgOptimizedImage` | Built-in | Optimización de imágenes |
| Cormorant Garamond | Google Fonts | Tipografía serif elegante |
| Montserrat | Google Fonts | Tipografía sans-serif |

---

## TODO (próximos pasos)

- [ ] Conectar formulario de contacto (EmailJS o Formspree)
- [ ] Agregar fotos reales del fotógrafo
- [ ] Implementar `NgOptimizedImage` en galería
- [ ] Agregar `@defer` en masonry grid para mejor performance
- [ ] Integrar feed de Instagram
- [ ] Configurar SEO con `@angular/platform-browser` Meta service
- [ ] Deploy en Vercel o Netlify

---

## Tipografía

- **Display / Headings**: `Cormorant Garamond` — serif elegante, atemporalidad
- **Body / UI**: `Montserrat Light 300` — sans-serif limpio y moderno

## Colores

- Background: `#000000`
- Surfaces: `#0a0a0a` / `neutral-950`
- Text primary: `#ffffff`
- Text secondary: `rgba(255,255,255,0.5)`
- Borders: `rgba(255,255,255,0.10)`
