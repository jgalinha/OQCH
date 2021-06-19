import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitasFavoritasComponent } from './receitas-favoritas.component';

describe('ReceitasFavoritasComponent', () => {
  let component: ReceitasFavoritasComponent;
  let fixture: ComponentFixture<ReceitasFavoritasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceitasFavoritasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitasFavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
