import { TestBed } from '@angular/core/testing';

import { ProductosApiService } from './productos-api.service';

describe('ProductosApiService', () => {
  let service: ProductosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
