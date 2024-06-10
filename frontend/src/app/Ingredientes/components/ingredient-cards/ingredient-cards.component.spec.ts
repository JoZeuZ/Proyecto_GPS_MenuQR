import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientCardsComponent } from './ingredient-cards.component';

describe('IngredientCardsComponent', () => {
  let component: IngredientCardsComponent;
  let fixture: ComponentFixture<IngredientCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
