import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIngredientDialogComponent } from './edit-ingredient-dialog.component';

describe('EditIngredientDialogComponent', () => {
  let component: EditIngredientDialogComponent;
  let fixture: ComponentFixture<EditIngredientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIngredientDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditIngredientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
