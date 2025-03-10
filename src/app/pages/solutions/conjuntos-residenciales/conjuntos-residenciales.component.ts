import {
  Component,
  ChangeDetectionStrategy,
  type OnInit,
  type OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolutionTemplateComponent } from '../../../components/templates/solution-template/solution-template.component';
import {
  ContentService,
  SolutionContent,
} from '../../../services/content.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conjuntos-residenciales',
  standalone: true,
  imports: [CommonModule, SolutionTemplateComponent],
  templateUrl: './conjuntos-residenciales.component.html',
  styleUrl: './conjuntos-residenciales.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConjuntosResidencialesComponent implements OnInit, OnDestroy {
  // Inicializar con un objeto vacío que se llenará desde el ContentService
  content: SolutionContent = {} as SolutionContent;
  private contentSubscription?: Subscription;

  constructor(
    private contentService: ContentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadContent();
  }

  ngOnDestroy() {
    if (this.contentSubscription) {
      this.contentSubscription.unsubscribe();
    }
  }

  private loadContent() {
    this.contentSubscription = this.contentService
      .getSolutionContent('conjuntosResidenciales')
      .subscribe({
        next: (content) => {
          this.content = content;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(
            'Error al cargar el contenido de conjuntos residenciales:',
            error
          );
        },
      });
  }
}
