import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

export interface User {
  id: number;

  nome: string;

  email: string;

  status: boolean;

  foto: string;

  dataCriacao: string;

  empresaId: number;

  empresaNome: string;
}

export interface CreateUserRequest {
  nome: string;

  email: string;

  senha: string;

  status: boolean;

  foto: string;

  empresaId: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://10.136.38.50:4000/api/usuarios';

  constructor(private http: HttpClient) {}

  register(user: CreateUserRequest): Observable<User> {
    return this.http.post<User>(this.API_URL, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`);
  }

  updateUser(id: number, user: CreateUserRequest): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/${id}`, user);
  }

  login(email: string, senha: string): Observable<boolean> {
    return this.getUsers().pipe(
      map((users) => {
        const user = users.find((user) => user.email === email);

        if (!user) {
          return false;
        }

        localStorage.setItem('userId', String(user.id));
        localStorage.setItem('userName', user.nome);
        localStorage.setItem('userEmail', user.email);

        return true;
      }),
    );
  }
}
