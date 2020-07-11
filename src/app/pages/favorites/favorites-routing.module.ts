import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesComponent } from './favorites.component';
import { FavoritesResolver } from './favorites.resolver';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: FavoritesComponent,
        resolve: {
          photos: FavoritesResolver,
        },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class FavoritesRoutingModule {}
