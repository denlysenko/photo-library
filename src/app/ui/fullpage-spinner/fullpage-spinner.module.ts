import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullpageSpinnerComponent } from './fullpage-spinner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FullpageSpinnerComponent],
  exports: [FullpageSpinnerComponent],
})
export class FullpageSpinnerModule {}
