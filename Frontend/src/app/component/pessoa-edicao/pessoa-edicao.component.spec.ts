import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaEdicaoComponent } from './pessoa-edicao.component';

describe('PessoaEdicaoComponent', () => {
  let component: PessoaEdicaoComponent;
  let fixture: ComponentFixture<PessoaEdicaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PessoaEdicaoComponent]
    });
    fixture = TestBed.createComponent(PessoaEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
