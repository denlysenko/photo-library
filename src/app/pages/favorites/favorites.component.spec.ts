import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { of } from 'rxjs';

import { PhotoGridModule } from '../../ui';
import { FavoritesComponent } from './favorites.component';

const photos = [
  {
    id: 'uuid',
    link: 'link',
  },
];

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, PhotoGridModule],
      declarations: [FavoritesComponent],
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
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('onPhotoClick', () => {
    it('should navigate to photo page', () => {
      fixture.debugElement.nativeElement
        .querySelector('[data-testid=photo-tile]')
        .click();

      expect(router.navigate).toHaveBeenLastCalledWith([
        '/photos',
        photos[0].id,
      ]);
    });
  });
});
