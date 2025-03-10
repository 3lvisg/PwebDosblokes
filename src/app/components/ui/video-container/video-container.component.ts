import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  type ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-video-container',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './video-container.component.html',
  styleUrl: './video-container.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoContainerComponent {
  @Input() src!: string;
  @Input() poster?: string;
  @Input() width?: number;
  @Input() height?: number;
  @Input() minHeight?: number;
  @Input() aspectRatio?: string;
  @Input() rounded = true;
  @Input() type: 'hero' | 'solution' | 'product' = 'hero';
  @Input() showControls = true;
  @Input() showOverlay = false;
  @Input() muted = true;
  @Input() loop = true;
  @Input() autoplay = true;
  @Input() playsinline = true;

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  isPlaying = false;
  isMuted = true;
  progress = 0;
  currentTime = 0;
  duration = 0;

  ngAfterViewInit() {
    const video = this.videoElement.nativeElement;
    video.addEventListener('ended', () => (this.isPlaying = false));

    // Inicializar estado
    this.isMuted = this.muted;

    // Iniciar reproducción si autoplay está habilitado
    if (this.autoplay) {
      this.playVideo();
    }
  }

  playVideo() {
    const video = this.videoElement.nativeElement;
    video
      .play()
      .then(() => {
        this.isPlaying = true;
      })
      .catch((error) => {
        console.error('Error al reproducir el video:', error);
      });
  }

  togglePlay() {
    const video = this.videoElement.nativeElement;
    if (video.paused) {
      this.playVideo();
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }

  toggleMute() {
    const video = this.videoElement.nativeElement;
    video.muted = !video.muted;
    this.isMuted = video.muted;
  }

  onTimeUpdate() {
    const video = this.videoElement.nativeElement;
    this.progress = (video.currentTime / video.duration) * 100;
    this.currentTime = video.currentTime;
  }

  onLoadedMetadata() {
    this.duration = this.videoElement.nativeElement.duration;
  }

  seekVideo(event: MouseEvent) {
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const pos = (event.clientX - rect.left) / rect.width;

    const video = this.videoElement.nativeElement;
    video.currentTime = pos * video.duration;
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}
