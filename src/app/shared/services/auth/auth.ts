import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() {}

  login(email: string, senha: string): boolean {

    if (
      email === 'admin@cashlyo.com' &&
      senha === 'Cashlyo123'
    ) {

      return true;
    }

    return false;
  }

}
