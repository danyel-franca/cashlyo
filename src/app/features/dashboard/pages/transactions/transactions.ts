import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { TransactionModal } from '../../components/transaction-modal/transaction-modal';
import { ConfirmModal } from '../../components/confirm-modal/confirm-modal';
import { TransactionService } from '../../../../services/transaction';
import { ToastComponent } from '../../../../shared/components/toast/toast';

@Component({
  selector: 'app-transactions',
  standalone: true,

  imports: [CommonModule, TransactionModal, ConfirmModal, FormsModule, ToastComponent],

  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class TransactionsComponent implements OnInit {
  isModalOpen = false;

  editingTransaction: any = null;

  isConfirmModalOpen = false;

  transactionToDelete: any = null;

  searchTerm = '';

  selectedFilter = 'Todos';

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;

    this.editingTransaction = null;
  }

  addTransaction(transaction: any) {
    const formattedTransaction = {
      ...transaction,

      tipo: transaction.tipo,

      valor:
        transaction.tipo === 'entrada' ? `+ R$ ${transaction.valor}` : `- R$ ${transaction.valor}`,

      status: 'Concluído',
    };

    if (this.editingTransaction) {
      const index = this.transactions.findIndex(
        (item) =>
          item.descricao === this.editingTransaction.descricao &&
          item.data === this.editingTransaction.data,
      );

      this.transactions[index] = formattedTransaction;
    } else {
      this.transactions.unshift(formattedTransaction);
    }

    this.transactionService.updateTransactions(this.transactions);

    this.editingTransaction = null;

    this.showToast(
      this.editingTransaction ? 'Transação atualizada com sucesso' : 'Transação criada com sucesso',
    );
  }

  deleteTransaction(transaction: any) {
    this.transactionToDelete = transaction;

    this.isConfirmModalOpen = true;
  }

  confirmDelete() {
    this.transactions = this.transactions.filter(
      (item) =>
        !(
          item.descricao === this.transactionToDelete.descricao &&
          item.data === this.transactionToDelete.data
        ),
    );

    this.transactionService.updateTransactions(this.transactions);

    this.closeConfirmModal();

    this.showToast(
      'Transação deletada com sucesso',

      'error',
    );
  }

  closeConfirmModal() {
    this.isConfirmModalOpen = false;

    this.transactionToDelete = null;
  }

  editTransaction(transaction: any) {
    this.editingTransaction = transaction;

    this.isModalOpen = true;
  }

  transactions = [
    {
      tipo: 'entrada',
      descricao: 'Salário',
      categoria: 'Trabalho',
      valor: '+ R$ 5.000',
      data: '07 Mai 2026',
      status: 'Concluído',
    },

    {
      tipo: 'saida',
      descricao: 'Netflix',
      categoria: 'Assinatura',
      valor: '- R$ 39',
      data: '06 Mai 2026',
      status: 'Concluído',
    },

    {
      tipo: 'saida',
      descricao: 'Mercado',
      categoria: 'Alimentação',
      valor: '- R$ 420',
      data: '05 Mai 2026',
      status: 'Pendente',
    },

    {
      tipo: 'entrada',
      descricao: 'Freelance',
      categoria: 'Projetos',
      valor: '+ R$ 850',
      data: '03 Mai 2026',
      status: 'Concluído',
    },
  ];

  get filteredTransactions() {
    return this.transactions.filter((transaction) => {
      const matchesSearch = transaction.descricao
        .toLowerCase()

        .includes(this.searchTerm.toLowerCase());

      const matchesFilter =
        this.selectedFilter === 'Todos' || transaction.tipo === this.selectedFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe((transactions) => {
      this.transactions = transactions;
    });
  }

  constructor(private transactionService: TransactionService) {}

  toastVisible = false;

  toastMessage = '';

  toastType = 'success';

  showToast(
    message: string,

    type = 'success',
  ) {
    this.toastMessage = message;

    this.toastType = type;

    this.toastVisible = true;

    setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }
}
