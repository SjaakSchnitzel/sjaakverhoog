import { Component } from '@angular/core';
import { HomepageComponent } from './homepage/homepage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomepageComponent],
  template: '<app-home></app-home>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}

