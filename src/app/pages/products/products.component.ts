import {
  Component,
  type OnInit,
  type OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/products/product-card/product-card.component';
import { ProductModalComponent } from '../../components/modals/product-modal/product-modal.component';
import { Product } from '../../interfaces/product';
import { AnimateDirective } from '../../directives/animate.directive';
import { ContentService } from '../../services/content.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    ProductModalComponent,
    AnimateDirective,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  isModalOpen = false;
  selectedProduct: Product | null = null;
  products: Product[] = [];
  private contentSubscription?: Subscription;

  constructor(
    private contentService: ContentService,
    private cdr: ChangeDetectorRef
  ) {}

  get filteredProducts(): Product[] {
    return this.products;
  }

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy() {
    if (this.contentSubscription) {
      this.contentSubscription.unsubscribe();
    }
  }

  private loadProducts() {
    this.contentSubscription = this.contentService.getContent().subscribe({
      next: (content) => {
        if (content.products?.items) {
          this.products = content.products.items;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      },
    });
  }

  openProductModal(product: Product) {
    this.selectedProduct = product;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedProduct = null;
    document.body.style.overflow = '';
  }
}
