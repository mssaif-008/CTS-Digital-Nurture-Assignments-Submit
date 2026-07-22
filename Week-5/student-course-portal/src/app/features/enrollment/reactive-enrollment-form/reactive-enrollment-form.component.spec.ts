import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveEnrollmentFormComponent } from './reactive-enrollment-form.component';

describe('ReactiveEnrollmentFormComponent', () => {
  let fixture: ComponentFixture<ReactiveEnrollmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ReactiveEnrollmentFormComponent] }).compileComponents();
    fixture = TestBed.createComponent(ReactiveEnrollmentFormComponent);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
