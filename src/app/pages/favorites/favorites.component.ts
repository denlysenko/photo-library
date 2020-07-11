import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Photo } from '../../interfaces';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  readonly photos$: Observable<Photo[]> = this.route.data.pipe(
    map((data) => data.photos)
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  onPhotoClick(photo: Photo): void {
    this.router.navigate(['/photos', photo.id]);
  }
}
