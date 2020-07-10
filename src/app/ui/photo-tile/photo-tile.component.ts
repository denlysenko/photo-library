import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Photo } from '../../interfaces';

@Component({
  selector: 'app-photo-tile',
  templateUrl: './photo-tile.component.html',
  styleUrls: ['./photo-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoTileComponent {
  @Input() photo: Photo;
  @Input() size: 'sm' | 'lg' = 'sm';
}
