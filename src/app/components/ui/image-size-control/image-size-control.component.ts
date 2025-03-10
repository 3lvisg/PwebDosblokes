import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageSizeManagerService } from '../../../utils/image-size-manager.service';

@Component({
  selector: 'app-image-size-control',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './image-size-control.component.html',
  styleUrl: './image-size-control.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSizeControlComponent {
  @Input() type: 'product' | 'solution' | 'family' = 'product';
  @Input() showWidthControl = false;

  width = 280;
  height = 280;

  constructor(private readonly imageSizeManager: ImageSizeManagerService) {}

  ngOnInit() {
    // Inicializar con los valores actuales
    this.imageSizeManager.sizes$.subscribe((sizes) => {
      this.width = sizes[this.type].width || 280;
      this.height = sizes[this.type].height || 280;
    });
  }

  get typeLabel(): string {
    switch (this.type) {
      case 'product':
        return 'Productos';
      case 'solution':
        return 'Soluciones';
      case 'family':
        return 'Familia';
      default:
        return 'Imágenes';
    }
  }

  updateHeight() {
    this.imageSizeManager.updateSize(this.type, undefined, this.height);
  }

  updateWidth() {
    this.imageSizeManager.updateSize(this.type, this.width);
  }

  reset() {
    // Restablecer solo este tipo
    switch (this.type) {
      case 'product':
        this.height = 280;
        this.width = 280;
        break;
      case 'solution':
        this.height = 400;
        this.width = 0;
        break;
      case 'family':
        this.height = 200;
        this.width = 0;
        break;
    }

    this.imageSizeManager.updateSize(this.type, this.width, this.height);
  }

  formatLabel(value: number): string {
    return `${value}px`;
  }
}
