import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { environment } from '../../environment/environment';
import { LoginComponent } from "../login/login.component";


@Component({
  selector: 'app-about',
  imports: [LoginComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  private apiUrl = '/auth';
  private leagueUrl = '/data/league/get'

  http = inject(HttpClient);
  authSucces = signal<boolean | null>(false);
  leagueDetails = signal<any | null>(null);

  constructor() {
    
    
    
  }
   
  authData = {
    email: environment.iracingEmail,
    password: environment.iracingPassword
  };

  

  leagueDetail() {
    const params = new HttpParams()
      .set('league_id', '8531') // Voeg league_id toe
      .set('include_license', 'false'); // Voeg include_license toe

    this.http.get(this.leagueUrl, { params }).subscribe({
      next: (response) => {
        this.leagueDetails.set(response); // Update de signal met de response
        console.log('Response:', response);
      },
      error: (err) => {
        console.error('Error fetching league details:', err);
      }
    });
  }

  authenticate(authData: { email: string; password: string }) {
    this.http.post(this.apiUrl, authData, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).subscribe({
      next: (data) => this.authSucces.set(true),
      error: (error) => console.error('Authentication Failed:', error)
    });
  }
}
