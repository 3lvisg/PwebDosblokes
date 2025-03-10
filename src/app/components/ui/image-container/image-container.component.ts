import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSizeDirective } from '../../../directives/image-size.directive';

@Component({
  selector: 'app-image-container',
  standalone: true,
  imports: [CommonModule, ImageSizeDirective],
  templateUrl: './image-container.component.html',
  styleUrl: './image-container.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageContainerComponent {
  @Input() src!: string;
  @Input() alt = '';
  @Input() width?: number;
  @Input() height?: number;
  @Input() aspectRatio?: string;
  @Input() rounded = true;
  @Input() type: 'product' | 'solution' | 'family' = 'product';
  @Input() objectFit: 'contain' | 'cover' | 'fill' | 'scale-down' = 'contain';
}
