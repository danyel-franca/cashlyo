import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  @Input()
  isOpen = false;

  @Output()
  linkClick = new EventEmitter<void>();

  fecharMenu(): void {
    this.linkClick.emit();
  }

}
