import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaFullComponent } from './receita-full.component';

describe('ReceitaFullComponent', () => {
  let component: ReceitaFullComponent;
  let fixture: ComponentFixture<ReceitaFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceitaFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitaFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
