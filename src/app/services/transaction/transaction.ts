import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { Transaction } from '../../core/models/transaction.model';

import {
  BackendTransaction,
  CreateBackendTransaction,
} from '../../core/models/backend-transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly STORAGE_KEY = 'transactions';

  private readonly API_URL = 'http://10.136.38.50:4000/api/transacoes';

  private transactionsSubject = new BehaviorSubject<Transaction[]>(this.loadTransactions());

  public transactions$ = this.transactionsSubject.asObservable();

  constructor(private http: HttpClient) {}

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

  createTransaction(transaction: CreateBackendTransaction): Observable<BackendTransaction> {
    return this.http.post<BackendTransaction>(this.API_URL, transaction);
  }

  getBackendTransactions(): Observable<BackendTransaction[]> {
    return this.http.get<BackendTransaction[]>(this.API_URL);
  }

  updateTransaction(
    id: number,
    transaction: CreateBackendTransaction,
  ): Observable<BackendTransaction> {
    return this.http.put<BackendTransaction>(`${this.API_URL}/${id}`, transaction);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  refreshTransactions(transactions: Transaction[]): void {
    this.saveTransactions(transactions);
  }
}
