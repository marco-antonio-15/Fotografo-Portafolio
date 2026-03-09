import { Component, inject, signal } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { LightboxComponent } from '../../shared/components/lightbox/lightbox.component';
import { Photo, PhotoCategory } from '../../core/models';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [LightboxComponent],
  template: `
    <div class="bg-black min-h-screen pt-24">

      <!-- Page header -->
      <div class="text-center py-16 px-6 border-b border-white/10">
        <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-4">Mi trabajo</p>
        <h1 class="text-white text-5xl md:text-6xl font-light" style="font-family: 'Cormorant Garamond', serif;">
          Portafolio
        </h1>
      </div>

      <div class="sticky top-[72px] z-40 bg-black/95 backdrop-blur-md border-b border-white/10 px-6 py-5">
        <div class="max-w-7xl mx-auto flex gap-6 overflow-x-auto scrollbar-hide">
          @for (cat of data.categories; track cat.id) {
            <button
              (click)="setCategory(cat.id)"
              [class]="getFilterClass(cat.id)"
            >
              {{ cat.label }}
              <span class="ml-2 opacity-40">{{ getCount(cat.id) }}</span>
            </button>
          }
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-3">
          @for (photo of data.filteredPhotos(); track photo.id) {
            <div
              class="break-inside-avoid cursor-pointer overflow-hidden group relative"
              (click)="selectedPhoto.set(photo)"
            >
              <img
                [src]="photo.src"
                [alt]="photo.alt"
                loading="lazy"
                class="w-full block transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end p-4">
                <span class="text-transparent group-hover:text-white/80 text-xs tracking-[0.2em] uppercase transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {{ photo.alt }}
                </span>
              </div>
            </div>
          }
        </div>

        @if (data.filteredPhotos().length === 0) {
          <div class="text-center py-24">
            <p class="text-white/30 text-sm tracking-widest">No hay fotos en esta categoría aún.</p>
          </div>
        }
      </div>
    </div>

    <app-lightbox
      [photo]="selectedPhoto()"
      (close)="selectedPhoto.set(null)"
    />
  `,
  styles: [`
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `],
})
export class PortfolioComponent {
  protected data = inject(DataService);
  protected selectedPhoto = signal<Photo | null>(null);

  protected getFilterClass(id: PhotoCategory | 'all'): string {
    const base = 'flex-shrink-0 text-xs tracking-[0.2em] uppercase transition-all duration-300 pb-2 border-b ';
    return base + (this.data.activeCategory() === id
      ? 'text-white border-white'
      : 'text-white/30 border-transparent');
  }

  protected setCategory(id: PhotoCategory | 'all'): void {
    this.data.setCategory(id);
  }

  protected getCount(id: PhotoCategory | 'all'): number {
    if (id === 'all') return this.data.photos.length;
    return this.data.photos.filter((p) => p.category === id).length;
  }
}
