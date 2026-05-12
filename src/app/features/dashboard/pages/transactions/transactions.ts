import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { TransactionModal } from '../../components/transaction-modal/transaction-modal';
import { ConfirmModal } from '../../components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-transactions',
  standalone: true,

  imports: [CommonModule, TransactionModal, ConfirmModal, FormsModule],

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
      const index = this.transactions.indexOf(this.editingTransaction);

      this.transactions[index] = formattedTransaction;
    } else {
      this.transactions.unshift(formattedTransaction);
    }

    localStorage.setItem(
      'transactions',

      JSON.stringify(this.transactions),
    );

    this.editingTransaction = null;
  }

  deleteTransaction(transaction: any) {
    this.transactionToDelete = transaction;

    this.isConfirmModalOpen = true;
  }

  confirmDelete() {
    this.transactions = this.transactions.filter((item) => item !== this.transactionToDelete);

    localStorage.setItem(
      'transactions',

      JSON.stringify(this.transactions),
    );

    this.closeConfirmModal();
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
    const savedTransactions = localStorage.getItem('transactions');

    if (savedTransactions) {
      this.transactions = JSON.parse(savedTransactions);
    }
  }
}
