import { Component, inject, OnInit } from '@angular/core';
import { InstagramService } from '@core/services/instagram.service';

@Component({
  selector: 'app-instagram-feed',
  standalone: true,
  template: `
    <section class="bg-white py-24 px-6 border-t border-stone-100">
      <div class="max-w-7xl mx-auto">

        <!-- Header -->
        <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <p class="text-stone-600 text-xs tracking-[0.35em] uppercase mb-3 font-semibold">Sígueme</p>
            <h2 class="text-stone-900 text-4xl font-light"
                style="font-family:'Cormorant Garamond',serif">Instagram</h2>
          </div>

          <!-- Handle dinámico del JSON -->
          <a [href]="instagramUrl" target="_blank" rel="noopener"
             class="flex items-center gap-3 text-stone-500 hover:text-stone-900 text-xs tracking-[0.2em] uppercase transition-colors duration-300 group font-medium">
            <span>&#64;{{ ig.username() }}</span>
            <span class="w-8 h-px bg-stone-400 group-hover:w-12 group-hover:bg-stone-900 transition-all duration-300"></span>
          </a>
        </div>

        <!-- Loading skeleton -->
        @if (ig.loading()) {
          <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1">
            @for (s of skeletons; track $index) {
              <div class="aspect-square bg-stone-100 animate-pulse"></div>
            }
          </div>
        }

        <!-- Error -->
        @if (ig.error()) {
          <div class="border border-dashed border-red-200 bg-red-50 p-8 text-center">
            <p class="text-stone-700 text-sm font-medium mb-1">No se pudo cargar el feed</p>
            <p class="text-stone-400 text-xs">Verifica tu conexión o el Feed ID de Behold.</p>
          </div>
        }

        <!-- Grid real -->
        @if (!ig.loading() && !ig.error() && ig.imagePosts().length > 0) {
          <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1">
            @for (post of ig.imagePosts().slice(0, 12); track post.id) {
              <a [href]="post.permalink" target="_blank" rel="noopener"
                 class="aspect-square overflow-hidden group relative block bg-stone-100">
                <img [src]="post.displayUrl"
                     [alt]="post.prunedCaption || 'Instagram'"
                     loading="lazy"
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div class="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-all duration-300 flex items-center justify-center">
                  <svg class="w-6 h-6 text-transparent group-hover:text-white transition-all duration-300"
                       fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </a>
            }
          </div>

          <!-- Follow CTA -->
          <div class="text-center mt-10">
            <a [href]="instagramUrl" target="_blank" rel="noopener"
               class="inline-flex items-center gap-3 border border-stone-300 text-stone-700 text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300 font-medium">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Seguir en Instagram
            </a>
          </div>
        }
      </div>
    </section>
  `,
})
export class InstagramFeedComponent implements OnInit {
  protected ig = inject(InstagramService);
  protected skeletons = Array(12).fill(0);

  protected get instagramUrl(): string {
    return `https://instagram.com/${this.ig.username()}`;
  }

  ngOnInit(): void {
    this.ig.loadFeed();
  }
}
