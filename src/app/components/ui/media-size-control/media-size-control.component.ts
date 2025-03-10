import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MediaSizeManagerService } from '../../../utils/image-size-manager.service';

@Component({
  selector: 'app-media-size-control',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './media-size-control.component.html',
  styleUrl: './media-size-control.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaSizeControlComponent {
  @Input() type: 'product' | 'solution' | 'family' | 'hero' = 'product';
  @Input() showImageControls = true;
  @Input() showVideoControls = true;

  imageWidth = 0;
  imageHeight = 280;
  videoWidth = 0;
  videoHeight = 300;
  videoMinHeight = 500;

  constructor(private readonly mediaSizeManager: MediaSizeManagerService) {}

  ngOnInit() {
    // Inicializar con los valores actuales
    this.mediaSizeManager.sizes$.subscribe((sizes) => {
      if (
        this.type === 'product' ||
        this.type === 'solution' ||
        this.type === 'family'
      ) {
        this.imageWidth = sizes[this.type].imageWidth || 0;
        this.imageHeight = sizes[this.type].imageHeight || 280;
      }

      if (
        this.type === 'product' ||
        this.type === 'solution' ||
        this.type === 'hero'
      ) {
        this.videoWidth = sizes[this.type].videoWidth || 0;
        this.videoHeight =
          sizes[this.type].videoHeight || (this.type === 'hero' ? 70 : 300);

        if (this.type === 'hero') {
          this.videoMinHeight = sizes.hero.videoMinHeight || 500;
        }
      }
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
      case 'hero':
        return 'Hero';
      default:
        return 'Medios';
    }
  }

  updateImageWidth() {
    if (
      this.type === 'product' ||
      this.type === 'solution' ||
      this.type === 'family'
    ) {
      this.mediaSizeManager.updateImageSize(this.type, this.imageWidth);
    }
  }

  updateImageHeight() {
    if (
      this.type === 'product' ||
      this.type === 'solution' ||
      this.type === 'family'
    ) {
      this.mediaSizeManager.updateImageSize(
        this.type,
        undefined,
        this.imageHeight
      );
    }
  }

  updateVideoWidth() {
    if (
      this.type === 'product' ||
      this.type === 'solution' ||
      this.type === 'hero'
    ) {
      this.mediaSizeManager.updateVideoSize(this.type, this.videoWidth);
    }
  }

  updateVideoHeight() {
    if (
      this.type === 'product' ||
      this.type === 'solution' ||
      this.type === 'hero'
    ) {
      this.mediaSizeManager.updateVideoSize(
        this.type,
        undefined,
        this.videoHeight
      );
    }
  }

  updateVideoMinHeight() {
    if (this.type === 'hero') {
      this.mediaSizeManager.updateVideoSize(
        'hero',
        undefined,
        undefined,
        this.videoMinHeight
      );
    }
  }

  reset() {
    // Restablecer solo este tipo
    switch (this.type) {
      case 'product':
        this.imageHeight = 280;
        this.imageWidth = 0;
        this.videoHeight = 300;
        this.videoWidth = 0;
        break;
      case 'solution':
        this.imageHeight = 400;
        this.imageWidth = 0;
        this.videoHeight = 400;
        this.videoWidth = 0;
        break;
      case 'family':
        this.imageHeight = 200;
        this.imageWidth = 0;
        break;
      case 'hero':
        this.videoHeight = 70;
        this.videoWidth = 0;
        this.videoMinHeight = 500;
        break;
    }

    if (
      this.type === 'product' ||
      this.type === 'solution' ||
      this.type === 'family'
    ) {
      this.mediaSizeManager.updateImageSize(
        this.type,
        this.imageWidth,
        this.imageHeight
      );
    }

    if (
      this.type === 'product' ||
      this.type === 'solution' ||
      this.type === 'hero'
    ) {
      this.mediaSizeManager.updateVideoSize(
        this.type,
        this.videoWidth,
        this.videoHeight,
        this.type === 'hero' ? this.videoMinHeight : undefined
      );
    }
  }

  formatLabel(value: number): string {
    return `${value}px`;
  }

  formatWidthLabel(value: number): string {
    return value === 0 ? 'Auto' : `${value}px`;
  }

  formatHeightLabel(value: number): string {
    return `${value}${this.type === 'hero' ? 'vh' : 'px'}`;
  }
}
