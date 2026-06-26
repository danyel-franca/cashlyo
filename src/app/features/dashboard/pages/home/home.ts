import { Component, OnInit } from '@angular/core';

import { FinanceCardComponent } from '../../components/finance-card/finance-card';
import { FinanceChartComponent } from '../../components/finance-chart/finance-chart';
import { RecentTransactionsComponent } from '../../components/recent-transactions/recent-transactions';

import { TransactionService } from '../../../../services/transaction/transaction';
import { CategoryService } from '../../../../services/category/category';

import { BackendTransaction } from '../../../../core/models/backend-transaction.model';
import { BackendCategory } from '../../../../core/models/backend-category.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FinanceCardComponent, FinanceChartComponent, RecentTransactionsComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
  ) {}

  balance = 0;

  totalIncome = 0;

  totalExpense = 0;

  categories: BackendCategory[] = [];

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;

        this.transactionService.getBackendTransactions().subscribe({
          next: (transactions) => {
            this.calculateFinancialSummary(transactions);
          },

          error: (error: any) => {
            console.error('Erro ao buscar transações:', error);
          },
        });
      },

      error: (error: any) => {
        console.error('Erro ao buscar categorias:', error);
      },
    });
  }

  private calculateFinancialSummary(transactions: BackendTransaction[]): void {
    this.totalIncome = transactions
      .filter((transaction) => this.getCategoryType(transaction.categoriaId) === 'entrada')
      .reduce((total, transaction) => total + transaction.valor, 0);

    this.totalExpense = transactions
      .filter((transaction) => this.getCategoryType(transaction.categoriaId) === 'saida')
      .reduce((total, transaction) => total + transaction.valor, 0);

    this.balance = this.totalIncome - this.totalExpense;
  }

  private getCategoryType(categoriaId: number): 'entrada' | 'saida' {
    const category = this.categories.find((category) => category.id === categoriaId);

    return category?.tipo || 'saida';
  }
}
