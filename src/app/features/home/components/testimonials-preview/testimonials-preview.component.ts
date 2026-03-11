import { Component, inject } from '@angular/core';
import { DataService } from '@core/services/data.service';

@Component({
  selector: 'app-testimonials-preview',
  standalone: true,
  template: `
    <section class="bg-white py-24 px-6 border-t border-stone-100">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-stone-500 text-xs tracking-[0.3em] uppercase font-medium mb-4">Lo que dicen</p>
          <h2 class="text-stone-900 text-4xl font-light" style="font-family:'Cormorant Garamond',serif">
            Clientes
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (t of data.testimonials; track t.id) {
            <div class="border border-stone-200 p-8 hover:border-stone-400 hover:shadow-sm transition-all duration-500">
              <div class="flex gap-1 mb-6">
                @for (s of [1,2,3,4,5]; track s) {
                  <span class="text-amber-400 text-sm">★</span>
                }
              </div>
              <p class="text-stone-700 text-sm leading-relaxed mb-8 italic">
                "{{ t.text }}"
              </p>
              <div class="border-t border-stone-100 pt-6">
                <p class="text-stone-900 text-sm font-semibold">{{ t.clientName }}</p>
                <p class="text-stone-500 text-xs tracking-[0.2em] uppercase font-medium mt-1">{{ getCategoryLabel(t.eventType) }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class TestimonialsPreviewComponent {
  protected data = inject(DataService);
  protected getCategoryLabel(cat: string): string {
    const labels: Record<string, string> = {
      bodas: 'Boda', 'xv-anos': 'XV Años', retrato: 'Retrato',
      producto: 'Producto', 'eventos-corporativos': 'Evento Corporativo',
      lifestyle: 'Lifestyle', musica: 'Música', conciertos: 'Concierto',
    };
    return labels[cat] ?? cat;
  }
}
