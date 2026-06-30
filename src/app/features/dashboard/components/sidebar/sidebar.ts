import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(private router: Router) {}

  @Input()
  isOpen = false;

  @Output()
  linkClick = new EventEmitter<void>();

  fecharMenu(): void {
    this.linkClick.emit();
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    this.router.navigate(['/auth/login']);
  }
}
