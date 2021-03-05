import { TestBed } from '@angular/core/testing';

import { ProducService } from './produc.service';

describe('ProducService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProducService = TestBed.get(ProducService);
    expect(service).toBeTruthy();
  });
});
