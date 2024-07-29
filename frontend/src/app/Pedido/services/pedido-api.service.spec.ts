import { TestBed } from '@angular/core/testing';

import { PedidoApiService } from './pedido-api.service';

describe('PedidoApiService', () => {
  let service: PedidoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
