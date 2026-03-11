import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '@core/services/data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-stone-900 pt-16 pb-8 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          <div>
            <p class="text-white tracking-[0.15em] uppercase mb-4"
               style="font-family:'Cormorant Garamond',serif; font-size:1rem; font-weight:400;">
              {{ data.photographerInfo.brandName }}
            </p>
            <p class="text-stone-400 text-sm leading-relaxed">{{ data.photographerInfo.tagline }}</p>
          </div>

          <div>
            <p class="text-stone-500 text-xs tracking-[0.2em] uppercase mb-6">Navegación</p>
            <ul class="flex flex-col gap-3">
              @for (link of navLinks; track link.path) {
                <li>
                  <a [routerLink]="link.path"
                     class="text-stone-400 hover:text-white text-sm transition-colors duration-300">
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <div>
            <p class="text-stone-500 text-xs tracking-[0.2em] uppercase mb-6">Contacto</p>
            <ul class="flex flex-col gap-3">
              <li>
                <a [href]="whatsappUrl" target="_blank"
                   class="text-stone-400 hover:text-white text-sm transition-colors duration-300">
                  WhatsApp
                </a>
              </li>
              <li>
                <a [href]="emailUrl"
                   class="text-stone-400 hover:text-white text-sm transition-colors duration-300">
                  {{ data.photographerInfo.email }}
                </a>
              </li>
              <li>
                <span class="text-stone-500 text-sm">{{ data.photographerInfo.location }}</span>
              </li>
            </ul>
            <div class="flex gap-6 mt-8">
              @for (s of data.photographerInfo.social; track s.platform) {
                <a [href]="s.url" target="_blank"
                   class="text-stone-500 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors duration-300">
                  {{ s.platform }}
                </a>
              }
            </div>
          </div>
        </div>

        <div class="border-t border-stone-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-stone-600 text-xs tracking-widest">
            © {{ year }} {{ data.photographerInfo.brandName }}. Todos los derechos reservados.
          </p>
          <p class="text-stone-600 text-xs">{{ data.photographerInfo.location }}</p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected data = inject(DataService);
  protected year = new Date().getFullYear();

  protected get whatsappUrl(): string {
    return `https://wa.me/${this.data.photographerInfo.whatsapp}`;
  }
  protected get emailUrl(): string {
    return `mailto:${this.data.photographerInfo.email}`;
  }

  protected navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/portafolio', label: 'Portafolio' },
    { path: '/sobre-mi', label: 'Sobre mí' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/contacto', label: 'Contacto' },
  ];
}
