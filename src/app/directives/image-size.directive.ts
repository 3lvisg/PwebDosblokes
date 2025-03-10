import {
  Directive,
  ElementRef,
  Input,
  type OnInit,
  Renderer2,
} from '@angular/core';

/**
 * Directiva para controlar el tamaño de las imágenes por grupo
 * Uso: <img appImageSize="product" [width]="300" [height]="200">
 */
@Directive({
  selector: '[appImageSize]',
  standalone: true,
})
export class ImageSizeDirective implements OnInit {
  @Input() appImageSize: 'product' | 'solution' | 'family' = 'product';
  @Input() width?: number;
  @Input() height?: number;
  @Input() objectFit: 'contain' | 'cover' | 'fill' | 'scale-down' = 'contain';

  constructor(
    private readonly el: ElementRef<HTMLImageElement>,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit() {
    // Aplicar estilos base
    this.renderer.setStyle(this.el.nativeElement, 'object-fit', this.objectFit);

    // Aplicar dimensiones específicas si se proporcionan
    if (this.width) {
      this.renderer.setStyle(this.el.nativeElement, 'width', `${this.width}px`);
    }

    if (this.height) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'height',
        `${this.height}px`
      );
    }

    // Aplicar estilos según el grupo
    switch (this.appImageSize) {
      case 'product':
        if (!this.width) {
          this.renderer.setStyle(
            this.el.nativeElement,
            'width',
            'var(--product-card-image-width)'
          );
        }
        if (!this.height) {
          this.renderer.setStyle(
            this.el.nativeElement,
            'height',
            'var(--product-card-image-height)'
          );
        }
        break;

      case 'solution':
        if (!this.width) {
          this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
        }
        if (!this.height) {
          this.renderer.setStyle(
            this.el.nativeElement,
            'height',
            'var(--solution-image-height)'
          );
        }
        break;

      case 'family':
        if (!this.width) {
          this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
        }
        if (!this.height) {
          this.renderer.setStyle(
            this.el.nativeElement,
            'height',
            'var(--family-card-image-height)'
          );
        }
        break;
    }

    // Asegurar que la imagen tenga un fondo mientras carga
    this.renderer.setStyle(this.el.nativeElement, 'background', '#f5f5f7');
  }
}
