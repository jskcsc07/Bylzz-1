import { Component, Input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { AuthUser } from '../../../auth';
import { AvatarComponent } from '../../../shared/ui/avatar';
import { IconModule } from '../../../shared/ui/icon';
import { MangageinventoryModule } from '../../../mangageinventory/mangageinventory.module';
interface MenuItem {
  link: string;
  label: string;
  // icon: IconProp;
}
// export const routes: Routes = [
// {
//   path: 'category',
//   loadComponent: () => import('./../../features/manage/childcomponents/categoryform').then(c => c.CategoryformComponent),
// },
// {
//   path: 'Quantitytype',
//   loadComponent: () => import('./../../features/manage/childcomponents/quantitytype').then(c => c.CategorytypeformComponent),
// },
// {
//   path: 'productprice',
//   loadComponent: () => import('./../../features/manage/childcomponents/productpriceform').then(c => c.ProductpriceformComponent),
// },
// {
//   path: 'basetype',
//   loadComponent: () => import('./../../features/manage/childcomponents/basetype').then(c => c.BasetypeComponent),
// },
// {
//   path: 'product',
//   loadComponent: () => import('./../../features/manage/childcomponents/productform').then(c => c.ProductformComponent),
// },
// // {path:'popup',
// //   loadComponent: () => import('./../../features/manage/childcomponents/').then(c => c.component:PopupmodelComponent),},
// {
//   path: 'tax',
//   loadComponent: () => import('./../../features/manage/childcomponents/tax').then(c => c.TaxComponent),
// },
// ];
@Component({
  selector: 'jsk-mheader',
  imports: [
    IconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    RouterLink, RouterOutlet,
    RouterLinkActive],//AsyncPipe, MatCardModule, MatTableModule],
  templateUrl: './mheader.component.html',
  //styleUrl: './manage.component.scss',

})

export class MheaderComponent {
  authUser: AuthUser | null | undefined = null;

  readonly logout = output<void>();

  readonly menuItems: MenuItem[] = [
    { link: '/category', label: 'category' },
    { link: '/Quantitytype', label: 'Quantitytype' },
    { link: '/basetype', label: 'Sub Quantity Type' },
    { link: '/product', label: 'product' },
    { link: '/productprice', label: 'productprice' },
    { link: '/tax', label: 'tax' },
    // { link: '/dine', label: 'dine' },
    // { link: '/chair', label: 'chair' },
    // { link: '/floor', label: 'floor' },
    // { link: '/imf', label: 'Inventory Main Food' },
    // { link: '/ifqt', label: 'Inventory Food Quantity Type' },
    // { link: '/imfwp', label: 'Assocciate Inventory Food With Product' },
    { link: '/Payby', label: 'Payby' },
    // { link: '/employee', label: 'employee' },
    // { link: '/companyprofile', label: 'companyprofile' },
  ];
}