import { Component } from '@angular/core';

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
  imports: [NgApexchartsModule],
  templateUrl: './flow.html',
  styleUrl: './flow.css',
})
export class Flow {
  public chartSeries: ApexAxisChartSeries = [
    {
      name: 'Receitas',
      data: [1200, 1800, 2200, 1700, 2600, 3100],
    },
    {
      name: 'Despesas',
      data: [800, 1200, 1400, 1100, 1800, 2100],
    },
  ];

  public chartColors = [
    '#2563eb', // azul
    '#dc2626', // vermelho
  ];

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
}
