import { Component, OnInit } from '@angular/core';

import { ApexChart, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';

import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-finance-chart',

  standalone: true,

  imports: [NgApexchartsModule],

  templateUrl: './finance-chart.html',

  styleUrls: ['./finance-chart.css'],
})
export class FinanceChartComponent implements OnInit {

  public chartSeries: ApexNonAxisChartSeries = [];

  public chartLabels: string[] = ['Entradas', 'Saídas'];

  public chartDetails: ApexChart = {
    type: 'donut',

    height: 350,

    toolbar: {
      show: false,
    },

  };

  public chartColors = [

  '#3b82f6',

  '#ef4444'

];

  public chartResponsive: ApexResponsive[] = [
    {
      breakpoint: 480,

      options: {
        chart: {
          width: 300,
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
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

    this.calculateChartData(transactions);
  }

  calculateChartData(transactions: any[]) {

    this.totalIncome = transactions

      .filter((transaction) => transaction.tipo === 'entrada')

      .reduce(
        (total, transaction) =>
          total +
          Number(
            transaction.valor

              .replace('R$', '')

              .replace('+', '')

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

              .replace('-', '')

              .trim(),
          ),

        0,
      );

    this.chartSeries = [this.totalIncome, this.totalExpense];
  }
}
