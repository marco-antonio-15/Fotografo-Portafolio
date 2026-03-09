import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { ServicePackage } from '../../core/models';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bg-black min-h-screen pt-24">

      <!-- Page header -->
      <div class="text-center py-16 px-6 border-b border-white/10">
        <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-4">Lo que ofrezco</p>
        <h1 class="text-white text-5xl md:text-6xl font-light" style="font-family: 'Cormorant Garamond', serif;">
          Servicios
        </h1>
      </div>

      <!-- Services grid -->
      <div class="max-w-7xl mx-auto px-6 py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (service of data.services; track service.id) {
            <div
              [class]="getCardClass(service.id)"
              (click)="toggleExpand(service.id)"
            >
              <!-- Category tag -->
              <span class="text-white/25 text-xs tracking-[0.25em] uppercase mb-4 block">
                {{ getCategoryLabel(service.category) }}
              </span>

              <!-- Name -->
              <h3 class="text-white text-2xl font-light mb-4 group-hover:text-white/90" style="font-family: 'Cormorant Garamond', serif;">
                {{ service.name }}
              </h3>

              <!-- Description -->
              <p class="text-white/50 text-sm leading-relaxed mb-6">
                {{ service.description }}
              </p>

              <!-- Key details -->
              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-xs border-t border-white/10 pt-3">
                  <span class="text-white/30 tracking-widest uppercase">Duración</span>
                  <span class="text-white/70">{{ service.duration }}</span>
                </div>
                <div class="flex justify-between text-xs border-t border-white/10 pt-3">
                  <span class="text-white/30 tracking-widest uppercase">Entrega</span>
                  <span class="text-white/70">{{ service.deliveryTime }}</span>
                </div>
              </div>

              <!-- Expanded includes -->
              @if (expanded() === service.id) {
                <div class="border-t border-white/10 pt-6 mt-2">
                  <p class="text-white/30 text-xs tracking-[0.2em] uppercase mb-4">Incluye</p>
                  <ul class="space-y-2">
                    @for (item of service.includes; track item) {
                      <li class="flex items-start gap-3 text-sm text-white/60">
                        <span class="text-white/30 mt-0.5">—</span>
                        {{ item }}
                      </li>
                    }
                  </ul>
                  <p class="text-white/40 text-xs mt-6 pt-4 border-t border-white/10 leading-relaxed">
                    {{ service.deliverables }}
                  </p>
                </div>
              }

              <!-- Toggle hint -->
              <div class="text-white/20 text-xs tracking-widest uppercase mt-4">
                {{ expanded() === service.id ? '— Menos' : '+ Detalles' }}
              </div>
            </div>
          }
        </div>

        <!-- CTA section -->
        <div class="text-center mt-24 border-t border-white/10 pt-20">
          <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-6">¿Listo para empezar?</p>
          <h2 class="text-white text-4xl font-light mb-6" style="font-family: 'Cormorant Garamond', serif;">
            Solicita una cotización
          </h2>
          <p class="text-white/40 text-sm mb-10 max-w-lg mx-auto">
            Cada proyecto es único. Cuéntame sobre tu evento y te envío una propuesta personalizada sin compromiso.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              routerLink="/contacto"
              class="bg-white text-black text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-white/90 transition-all duration-300"
            >
              Solicitar cotización
            </a>
            <a
              [href]="'https://wa.me/' + data.photographerInfo.whatsapp + '?text=Hola! Me interesa conocer tus servicios'"
              target="_blank"
              class="border border-white/30 text-white text-xs tracking-[0.2em] uppercase px-10 py-4 hover:border-white transition-all duration-300"
            >
              WhatsApp directo
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ServicesPageComponent {
  protected data = inject(DataService);
  protected expanded = signal<string | null>(null);

  protected getCardClass(id: string): string {
    const base = 'border p-8 transition-all duration-500 group cursor-pointer ';
    return base + (this.expanded() === id
      ? 'border-white/30'
      : 'border-white/10 hover:border-white/25');
  }

  protected toggleExpand(id: string): void {
    this.expanded.update((v) => (v === id ? null : id));
  }

  protected getCategoryLabel(cat: string): string {
    const labels: Record<string, string> = {
      bodas: 'Bodas',
      'xv-anos': 'XV Años',
      retrato: 'Retrato',
      producto: 'Producto',
      'eventos-corporativos': 'Corporativo',
      lifestyle: 'Lifestyle',
      musica: 'Música',
      conciertos: 'Conciertos',
    };
    return labels[cat] ?? cat;
  }
}
