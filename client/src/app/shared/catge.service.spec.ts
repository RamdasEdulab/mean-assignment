import { TestBed } from '@angular/core/testing';

import { CatgeService } from './catge.service';

describe('CatgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatgeService = TestBed.get(CatgeService);
    expect(service).toBeTruthy();
  });
});
