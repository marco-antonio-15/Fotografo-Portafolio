import { Component, HostListener, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { DataService } from '@core/services/data.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            [class]="headerClass()">
      <nav class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <!-- Brand -->
        <a routerLink="/"
           [class]="isTransparent() ? 'text-white' : 'text-stone-900'"
           class="tracking-[0.15em] uppercase transition-colors duration-500"
           style="font-family:'Cormorant Garamond',serif; font-size:1.05rem; font-weight:500;">
          {{ data.photographerInfo.brandName }}
        </a>

        <!-- Desktop Nav -->
        <ul class="hidden md:flex items-center gap-10">
          @for (link of navLinks; track link.path) {
            <li>
              <a [routerLink]="link.path"
                 routerLinkActive="nav-active"
                 [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                 [class]="linkClass()"
                 class="text-xs tracking-[0.18em] uppercase transition-colors duration-300 font-medium">
                {{ link.label }}
              </a>
            </li>
          }
        </ul>

        <!-- CTA -->
        <a routerLink="/contacto"
           [class]="isTransparent() ? 'bg-white text-stone-900 hover:bg-stone-100' : 'bg-stone-900 text-white hover:bg-stone-700'"
           class="hidden md:inline-flex text-xs tracking-[0.15em] uppercase px-5 py-2.5 transition-all duration-300 font-medium">
          Cotizar sesión
        </a>

        <!-- Mobile hamburger -->
        <button class="md:hidden flex flex-col gap-1.5 p-2"
                (click)="toggleMenu()" aria-label="Menu">
          <span class="block w-6 h-0.5 transition-all duration-300"
                [class]="isTransparent() ? 'bg-white' : 'bg-stone-800'"
                [style.transform]="menuOpen() ? 'rotate(45deg) translateY(8px)' : 'none'"></span>
          <span class="block w-6 h-0.5 transition-all duration-300"
                [class]="isTransparent() ? 'bg-white' : 'bg-stone-800'"
                [style.opacity]="menuOpen() ? '0' : '1'"></span>
          <span class="block w-6 h-0.5 transition-all duration-300"
                [class]="isTransparent() ? 'bg-white' : 'bg-stone-800'"
                [style.transform]="menuOpen() ? 'rotate(-45deg) translateY(-8px)' : 'none'"></span>
        </button>
      </nav>

      <!-- Mobile menu -->
      @if (menuOpen()) {
        <div class="md:hidden bg-white border-t border-stone-100 px-6 py-8 shadow-lg">
          <ul class="flex flex-col gap-6">
            @for (link of navLinks; track link.path) {
              <li>
                <a [routerLink]="link.path" (click)="closeMenu()"
                   class="text-stone-700 hover:text-stone-900 text-sm tracking-[0.2em] uppercase transition-colors font-medium">
                  {{ link.label }}
                </a>
              </li>
            }
            <li class="pt-4 border-t border-stone-100">
              <a routerLink="/contacto" (click)="closeMenu()"
                 class="inline-block bg-stone-900 text-white text-xs tracking-[0.15em] uppercase px-5 py-3 font-medium">
                Cotizar sesión
              </a>
            </li>
          </ul>
        </div>
      }
    </header>
  `,
  styles: [`
    .nav-active { color: inherit !important; position: relative; opacity: 1 !important; }
    .nav-active::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0; right: 0;
      height: 1.5px;
      background: currentColor;
    }
  `],
})
export class NavbarComponent implements OnInit, OnDestroy {
  protected data = inject(DataService);
  private router = inject(Router);

  protected isScrolled = signal(false);
  protected isHomePage = signal(false);
  protected menuOpen = signal(false);

  private routerSub?: Subscription;

  protected navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/portafolio', label: 'Portafolio' },
    { path: '/sobre-mi', label: 'Sobre mí' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/contacto', label: 'Contacto' },
  ];

  ngOnInit(): void {
    // Detectar ruta inicial
    this.checkRoute(this.router.url);

    // Detectar cambios de ruta
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.checkRoute(e.urlAfterRedirects);
        // Al cambiar de ruta, resetear scroll position
        this.isScrolled.set(window.scrollY > 60);
        this.closeMenu();
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  private checkRoute(url: string): void {
    this.isHomePage.set(url === '/' || url === '');
  }

  // Transparente solo en Home sin scroll
  protected isTransparent(): boolean {
    return this.isHomePage() && !this.isScrolled();
  }

  protected headerClass(): string {
    if (this.isTransparent()) {
      return 'bg-transparent';
    }
    return 'bg-white/97 backdrop-blur-md border-b border-stone-200 shadow-sm';
  }

  protected linkClass(): string {
    if (this.isTransparent()) {
      return 'text-white/90 hover:text-white drop-shadow-sm';
    }
    return 'text-stone-600 hover:text-stone-900';
  }

  protected toggleMenu(): void { this.menuOpen.set(!this.menuOpen()); }
  protected closeMenu(): void { this.menuOpen.set(false); }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 60);
  }
}
