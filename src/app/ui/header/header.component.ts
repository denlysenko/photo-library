import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { MenuItem } from '../../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() menuItems: MenuItem[];
}
