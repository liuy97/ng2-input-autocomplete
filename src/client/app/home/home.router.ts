import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';
import { HomeComponent } from './home.component';

export const homeRoutes : Routes = [
  { path: 'home', component: HomeComponent}
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);
