import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BackendCategory } from '../../core/models/backend-category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly API_URL = 'http://10.136.38.50:4000/api/categorias';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<BackendCategory[]> {
    return this.http.get<BackendCategory[]>(this.API_URL);
  }
}
