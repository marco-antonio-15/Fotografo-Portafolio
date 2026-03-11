import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '@core/services/data.service';
import { LightboxComponent } from '@shared/components/lightbox/lightbox.component';
import { Photo } from '@core/models';

@Component({
  selector: 'app-featured-gallery',
  standalone: true,
  imports: [RouterLink, LightboxComponent],
  template: `
    <section class="bg-[#faf9f7] py-24 px-6">
      <div class="max-w-7xl mx-auto">

        <div class="flex items-end justify-between mb-16">
          <div>
            <p class="text-stone-500 text-xs tracking-[0.3em] uppercase font-medium mb-4">Trabajos destacados</p>
            <h2 class="text-stone-900 text-4xl md:text-5xl font-light"
                style="font-family:'Cormorant Garamond',serif">Portafolio</h2>
          </div>
          <a routerLink="/portafolio"
             class="hidden md:flex items-center gap-3 text-stone-400 hover:text-stone-900 text-xs tracking-[0.2em] uppercase transition-colors duration-300 group">
            Ver todo
            <span class="w-8 h-px bg-stone-400 group-hover:w-12 group-hover:bg-stone-900 transition-all duration-300"></span>
          </a>
        </div>

        <div class="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          @for (photo of photos; track photo.id) {
            <div class="break-inside-avoid cursor-pointer overflow-hidden group relative"
                 (click)="open(photo)">
              <img [src]="photo.src" [alt]="photo.alt" loading="lazy"
                   class="w-full block transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/30 transition-all duration-500 flex items-center justify-center">
                <span class="text-transparent group-hover:text-white text-xs tracking-[0.3em] uppercase transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Ver
                </span>
              </div>
            </div>
          }
        </div>

        <div class="text-center mt-12 md:hidden">
          <a routerLink="/portafolio"
             class="inline-block border border-stone-300 text-stone-700 text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300">
            Ver portafolio completo
          </a>
        </div>
      </div>
    </section>

    <app-lightbox [photo]="selectedPhoto()" (close)="selectedPhoto.set(null)" />
  `,
})
export class FeaturedGalleryComponent {
  protected data = inject(DataService);
  protected selectedPhoto = signal<Photo | null>(null);

  protected get photos(): Photo[] { return this.data.featuredPhotos(); }
  protected open(photo: Photo): void { this.selectedPhoto.set(photo); }
}
