import { Component, ChangeDetectionStrategy, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatButtonModule } from "@angular/material/button"
import { VideoPlayerComponent } from "../../ui/video-player/video-player.component"

interface HeroContent {
  title: string
  subtitle: string
  cta: string
  videoUrl: string
}

@Component({
  selector: "app-hero-section",
  standalone: true,
  imports: [CommonModule, MatButtonModule, VideoPlayerComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  @Input() content!: HeroContent
}
