import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  constructor(private router: Router) { }

  @Output()
  menuClick = new EventEmitter<void>();

  userName = 'Usuário';

  userEmail = '';

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || 'Usuário';

    this.userEmail = localStorage.getItem('userEmail') || '';
  }

  abrirMenu(): void {
    this.menuClick.emit();
  }

  goToProfile(): void {
    this.router.navigate(['/dashboard/profile']);
  }

  get initials(): string {
    const names = this.userName.trim().split(' ');

    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }

    return (
      names[0].charAt(0) +
      names[names.length - 1].charAt(0)
    ).toUpperCase();
  }
}