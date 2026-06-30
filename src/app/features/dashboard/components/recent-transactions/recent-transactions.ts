import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { TransactionService } from '../../../../services/transaction/transaction';

import { BackendTransaction } from '../../../../core/models/backend-transaction.model';

import { CategoryService } from '../../../../services/category/category';

import { BackendCategory } from '../../../../core/models/backend-category.model';

@Component({
  selector: 'app-recent-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-transactions.html',
  styleUrl: './recent-transactions.css',
})
export class RecentTransactionsComponent implements OnInit {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
  ) {}

  categories: BackendCategory[] = [];
  recentTransactions: BackendTransaction[] = [];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;

        this.transactionService.getCurrentUserTransactions().subscribe({
          next: (transactions) => {
            this.recentTransactions = transactions
              .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
              .slice(0, 5);
          },
        });
      },
    });
  }

  getCategoryType(categoriaId: number): 'entrada' | 'saida' {
    return this.categoryService.getCategoryType(categoriaId, this.categories);
  }
}
