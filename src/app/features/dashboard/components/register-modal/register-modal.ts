import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-modal.html',
  styleUrl: './register-modal.css',
})
export class RegisterModal {
  constructor(private fb: FormBuilder) {
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

    const { senha, confirmarSenha } = this.registerForm.value;

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem');

      return;
    }

    console.log('Cadastro:', this.registerForm.value);
  }
}
