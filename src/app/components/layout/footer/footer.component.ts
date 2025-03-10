import { Component, ChangeDetectionStrategy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { MatIconModule } from "@angular/material/icon"
import { MatDialog, MatDialogModule } from "@angular/material/dialog"
import { MatButtonModule } from "@angular/material/button"
import { PaymentInfoDialogComponent } from "../../dialogs/payment-info-dialog/payment-info-dialog.component"

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatDialogModule, MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  constructor(private dialog: MatDialog) {}

  openPaymentInfo() {
    this.dialog.open(PaymentInfoDialogComponent, {
      width: "500px",
      panelClass: "custom-dialog",
    })
  }
}