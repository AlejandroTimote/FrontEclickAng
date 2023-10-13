import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactelectronicaComponent } from './factelectronica.component';

describe('FactelectronicaComponent', () => {
  let component: FactelectronicaComponent;
  let fixture: ComponentFixture<FactelectronicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FactelectronicaComponent]
    });
    fixture = TestBed.createComponent(FactelectronicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
