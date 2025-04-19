import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { IconModule } from '../../shared/ui/icon';

@Component({
  selector: 'jsk-about',
  imports: [MatButtonModule, IconModule],
  templateUrl: './about.component.html',
})
export class AboutComponent {}
