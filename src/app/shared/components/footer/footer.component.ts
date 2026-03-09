import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-black border-t border-white/10 pt-16 pb-8 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          <!-- Brand -->
          <div>
            <p class="text-white tracking-[0.2em] text-sm uppercase mb-4">
              {{ data.photographerInfo.brandName }}
            </p>
            <p class="text-white/40 text-sm leading-relaxed">
              {{ data.photographerInfo.tagline }}
            </p>
          </div>

          <!-- Links -->
          <div>
            <p class="text-white/30 text-xs tracking-[0.2em] uppercase mb-6">Navegación</p>
            <ul class="flex flex-col gap-3">
              @for (link of navLinks; track link.path) {
                <li>
                  <a [routerLink]="link.path" class="text-white/50 hover:text-white text-sm transition-colors duration-300">
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <p class="text-white/30 text-xs tracking-[0.2em] uppercase mb-6">Contacto</p>
            <ul class="flex flex-col gap-3">
              <li>
                <a [href]="'https://wa.me/' + data.photographerInfo.whatsapp"
                   target="_blank"
                   class="text-white/50 hover:text-white text-sm transition-colors duration-300">
                  WhatsApp
                </a>
              </li>
              <li>
                <a [href]="'mailto:' + data.photographerInfo.email"
                   class="text-white/50 hover:text-white text-sm transition-colors duration-300">
                  {{ data.photographerInfo.email }}
                </a>
              </li>
              <li>
                <span class="text-white/50 text-sm">{{ data.photographerInfo.location }}</span>
              </li>
            </ul>

            <!-- Socials -->
            <div class="flex gap-4 mt-8">
              @for (social of data.photographerInfo.social; track social.platform) {
                <a [href]="social.url" target="_blank"
                   class="text-white/30 hover:text-white text-xs tracking-[0.15em] uppercase transition-colors duration-300">
                  {{ social.platform }}
                </a>
              }
            </div>
          </div>
        </div>

        <!-- Bottom -->
        <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-white/20 text-xs tracking-widest">
            © {{ year }} {{ data.photographerInfo.brandName }}. Todos los derechos reservados.
          </p>
          <p class="text-white/20 text-xs">
            Fotografía profesional en {{ data.photographerInfo.location }}
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected data = inject(DataService);
  protected year = new Date().getFullYear();

  protected navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/portafolio', label: 'Portafolio' },
    { path: '/sobre-mi', label: 'Sobre mí' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/contacto', label: 'Contacto' },
  ];
}
