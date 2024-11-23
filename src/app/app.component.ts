import { Component } from '@angular/core';
import { HomepageComponent } from './homepage/homepage.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HomepageComponent,]
})
export class AppComponent {
  title = 'Angular 19 Test';
  currentRoute: string = '';
  
}
