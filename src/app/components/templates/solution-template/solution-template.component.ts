import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  ViewChildren,
  ElementRef,
  OnInit,
  AfterViewInit,
  HostListener,
  QueryList,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AnimateDirective } from '../../../directives/animate.directive';
import { MatDialog } from '@angular/material/dialog';
import { SolutionInfoDialogComponent } from '../../../components/dialogs/solution-info-dialog/solution-info-dialog.component';

interface VideoContent {
  title?: string;
  url: string;
  urlMobile?: string;
  thumbnail: string;
}

interface SolutionContent {
  title: string;
  subtitle?: string;
  subtitle2?: string;
  description: string;
  description2?: string;
  description3?: string;
  mainVideo: VideoContent;
  videos: VideoContent[];
  additionalInfo?: {
    title: string;
    description: string;
    image: string;
  };
}

@Component({
  selector: 'app-solution-template',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, AnimateDirective],
  templateUrl: './solution-template.component.html',
  styleUrl: './solution-template.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionTemplateComponent implements OnInit, AfterViewInit {
  @Input() content!: SolutionContent;
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<
    ElementRef<HTMLVideoElement>
  >;
  @ViewChildren('videoContainer') videoContainers!: QueryList<
    ElementRef<HTMLDivElement>
  >;

  isVideoPlaying = false; // Estado del video principal
  isVideoPlayingArray: boolean[] = []; // Estado de los videos adicionales
  isMobile = false;
  currentVideoSrc = '';
  private intersectionObserver!: IntersectionObserver;

  constructor(
    private readonly dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
    // Inicializa el array de estados de reproducción
    this.isVideoPlayingArray = new Array(this.content.videos?.length || 0).fill(
      false
    );
  }

  ngAfterViewInit() {
    this.playVideoAutomatically();
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 576;
    this.currentVideoSrc =
      this.isMobile && this.content.mainVideo.urlMobile
        ? this.content.mainVideo.urlMobile
        : this.content.mainVideo.url;
    this.cdr.detectChanges();
  }

  private playVideoAutomatically() {
    if (!this.heroVideo) return;

    const video = this.heroVideo.nativeElement;
    video
      .play()
      .then(() => {
        this.isVideoPlaying = true;
        this.cdr.detectChanges();
      })
      .catch((error) => {
        console.error('Error al reproducir el video principal:', error);
        this.isVideoPlaying = false;
        this.cdr.detectChanges();
      });
  }

  private setupIntersectionObserver() {
    if (!this.videoContainers) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const videoElement = entry.target.querySelector(
          'video'
        ) as HTMLVideoElement;
        if (!videoElement) return;

        if (entry.isIntersecting) {
          videoElement
            .play()
            .then(() => {
              // Actualizar el estado de reproducción
              if (videoElement === this.heroVideo?.nativeElement) {
                this.isVideoPlaying = true;
              } else {
                // Encontrar el índice del video
                const index = this.videoPlayers
                  .toArray()
                  .findIndex((player) => player.nativeElement === videoElement);
                if (index !== -1) {
                  this.isVideoPlayingArray[index] = true;
                }
              }
              this.cdr.detectChanges();
            })
            .catch((err) => console.error('Error al reproducir video:', err));
        } else {
          videoElement.pause();
          // Actualizar el estado de reproducción
          if (videoElement === this.heroVideo?.nativeElement) {
            this.isVideoPlaying = false;
          } else {
            // Encontrar el índice del video
            const index = this.videoPlayers
              .toArray()
              .findIndex((player) => player.nativeElement === videoElement);
            if (index !== -1) {
              this.isVideoPlayingArray[index] = false;
            }
          }
          this.cdr.detectChanges();
        }
      });
    }, options);

    // Observar el video principal
    if (this.heroVideo) {
      this.intersectionObserver.observe(
        this.heroVideo.nativeElement.parentElement as HTMLElement
      );
    }

    // Observar cada contenedor de video secundario
    this.videoContainers.forEach((container) => {
      this.intersectionObserver.observe(container.nativeElement);
    });
  }

  toggleVideo(videoElement: HTMLVideoElement, index?: number) {
    if (videoElement.paused) {
      videoElement
        .play()
        .then(() => {
          if (videoElement === this.heroVideo?.nativeElement) {
            this.isVideoPlaying = true;
          } else if (index !== undefined) {
            this.isVideoPlayingArray[index] = true;
          }
          this.cdr.detectChanges();
        })
        .catch((err) => console.error('Error al reproducir video:', err));
    } else {
      videoElement.pause();
      if (videoElement === this.heroVideo?.nativeElement) {
        this.isVideoPlaying = false;
      } else if (index !== undefined) {
        this.isVideoPlayingArray[index] = false;
      }
      this.cdr.detectChanges();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }
}
