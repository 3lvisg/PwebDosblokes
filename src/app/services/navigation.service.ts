import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  private menuState = new BehaviorSubject<boolean>(false)
  private submenuState = new BehaviorSubject<string | null>(null)

  menuState$ = this.menuState.asObservable()
  submenuState$ = this.submenuState.asObservable()

  toggleMenu(isOpen?: boolean) {
    const newState = isOpen ?? !this.menuState.value
    this.menuState.next(newState)
    document.body.style.overflow = newState ? "hidden" : ""
  }

  toggleSubmenu(id: string | null) {
    this.submenuState.next(id === this.submenuState.value ? null : id)
  }

  closeAll() {
    this.menuState.next(false)
    this.submenuState.next(null)
    document.body.style.overflow = ""
  }
}

