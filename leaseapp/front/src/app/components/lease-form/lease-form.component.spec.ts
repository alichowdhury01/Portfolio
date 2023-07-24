import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseFormComponent } from './lease-form.component';

describe('LeaseFormComponent', () => {
  let component: LeaseFormComponent;
  let fixture: ComponentFixture<LeaseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaseFormComponent]
    });
    fixture = TestBed.createComponent(LeaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
