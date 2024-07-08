import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PedidoPageComponent } from './pedido-page.component';
import { PedidoApiService } from '../../services/pedido-api.service';

describe('PedidoPageComponent', () => {
  let component: PedidoPageComponent;
  let fixture: ComponentFixture<PedidoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule
      ],
      declarations: [PedidoPageComponent],
      providers: [PedidoApiService]
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
