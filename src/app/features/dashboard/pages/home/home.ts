import { Component, OnInit } from '@angular/core';
import { FinanceCardComponent } from '../../components/finance-card/finance-card';
import { FinanceChartComponent } from '../../components/finance-chart/finance-chart';
import { RecentTransactionsComponent } from '../../components/recent-transactions/recent-transactions';

@Component({
  selector: 'app-home',
  imports: [FinanceCardComponent, FinanceChartComponent, RecentTransactionsComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  balance = 0;

  totalIncome = 0;

  totalExpense = 0;

  ngOnInit(): void {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

    console.log(transactions);

    this.calculateFinancialSummary(transactions);
  }

  calculateFinancialSummary(transactions: any[]) {
    this.totalIncome = transactions

      .filter((transaction) => transaction.tipo === 'entrada')

      .reduce(
        (total, transaction) =>
          total +
          Number(
            transaction.valor

              .replace('R$', '')

              .replace('+', '')

              .replace('-', '')

              .trim(),
          ),

        0,
      );

    this.totalExpense = transactions

      .filter((transaction) => transaction.tipo === 'saida')

      .reduce(
        (total, transaction) =>
          total +
          Number(
            transaction.valor

              .replace('R$', '')

              .replace('+', '')

              .replace('-', '')

              .trim(),
          ),

        0,
      );

    this.balance = this.totalIncome - this.totalExpense;
  }
}
