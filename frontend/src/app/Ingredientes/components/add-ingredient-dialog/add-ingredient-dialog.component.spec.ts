import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngredientDialogComponent } from './add-ingredient-dialog.component';

describe('AddIngredientDialogComponent', () => {
  let component: AddIngredientDialogComponent;
  let fixture: ComponentFixture<AddIngredientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIngredientDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddIngredientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
