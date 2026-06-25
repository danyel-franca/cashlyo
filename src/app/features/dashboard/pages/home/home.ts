import { Component, OnInit } from '@angular/core';

import { FinanceCardComponent } from '../../components/finance-card/finance-card';
import { FinanceChartComponent } from '../../components/finance-chart/finance-chart';
import { RecentTransactionsComponent } from '../../components/recent-transactions/recent-transactions';

import { TransactionService } from '../../../../services/transaction/transaction';

import { Transaction } from '../../../../core/models/transaction.model';

@Component({
  selector: 'app-home',

  imports: [FinanceCardComponent, FinanceChartComponent, RecentTransactionsComponent],

  templateUrl: './home.html',

  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(private transactionService: TransactionService) {}

  balance = 0;

  totalIncome = 0;

  totalExpense = 0;

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe((transactions) => {
      this.calculateFinancialSummary(transactions);
    });
  }

  private calculateFinancialSummary(transactions: Transaction[]): void {
    this.totalIncome = transactions
      .filter((transaction) => transaction.tipo === 'entrada')
      .reduce((total, transaction) => total + transaction.valor, 0);

    this.totalExpense = transactions
      .filter((transaction) => transaction.tipo === 'saida')
      .reduce((total, transaction) => total + transaction.valor, 0);

    this.balance = this.totalIncome - this.totalExpense;
  }
}
