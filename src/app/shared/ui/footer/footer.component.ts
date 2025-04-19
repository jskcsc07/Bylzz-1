import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { IconModule } from '../icon';

interface PersonalLink {
  label: string;
  href: string;
  icon: IconProp;
}

@Component({
  selector: 'jsk-footer',
  imports: [DatePipe, IconModule, MatButtonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  @Input({ required: true })
  version = '';

  readonly now = new Date();
  readonly personalLinks: PersonalLink[] = [
    {
      label: 'GitHub',
      href: 'https://github.com/rud9321',
      icon: ['fab', 'github'],
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rud9321/',
      icon: ['fab', 'linkedin-in'],
    },
    {
      label: 'X',
      href: 'https://x.com/rud9321',
      icon: ['fab', 'x-twitter'],
    },
  ];
}
