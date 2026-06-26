import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { TransactionModal } from '../../components/transaction-modal/transaction-modal';

import { ConfirmModal } from '../../components/confirm-modal/confirm-modal';

import { TransactionService } from '../../../../services/transaction/transaction';

import { Transaction } from '../../../../core/models/transaction.model';

import { BackendTransaction } from '../../../../core/models/backend-transaction.model';

import { BackendCategory } from '../../../../core/models/backend-category.model';
import { CategoryService } from '../../../../services/category/category';

@Component({
  selector: 'app-transactions',

  standalone: true,

  imports: [CommonModule, FormsModule, TransactionModal, ConfirmModal],

  templateUrl: './transactions.html',

  styleUrl: './transactions.css',
})
export class TransactionsComponent implements OnInit {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
  ) {}

  isModalOpen = false;

  isConfirmModalOpen = false;

  searchTerm = '';

  selectedFilter = 'Todos';

  editingTransaction: BackendTransaction | null = null;

  transactionToDelete: BackendTransaction | null = null;

  transactions: BackendTransaction[] = [];

  categories: BackendCategory[] = [];

  ngOnInit(): void {
    this.transactionService.getBackendTransactions().subscribe({
      next: (transactions) => {
        console.log('Transações do backend:', transactions);

        this.transactions = transactions as BackendTransaction[];
      },

      error: (error) => {
        console.error('Erro ao buscar transações:', error);
      },
    });

    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Erro ao buscar categorias:', error);
      },
    });

    this.loadTransactions();

    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error: any) => {
        console.error('Erro ao buscar categorias:', error);
      },
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;

    this.editingTransaction = null;
  }

  addTransaction(transaction: any): void {
    const payload = {
      descricao: transaction.descricao,
      valor: Number(transaction.valor),
      data: transaction.data,
      categoriaId: Number(transaction.categoriaId),
      usuarioId: 2,
      contaId: null,
    };

    if (this.editingTransaction) {
      this.transactionService.updateTransaction(this.editingTransaction.id, payload).subscribe({
        next: () => {
          this.loadTransactions();
          this.closeModal();
        },
        error: (error: any) => {
          console.error('Erro ao atualizar transação:', error);
        },
      });

      return;
    }

    this.transactionService.createTransaction(payload).subscribe({
      next: () => {
        this.loadTransactions();
        this.closeModal();
      },
      error: (error: any) => {
        console.error('Erro ao criar transação:', error);
      },
    });
  }

  editTransaction(transaction: BackendTransaction): void {
    this.editingTransaction = transaction;

    this.isModalOpen = true;
  }

  deleteTransaction(transaction: BackendTransaction): void {
    this.transactionToDelete = transaction;

    this.isConfirmModalOpen = true;
  }

  confirmDelete(): void {
    if (!this.transactionToDelete) {
      return;
    }

    this.transactionService.deleteTransaction(this.transactionToDelete.id).subscribe({
      next: () => {
        this.transactions = this.transactions.filter(
          (transaction) => transaction.id !== this.transactionToDelete?.id,
        );

        this.closeConfirmModal();
      },

      error: (error: any) => {
        console.error('Erro ao excluir transação:', error);
      },
    });
  }

  closeConfirmModal(): void {
    this.isConfirmModalOpen = false;

    this.transactionToDelete = null;
  }

  getTransactionType(transaction: BackendTransaction): 'entrada' | 'saida' {
    const category = this.categories.find((category) => category.id === transaction.categoriaId);

    return category?.tipo || 'saida';
  }

  loadTransactions(): void {
    this.transactionService.getBackendTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
      },
      error: (error: any) => {
        console.error('Erro ao buscar transações:', error);
      },
    });
  }

  get filteredTransactions(): BackendTransaction[] {
    return this.transactions.filter((transaction) => {
      const matchesSearch = transaction.descricao
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      const matchesFilter =
        this.selectedFilter === 'Todos' ||
        this.getTransactionType(transaction) === this.selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }
}
