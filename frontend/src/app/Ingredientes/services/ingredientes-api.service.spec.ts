import { TestBed } from '@angular/core/testing';

import { IngredientesApiService } from './ingredientes-api.service';

describe('IngredientesApiService', () => {
  let service: IngredientesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
