import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadianComponent } from './radian.component';

describe('RadianComponent', () => {
  let component: RadianComponent;
  let fixture: ComponentFixture<RadianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadianComponent]
    });
    fixture = TestBed.createComponent(RadianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
