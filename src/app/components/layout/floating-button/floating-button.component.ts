import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-floating-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingButtonComponent {
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
