import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhotoComponent } from './photo.component';
import { PhotoResolver } from './photo.resolver';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PhotoComponent,
        resolve: {
          photo: PhotoResolver,
        },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PhotoRoutingModule {}
