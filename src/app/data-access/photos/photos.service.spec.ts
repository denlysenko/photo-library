import { TestBed } from '@angular/core/testing';

import { DEFAULT_LIMIT, FAVORITES_KEY } from '../../constants';
import { StorageService } from '../../core';
import { PhotosService } from './photos.service';

jest.mock('faker', () => ({
  random: {
    uuid: () => 'uuid',
  },
  image: {
    image: () => 'image',
  },
}));

describe('PhotosService', () => {
  let service: PhotosService;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhotosService,
        {
          provide: StorageService,
          useValue: {
            getItem: jest.fn(),
            setItem: jest.fn(),
          },
        },
      ],
    });

    service = TestBed.inject(PhotosService);
    storageService = TestBed.inject(StorageService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPhotos', () => {
    it('should return photos', (done) => {
      service.getPhotos().subscribe((photos) => {
        expect(photos.length).toBe(DEFAULT_LIMIT);
        done();
      });
    });
  });

  describe('getAllFavorites', () => {
    it('should return empty array if favorites were not saved before', (done) => {
      jest.spyOn(storageService, 'getItem').mockReturnValueOnce(null);

      service.getAllFavorites().subscribe((photos) => {
        expect(photos.length).toBe(0);
        done();
      });
    });

    it('should return array of favorites', (done) => {
      const favoritePhoto = {
        id: 'uuid',
        link: 'image',
      };

      jest.spyOn(storageService, 'getItem').mockReturnValueOnce({
        [favoritePhoto.id]: favoritePhoto,
      });

      service.getAllFavorites().subscribe((photos) => {
        expect(photos.length).toBe(1);
        expect(photos).toEqual([favoritePhoto]);
        done();
      });
    });
  });

  describe('getFavoriteById', () => {
    it('should return empty array if favorites were not saved before', (done) => {
      jest.spyOn(storageService, 'getItem').mockReturnValueOnce(null);

      service.getFavoriteById('id').subscribe((photo) => {
        expect(photo).toBeNull();
        done();
      });
    });

    it('should return favorite photo by id', (done) => {
      const favoritePhoto = {
        id: 'uuid',
        link: 'image',
      };

      jest
        .spyOn(storageService, 'getItem')
        .mockReturnValueOnce({ [favoritePhoto.id]: favoritePhoto });

      service.getFavoriteById('uuid').subscribe((photo) => {
        expect(photo).toEqual(favoritePhoto);
        done();
      });
    });
  });

  describe('addToFavorites', () => {
    it('should create favorites entity and save passed photo', (done) => {
      const favoritePhoto = {
        id: 'uuid',
        link: 'image',
      };

      jest.spyOn(storageService, 'getItem').mockReturnValueOnce(null);

      service.addToFavorites(favoritePhoto).subscribe(() => {
        expect(storageService.setItem).toHaveBeenCalledWith(FAVORITES_KEY, {
          [favoritePhoto.id]: favoritePhoto,
        });

        done();
      });
    });

    it('should add passed photo to existing entity', (done) => {
      const favoritePhoto1 = {
        id: 'uuid1',
        link: 'image1',
      };

      const favoritePhoto2 = {
        id: 'uuid2',
        link: 'image2',
      };

      jest.spyOn(storageService, 'getItem').mockReturnValueOnce({
        [favoritePhoto1.id]: favoritePhoto1,
      });

      service.addToFavorites(favoritePhoto2).subscribe(() => {
        expect(storageService.setItem).toHaveBeenCalledWith(FAVORITES_KEY, {
          [favoritePhoto1.id]: favoritePhoto1,
          [favoritePhoto2.id]: favoritePhoto2,
        });

        done();
      });
    });
  });

  describe('removeFromFavorites', () => {
    it('should not update favorite entity if it does not exist', (done) => {
      jest.spyOn(storageService, 'getItem').mockReturnValueOnce(null);

      service.removeFromFavorites('uuid').subscribe(() => {
        expect(storageService.setItem).toHaveBeenCalledTimes(0);
        done();
      });
    });

    it('should update favorite entity by removing passed photo', (done) => {
      const favoritePhoto1 = {
        id: 'uuid1',
        link: 'image1',
      };

      const favoritePhoto2 = {
        id: 'uuid2',
        link: 'image2',
      };

      jest.spyOn(storageService, 'getItem').mockReturnValueOnce({
        [favoritePhoto1.id]: favoritePhoto1,
        [favoritePhoto2.id]: favoritePhoto2,
      });

      service.removeFromFavorites('uuid1').subscribe(() => {
        expect(storageService.setItem).toHaveBeenCalledWith(FAVORITES_KEY, {
          [favoritePhoto2.id]: favoritePhoto2,
        });
        done();
      });
    });
  });
});
