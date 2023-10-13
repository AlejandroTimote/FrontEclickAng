import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmingComponent } from './confirming.component';

describe('ConfirmingComponent', () => {
  let component: ConfirmingComponent;
  let fixture: ComponentFixture<ConfirmingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmingComponent]
    });
    fixture = TestBed.createComponent(ConfirmingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
