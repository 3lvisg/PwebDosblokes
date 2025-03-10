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
  selector: 'app-institutos',
  standalone: true,
  imports: [CommonModule, SolutionTemplateComponent],
  templateUrl: './institutos.component.html',
  styleUrl: './institutos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstitutosComponent implements OnInit, OnDestroy {
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
      .getSolutionContent('institutos')
      .subscribe({
        next: (content) => {
          this.content = content;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error al cargar el contenido de institutos:', error);
        },
      });
  }
}
