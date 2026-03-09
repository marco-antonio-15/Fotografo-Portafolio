import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../../../core/services/data.service';
import { LightboxComponent } from '../../../../shared/components/lightbox/lightbox.component';
import { Photo } from '../../../../core/models';

@Component({
  selector: 'app-featured-gallery',
  standalone: true,
  imports: [RouterLink, LightboxComponent],
  template: `
    <section class="bg-black py-24 px-6">
      <div class="max-w-7xl mx-auto">

        <!-- Header -->
        <div class="flex items-end justify-between mb-16">
          <div>
            <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-4">Trabajos destacados</p>
            <h2 class="text-white text-4xl md:text-5xl font-light" style="font-family: 'Cormorant Garamond', serif;">
              Portafolio
            </h2>
          </div>
          <a
            routerLink="/portafolio"
            class="hidden md:flex items-center gap-3 text-white/40 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors duration-300 group"
          >
            Ver todo
            <span class="w-8 h-px bg-white/40 group-hover:w-12 group-hover:bg-white transition-all duration-300"></span>
          </a>
        </div>

        <!-- Masonry Grid -->
        <div class="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          @for (photo of photos; track photo.id) {
            <div
              class="break-inside-avoid cursor-pointer overflow-hidden group relative"
              (click)="openLightbox(photo)"
            >
              <img
                [src]="photo.src"
                [alt]="photo.alt"
                loading="lazy"
                class="w-full block transition-transform duration-700 group-hover:scale-105"
              />
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                <span class="text-white/0 group-hover:text-white/90 text-xs tracking-[0.3em] uppercase transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Ver
                </span>
              </div>
            </div>
          }
        </div>

        <!-- Mobile see all -->
        <div class="text-center mt-12 md:hidden">
          <a
            routerLink="/portafolio"
            class="inline-block border border-white/30 text-white text-xs tracking-[0.2em] uppercase px-8 py-4"
          >
            Ver portafolio completo
          </a>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <app-lightbox
      [photo]="selectedPhoto()"
      (close)="selectedPhoto.set(null)"
    />
  `,
})
export class FeaturedGalleryComponent {
  protected data = inject(DataService);
  protected selectedPhoto = signal<Photo | null>(null);

  protected get photos() {
    return this.data.featuredPhotos();
  }

  protected openLightbox(photo: Photo): void {
    this.selectedPhoto.set(photo);
  }
}
