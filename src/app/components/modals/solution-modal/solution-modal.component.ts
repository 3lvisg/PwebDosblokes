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
import { RouterModule } from '@angular/router';
import { Solution } from '../../../interfaces/solution';
import { AnimateDirective } from '../../../directives/animate.directive';
import { ImageContainerComponent } from '../../ui/image-container/image-container.component';
interface SolutionModalData {
  link: string;
}

@Component({
  selector: 'app-solution-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    AnimateDirective,
    ImageContainerComponent,
    RouterModule,
  ],
  templateUrl: './solution-modal.component.html',
  styleUrl: './solution-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionModalComponent {
  @Input() isOpen = false;
  @Input() solution: Solution | null = null;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  getSolutionLink(): string {
    if (!this.solution) return '';

    // Normalizar el título para comparación (minúsculas, sin acentos)
    const normalizeText = (text: string): string => {
      return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    };

    const title = this.solution.title ? normalizeText(this.solution.title) : '';

    // Mapeo directo basado en el título normalizado
    if (title.includes('gimnasio')) {
      return '/soluciones/gimnasios';
    } else if (title.includes('parque') && !title.includes('parqueadero')) {
      return '/soluciones/parques';
    } else if (title.includes('parqueadero')) {
      return '/soluciones/parqueaderos';
    } else if (
      title.includes('instituto') ||
      title.includes('colegio') ||
      title.includes('escuela')
    ) {
      return '/soluciones/institutos';
    } else if (title.includes('conjunto') || title.includes('residencial')) {
      return '/soluciones/conjuntos-residenciales';
    }

    // Si no se encuentra ninguna coincidencia, redirigir a la página de productos
    console.warn(
      'No se pudo determinar la ruta para la solución:',
      this.solution
    );
    return '/productos';
  }
}
