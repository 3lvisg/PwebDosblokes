import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AnimateDirective } from '../../../directives/animate.directive';

@Component({
  selector: 'app-payment-info-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, AnimateDirective],
  templateUrl: './payment-info-dialog.component.html',
  styleUrl: './payment-info-dialog.component.css',
})
export class PaymentInfoDialogComponent {}
