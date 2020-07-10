import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InfiniteScrollComponent } from './infinite-scroll.component';

@NgModule({
  imports: [CommonModule],
  declarations: [InfiniteScrollComponent],
  exports: [InfiniteScrollComponent],
})
export class InfiniteScrollModule {}
