import { Injectable } from '@angular/core';

import faker from 'faker';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { FAVORITES_KEY } from '../../constants';
import { StorageService } from '../../core';
import { Photo } from '../../interfaces';

function generateRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePhotos(count = 12): Photo[] {
  const photos = [];

  for (let i = 0; i < count; i++) {
    photos.push({
      id: faker.random.uuid(),
      link: faker.image.image(),
    });
  }

  return photos;
}

type PhotoEntities = {
  [id: string]: Photo;
};

@Injectable({ providedIn: 'root' })
export class PhotosService {
  constructor(private readonly storageService: StorageService) {}

  getPhotos(): Observable<Photo[]> {
    return of(generatePhotos()).pipe(delay(generateRandomInt(200, 300)));
  }

  getAllFavorites(): Observable<Photo[]> {
    const favorites = this.storageService.getItem<PhotoEntities>(FAVORITES_KEY);

    return of(favorites === null ? [] : Object.values(favorites)).pipe(
      delay(generateRandomInt(200, 300))
    );
  }

  getFavoriteById(id: string): Observable<Photo> {
    const favorites = this.storageService.getItem<PhotoEntities>(FAVORITES_KEY);

    return of(favorites === null ? null : favorites[id]).pipe(
      delay(generateRandomInt(200, 300))
    );
  }

  addToFavorites(photo: Photo): Observable<boolean> {
    const favorites = this.storageService.getItem<PhotoEntities>(FAVORITES_KEY);

    this.storageService.setItem<PhotoEntities>(FAVORITES_KEY, {
      ...favorites,
      [photo.id]: photo,
    });

    return of(true).pipe(delay(generateRandomInt(200, 300)));
  }

  removeFromFavorites(id: string): Observable<boolean> {
    const favorites = this.storageService.getItem<PhotoEntities>(FAVORITES_KEY);

    if (favorites !== null) {
      const { [id]: removed, ...updatedPhotos } = favorites;
      this.storageService.setItem(FAVORITES_KEY, updatedPhotos);
    }

    return of(true).pipe(delay(generateRandomInt(200, 300)));
  }
}
