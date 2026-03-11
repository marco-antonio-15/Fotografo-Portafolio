import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '@core/services/data.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center">

      <!-- Background image with Ken Burns -->
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=90"
          alt="Hero"
          class="hero-bg w-full h-full object-cover"
          loading="eager"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p class="text-white text-xs tracking-[0.35em] font-semibold uppercase mb-8 anim-up" style="animation-delay:.3s">
          Fotografía Profesional · Monterrey
        </p>
        <h1 class="hero-title text-white text-5xl md:text-7xl lg:text-8xl font-light mb-6 anim-up" style="animation-delay:.5s">
          {{ data.photographerInfo.name }}
        </h1>
        <p class="text-white text-base md:text-lg font-normal tracking-[0.08em] mb-12 anim-up" style="animation-delay:.7s">
          {{ data.photographerInfo.tagline }}
        </p>

        <div class="flex flex-wrap justify-center gap-3 mb-12 anim-up" style="animation-delay:.9s">
          @for (cat of specialties; track cat) {
            <span class="text-white/90 text-xs tracking-[0.2em] font-medium uppercase border border-white/50 px-3 py-1.5 backdrop-blur-sm">
              {{ cat }}
            </span>
          }
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center anim-up" style="animation-delay:1.1s">
          <a routerLink="/portafolio"
             class="bg-white text-stone-900 text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-stone-100 transition-all duration-300 font-medium">
            Ver portafolio
          </a>
          <a routerLink="/contacto"
             class="border border-white/60 text-white text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-white/10 transition-all duration-300">
            Cotizar sesión
          </a>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-hint">
        <span class="text-white/70 text-xs tracking-[0.3em] font-medium uppercase">Scroll</span>
        <div class="w-px h-8 bg-white/30"></div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes kenBurns {
      0%   { transform: scale(1); }
      100% { transform: scale(1.07); }
    }
    @keyframes bob {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50%       { transform: translateX(-50%) translateY(6px); }
    }
    .hero-bg   { animation: kenBurns 14s ease-out infinite alternate; }
    .anim-up   { opacity: 0; animation: slideUp .8s cubic-bezier(.16,1,.3,1) forwards; }
    .scroll-hint { animation: bob 2.2s ease-in-out infinite; }
    .hero-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-weight: 300;
      letter-spacing: -.02em;
    }
  `],
})
export class HeroComponent {
  protected data = inject(DataService);
  protected specialties = ['Bodas','XV Años','Retrato','Producto','Corporativo','Lifestyle','Música','Conciertos'];
}
