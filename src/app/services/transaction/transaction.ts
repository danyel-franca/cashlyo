import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import {
  BackendTransaction,
  CreateBackendTransaction,
} from '../../core/models/backend-transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly API_URL = 'http://10.136.38.50:4000/api/transacoes';

  constructor(private http: HttpClient) {}

  getBackendTransactions(): Observable<BackendTransaction[]> {
    return this.http.get<BackendTransaction[]>(this.API_URL);
  }

  getCurrentUserTransactions(): Observable<BackendTransaction[]> {
    const userId = Number(localStorage.getItem('userId'));

    return this.getBackendTransactions().pipe(
      map((transactions) => transactions.filter((transaction) => transaction.usuarioId === userId)),
    );
  }

  createTransaction(transaction: CreateBackendTransaction): Observable<BackendTransaction> {
    return this.http.post<BackendTransaction>(this.API_URL, transaction);
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
}
