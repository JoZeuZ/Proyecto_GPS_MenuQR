import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIngredientDialog } from './delete-ingredient-dialog.component';

describe('DeleteIngredientDialogComponent', () => {
  let component: DeleteIngredientDialog;
  let fixture: ComponentFixture<DeleteIngredientDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteIngredientDialog]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteIngredientDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
