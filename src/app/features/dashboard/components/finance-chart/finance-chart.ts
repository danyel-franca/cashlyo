import { Component } from '@angular/core';

import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexDataLabels,
  ApexTooltip
}
from 'ng-apexcharts';


@Component({
  selector: 'app-finance-chart',
  standalone: true,

  imports: [
    NgApexchartsModule
  ],

  templateUrl: './finance-chart.html',
  styleUrl: './finance-chart.css'
})

export class FinanceChartComponent {

  public chartSeries: ApexAxisChartSeries = [
    {
      name: 'Entradas',

      data: [
        3200,
        4500,
        3900,
        5800,
        6200,
        7600
      ]
    },

    {
      name: 'Saídas',

      data: [
        1200,
        1800,
        1600,
        2400,
        2100,
        3200
      ]
    }
  ];



  public chartDetails: ApexChart = {

    type: 'area',

    height: 350,

    toolbar: {
      show: false
    }
  };



  public chartXAxis: ApexXAxis = {

    categories: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun'
    ]
  };



  public chartStroke: ApexStroke = {

    curve: 'smooth',

    width: 4
  };



  public chartDataLabels: ApexDataLabels = {

    enabled: false
  };



  public chartTooltip: ApexTooltip = {

    theme: 'light'
  };

}
