import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { JsonPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-iracing',
  standalone: true,
  imports:[JsonPipe, CommonModule, FormsModule],
  templateUrl: './iracing.component.html',
  styleUrls: ['./iracing.component.css']
})
export class IracingComponent implements OnInit {
  isLoading = false;
  isLoggedIn = false;
  errorMessage: string | null = null;
  leagueDetails: any | null = null;

  private authUrl = '/auth';
  private leagueUrl = '/data/league/get';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    // Controleer loginstatus bij het laden van de component
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log('Login status:', this.isLoggedIn);
  }

  login(email: string, password: string) {
    console.log('Login initiated with:', email, password); // Debug-log
    this.isLoading = true;
    this.errorMessage = null;
  
    const authData = { email, password };
  
    this.http.post<{ token: string }>(this.authUrl, authData).subscribe({
      next: (response) => {
        console.log('Login successful, token:', response.token); // Debug-log
        this.authService.setToken(response.token); // Sla token op
        this.isLoggedIn = true;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Login failed:', err); // Debug-log
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.isLoading = false;
      }
    });
  }
  

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.leagueDetails = null;
  }

  fetchLeagueDetails(leagueId: string, includeLicense: boolean) {
    if (!this.isLoggedIn) {
      this.errorMessage = 'You must log in first.';
      return;
    }

    const params = { league_id: leagueId, include_license: includeLicense.toString() };

    this.isLoading = true;
    this.errorMessage = null;

    this.http.get(this.leagueUrl, { params }).subscribe({
      next: (response) => {
        this.leagueDetails = response;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch league details.';
        console.error('League Details Error:', err);
        this.isLoading = false;
      }
    });
  }
}
