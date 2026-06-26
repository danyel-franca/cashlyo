import { Component, OnInit } from '@angular/core';

import { AuthService, User } from '../../../../services/auth/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  constructor(private authService: AuthService) {}

  user: User | null = null;

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));

    if (!userId) {
      return;
    }

    this.authService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;

        console.log('Usuário logado:', user);
      },

      error: (error: any) => {
        console.error('Erro ao buscar usuário:', error);
      },
    });
  }
}
