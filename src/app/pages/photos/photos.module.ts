import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  InfiniteScrollModule,
  InlineSpinnerModule,
  PhotoGridModule,
} from '../../ui';
import { PhotosComponent } from './photos.component';
import { PhotosResolver } from './photos.resolver';

@NgModule({
  imports: [
    CommonModule,
    PhotoGridModule,
    InfiniteScrollModule,
    InlineSpinnerModule,
  ],
  declarations: [PhotosComponent],
  providers: [PhotosResolver],
})
export class PhotosModule {}
