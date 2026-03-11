import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '@features/home/components/hero/hero.component';
import { FeaturedGalleryComponent } from '@features/home/components/featured-gallery/featured-gallery.component';
import { TestimonialsPreviewComponent } from '@features/home/components/testimonials-preview/testimonials-preview.component';
import { DataService } from '@core/services/data.service';
import { InstagramFeedComponent } from "./components/instagram-feed/instagram-feed.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeroComponent, FeaturedGalleryComponent, TestimonialsPreviewComponent, InstagramFeedComponent],
  template: `
    <!-- Hero fullscreen (foto con overlay oscuro — contraste perfecto) -->
    <app-hero />

    <!-- Stats bar -->
    <div class="bg-stone-900 py-10 px-6">
      <div class="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        @for (stat of stats; track stat.label) {
          <div>
            <p class="text-white text-3xl font-light mb-1" style="font-family:'Cormorant Garamond',serif">{{ stat.value }}</p>
            <p class="text-stone-400 text-xs tracking-[0.25em] uppercase">{{ stat.label }}</p>
          </div>
        }
      </div>
    </div>

    <!-- Featured portfolio (fondo crema) -->
    <app-featured-gallery />
    <app-instagram-feed />

    <!-- Services teaser -->
    <section class="bg-stone-100 py-24 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <p class="text-stone-600 text-xs tracking-[0.4em] uppercase mb-6">Lo que ofrezco</p>
        <h2 class="text-stone-900 text-4xl md:text-5xl font-light mb-6" style="font-family:'Cormorant Garamond',serif">
          Cada sesión, <em>una historia</em>
        </h2>
        <p class="text-stone-500 text-base leading-relaxed mb-12 max-w-2xl mx-auto">
          Desde bodas íntimas hasta grandes eventos corporativos. Cada trabajo es único 
          y recibe toda mi atención y dedicación.
        </p>
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          @for (cat of categories; track cat) {
            <span class="text-stone-500 text-xs tracking-[0.15em] uppercase border border-stone-300 px-4 py-2 hover:border-stone-500 hover:text-stone-700 transition-all duration-300 cursor-default">
              {{ cat }}
            </span>
          }
        </div>
        <a routerLink="/servicios"
           class="inline-block bg-stone-900 text-white text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-stone-700 transition-all duration-300">
          Ver servicios
        </a>
      </div>
    </section>

    <!-- Testimonials -->
    <app-testimonials-preview />

    <!-- Final CTA -->
    <section class="bg-stone-900 py-24 px-6 text-center">
      <p class="text-stone-400 text-xs tracking-[0.4em] uppercase mb-6">¿Tienes un proyecto?</p>
      <h2 class="text-white text-4xl md:text-5xl font-light mb-10" style="font-family:'Cormorant Garamond',serif">
        Hablemos de tu sesión
      </h2>
      <a routerLink="/contacto"
         class="inline-block bg-white text-stone-900 text-xs tracking-[0.2em] uppercase px-10 py-5 hover:bg-stone-100 transition-all duration-300 font-medium">
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
  protected categories = ['Bodas','XV Años','Retrato','Producto','Corporativo','Lifestyle','Música','Conciertos'];
}
