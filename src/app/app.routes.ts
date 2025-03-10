import type { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GimnasiosComponent } from './pages/solutions/gimnasios/gimnasios.component';
import { ParquesComponent } from './pages/solutions/parques/parques.component';
import { ParqueaderosComponent } from './pages/solutions/parqueaderos/parqueaderos.component';
import { InstitutosComponent } from './pages/solutions/institutos/institutos.component';
import { ConjuntosResidencialesComponent } from './pages/solutions/conjuntos-residenciales/conjuntos-residenciales.component';
import { ProductsComponent } from './pages/products/products.component';
import { AboutComponent } from './pages/about/about.component';
import { WarrantyComponent } from './pages/warranty/warranty.component';
import { ImageSettingsComponent } from './pages/admin/image-settings/image-settings.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Dosblokes',
  },
  {
    path: 'quienes-somos',
    component: AboutComponent,
    title: 'Quiénes Somos - Dosblokes',
  },
  {
    path: 'garantia',
    component: WarrantyComponent,
    title: 'Política de Garantía - Dosblokes',
  },
  {
    path: 'soluciones/gimnasios',
    component: GimnasiosComponent,
    title: 'Gimnasios',
  },
  {
    path: 'soluciones/parques',
    component: ParquesComponent,
    title: 'Parques',
  },
  {
    path: 'soluciones/parqueaderos',
    component: ParqueaderosComponent,
    title: 'Parqueaderos',
  },
  {
    path: 'soluciones/institutos',
    component: InstitutosComponent,
    title: 'Institutos',
  },
  {
    path: 'soluciones/conjuntos-residenciales',
    component: ConjuntosResidencialesComponent,
    title: 'Conjuntos Residenciales',
  },
  {
    path: 'productos',
    component: ProductsComponent,
    title: 'Productos',
  },
  {
    path: 'admin/image-settings',
    component: ImageSettingsComponent,
    title: 'Configuración de Imágenes - Dosblokes',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
