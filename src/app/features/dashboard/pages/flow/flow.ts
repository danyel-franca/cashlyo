import { Component, OnInit } from '@angular/core';

import { CurrencyPipe } from '@angular/common';

import { TransactionService } from '../../../../services/transaction/transaction';

import { CategoryService } from '../../../../services/category/category';

import { BackendTransaction } from '../../../../core/models/backend-transaction.model';

import { BackendCategory } from '../../../../core/models/backend-category.model';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexDataLabels,
  ApexLegend,
  ApexGrid,
  NgApexchartsModule,
} from 'ng-apexcharts';

@Component({
  selector: 'app-flow',
  standalone: true,
  imports: [NgApexchartsModule, CurrencyPipe],
  templateUrl: './flow.html',
  styleUrl: './flow.css',
})
export class Flow implements OnInit {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
  ) {}

  public totalIncome = 0;

  public totalExpense = 0;

  public totalBalance = 0;

  public chartSeries: ApexAxisChartSeries = [];

  public chartColors = ['#2563eb', '#dc2626'];

  public chartDetails: ApexChart = {
    type: 'line',
    height: 320,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  };

  public chartStroke: ApexStroke = {
    curve: 'smooth',
    width: [4, 4],
  };

  public chartXAxis: ApexXAxis = {
    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  };

  public chartDataLabels: ApexDataLabels = {
    enabled: false,
  };

  public chartLegend: ApexLegend = {
    position: 'top',
  };

  public chartGrid: ApexGrid = {
    borderColor: '#e5e7eb',
  };

  ngOnInit(): void {
    this.loadFlowData();
  }

  private loadFlowData(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.transactionService.getCurrentUserTransactions().subscribe({
          next: (transactions) => {
            this.generateChartData(transactions, categories);
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

  private generateChartData(
    transactions: BackendTransaction[],
    categories: BackendCategory[],
  ): void {
    const months = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];

    const incomeByMonth = new Array(12).fill(0);

    const expenseByMonth = new Array(12).fill(0);

    transactions.forEach((transaction) => {
      const month = new Date(transaction.data).getMonth();

      const categoryType = this.categoryService.getCategoryType(
        transaction.categoriaId,
        categories,
      );

      if (categoryType === 'entrada') {
        incomeByMonth[month] += transaction.valor;
      } else {
        expenseByMonth[month] += transaction.valor;
      }
    });

    this.totalIncome = transactions
      .filter(
        (transaction) => this.categoryService.getCategoryType(transaction.categoriaId, categories) === 'entrada',
      )
      .reduce((sum, transaction) => sum + transaction.valor, 0);

    this.totalExpense = transactions
      .filter(
        (transaction) => this.categoryService.getCategoryType(transaction.categoriaId, categories) === 'saida',
      )
      .reduce((sum, transaction) => sum + transaction.valor, 0);

    this.totalBalance = this.totalIncome - this.totalExpense;

    this.chartSeries = [
      {
        name: 'Receitas',
        data: incomeByMonth,
      },
      {
        name: 'Despesas',
        data: expenseByMonth,
      },
    ];

    this.chartXAxis = {
      categories: months,
    };
  }
}
