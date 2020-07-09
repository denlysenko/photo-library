import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
});

describe('StorageService', () => {
  let service: StorageService;
  let getItemSpy: jest.SpyInstance<any>;
  let setItemSpy: jest.SpyInstance<any>;
  let removeItemSpy: jest.SpyInstance<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });

    service = TestBed.inject(StorageService);

    getItemSpy = jest.spyOn(window.localStorage, 'getItem');
    setItemSpy = jest.spyOn(window.localStorage, 'setItem');
    removeItemSpy = jest.spyOn(window.localStorage, 'removeItem');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getItem()', () => {
    it('should get item from localStorage', () => {
      service.getItem('test');
      expect(getItemSpy).toHaveBeenCalled();
    });
  });

  describe('setItem()', () => {
    it('should set item to localStorage', () => {
      service.setItem('test', 'value');
      expect(setItemSpy).toHaveBeenCalled();
    });
  });

  describe('removeItem()', () => {
    it('should remove item from localStorage', () => {
      service.removeItem('test');
      expect(removeItemSpy).toHaveBeenCalled();
    });
  });
});
