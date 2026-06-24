import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth/auth';
import { Router } from '@angular/router';
import { RegisterModal } from '../../../../shared/components/register-modal/register-modal';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, RegisterModal],

  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  erroLogin: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  entrar(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      return;
    }

    const email = this.loginForm.value.email;

    const senha = this.loginForm.value.senha;

    this.authService.login(email, senha).subscribe({
      next: (loginSucesso) => {
        if (loginSucesso) {
          this.erroLogin = '';

          this.router.navigate(['/dashboard']);

          return;
        }

        this.erroLogin = 'Email ou senha incorretos';
      },

      error: () => {
        this.erroLogin = 'Erro ao realizar login';
      },
    });
  }

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

      senha: [
        '',
        [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)],
      ],
    });
  }

  public registerModalOpen = false;

  openRegisterModal(): void {
    this.registerModalOpen = true;
  }

  closeRegisterModal(): void {
    this.registerModalOpen = false;
  }
}
