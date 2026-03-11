import { Component, inject, signal } from '@angular/core';
import { DataService } from '@core/services/data.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <div class="bg-[#faf9f7] min-h-screen pt-24">

      <div class="text-center py-16 px-6 border-b border-stone-200">
        <p class="text-stone-500 text-xs tracking-[0.3em] uppercase font-medium mb-4">Hablemos</p>
        <h1 class="text-stone-900 text-5xl md:text-6xl font-light" style="font-family:'Cormorant Garamond',serif">
          Contacto
        </h1>
      </div>

      <div class="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-20">

        <!-- Info -->
        <div>
          <h2 class="text-stone-900 text-3xl font-light mb-6" style="font-family:'Cormorant Garamond',serif">
            ¿Tienes un proyecto en mente?
          </h2>
          <p class="text-stone-700 text-base leading-relaxed mb-12">
            Me encantaría conocer tu historia. Escríbeme y platicamos sobre
            cómo hacer de tu sesión una experiencia única.
          </p>

          <div class="space-y-4">

            <a [href]="whatsappUrl" target="_blank"
               class="flex items-center gap-5 group border border-stone-200 bg-white p-5 hover:border-stone-400 hover:shadow-sm transition-all duration-300">
              <div class="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-500 group-hover:border-stone-400 flex-shrink-0">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <p class="text-stone-500 text-xs tracking-[0.2em] uppercase font-medium mb-1">WhatsApp</p>
                <p class="text-stone-900 text-sm font-semibold">{{ data.photographerInfo.phone }}</p>
              </div>
            </a>

            <a [href]="emailUrl"
               class="flex items-center gap-5 group border border-stone-200 bg-white p-5 hover:border-stone-400 hover:shadow-sm transition-all duration-300">
              <div class="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-500 group-hover:border-stone-400 flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <p class="text-stone-500 text-xs tracking-[0.2em] uppercase font-medium mb-1">Email</p>
                <p class="text-stone-900 text-sm font-semibold">{{ data.photographerInfo.email }}</p>
              </div>
            </a>

            <div class="flex items-center gap-5 border border-stone-200 bg-white p-5">
              <div class="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-500 flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-stone-500 text-xs tracking-[0.2em] uppercase font-medium mb-1">Ubicación</p>
                <p class="text-stone-900 text-sm font-semibold">{{ data.photographerInfo.location }}</p>
              </div>
            </div>
          </div>

          <div class="flex gap-6 mt-8">
            @for (s of data.photographerInfo.social; track s.platform) {
              <a [href]="s.url" target="_blank"
                 class="text-stone-400 hover:text-stone-900 text-xs tracking-[0.2em] uppercase transition-colors duration-300">
                {{ s.platform }}
              </a>
            }
          </div>
        </div>

        <!-- Form -->
        <div class="bg-white p-10 border border-stone-200 shadow-sm">
          <form (submit)="handleSubmit($event)" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="text-stone-600 text-xs tracking-[0.2em] uppercase block mb-2 font-semibold">Nombre</label>
                <input type="text" placeholder="Tu nombre"
                       class="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm px-4 py-3 focus:border-stone-500 focus:bg-white outline-none transition-all placeholder:text-stone-300" />
              </div>
              <div>
                <label class="text-stone-600 text-xs tracking-[0.2em] uppercase block mb-2 font-semibold">Teléfono</label>
                <input type="tel" placeholder="Tu teléfono"
                       class="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm px-4 py-3 focus:border-stone-500 focus:bg-white outline-none transition-all placeholder:text-stone-300" />
              </div>
            </div>

            <div>
              <label class="text-stone-600 text-xs tracking-[0.2em] uppercase block mb-2 font-semibold">Email</label>
              <input type="email" placeholder="tu@email.com"
                     class="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm px-4 py-3 focus:border-stone-500 focus:bg-white outline-none transition-all placeholder:text-stone-300" />
            </div>

            <div>
              <label class="text-stone-600 text-xs tracking-[0.2em] uppercase block mb-2 font-semibold">Tipo de sesión</label>
              <select class="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm px-4 py-3 focus:border-stone-500 focus:bg-white outline-none transition-all">
                <option value="">Selecciona una opción</option>
                @for (cat of categories; track cat.id) {
                  @if (cat.id !== 'all') {
                    <option [value]="cat.id">{{ cat.label }}</option>
                  }
                }
              </select>
            </div>

            <div>
              <label class="text-stone-600 text-xs tracking-[0.2em] uppercase block mb-2 font-semibold">Mensaje</label>
              <textarea rows="5" placeholder="Cuéntame sobre tu evento o sesión..." class="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm px-4 py-3 focus:border-stone-500 focus:bg-white outline-none transition-all placeholder:text-stone-300 resize-none"></textarea>
            </div>

            <button type="submit"
                    class="w-full bg-stone-900 text-white text-xs tracking-[0.2em] uppercase py-4 hover:bg-stone-700 transition-all duration-300 font-medium">
              Enviar mensaje
            </button>

            @if (sent()) {
              <p class="text-stone-500 text-sm text-center tracking-wide">
                ✓ Mensaje enviado. Te contactaré pronto.
              </p>
            }
          </form>
        </div>
      </div>
    </div>
  `,
})
export class ContactComponent {
  protected data = inject(DataService);
  protected sent = signal(false);
  protected get whatsappUrl(): string { return `https://wa.me/${this.data.photographerInfo.whatsapp}`; }
  protected get emailUrl(): string { return `mailto:${this.data.photographerInfo.email}`; }

  protected categories = this.data.categories;
  protected handleSubmit(event: Event): void {
    event.preventDefault();
    this.sent.set(true);
  }
}
