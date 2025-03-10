import {
  Component,
  Input,
  type ElementRef,
  ViewChild,
  type AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent implements AfterViewInit {
  @Input() src!: string;
  @Input() poster?: string;
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  isPlaying = false;
  isMuted = false;
  progress = 0;
  currentTime = 0;
  duration = 0;

  ngAfterViewInit() {
    const video = this.videoElement.nativeElement;
    video.addEventListener('ended', () => (this.isPlaying = false));
  }

  togglePlay() {
    const video = this.videoElement.nativeElement;
    if (video.paused) {
      video.play();
      this.isPlaying = true;
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
}
