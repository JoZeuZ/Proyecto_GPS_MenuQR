import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoPageComponent } from './pedido-page.component';

describe('PedidoPageComponent', () => {
  let component: PedidoPageComponent;
  let fixture: ComponentFixture<PedidoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
