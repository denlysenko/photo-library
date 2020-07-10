import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InlineSpinnerComponent } from './inline-spinner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [InlineSpinnerComponent],
  exports: [InlineSpinnerComponent],
})
export class InlineSpinnerModule {}
