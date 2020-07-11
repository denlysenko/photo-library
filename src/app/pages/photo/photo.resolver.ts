import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { PhotosService } from '../../data-access';
import { Photo } from '../../interfaces';

@Injectable()
export class PhotoResolver implements Resolve<Photo> {
  constructor(private readonly photosService: PhotosService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Photo> {
    const photoId = route.paramMap.get('id');
    return this.photosService.getFavoriteById(photoId);
  }
}
