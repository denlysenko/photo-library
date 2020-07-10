import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoTileComponent } from './photo-tile.component';

const photo = {
  id: 'photoId',
  link: 'link',
};

describe('PhotoTileComponent', () => {
  let component: PhotoTileComponent;
  let fixture: ComponentFixture<PhotoTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [PhotoTileComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoTileComponent);
    component = fixture.componentInstance;
    component.photo = photo;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should have sm css class by default', () => {
    fixture.detectChanges();
    const photoTile = fixture.nativeElement.querySelector('.photo-tile');
    expect(photoTile.classList.contains('sm')).toBeTruthy();
  });

  it('should have lg css class', () => {
    component.size = 'lg';
    fixture.detectChanges();
    const photoTile = fixture.nativeElement.querySelector('.photo-tile');
    expect(photoTile.classList.contains('lg')).toBeTruthy();
  });
});
