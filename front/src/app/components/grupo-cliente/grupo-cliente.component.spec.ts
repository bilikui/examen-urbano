import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoClienteComponent } from './grupo-cliente.component';

describe('GrupoClienteComponent', () => {
  let component: GrupoClienteComponent;
  let fixture: ComponentFixture<GrupoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
