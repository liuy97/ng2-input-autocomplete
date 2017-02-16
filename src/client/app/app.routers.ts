import { Routes, RouterModule }   from '@angular/router';
import { homeRoutes } from './home/home.router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  ...homeRoutes
];

export const routing = RouterModule.forRoot(routes);
