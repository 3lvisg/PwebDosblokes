import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MediaSizeControlComponent } from '../../../components/ui/media-size-control/media-size-control.component';
import { MediaSizeManagerService } from '../../../utils/image-size-manager.service';

@Component({
  selector: 'app-media-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MediaSizeControlComponent,
  ],
  templateUrl: './media-settings.component.html',
  styleUrl: './media-settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaSettingsComponent {
  constructor(private readonly mediaSizeManager: MediaSizeManagerService) {}

  resetAllSizes() {
    this.mediaSizeManager.resetSizes();
  }
}
