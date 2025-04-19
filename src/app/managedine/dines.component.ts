import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { AUTH_FACADE } from './../auth';
import { ConfigService, GoogleAnalyticsService } from './../core/services';
import { DineheaderComponent } from "./navbar/dineheader.component";
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
  selector: 'jsk-dines',
  imports: [
    DineheaderComponent],//AsyncPipe, MatCardModule, MatTableModule],
  template: `
    <section>
      <jsk-dineheader/>
  </section>
     
  `,


})

export class DinesComponent {
  //private readonly authFacade = inject(AUTH_FACADE);
  // readonly displayedColumns: string[] = ['id', 'name', 'username', 'password'];
  // readonly vm$ = combineLatest({
  //   greeting: of(GreetingUtil.greet()),
  //   authUser: this.authFacade.authUser$,
  //   users: of(USERS),
  // });



  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authFacade = inject(AUTH_FACADE);
  private readonly configService = inject(ConfigService);
  private readonly googleAnalyticsService = inject(GoogleAnalyticsService);


  ngOnInit() {
    if (this.configService.isProd()) {
      this.setupGoogleAnalytics();
    }
  }


  protected onLogout() {
    this.authFacade.logout();
  }

  private setupGoogleAnalytics() {
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(navigationEndEvent => {
        this.googleAnalyticsService.sendPageView(
          (navigationEndEvent as NavigationEnd).urlAfterRedirects
        );
      });
  }
}
