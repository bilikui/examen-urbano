import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoClienteNewComponent } from './grupo-cliente-new.component';

describe('GrupoClienteNewComponent', () => {
  let component: GrupoClienteNewComponent;
  let fixture: ComponentFixture<GrupoClienteNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoClienteNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoClienteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
