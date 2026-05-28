import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { TransactionModal } from '../../components/transaction-modal/transaction-modal';

import { ConfirmModal } from '../../components/confirm-modal/confirm-modal';

import { ToastComponent } from '../../../../shared/components/toast/toast';

import { TransactionService } from '../../../../services/transaction';

import { Transaction } from '../../../../core/models/transaction.model';

@Component({
  selector: 'app-transactions',

  standalone: true,

  imports: [CommonModule, FormsModule, TransactionModal, ConfirmModal, ToastComponent],

  templateUrl: './transactions.html',

  styleUrl: './transactions.css',
})

export class TransactionsComponent implements OnInit {
  constructor(private transactionService: TransactionService) {}

  isModalOpen = false;

  isConfirmModalOpen = false;

  searchTerm = '';

  selectedFilter = 'Todos';

  editingTransaction: Transaction | null = null;

  transactionToDelete: Transaction | null = null;

  transactions: Transaction[] = [];

  toastVisible = false;

  toastMessage = '';

  toastType = 'success';

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe((transactions) => {
      this.transactions = transactions;
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;

    this.editingTransaction = null;
  }

  addTransaction(transaction: Transaction): void {
    const formattedTransaction: Transaction = {
      ...transaction,

      id: this.editingTransaction ? this.editingTransaction.id : Date.now(),

      valor: Number(transaction.valor),

      status: 'Concluído',
    };

    if (this.editingTransaction) {
      this.transactions = this.transactions.map((item) =>
        item.id === this.editingTransaction?.id ? formattedTransaction : item,
      );

      this.showToast('Transação atualizada com sucesso');
    } else {
      this.transactions.unshift(formattedTransaction);

      this.showToast('Transação criada com sucesso');
    }

    this.transactionService.updateTransactions(this.transactions);

    this.closeModal();
  }

  editTransaction(transaction: Transaction): void {
    this.editingTransaction = transaction;

    this.isModalOpen = true;
  }

  deleteTransaction(transaction: Transaction): void {
    this.transactionToDelete = transaction;

    this.isConfirmModalOpen = true;
  }

  confirmDelete(): void {
    if (!this.transactionToDelete) return;

    this.transactions = this.transactions.filter(
      (transaction) => transaction.id !== this.transactionToDelete?.id,
    );

    this.transactionService.updateTransactions(this.transactions);

    this.closeConfirmModal();

    this.showToast(
      'Transação deletada com sucesso',

      'error',
    );
  }

  closeConfirmModal(): void {
    this.isConfirmModalOpen = false;

    this.transactionToDelete = null;
  }

  get filteredTransactions(): Transaction[] {
    return this.transactions.filter((transaction) => {
      const matchesSearch = transaction.descricao
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      const matchesFilter =
        this.selectedFilter === 'Todos' || transaction.tipo === this.selectedFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }

  showToast(
    message: string,

    type = 'success',
  ): void {
    this.toastMessage = message;

    this.toastType = type;

    this.toastVisible = true;

    setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }
}
