import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ImageSizeControlComponent } from '../../../components/ui/image-size-control/image-size-control.component';
import { ImageSizeManagerService } from '../../../utils/image-size-manager.service';

@Component({
  selector: 'app-image-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ImageSizeControlComponent,
  ],
  templateUrl: './image-settings.component.html',
  styleUrl: './image-settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSettingsComponent {
  constructor(private readonly imageSizeManager: ImageSizeManagerService) {}

  resetAllSizes() {
    this.imageSizeManager.resetSizes();
  }
}
