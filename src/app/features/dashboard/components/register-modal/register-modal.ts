import { Component, EventEmitter, Output } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../../../services/auth/auth';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-modal.html',
  styleUrl: './register-modal.css',
})
export class RegisterModal {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      senha: [
        '',
        [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)],
      ],

      confirmarSenha: ['', Validators.required],
    });
  }

  @Output()
  close = new EventEmitter<void>();

  registerForm: FormGroup;

  cadastrar(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      return;
    }

    const { nome, email, senha, confirmarSenha } = this.registerForm.value;

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem');

      return;
    }

    const payload = {
      nome,
      email,
      senha,
      status: true,
      foto: '',
      empresaId: 7,
    };

    this.authService.register(payload).subscribe({
      next: (user) => {
        console.log('Usuário criado:', user);

        alert('Conta criada com sucesso!');

        this.close.emit();
      },

      error: (error: any) => {
        console.error('Erro ao criar usuário:', error);

        alert('Erro ao criar conta.');
      },
    });
  }
}
