import { Routes } from '@angular/router';
import { authGuard } from '../../auth';




export const ManageRoutes: Routes = [
  {
    path: 'category',
   // canActivate: [authGuard],
    loadComponent: () => import('./childcomponents/category/category.component').then(c => c.CategoryComponent),
  },
  {
    path: 'Quantitytype',
    //canActivate: [authGuard],
    loadComponent: () => import('./childcomponents/quantitytype/quantitytype.component').then(c => c.CategorytypeformComponent),
  },
  {
    path: 'productprice',
   // canActivate: [authGuard],
    loadComponent: () => import('./childcomponents/productpriceform').then(c => c.ProductpriceformComponent),
  },
  {
    path: 'basetype',
   // canActivate: [authGuard],
    loadComponent: () => import('./childcomponents/basetype').then(c => c.BasetypeComponent),
  },
  {
    path: 'product',
   // canActivate: [authGuard],
    loadComponent: () => import('./childcomponents/product/product.component').then(c => c.ProductComponent),
  },
  // {path:'popup',
  //   loadComponent: () => import('./../../childcomponents/').then(c => c.component:PopupmodelComponent),},
  {
    path: 'tax',
  //  canActivate: [authGuard],
    loadComponent: () => import('./childcomponents/tax').then(c => c.TaxComponent),
  },
  {
    path: 'Payby',
   // canActivate: [authGuard],
    loadComponent: () => import('./childcomponents/paybymanage/paybymanage.component').then(c => c.PaybymanageComponent),
  },
];