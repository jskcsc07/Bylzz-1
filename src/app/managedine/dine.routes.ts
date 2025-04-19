import { Routes } from '@angular/router';
import { authGuard } from '../auth';




export const DineRoutes: Routes = [
  {
    path: 'dine',
  //  canActivate: [authGuard],
    loadComponent: () => import('./dine/dine.component').then(c => c.DineComponent),
  },
  {
    path: 'chair',
  //  canActivate: [authGuard],
    loadComponent: () => import('./chair/chair.component').then(c => c.ChairComponent),
  },
  {
    path: 'floor',
  //  canActivate: [authGuard],
    loadComponent: () => import('./floor/floor.component').then(c => c.FloorComponent),
  },
];