import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { PhotosService } from '../../data-access';
import { Photo } from '../../interfaces/photo.interface';

@Injectable()
export class FavoritesResolver implements Resolve<Photo[]> {
  constructor(private readonly photosService: PhotosService) {}

  resolve(): Observable<Photo[]> {
    return this.photosService.getAllFavorites();
  }
}
