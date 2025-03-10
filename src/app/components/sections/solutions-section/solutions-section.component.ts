import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../ui/card/card.component';

interface Solution {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface SolutionsContent {
  title: string;
  items: Solution[];
}

@Component({
  selector: 'app-solutions-section',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './solutions-section.component.html',
  styleUrl: './solutions-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionsSectionComponent {
  @Input() content!: SolutionsContent;
}
