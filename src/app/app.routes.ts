import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { IracingComponent } from './iracing/iracing.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent }, 
  { path: 'contact', component: ContactComponent }, 
  { path: 'over', component: AboutComponent },
  { path: 'iracing', component: IracingComponent }, 
];