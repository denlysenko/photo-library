import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PhotoTileModule } from '../photo-tile/photo-tile.module';
import { PhotoGridComponent } from './photo-grid.component';

@NgModule({
  imports: [CommonModule, PhotoTileModule],
  declarations: [PhotoGridComponent],
  exports: [PhotoGridComponent],
})
export class PhotoGridModule {}
