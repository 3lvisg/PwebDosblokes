import {
  Component,
  ViewChild,
  type ElementRef,
  type OnInit,
  type OnDestroy,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SolutionModalComponent } from '../../components/modals/solution-modal/solution-modal.component';
import { Solution } from '../../interfaces/solution';
import { Product } from '../../interfaces/product';
import { AnimateDirective } from '../../directives/animate.directive';
import { ImageContainerComponent } from '../../components/ui/image-container/image-container.component';
import { ContentService } from '../../services/content.service';
import { Subscription } from 'rxjs';

// Modificar la clase HomeComponent para usar ContentService
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    SolutionModalComponent,
    AnimateDirective,
    ImageContainerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  isVideoPlaying = true;
  isMobile = false;
  currentVideoSrc = '';
  currentIndex = 0;
  itemsPerView = 4;
  translateX = 0;
  familyCurrentIndex = 0;
  familyTranslateX = 0;
  itemWidth = 280;
  isModalOpen = false;
  window = window;

  // Propiedades para almacenar datos del content.json
  heroTitle = 'Diseño que inspira';
  heroSubtitle = 'Descubre la nueva generación de tecnología';
  solutionsTitle = 'DESCUBRE NUESTRAS SOLUCIONES';
  familyTitle = 'CONOCE LA FAMILIA';

  solutions: Solution[] = [];
  products: Product[] = [];
  selectedSolution: Solution | null = null;

  private contentSubscription?: Subscription;

  constructor(
    private readonly dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef,
    private readonly contentService: ContentService
  ) {}

  ngOnInit() {
    this.loadContent();
    this.checkScreenSize();
    this.onResize(); // Inicializar el ancho del item
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
    if (this.contentSubscription) {
      this.contentSubscription.unsubscribe();
    }
  }

  private loadContent() {
    this.contentSubscription = this.contentService
      .getContent()
      .subscribe((content) => {
        // Cargar datos del hero
        if (content.home?.hero) {
          this.heroTitle = content.home.hero.title || 'Diseño que inspira';
          this.heroSubtitle =
            content.home.hero.subtitle ||
            'Descubre la nueva generación de tecnología';
          this.currentVideoSrc =
            this.isMobile && content.home.hero.videoUrlMobile
              ? content.home.hero.videoUrlMobile
              : content.home.hero.videoUrl;
        }

        // Cargar datos de soluciones
        if (content.home?.solutions) {
          this.solutionsTitle =
            content.home.solutions.title || 'DESCUBRE NUESTRAS SOLUCIONES';

          if (
            content.home.solutions.items &&
            content.home.solutions.items.length > 0
          ) {
            this.solutions = content.home.solutions.items.map((item) => ({
              category: item.category || '',
              title: item.title || '',
              subtitle: item.subtitle || '',
              image: item.image || '',
              description: item.description || '',
            }));
          }
        }

        // Cargar datos de productos
        if (content.home?.products && content.home.products.items) {
          this.familyTitle = content.home.products.title || 'CONOCE LA FAMILIA';

          if (
            content.home.products.items &&
            content.home.products.items.length > 0
          ) {
            this.products = content.home.products.items.map((item) => ({
              title: item.name || '',
              subtitle: item.name || '',
              image: item.image || '',
              description: '',
              category: '',
              link: item.link || '/productos',
            }));
          }
        }

        this.preloadImages();
        this.cdr.detectChanges();
      });
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 576;

    // Actualizar la URL del video según el tamaño de pantalla
    this.contentService.getContent().subscribe((content) => {
      if (content.home?.hero) {
        this.currentVideoSrc =
          this.isMobile && content.home.hero.videoUrlMobile
            ? content.home.hero.videoUrlMobile
            : content.home.hero.videoUrl;
      } else {
        // Fallback a las URLs hardcodeadas si no hay datos en content.json
        this.currentVideoSrc = this.isMobile
          ? 'assets/videos/presentacion-mobile.mp4'
          : 'assets/videos/presentacion.mp4';
      }
      this.cdr.detectChanges();
    });

    this.updateItemsPerView();
    this.cdr.detectChanges();
  }

  toggleVideo() {
    const video = this.heroVideo.nativeElement;
    if (video.paused) {
      video.play();
      this.isVideoPlaying = true;
    } else {
      video.pause();
      this.isVideoPlaying = false;
    }
  }

  ngAfterViewInit() {
    this.updateCarouselDimensions();
  }

  private updateCarouselDimensions() {
    const itemWidth = window.innerWidth <= 768 ? window.innerWidth - 80 : 280;
    this.familyTranslateX = -this.familyCurrentIndex * (itemWidth + 20); // 20 es el gap
  }

  private updateItemsPerView() {
    const width = window.innerWidth;
    if (width < 576) {
      this.itemsPerView = 1;
    } else if (width < 992) {
      this.itemsPerView = 2;
    } else if (width < 1200) {
      this.itemsPerView = 3;
    } else {
      this.itemsPerView = 4;
    }
    this.updateTranslateX();
  }

  private updateTranslateX() {
    const cardWidth =
      document.querySelector('.solutions__card')?.clientWidth ?? 0;
    const gap = window.innerWidth < 576 ? 16 : 12; // Usar el mismo gap que definimos en CSS
    this.translateX = -(this.currentIndex * (cardWidth + gap));
  }

  navigate(direction: 'prev' | 'next') {
    const cardWidth =
      document.querySelector('.solutions__card')?.clientWidth ?? 0;
    const gap = window.innerWidth < 576 ? 16 : 12; // Usar el mismo gap que definimos en CSS
    const visibleItems = this.isMobile ? 1 : this.itemsPerView;
    const totalWidth = this.solutions.length * (cardWidth + gap);
    const maxScroll = totalWidth - visibleItems * (cardWidth + gap);

    if (direction === 'next') {
      if (this.currentIndex >= this.solutions.length - visibleItems) {
        // Si estamos en la última card, volver al inicio suavemente
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    } else if (this.currentIndex <= 0) {
      // Si estamos en la primera card, ir a la última
      this.currentIndex = this.solutions.length - visibleItems;
    } else {
      this.currentIndex--;
    }

    // Actualizar la posición
    this.updateTranslateX();
  }

  // Propiedad calculada para el índice máximo
  get maxIndex(): number {
    return Math.max(
      0,
      this.solutions.length - (this.isMobile ? 1 : this.itemsPerView)
    );
  }

  openSolutionModal(solution: Solution) {
    this.selectedSolution = solution;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden'; // Previene el scroll del body
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedSolution = null;
    document.body.style.overflow = ''; // Restaura el scroll del body
  }

  navigateFamily(direction: 'prev' | 'next') {
    const visibleItems = window.innerWidth <= 768 ? 1 : 4;
    const itemWidth = window.innerWidth <= 768 ? window.innerWidth - 80 : 280;
    const totalWidth = this.products.length * itemWidth;
    const maxScroll = totalWidth - visibleItems * itemWidth;

    if (direction === 'next') {
      this.familyTranslateX -= itemWidth;
      // Si llegamos al final, volvemos al inicio suavemente
      if (Math.abs(this.familyTranslateX) >= maxScroll) {
        this.familyTranslateX = 0;
      }
    } else if (this.familyTranslateX >= 0) {
      // Si estamos al inicio, vamos al final
      this.familyTranslateX = -maxScroll;
    } else {
      this.familyTranslateX += itemWidth;
    }

    // Asegurarnos de que el valor esté dentro de los límites
    this.familyTranslateX = Math.max(
      -maxScroll,
      Math.min(0, this.familyTranslateX)
    );
  }

  @HostListener('window:resize')
  onResize() {
    // Actualizar dimensiones al cambiar el tamaño de la ventana
    const visibleItems = window.innerWidth <= 768 ? 1 : 4;
    const itemWidth = window.innerWidth <= 768 ? window.innerWidth - 80 : 280;
    const totalWidth = this.products.length * itemWidth;
    const maxScroll = totalWidth - visibleItems * itemWidth;

    // Ajustar la posición si está fuera de los límites
    this.familyTranslateX = Math.max(
      -maxScroll,
      Math.min(0, this.familyTranslateX)
    );

    // También actualizar el carrusel de soluciones
    this.updateTranslateX();
  }

  private preloadImages() {
    // Precargar imágenes de soluciones
    this.solutions.forEach((solution) => {
      const img = new Image();
      img.src = solution.image;
    });

    // Precargar imágenes de productos
    this.products.forEach((product) => {
      const img = new Image();
      img.src = product.image;
    });
  }
}
