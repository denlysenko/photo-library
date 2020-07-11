import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PhotoTileModule } from '../../ui';
import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoComponent } from './photo.component';
import { PhotoResolver } from './photo.resolver';

@NgModule({
  imports: [CommonModule, PhotoRoutingModule, PhotoTileModule],
  declarations: [PhotoComponent],
  providers: [PhotoResolver],
})
export class PhotoModule {}
