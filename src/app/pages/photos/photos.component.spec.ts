import { CommonModule } from '@angular/common';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { PhotosService } from '../../data-access';
import {
  InfiniteScrollModule,
  InlineSpinnerModule,
  PhotoGridModule,
} from '../../ui';
import { PhotosComponent } from './photos.component';

(window as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}

  observe(): void {
    return null;
  }

  disconnect(): void {
    return null;
  }
};

const photos = [
  {
    id: 'uuid',
    link: 'link',
  },
];

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let photosService: PhotosService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        PhotoGridModule,
        InfiniteScrollModule,
        InlineSpinnerModule,
      ],
      declarations: [PhotosComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              photos,
            }),
          },
        },
        {
          provide: PhotosService,
          useValue: {
            getPhotos: jest.fn(() =>
              of([
                {
                  id: 'uuid2',
                  link: 'link2',
                },
              ])
            ),
            addToFavorites: jest.fn(() => of(true)),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    photosService = TestBed.inject(PhotosService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('loadMore', () => {
    it('should call getPhotos() and render new photos', fakeAsync(() => {
      component.loadMore.next();
      tick();
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
      expect(photosService.getPhotos).toHaveBeenCalledTimes(1);
    }));
  });

  describe('onPhotoClick', () => {
    it('should call addToFavorites()', fakeAsync(() => {
      fixture.nativeElement.querySelector('[data-testid=photo-tile]').click();
      tick();
      expect(photosService.addToFavorites).toHaveBeenCalledWith(photos[0]);
    }));
  });
});
