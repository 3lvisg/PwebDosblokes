import {
  Component,
  ChangeDetectionStrategy,
  type OnInit,
  type OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ContentService } from '../../../services/content.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isSolutionsSubmenuOpen = false;
  menuItems: any[] = [];
  private contentSubscription?: Subscription;

  constructor(
    private contentService: ContentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Cargar elementos de menú predeterminados para asegurar que algo se muestre inmediatamente
    this.menuItems = [
      {
        title: 'Inicio',
        path: '/',
      },
      {
        title: 'Soluciones',
        path: '#',
        submenu: [
          {
            title: 'Gimnasios',
            path: '/soluciones/gimnasios',
          },
          {
            title: 'Parques',
            path: '/soluciones/parques',
          },
          {
            title: 'Parqueaderos',
            path: '/soluciones/parqueaderos',
          },
          {
            title: 'Institutos',
            path: '/soluciones/institutos',
          },
          {
            title: 'Conjuntos Residenciales',
            path: '/soluciones/conjuntos-residenciales',
          },
        ],
      },
      {
        title: 'Productos',
        path: '/productos',
      },
    ];

    // Luego cargar desde el servicio
    this.loadMenuItems();
  }

  ngOnDestroy() {
    if (this.contentSubscription) {
      this.contentSubscription.unsubscribe();
    }
  }

  private loadMenuItems() {
    this.contentSubscription = this.contentService
      .getContent()
      .subscribe((content) => {
        if (content.navigation?.menu) {
          this.menuItems = content.navigation.menu;
          // Forzar la detección de cambios para actualizar la vista
          this.cdr.detectChanges();
        }
      });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.cdr.detectChanges();
  }

  toggleSubmenu(submenu: string) {
    if (submenu === 'solutions') {
      this.isSolutionsSubmenuOpen = !this.isSolutionsSubmenuOpen;
      this.cdr.detectChanges();
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isSolutionsSubmenuOpen = false;
    this.cdr.detectChanges();
  }
}
