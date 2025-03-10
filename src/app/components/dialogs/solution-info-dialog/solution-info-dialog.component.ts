import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface SolutionInfo {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  description2: string;
  image: string;
  secondaryImage: string; // Añadido para la segunda imagen
}

@Component({
  selector: 'app-solution-info-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './solution-info-dialog.component.html',
  styleUrl: './solution-info-dialog.component.css',
})
export class SolutionInfoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SolutionInfo,
    private readonly dialogRef: MatDialogRef<SolutionInfoDialogComponent> // Marcado como readonly
  ) {}

  close() {
    this.dialogRef.close();
  }
}
