import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactionsSubject = new BehaviorSubject<any[]>(this.getTransactionsFromStorage());

  transactions$ = this.transactionsSubject.asObservable();

  private getTransactionsFromStorage(): any[] {
    return JSON.parse(localStorage.getItem('transactions') || '[]');
  }

  getTransactions() {
    return this.transactionsSubject.value;
  }

  addTransaction(transaction: any) {
    const updatedTransactions = [...this.getTransactions(), transaction];

    localStorage.setItem(
      'transactions',

      JSON.stringify(updatedTransactions),
    );

    this.transactionsSubject.next(updatedTransactions);
  }

  deleteTransaction(index: number) {
    const updatedTransactions = this.getTransactions();

    updatedTransactions.splice(index, 1);

    localStorage.setItem(
      'transactions',

      JSON.stringify(updatedTransactions),
    );

    this.transactionsSubject.next(updatedTransactions);
  }

  updateTransactions(transactions: any[]) {
    localStorage.setItem(
      'transactions',

      JSON.stringify(transactions),
    );

    this.transactionsSubject.next(transactions);
  }
}
