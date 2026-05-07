import { Component } from '@angular/core';
import { FinanceCardComponent } from '../../components/finance-card/finance-card';
import { FinanceChartComponent } from '../../components/finance-chart/finance-chart';
import { RecentTransactionsComponent } from '../../components/recent-transactions/recent-transactions';

@Component({
  selector: 'app-home',
  imports: [FinanceCardComponent, FinanceChartComponent, RecentTransactionsComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {

}
