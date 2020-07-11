import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { merge, Observable, Subject } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import { ProgressComponent } from '../../base';
import { DEFAULT_LIMIT } from '../../constants';
import { PhotosService } from '../../data-access';
import { Photo } from '../../interfaces';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent extends ProgressComponent {
  readonly loadMore = new Subject<void>();

  private cache: Photo[] = [];

  readonly photos$: Observable<Photo[]> = merge(
    this.route.data.pipe(map((data) => data.photos)),
    this.loadMore.asObservable().pipe(
      switchMap(() => {
        this.loading.next(true);
        return this.photosService.getPhotos().pipe(
          tap(() => this.loading.next(false)),
          catchError(() => {
            this.loading.next(false);
            return [];
          })
        );
      })
    )
  ).pipe(
    distinctUntilChanged(),
    map((photos) => {
      this.cache = [...this.cache, ...photos];
      return this.cache;
    })
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly photosService: PhotosService
  ) {
    super();
  }

  onScrolled(): void {
    if (this.cache.length <= DEFAULT_LIMIT) {
      return;
    }

    this.loadMore.next();
  }

  onPhotoClick(photo: Photo): void {
    this.photosService.addToFavorites(photo).subscribe();
  }
}
