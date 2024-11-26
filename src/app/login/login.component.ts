import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authUrl = '/auth';

  constructor(private http: HttpClient, private authService: AuthService) {}

  authenticate() {
    const authData = { email: environment.iracingEmail, password: environment.iracingPassword };

    this.http.post<{ token: string }>(this.authUrl, authData).subscribe({
      next: (response) => {
        console.log('Authenticated:', response);
        this.authService.setToken(response.token); // Sla het token op
      },
      error: (err) => {
        console.error('Authentication Failed:', err);
      }
    });
  }
}
