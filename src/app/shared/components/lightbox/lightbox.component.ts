import { Component, input, output, HostListener } from '@angular/core';
import { Photo } from '@core/models';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  template: `
    @if (photo()) {
      <div class="fixed inset-0 z-[100] bg-stone-950/90 backdrop-blur-sm flex items-center justify-center p-4 lightbox-fade"
           (click)="close.emit()">
        <div class="relative max-w-5xl max-h-[90vh] w-full" (click)="$event.stopPropagation()">
          <img [src]="photo()!.src" [alt]="photo()!.alt"
               class="max-h-[85vh] w-auto mx-auto object-contain shadow-2xl" />
          <button (click)="close.emit()"
                  class="absolute -top-12 right-0 text-white/60 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors">
            Cerrar ✕
          </button>
          <p class="text-center text-stone-400 text-xs tracking-widest uppercase mt-4">
            {{ photo()!.alt }}
          </p>
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .lightbox-fade { animation: fadeIn 0.2s ease; }
  `],
})
export class LightboxComponent {
  photo = input<Photo | null>(null);
  close = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void { this.close.emit(); }
}
