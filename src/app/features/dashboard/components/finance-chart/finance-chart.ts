import { Component, OnInit } from '@angular/core';

import { ApexChart, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';

import { NgApexchartsModule } from 'ng-apexcharts';

import { TransactionService } from '../../../../services/transaction/transaction';

import { CategoryService } from '../../../../services/category/category';

import { BackendTransaction } from '../../../../core/models/backend-transaction.model';

import { BackendCategory } from '../../../../core/models/backend-category.model';

@Component({
  selector: 'app-finance-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './finance-chart.html',
  styleUrls: ['./finance-chart.css'],
})
export class FinanceChartComponent implements OnInit {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
  ) {}

  public chartSeries: ApexNonAxisChartSeries = [];

  public readonly chartLabels: string[] = ['Entradas', 'Saídas'];

  public chartDetails: ApexChart = {
    type: 'donut',
    height: 280,
    toolbar: {
      show: false,
    },
  };

  public readonly chartColors: string[] = ['#3b82f6', '#ef4444'];

  public chartResponsive: ApexResponsive[] = [
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 220,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ];

  totalIncome = 0;

  totalExpense = 0;

  categories: BackendCategory[] = [];

  ngOnInit(): void {
    this.loadChartData();
  }

  private loadChartData(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;

        this.transactionService.getBackendTransactions().subscribe({
          next: (transactions) => {
            this.calculateChartData(transactions);
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

  private calculateChartData(transactions: BackendTransaction[]): void {
    this.totalIncome = transactions
      .filter(
        (transaction) =>
          this.categoryService.getCategoryType(transaction.categoriaId, this.categories) ===
          'entrada',
      )
      .reduce((total, transaction) => total + transaction.valor, 0);

    this.totalExpense = transactions
      .filter(
        (transaction) =>
          this.categoryService.getCategoryType(transaction.categoriaId, this.categories) ===
          'saida',
      )
      .reduce((total, transaction) => total + transaction.valor, 0);

    this.chartSeries = [this.totalIncome, this.totalExpense];
  }
}
