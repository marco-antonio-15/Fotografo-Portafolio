import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturedGalleryComponent } from './components/featured-gallery/featured-gallery.component';
import { TestimonialsPreviewComponent } from './components/testimonials-preview/testimonials-preview.component';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    HeroComponent,
    FeaturedGalleryComponent,
    TestimonialsPreviewComponent,
  ],
  template: `
    <!-- Hero fullscreen -->
    <app-hero />

    <!-- Stats bar -->
    <div class="bg-neutral-950 border-y border-white/10 py-8 px-6">
      <div class="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        @for (stat of stats; track stat.label) {
          <div>
            <p class="text-white text-3xl font-light mb-1" style="font-family: 'Cormorant Garamond', serif;">{{ stat.value }}</p>
            <p class="text-white/30 text-xs tracking-[0.3em] uppercase">{{ stat.label }}</p>
          </div>
        }
      </div>
    </div>

    <!-- Featured portfolio -->
    <app-featured-gallery />

    <!-- Services teaser -->
    <section class="bg-black py-24 px-6 border-t border-white/5">
      <div class="max-w-4xl mx-auto text-center">
        <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-6">Lo que ofrezco</p>
        <h2 class="text-white text-4xl md:text-5xl font-light mb-6" style="font-family: 'Cormorant Garamond', serif;">
          Cada sesión, <em>una historia</em>
        </h2>
        <p class="text-white/50 text-base leading-relaxed mb-12 max-w-2xl mx-auto">
          Desde bodas íntimas hasta grandes eventos corporativos. Cada trabajo es único
          y recibe toda mi atención y dedicación.
        </p>
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          @for (cat of categories; track cat) {
            <span class="text-white/40 text-xs tracking-[0.15em] uppercase border border-white/10 px-4 py-2 hover:border-white/30 hover:text-white/60 transition-all duration-300 cursor-default">
              {{ cat }}
            </span>
          }
        </div>
        <a
          routerLink="/servicios"
          class="inline-block border border-white/30 text-white text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
        >
          Ver servicios
        </a>
      </div>
    </section>

    <!-- Testimonials -->
    <app-testimonials-preview />

    <!-- Final CTA -->
    <section class="bg-black py-24 px-6 text-center border-t border-white/5">
      <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-6">¿Tienes un proyecto?</p>
      <h2 class="text-white text-4xl md:text-5xl font-light mb-10" style="font-family: 'Cormorant Garamond', serif;">
        Hablemos de tu sesión
      </h2>
      <a
        routerLink="/contacto"
        class="inline-block bg-white text-black text-xs tracking-[0.2em] uppercase px-10 py-5 hover:bg-white/90 transition-all duration-300"
      >
        Contactar ahora
      </a>
    </section>
  `,
})
export class HomeComponent {
  protected data = inject(DataService);

  protected stats = [
    { value: '+10', label: 'Años de experiencia' },
    { value: '+500', label: 'Sesiones realizadas' },
    { value: '+200', label: 'Bodas fotografiadas' },
    { value: '100%', label: 'Clientes satisfechos' },
  ];

  protected categories = [
    'Bodas', 'XV Años', 'Retrato', 'Producto',
    'Corporativo', 'Lifestyle', 'Música', 'Conciertos',
  ];
}
