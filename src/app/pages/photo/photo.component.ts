import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ProgressComponent } from '../../base';
import { PhotosService } from '../../data-access';
import { Photo } from '../../interfaces';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoComponent extends ProgressComponent {
  photo$: Observable<Photo> = this.route.data.pipe(map((data) => data.photo));

  constructor(
    private readonly route: ActivatedRoute,
    private readonly photosService: PhotosService,
    private readonly router: Router
  ) {
    super();
  }

  removeFromFavorites(photoId: string): void {
    this.loading.next(true);

    this.photosService
      .removeFromFavorites(photoId)
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe(() => {
        this.router.navigate(['/favorites']);
      });
  }
}
