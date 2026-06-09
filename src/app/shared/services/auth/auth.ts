import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(email: string, senha: string): Observable<boolean> {
    return of(email === 'admin@cashlyo.com' && senha === 'Cashlyo123');
  }
}
