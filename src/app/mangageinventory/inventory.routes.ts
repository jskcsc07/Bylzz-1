import { Routes } from '@angular/router';
import { authGuard } from '../auth';




export const InventoryRoutes: Routes = [


  {
    path: 'imf',
  //  canActivate: [authGuard],
    loadComponent: () => import('./inventorymainfood/inventorymainfood.component').then(c => c.InventorymainfoodComponent),
  },
  {
    path: 'ifqt',
  //  canActivate: [authGuard],
    loadComponent: () => import('./inventoryfoodquntitytype/inventoryfoodquntitytype.component').then(c => c.InventoryfoodquntitytypeComponent),
  },
  {
    path: 'imfwp',
 //   canActivate: [authGuard],
    loadComponent: () => import('./inventoryfood/inventoryfood.component').then(c => c.InventoryfoodComponent),
  },
];