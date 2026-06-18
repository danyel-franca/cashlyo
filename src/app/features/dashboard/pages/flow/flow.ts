import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgIf, NgFor } from '@angular/common';
import { TransactionService } from '../../../../services/transaction';
import { Transaction } from '../../../../core/models/transaction.model';
import { CategoriesModal } from '../../components/categories-modal/categories-modal';

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
  imports: [NgApexchartsModule, CurrencyPipe, NgIf, NgFor, CategoriesModal],
  templateUrl: './flow.html',
  styleUrl: './flow.css',
})
export class Flow implements OnInit {
  constructor(private transactionService: TransactionService) {}

  public totalIncome = 0;

  public totalExpense = 0;

  public totalBalance = 0;

  private generateChartData(transactions: Transaction[]): void {
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

      if (transaction.tipo === 'entrada') {
        incomeByMonth[month] += transaction.valor;
      } else {
        expenseByMonth[month] += transaction.valor;
      }
    });

    this.totalIncome = transactions
      .filter((transaction) => transaction.tipo === 'entrada')
      .reduce((sum, transaction) => sum + transaction.valor, 0);

    this.totalExpense = transactions
      .filter((transaction) => transaction.tipo === 'saida')
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

    const categoriesMap = new Map<string, number>();

    transactions
      .filter((transaction) => transaction.tipo === 'saida')
      .forEach((transaction) => {
        const currentValue = categoriesMap.get(transaction.categoria) || 0;

        categoriesMap.set(transaction.categoria, currentValue + transaction.valor);
      });

    this.topCategories = Array.from(categoriesMap.entries())
      .map(([name, value]) => ({
        name,
        value,
        percentage: this.totalExpense > 0 ? (value / this.totalExpense) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 4);

    this.allCategories = Array.from(categoriesMap.entries())
      .map(([name, value]) => ({
        name,
        value,
        percentage: this.totalExpense > 0 ? (value / this.totalExpense) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);
  }

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe((transactions) => {
      this.generateChartData(transactions);
    });
  }

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

  // Categories
  public categoriesModalOpen = false;

  openCategoriesModal(): void {
    this.categoriesModalOpen = true;
  }

  closeCategoriesModal(): void {
    this.categoriesModalOpen = false;
  }

  public topCategories: {
    name: string;
    value: number;
    percentage: number;
  }[] = [];

  public allCategories: {
    name: string;
    value: number;
    percentage: number;
  }[] = [];
}
