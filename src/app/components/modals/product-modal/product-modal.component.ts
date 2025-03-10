import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../interfaces/product';
import { AnimateDirective } from '../../../directives/animate.directive';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, AnimateDirective],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductModalComponent {
  @Input() isOpen = false;
  @Input() product: Product | null = null;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}
