import { CommonModule } from '@angular/common';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { of } from 'rxjs';

import { PhotosService } from '../../data-access';
import { PhotoTileModule } from '../../ui';
import { PhotoComponent } from './photo.component';

const photo = {
  id: 'uuid',
  link: 'link',
};

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;
  let photosService: PhotosService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, PhotoTileModule],
      declarations: [PhotoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              photo,
            }),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
        {
          provide: PhotosService,
          useValue: {
            removeFromFavorites: jest.fn(() => of(true)),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    photosService = TestBed.inject(PhotosService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('removeFromFavorites', () => {
    it('should remove photo from favorites', fakeAsync(() => {
      fixture.debugElement.nativeElement
        .querySelector('[data-testid=remove-button]')
        .click();

      tick();

      expect(photosService.removeFromFavorites).toHaveBeenCalledWith(photo.id);
    }));

    it('should navigate to favorites page', fakeAsync(() => {
      fixture.debugElement.nativeElement
        .querySelector('[data-testid=remove-button]')
        .click();

      tick();

      expect(router.navigate).toHaveBeenCalledWith(['/favorites']);
    }));
  });
});
