import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { TransactionService } from '../../../../services/transaction/transaction';

import { Transaction } from '../../../../core/models/transaction.model';

@Component({
  selector: 'app-recent-transactions',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './recent-transactions.html',

  styleUrl: './recent-transactions.css',
})
export class RecentTransactionsComponent implements OnInit {
  constructor(private transactionService: TransactionService) {}

  recentTransactions: Transaction[] = [];

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe((transactions: Transaction[]) => {
      this.recentTransactions = transactions.slice(-5).reverse();
    });
  }
}
