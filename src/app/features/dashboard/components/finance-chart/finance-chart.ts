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
  // SERIES

  public chartSeries: ApexNonAxisChartSeries = [];

  // LABELS

  public chartLabels: string[] = ['Entradas', 'Saídas'];

  // CHART

  public chartDetails: ApexChart = {
    type: 'donut',

    height: 350,

    toolbar: {
      show: false,
    },
  };

  // RESPONSIVE

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

  // TOTALS

  totalIncome = 0;

  totalExpense = 0;

  // INIT

  ngOnInit(): void {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

    this.calculateChartData(transactions);
  }

  // CALCULATE DATA

  calculateChartData(transactions: any[]) {
    // ENTRADAS

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

    // SAIDAS

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

    // CHART

    this.chartSeries = [this.totalIncome, this.totalExpense];
  }
}
