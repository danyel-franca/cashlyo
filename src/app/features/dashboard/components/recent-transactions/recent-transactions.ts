import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TransactionService } from '../../../../services/transaction';

@Component({
  selector: 'app-recent-transactions',
  standalone: true,

  imports: [CommonModule],

  templateUrl: './recent-transactions.html',
  styleUrl: './recent-transactions.css',
})
export class RecentTransactionsComponent implements OnInit {
  constructor(private transactionService: TransactionService) {}

  recentTransactions: any[] = [];

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe((transactions) => {
      this.recentTransactions = transactions

        .slice(-5)

        .reverse();
    });
  }

  transactions = [
    {
      tipo: 'entrada',
      descricao: 'Salário',
      categoria: 'Trabalho',
      valor: '+ R$ 5.000',
      data: 'Hoje',
    },

    {
      tipo: 'saida',
      descricao: 'Netflix',
      categoria: 'Assinatura',
      valor: '- R$ 39',
      data: 'Ontem',
    },

    {
      tipo: 'saida',
      descricao: 'Mercado',
      categoria: 'Alimentação',
      valor: '- R$ 420',
      data: '2 dias atrás',
    },

    {
      tipo: 'entrada',
      descricao: 'Freelance',
      categoria: 'Projetos',
      valor: '+ R$ 850',
      data: '3 dias atrás',
    },
  ];
}
