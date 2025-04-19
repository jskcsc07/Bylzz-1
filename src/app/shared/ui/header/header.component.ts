import { Component, Input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { AuthUser } from '../../../auth';
import { AvatarComponent } from '../avatar';
import { IconModule } from '../icon';

interface MenuItem {
  link: string;
  label: string;
  icon: IconProp;
}

@Component({
  selector: 'jsk-header',
  imports: [
    AvatarComponent,
    IconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input({ required: true })
  authUser: AuthUser | null | undefined = null;

  readonly logout = output<void>();

  readonly menuItems: MenuItem[] = [
    { link: '/home', label: 'Home', icon: 'home' },
    { link: '/about', label: 'About', icon: 'info-circle' },
    { link: '/secured-feat', label: 'Secured Feature', icon: 'lock' },
    { link: '/manage', label: 'Manage Products', icon: 'lock' },
    // { link: '/category', label: 'category', icon: 'lock'  },
    // { link: '/Quantitytype', label: 'Quantitytype', icon: 'lock'  },
    // { link: '/basetype', label: 'basetype', icon: 'lock'  },
    // { link: '/product', label: 'product', icon: 'lock'  },
    // { link: '/productprice', label: 'productprice', icon: 'lock'  },
    // { link: '/tax', label: 'tax', icon: 'lock'  },
    { link: '/dines', label: 'Dines', icon: 'lock' },
    // { link: '/chair', label: 'chair', icon: 'lock' },
    // { link: '/floor', label: 'floor', icon: 'lock' },
    { link: '/inventory', label: 'Inventory', icon: 'lock' },
    // { link: '/imf', label: 'Inventory Main Food', icon: 'lock' },
    // { link: '/ifqt', label: 'Inventory Food Quantity Type', icon: 'lock' },
    // { link: '/imfwp', label: 'Assocciate Inventory Food With Product', icon: 'lock' },
    // // { link: '/Payby', label: 'Payby', icon: 'lock'  },
    { link: '/employee', label: 'employee', icon: 'lock' },
    { link: '/companyprofile', label: 'companyprofile', icon: 'lock' },
  ];
}
