import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';

type AnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'zoom-out-in'
  | 'reveal'
  | 'rotate-in'
  | 'flip'
  | 'shrink'
  | 'scale-parallax'
  | 'disappear'
  | 'zoom-fade';

@Directive({
  selector: '[appAnimate]', // Nuevo nombre del selector
  standalone: true,
})
export class AnimateDirective implements OnInit, OnDestroy {
  @Input() appAnimate: AnimationType = 'fade-up'; // Renombrado para coincidir con el selector
  @Input() delay = 0;
  @Input() threshold = 0.2;
  @Input() duration = 3000;
  @Input() once = false;

  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
      return;
    }

    this.setupAnimation();
    this.createObserver();
  }

  private setupAnimation() {
    const el = this.el.nativeElement;

    // Aplicar estilos base con !important para anular cualquier otro estilo
    this.renderer.setStyle(el, 'opacity', '0', 2); // 2 es la bandera para !important
    this.renderer.setStyle(
      el,
      'transition',
      `transform ${this.duration}ms cubic-bezier(0.25, 1, 0.5, 1), opacity ${this.duration}ms ease-in-out`,
      2
    );
    this.renderer.setStyle(el, 'transition-delay', `${this.delay}ms`, 2);
    this.renderer.setStyle(el, 'will-change', 'opacity, transform', 2);

    // Aplicar transformación inicial según el tipo de animación
    switch (this.appAnimate) {
      case 'fade-up':
        this.renderer.setStyle(el, 'transform', 'translateY(40px)', 2);
        break;
      case 'fade-down':
        this.renderer.setStyle(el, 'transform', 'translateY(-40px)', 2);
        break;
      case 'fade-left':
        this.renderer.setStyle(el, 'transform', 'translateX(-40px)', 2);
        break;
      case 'fade-right':
        this.renderer.setStyle(el, 'transform', 'translateX(40px)', 2);
        break;
      case 'zoom-in':
        this.renderer.setStyle(el, 'transform', 'scale(0.95)', 2);
        break;
      case 'zoom-out':
        this.renderer.setStyle(el, 'transform', 'scale(1.05)', 2);
        break;
      case 'zoom-out-in':
        this.renderer.setStyle(el, 'transform', 'scale(0.8)', 2);
        break;
      case 'shrink':
        this.renderer.setStyle(el, 'transform', 'scale(0.4)', 2);
        break;
      case 'reveal':
        this.renderer.setStyle(el, 'clip-path', 'inset(0 100% 0 0)', 2);
        this.renderer.setStyle(el, 'transform', 'scale(1.05)', 2);
        break;
      case 'rotate-in':
        this.renderer.setStyle(el, 'transform', 'rotate(-10deg)', 2);
        break;
      case 'flip':
        this.renderer.setStyle(el, 'transform', 'rotateY(90deg)', 2);
        break;
      case 'scale-parallax':
        this.renderer.setStyle(
          el,
          'transform',
          'scale(0.7) translateY(50px)',
          2
        );
        break;
      case 'disappear':
        this.renderer.setStyle(el, 'opacity', '1', 2);
        this.renderer.setStyle(el, 'transform', 'scale(1)', 2);
        break;
      case 'zoom-fade':
        this.renderer.setStyle(el, 'transform', 'scale(0.7)', 2);
        this.renderer.setStyle(el, 'opacity', '0', 2);
        break;
    }
  }

  private createObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              this.animate();
            });
          } else if (!this.once || !this.hasAnimated) {
            this.resetAnimation();
          }
        });
      },
      {
        threshold: Array.from({ length: 11 }, (_, i) => i / 10), // Reducido para mejor rendimiento
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private animate() {
    const el = this.el.nativeElement;
    this.renderer.setStyle(el, 'opacity', '1', 2);
    this.renderer.setStyle(el, 'transform', 'scale(1)', 2);
    if (this.appAnimate === 'reveal') {
      this.renderer.setStyle(el, 'clip-path', 'inset(0 0 0 0)', 2);
    }
    this.hasAnimated = true;
  }

  private resetAnimation() {
    if (this.once && this.hasAnimated) return;

    const el = this.el.nativeElement;
    if (this.appAnimate === 'disappear' || this.appAnimate === 'zoom-fade') {
      this.renderer.setStyle(el, 'opacity', '0', 2);
      this.renderer.setStyle(el, 'transform', 'scale(0.7)', 2);
    } else {
      this.setupAnimation();
    }
    this.hasAnimated = false;
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
