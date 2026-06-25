import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Transaction } from '../../../../core/models/transaction.model';

import { CategoryService } from '../../../../services/category/category';
import { BackendCategory } from '../../../../core/models/backend-category.model';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-modal.html',
  styleUrl: './transaction-modal.css',
})
export class TransactionModal implements OnChanges, OnInit {
  constructor(private categoryService: CategoryService) {}

  @Output()
  close = new EventEmitter<void>();

  @Output()
  save = new EventEmitter<Transaction>();

  @Input()
  transactionData: Transaction | null = null;

  newTransaction = {
    descricao: '',
    valor: 0,
    tipo: 'entrada' as 'entrada' | 'saida',
    categoriaId: 0,
    data: '',
  };

  categories: BackendCategory[] = [];

  readonly incomeCategories = ['Trabalho', 'Investimentos', 'Freelance', 'Salário', 'Vendas'];

  readonly expenseCategories = [
    'Alimentação',
    'Transporte',
    'Saúde',
    'Lazer',
    'Educação',
    'Moradia',
  ];

  get filteredCategories(): BackendCategory[] {
    return this.categories.filter((category) => category.tipo === this.newTransaction.tipo);
  }

  ngOnInit(): void {
    console.log('Modal de transação abriu');

    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;

        console.log('Categorias vindas do backend:', categories);
      },

      error: (error) => {
        console.error('Erro ao buscar categorias:', error);
      },
    });
  }

  closeModal(): void {
    this.close.emit();
  }

saveTransaction(): void {
  console.log('Transação para salvar:', this.newTransaction);

  this.save.emit(this.newTransaction as any);

  this.closeModal();
}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactionData'] && this.transactionData) {
      this.newTransaction = {
        descricao: this.transactionData.descricao,
        valor: this.transactionData.valor,
        tipo: this.transactionData.tipo,
        categoriaId: 0,
        data: this.transactionData.data,
      };
    }
  }
}
