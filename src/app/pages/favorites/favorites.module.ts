import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PhotoGridModule } from '../../ui';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';
import { FavoritesResolver } from './favorites.resolver';

@NgModule({
  imports: [CommonModule, FavoritesRoutingModule, PhotoGridModule],
  declarations: [FavoritesComponent],
  providers: [FavoritesResolver],
})
export class FavoritesModule {}
