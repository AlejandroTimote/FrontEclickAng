import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EDigitalComponent } from './e-digital.component';

describe('EDigitalComponent', () => {
  let component: EDigitalComponent;
  let fixture: ComponentFixture<EDigitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EDigitalComponent]
    });
    fixture = TestBed.createComponent(EDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
