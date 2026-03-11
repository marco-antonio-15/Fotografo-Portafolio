import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '@core/services/data.service';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bg-[#faf9f7] min-h-screen pt-24">

      <div class="text-center py-16 px-6 border-b border-stone-200">
        <p class="text-stone-500 text-xs tracking-[0.3em] uppercase font-medium mb-4">Lo que ofrezco</p>
        <h1 class="text-stone-900 text-5xl md:text-6xl font-light" style="font-family:'Cormorant Garamond',serif">
          Servicios
        </h1>
      </div>

      <div class="max-w-7xl mx-auto px-6 py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (service of data.services; track service.id) {
            <div [class]="getCardClass(service.id)" (click)="toggleExpand(service.id)">

              <span class="text-stone-500 text-xs tracking-[0.25em] uppercase font-medium mb-4 block">
                {{ getCategoryLabel(service.category) }}
              </span>

              <h3 class="text-stone-900 text-2xl font-light mb-4" style="font-family:'Cormorant Garamond',serif">
                {{ service.name }}
              </h3>

              <p class="text-stone-700 text-sm leading-relaxed font-normal mb-6">{{ service.description }}</p>

              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-xs border-t border-stone-200 pt-3">
                  <span class="text-stone-600 tracking-widest uppercase font-medium">Duración</span>
                  <span class="text-stone-700">{{ service.duration }}</span>
                </div>
                <div class="flex justify-between text-xs border-t border-stone-200 pt-3">
                  <span class="text-stone-600 tracking-widest uppercase font-medium">Entrega</span>
                  <span class="text-stone-700">{{ service.deliveryTime }}</span>
                </div>
              </div>

              @if (expanded() === service.id) {
                <div class="border-t border-stone-200 pt-6 mt-2">
                  <p class="text-stone-500 text-xs tracking-[0.2em] uppercase font-medium mb-4">Incluye</p>
                  <ul class="space-y-2">
                    @for (item of service.includes; track item) {
                      <li class="flex items-start gap-3 text-sm text-stone-600">
                        <span class="text-stone-300 mt-0.5">—</span>{{ item }}
                      </li>
                    }
                  </ul>
                  <p class="text-stone-600 text-xs mt-6 pt-4 border-t border-stone-100 leading-relaxed">
                    {{ service.deliverables }}
                  </p>
                </div>
              }

              <div class="text-stone-400 text-xs tracking-widest uppercase mt-4">
                {{ expanded() === service.id ? '— Menos' : '+ Detalles' }}
              </div>
            </div>
          }
        </div>

        <!-- CTA -->
        <div class="text-center mt-24 border-t border-stone-200 pt-20">
          <p class="text-stone-500 text-xs tracking-[0.3em] uppercase font-medium mb-6">¿Listo para empezar?</p>
          <h2 class="text-stone-900 text-4xl font-light mb-6" style="font-family:'Cormorant Garamond',serif">
            Solicita una cotización
          </h2>
          <p class="text-stone-700 text-sm mb-10 max-w-lg mx-auto">
            Cada proyecto es único. Cuéntame sobre tu evento y te envío una propuesta personalizada sin compromiso.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/contacto"
               class="bg-stone-900 text-white text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-stone-700 transition-all duration-300">
              Solicitar cotización
            </a>
            <a [href]="whatsappCotizarUrl"
               target="_blank"
               class="border border-stone-300 text-stone-800 text-xs font-medium tracking-[0.2em] uppercase px-10 py-4 hover:border-stone-900 hover:text-stone-900 transition-all duration-300">
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
    const base = 'border p-8 transition-all duration-500 cursor-pointer bg-white ';
    return base + (this.expanded() === id
      ? 'border-stone-400 shadow-md'
      : 'border-stone-200 hover:border-stone-300 hover:shadow-sm');
  }

  protected toggleExpand(id: string): void {
    this.expanded.update(v => v === id ? null : id);
  }

  protected get whatsappCotizarUrl(): string {
    return `https://wa.me/${this.data.photographerInfo.whatsapp}?text=Hola! Me interesa conocer tus servicios`;
  }

  protected getCategoryLabel(cat: string): string {
    const labels: Record<string, string> = {
      bodas: 'Bodas', 'xv-anos': 'XV Años', retrato: 'Retrato',
      producto: 'Producto', 'eventos-corporativos': 'Corporativo',
      lifestyle: 'Lifestyle', musica: 'Música', conciertos: 'Conciertos',
    };
    return labels[cat] ?? cat;
  }
}
