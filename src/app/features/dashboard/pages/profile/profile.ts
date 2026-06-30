import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../../../services/auth/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  constructor(private authService: AuthService) {}

  user: User | null = null;

  confirmPassword = '';

  formData = {
    nome: '',
    email: '',
    senha: '',
  };

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));

    if (!userId) {
      return;
    }

    this.authService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;

        this.formData = {
          nome: user.nome,
          email: user.email,
          senha: '',
        };
      },
    });
  }

  saveProfile(): void {
    if (!this.user) {
      return;
    }

    if (this.formData.senha && this.formData.senha !== this.confirmPassword) {
      return;
    }

    const payload = {
      nome: this.formData.nome,
      email: this.formData.email,
      senha: this.formData.senha,
      status: this.user.status,
      foto: this.user.foto || '',
      empresaId: this.user.empresaId,
    };

    this.authService.updateUser(this.user.id, payload).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;

        this.formData = {
          nome: updatedUser.nome,
          email: updatedUser.email,
          senha: '',
        };

        this.confirmPassword = '';

        localStorage.setItem('userName', updatedUser.nome);
        localStorage.setItem('userEmail', updatedUser.email);
      },
    });
  }
}
