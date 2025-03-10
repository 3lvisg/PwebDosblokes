import { Component, Input, ChangeDetectionStrategy } from "@angular/core"
import { CommonModule } from "@angular/common"

interface Badge {
  text: string
  color: string
}

interface FamiliaContent {
  title: string
  badges: Badge[]
}

@Component({
  selector: "app-familia-section",
  standalone: true,
  imports: [CommonModule],
  templateUrl: './familia-section.component.html',
  styleUrl: './familia-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FamiliaSectionComponent {
  @Input() content!: FamiliaContent
}
