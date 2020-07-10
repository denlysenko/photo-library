import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PhotoTileComponent } from './photo-tile.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PhotoTileComponent],
  exports: [PhotoTileComponent],
})
export class PhotoTileModule {}
