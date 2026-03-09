import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bg-black min-h-screen pt-24">

      <!-- Page header -->
      <div class="text-center py-16 px-6 border-b border-white/10">
        <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-4">Conóceme</p>
        <h1 class="text-white text-5xl md:text-6xl font-light" style="font-family: 'Cormorant Garamond', serif;">
          Sobre mí
        </h1>
      </div>

      <!-- Main content -->
      <div class="max-w-6xl mx-auto px-6 py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

          <!-- Photo -->
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800"
              alt="{{ data.photographerInfo.name }}"
              class="w-full aspect-[3/4] object-cover"
            />
            <!-- Experience badge -->
            <div class="absolute bottom-8 -right-4 bg-white text-black p-6 text-center">
              <p class="text-4xl font-light" style="font-family: 'Cormorant Garamond', serif;">
                +{{ data.photographerInfo.experience }}
              </p>
              <p class="text-xs tracking-[0.2em] uppercase mt-1">Años de<br>experiencia</p>
            </div>
          </div>

          <!-- Text -->
          <div>
            <h2 class="text-white text-4xl font-light mb-8" style="font-family: 'Cormorant Garamond', serif;">
              {{ data.photographerInfo.name }}
            </h2>
            <div class="space-y-5 text-white/60 text-base leading-relaxed mb-10">
              @for (paragraph of bioParagraphs; track $index) {
                <p>{{ paragraph }}</p>
              }
            </div>

            <!-- Philosophy highlight -->
            <blockquote class="border-l-2 border-white/30 pl-6 mb-10">
              <p class="text-white/80 text-xl font-light italic" style="font-family: 'Cormorant Garamond', serif;">
                "Mi pasión es capturar las emociones reales, no poses forzadas."
              </p>
            </blockquote>

            <a
              routerLink="/contacto"
              class="inline-block border border-white/30 text-white text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
            >
              Trabajemos juntos
            </a>
          </div>
        </div>

        <!-- Specialties grid -->
        <div class="border-t border-white/10 pt-20">
          <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-12 text-center">Especialidades</p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            @for (spec of specialties; track spec.name) {
              <div class="border border-white/10 p-8 text-center hover:border-white/30 transition-colors duration-500">
                <p class="text-white/30 text-3xl mb-4">{{ spec.icon }}</p>
                <p class="text-white text-sm tracking-wide mb-2">{{ spec.name }}</p>
                <p class="text-white/30 text-xs">{{ spec.count }}+ sesiones</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AboutComponent {
  protected data = inject(DataService);

  protected bioParagraphs = [
    `Mi nombre es ${this.data.photographerInfo.name} y llevo más de ${this.data.photographerInfo.experience} años capturando los momentos más importantes en la vida de las personas.`,
    `Creo que cada fotografía es una historia esperando ser contada, y mi misión es contarla con honestidad, belleza y emoción. No busco la foto perfecta; busco la foto verdadera.`,
    `Me especializo en bodas, XV años, retratos y eventos, pero lo que realmente me apasiona es conectar con mis clientes antes de cada sesión para entender qué hace único ese momento.`,
  ];

  protected specialties = [
    { icon: '💒', name: 'Bodas', count: 200 },
    { icon: '✨', name: 'XV Años', count: 150 },
    { icon: '🎭', name: 'Retrato', count: 300 },
    { icon: '🏢', name: 'Corporativo', count: 80 },
    { icon: '📦', name: 'Producto', count: 120 },
    { icon: '🌿', name: 'Lifestyle', count: 100 },
    { icon: '🎵', name: 'Música', count: 60 },
    { icon: '🎤', name: 'Conciertos', count: 40 },
  ];
}
