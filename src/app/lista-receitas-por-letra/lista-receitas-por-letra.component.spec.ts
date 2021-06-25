import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReceitasPorLetraComponent } from './lista-receitas-por-letra.component';

describe('ListaReceitasPorLetraComponent', () => {
  let component: ListaReceitasPorLetraComponent;
  let fixture: ComponentFixture<ListaReceitasPorLetraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaReceitasPorLetraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReceitasPorLetraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
