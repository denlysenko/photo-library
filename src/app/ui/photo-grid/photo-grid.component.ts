import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Photo } from '../../interfaces';

@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoGridComponent {
  @Input() photos: Photo[];
  @Output() photoClicked = new EventEmitter<string>();
}
