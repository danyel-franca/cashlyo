import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { Transaction } from '../core/models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly STORAGE_KEY = 'transactions';

  private transactionsSubject = new BehaviorSubject<Transaction[]>(this.loadTransactions());

  public transactions$ = this.transactionsSubject.asObservable();

  private loadTransactions(): Transaction[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  private saveTransactions(transactions: Transaction[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(transactions));

    this.transactionsSubject.next(transactions);
  }

  getTransactions(): Transaction[] {
    return this.transactionsSubject.value;
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    const transactions = this.getTransactions();

    this.saveTransactions([transaction, ...transactions]);

    return of(transaction);
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    const updatedTransactions = this.getTransactions().map((currentTransaction) =>
      currentTransaction.id === transaction.id ? transaction : currentTransaction,
    );

    this.saveTransactions(updatedTransactions);

    return of(transaction);
  }

  deleteTransaction(id: number): Observable<void> {
    const updatedTransactions = this.getTransactions().filter(
      (transaction) => transaction.id !== id,
    );

    this.saveTransactions(updatedTransactions);

    return of(void 0);
  }

  refreshTransactions(transactions: Transaction[]): void {
    this.saveTransactions(transactions);
  }
}
