import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarReceitasComponent } from './pesquisar-receitas.component';

describe('PesquisarReceitasComponent', () => {
  let component: PesquisarReceitasComponent;
  let fixture: ComponentFixture<PesquisarReceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesquisarReceitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
