import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoTileModule } from '../photo-tile/photo-tile.module';
import { PhotoGridComponent } from './photo-grid.component';

const photos = [
  {
    link: 'link',
    id: 'photoId',
  },
];

describe('PhotoGridComponent', () => {
  let component: PhotoGridComponent;
  let fixture: ComponentFixture<PhotoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, PhotoTileModule],
      declarations: [PhotoGridComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoGridComponent);
    component = fixture.componentInstance;
    component.photos = photos;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('photoClicked', () => {
    it('should emit event with photo id', () => {
      const photoClickedSpy = jest.spyOn(component.photoClicked, 'emit');
      const photoTile = fixture.nativeElement.querySelector(
        '[data-testid=photo-tile]'
      );
      photoTile.click();
      expect(photoClickedSpy).toHaveBeenCalledWith(photos[0]);
    });
  });
});
