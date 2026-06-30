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
import { CategoryService } from '../../../../services/category/category';
import { BackendCategory } from '../../../../core/models/backend-category.model';
import {
  BackendTransaction,
  CreateBackendTransaction,
} from '../../../../core/models/backend-transaction.model';

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
  save = new EventEmitter<CreateBackendTransaction>();

  @Input()
  transactionData: BackendTransaction | null = null;

  newTransaction = {
    descricao: '',
    valor: 0,
    tipo: 'entrada' as 'entrada' | 'saida',
    categoriaId: 0,
    data: '',
  };

  categories: BackendCategory[] = [];

  get filteredCategories(): BackendCategory[] {
    return this.categories.filter((category) => category.tipo === this.newTransaction.tipo);
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactionData'] && this.transactionData) {
      this.newTransaction = {
        descricao: this.transactionData.descricao,
        valor: this.transactionData.valor,
        tipo: 'entrada',
        categoriaId: this.transactionData.categoriaId,
        data: this.transactionData.data,
      };
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  saveTransaction(): void {
    const transaction: CreateBackendTransaction = {
      descricao: this.newTransaction.descricao,
      valor: Number(this.newTransaction.valor),
      data: this.newTransaction.data,
      categoriaId: Number(this.newTransaction.categoriaId),
      usuarioId: Number(localStorage.getItem('userId')),
      contaId: null,
    };

    this.save.emit(transaction);

    this.closeModal();
  }
}
