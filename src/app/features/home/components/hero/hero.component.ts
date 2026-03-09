import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center">

      <!-- Background image with Ken Burns effect -->
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=90"
          alt="Hero"
          class="hero-bg w-full h-full object-cover"
          loading="eager"
        />
        <!-- Dark overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <!-- Specialty tag -->
        <p class="text-white/50 text-xs tracking-[0.4em] uppercase mb-8 animate-slide-up" style="animation-delay: 0.3s">
          Fotografía Profesional · Monterrey
        </p>

        <!-- Brand name -->
        <h1 class="hero-title text-white text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 animate-slide-up" style="animation-delay: 0.5s">
          {{ data.photographerInfo.name }}
        </h1>

        <!-- Tagline -->
        <p class="text-white/60 text-base md:text-lg font-light tracking-[0.1em] mb-12 animate-slide-up" style="animation-delay: 0.7s">
          {{ data.photographerInfo.tagline }}
        </p>

        <!-- Specialty pills -->
        <div class="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up" style="animation-delay: 0.9s">
          @for (cat of specialties; track cat) {
            <span class="text-white/40 text-xs tracking-[0.2em] uppercase border border-white/15 px-3 py-1.5">
              {{ cat }}
            </span>
          }
        </div>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style="animation-delay: 1.1s">
          <a
            routerLink="/portafolio"
            class="bg-white text-black text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-white/90 transition-all duration-300"
          >
            Ver portafolio
          </a>
          <a
            routerLink="/contacto"
            class="border border-white/40 text-white text-xs tracking-[0.2em] uppercase px-8 py-4 hover:border-white hover:bg-white/5 transition-all duration-300"
          >
            Cotizar sesión
          </a>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
        <span class="text-white/30 text-xs tracking-[0.3em] uppercase">Scroll</span>
        <div class="w-px h-8 bg-white/20"></div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes kenBurns {
      0% { transform: scale(1); }
      100% { transform: scale(1.08); }
    }
    @keyframes bounceSlow {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(6px); }
    }
    .hero-bg {
      animation: kenBurns 12s ease-out infinite alternate;
    }
    .animate-slide-up {
      opacity: 0;
      animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-bounce-slow {
      animation: bounceSlow 2s ease-in-out infinite;
    }
    .hero-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-weight: 300;
      letter-spacing: -0.02em;
    }
  `],
})
export class HeroComponent {
  protected data = inject(DataService);

  protected specialties = [
    'Bodas', 'XV Años', 'Retrato', 'Producto',
    'Corporativo', 'Lifestyle', 'Música', 'Conciertos',
  ];
}
