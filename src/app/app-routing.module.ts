import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhotosComponent } from './pages/photos/photos.component';
import { PhotosResolver } from './pages/photos/photos.resolver';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: PhotosComponent,
        resolve: {
          photos: PhotosResolver,
        },
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./pages/favorites/favorites.module').then(
            (m) => m.FavoritesModule
          ),
      },
      {
        path: 'photos/:id',
        loadChildren: () =>
          import('./pages/photo/photo.module').then((m) => m.PhotoModule),
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
