import { Component, inject } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-testimonials-preview',
  standalone: true,
  template: `
    <section class="bg-neutral-950 py-24 px-6 border-t border-white/5">
      <div class="max-w-6xl mx-auto">

        <div class="text-center mb-16">
          <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-4">Lo que dicen</p>
          <h2 class="text-white text-4xl font-light" style="font-family: 'Cormorant Garamond', serif;">
            Clientes
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (testimonial of data.testimonials; track testimonial.id) {
            <div class="border border-white/10 p-8 hover:border-white/20 transition-colors duration-500">
              <!-- Stars -->
              <div class="flex gap-1 mb-6">
                @for (star of [1,2,3,4,5]; track star) {
                  <span class="text-white/80 text-xs">★</span>
                }
              </div>

              <!-- Quote -->
              <p class="text-white/60 text-sm leading-relaxed mb-8 italic">
                "{{ testimonial.text }}"
              </p>

              <!-- Client -->
              <div class="border-t border-white/10 pt-6">
                <p class="text-white text-sm tracking-wide">{{ testimonial.clientName }}</p>
                <p class="text-white/30 text-xs tracking-[0.2em] uppercase mt-1">{{ getCategoryLabel(testimonial.eventType) }}</p>
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
      bodas: 'Boda',
      'xv-anos': 'XV Años',
      retrato: 'Retrato',
      producto: 'Producto',
      'eventos-corporativos': 'Evento Corporativo',
      lifestyle: 'Lifestyle',
      musica: 'Música',
      conciertos: 'Concierto',
    };
    return labels[cat] ?? cat;
  }
}
