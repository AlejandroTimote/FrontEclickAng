import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotUsernameDialogComponentComponent } from './forgot-username-dialog-component.component';

describe('ForgotUsernameDialogComponentComponent', () => {
  let component: ForgotUsernameDialogComponentComponent;
  let fixture: ComponentFixture<ForgotUsernameDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotUsernameDialogComponentComponent]
    });
    fixture = TestBed.createComponent(ForgotUsernameDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
