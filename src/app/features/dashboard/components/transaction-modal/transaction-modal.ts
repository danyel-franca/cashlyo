import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Transaction } from '../../../../core/models/transaction.model';

@Component({
  selector: 'app-transaction-modal',

  imports: [CommonModule, FormsModule],

  templateUrl: './transaction-modal.html',

  styleUrl: './transaction-modal.css',
})
export class TransactionModal implements OnChanges {
  @Output()
  close = new EventEmitter<void>();

  @Output()
  save = new EventEmitter<Transaction>();

  @Input()
  transactionData: Transaction | null = null;

  newTransaction: Partial<Transaction> = {
    descricao: '',

    valor: 0,

    tipo: 'entrada',

    categoria: '',

    data: '',
  };

  readonly incomeCategories = ['Trabalho', 'Investimentos', 'Freelance', 'Salário', 'Vendas'];

  readonly expenseCategories = [
    'Alimentação',
    'Transporte',
    'Saúde',
    'Lazer',
    'Educação',
    'Moradia',
  ];

  get filteredCategories(): string[] {
    return this.newTransaction.tipo === 'entrada' ? this.incomeCategories : this.expenseCategories;
  }

  closeModal(): void {
    this.close.emit();
  }

  saveTransaction(): void {
    this.save.emit(this.newTransaction as Transaction);

    this.closeModal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactionData'] && this.transactionData) {
      this.newTransaction = {
        ...this.transactionData,
      };
    }
  }
}
