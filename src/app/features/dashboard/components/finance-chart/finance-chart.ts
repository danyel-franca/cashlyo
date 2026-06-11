import { Component, OnInit } from '@angular/core';

import { ApexChart, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';

import { NgApexchartsModule } from 'ng-apexcharts';

import { TransactionService } from '../../../../services/transaction';

import { Transaction } from '../../../../core/models/transaction.model';

@Component({
  selector: 'app-finance-chart',

  standalone: true,

  imports: [NgApexchartsModule],

  templateUrl: './finance-chart.html',

  styleUrls: ['./finance-chart.css'],
})
export class FinanceChartComponent implements OnInit {
  constructor(private transactionService: TransactionService) {}

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

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe((transactions) => {
      this.calculateChartData(transactions);
    });
  }

  calculateChartData(transactions: Transaction[]): void {
    this.totalIncome = transactions
      .filter((transaction) => transaction.tipo === 'entrada')
      .reduce((total, transaction) => total + transaction.valor, 0);

    this.totalExpense = transactions
      .filter((transaction) => transaction.tipo === 'saida')
      .reduce((total, transaction) => total + transaction.valor, 0);

    this.chartSeries = [this.totalIncome, this.totalExpense];
  }
}
