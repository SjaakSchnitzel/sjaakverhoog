import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token); // Opslaan in localStorage
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Ophalen uit localStorage
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Controleren of er een token aanwezig is
  }

  logout() {
    localStorage.removeItem(this.tokenKey); // Verwijder het token bij logout
  }
}
