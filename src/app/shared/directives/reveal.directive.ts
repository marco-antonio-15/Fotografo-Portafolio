import {
  Directive, ElementRef, Input, OnInit, OnDestroy, inject
} from '@angular/core';

export type RevealAnimation = 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'stagger';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);

  // Tipo de animación
  @Input('appReveal') animation: RevealAnimation = 'slide-up';
  // Delay en ms (para stagger manual)
  @Input() revealDelay = 0;
  // Umbral: qué % del elemento debe ser visible para disparar
  @Input() revealThreshold = 0.15;

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const el = this.el.nativeElement as HTMLElement;

    // Estado inicial — invisible
    this.setInitialState(el);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => this.animate(el), this.revealDelay);
            this.observer?.unobserve(el); // solo una vez
          }
        });
      },
      { threshold: this.revealThreshold, rootMargin: '0px 0px -40px 0px' }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setInitialState(el: HTMLElement): void {
    el.style.transition = `opacity 0.7s ease, transform 0.7s ease`;
    el.style.opacity = '0';

    switch (this.animation) {
      case 'slide-up':
        el.style.transform = 'translateY(40px)'; break;
      case 'slide-left':
        el.style.transform = 'translateX(-40px)'; break;
      case 'slide-right':
        el.style.transform = 'translateX(40px)'; break;
      case 'stagger':
        el.style.transform = 'translateY(30px)'; break;
      case 'fade':
      default:
        el.style.transform = 'none'; break;
    }
  }

  private animate(el: HTMLElement): void {
    el.style.opacity = '1';
    el.style.transform = 'none';
  }
}
