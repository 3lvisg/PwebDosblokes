import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../interfaces/product';
import { AnimateDirective } from '../../../directives/animate.directive';
import { ImageContainerComponent } from '../../ui/image-container/image-container.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    AnimateDirective,
    ImageContainerComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() delay = 0;
  @Output() viewDetails = new EventEmitter<Product>();

  onDetails() {
    this.viewDetails.emit(this.product);
  }
}
