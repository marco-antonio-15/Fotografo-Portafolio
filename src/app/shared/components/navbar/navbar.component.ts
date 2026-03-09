import { Component, HostListener, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      [class.scrolled]="isScrolled()"
    >
      <nav class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <!-- Logo / Brand -->
        <a routerLink="/" class="brand-name text-white tracking-[0.2em] text-sm uppercase font-light">
          {{ data.photographerInfo.brandName }}
        </a>

        <!-- Desktop Nav -->
        <ul class="hidden md:flex items-center gap-10">
          @for (link of navLinks; track link.path) {
            <li>
              <a
                [routerLink]="link.path"
                routerLinkActive="nav-link-active"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                class="nav-link text-white/70 hover:text-white text-xs tracking-[0.15em] uppercase transition-colors duration-300"
              >
                {{ link.label }}
              </a>
            </li>
          }
        </ul>

        <!-- CTA -->
        <a
          routerLink="/contacto"
          class="hidden md:flex items-center gap-2 border border-white/30 hover:border-white text-white text-xs tracking-[0.15em] uppercase px-5 py-2.5 transition-all duration-300 hover:bg-white hover:text-black"
        >
          Cotizar sesión
        </a>

        <!-- Mobile Hamburger -->
        <button
          class="md:hidden text-white flex flex-col gap-1.5 p-2"
          (click)="toggleMenu()"
          aria-label="Menu"
        >
          <span class="block w-6 h-px bg-white transition-all duration-300" [class.rotate-45]="menuOpen()" [class.translate-y-2]="menuOpen()"></span>
          <span class="block w-6 h-px bg-white transition-all duration-300" [class.opacity-0]="menuOpen()"></span>
          <span class="block w-6 h-px bg-white transition-all duration-300" [class.-rotate-45]="menuOpen()" [class.-translate-y-2]="menuOpen()"></span>
        </button>
      </nav>

      <!-- Mobile Menu -->
      @if (menuOpen()) {
        <div class="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 px-6 py-8">
          <ul class="flex flex-col gap-6">
            @for (link of navLinks; track link.path) {
              <li>
                <a
                  [routerLink]="link.path"
                  (click)="menuOpen.set(false)"
                  class="text-white/70 hover:text-white text-sm tracking-[0.2em] uppercase transition-colors"
                >
                  {{ link.label }}
                </a>
              </li>
            }
            <li class="pt-4 border-t border-white/10">
              <a
                routerLink="/contacto"
                (click)="menuOpen.set(false)"
                class="inline-block border border-white/30 text-white text-xs tracking-[0.15em] uppercase px-5 py-3"
              >
                Cotizar sesión
              </a>
            </li>
          </ul>
        </div>
      }
    </header>
  `,
  styles: [`
    header {
      background: transparent;
    }
    header.scrolled {
      background: rgba(0, 0, 0, 0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .nav-link-active {
      color: white !important;
      position: relative;
    }
    .nav-link-active::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 1px;
      background: white;
    }
  `],
})
export class NavbarComponent {
  protected data = inject(DataService);
  protected isScrolled = signal(false);
  protected menuOpen = signal(false);

  protected navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/portafolio', label: 'Portafolio' },
    { path: '/sobre-mi', label: 'Sobre mí' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/contacto', label: 'Contacto' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }
}
