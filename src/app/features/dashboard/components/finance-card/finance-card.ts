import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finance-card',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './finance-card.html',

  styleUrl: './finance-card.css',
})
export class FinanceCardComponent {
  @Input()
  titulo = '';

  @Input()
  valor = 0;

  @Input()
  tipo: 'saldo' | 'entrada' | 'saida' = 'saldo';
}
