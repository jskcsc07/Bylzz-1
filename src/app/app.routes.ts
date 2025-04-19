import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular'; // or 'ag-grid-community' in older versions
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { authGuard } from './auth';
import { ManageModule } from './features/manage/manage.module';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './features/manage';
import { DinesComponent } from './managedine/dines.component';
import { InventoryComponent } from './mangageinventory/inventory.component';

export const routes: Routes = [
  // Redirect to home if root path
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () => import('./features/home').then(c => c.HomeComponent),
  },
  // {
  //   path: 'category',
  //   loadComponent: () => import('./features/manage/childcomponents/categoryform').then(c => c.CategoryformComponent),
  // },
  {
    path: 'about',
    loadComponent: () => import('./features/about').then(c => c.AboutComponent),
  },
  {
    path: 'secured-feat',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/secured-feat').then(c => c.SecuredFeatComponent),
  }, {
    path: 'manage',

   // canActivate: [authGuard],
    loadComponent: () =>
      import('./features/manage').then(c => c.ManageComponent),

  },
  {
    path: 'dines',

   // canActivate: [authGuard],
    loadComponent: () =>
      import('./managedine/dines.component').then(c => c.DinesComponent),

  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(c => c.authRoutes),
  },
  {
    path: '',
    component: ManageComponent,
    loadChildren: () =>
      import('./features/manage/manage.module').then((m) => m.ManageModule),

  },
  {
    path: '',
    component: DinesComponent,
    loadChildren: () =>
      import('./managedine/managedine.module').then((m) => m.ManagedineModule),

  },
  {
    path: 'inventory',

  //  canActivate: [authGuard],
    loadComponent: () =>
      import('./mangageinventory/inventory.component').then(c => c.InventoryComponent),

  },
  {
    path: '',
    component: InventoryComponent,
    loadChildren: () =>
      import('./mangageinventory/mangageinventory.module').then((m) => m.MangageinventoryModule),

  },
  // // Redirect to home if no route found
  // Redirect to home if no route found


  // {
  //   path: 'Payby',
  //   loadComponent: () => import('./features/manage/childcomponents/paybymanage/paybymanage.component').then(c => c.PaybymanageComponent),
  // },
  {
    path: 'employee',
   // canActivate: [authGuard],
    loadComponent: () => import('./employee/employee/employee.component').then(c => c.EmployeeComponent),
  },
  {
    path: 'companyprofile',
   // canActivate: [authGuard],
    loadComponent: () => import('./companyprofile/companyprofile/companyprofile.component').then(c => c.CompanyprofileComponent),
  },
  { path: '**', redirectTo: 'home' },
];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }