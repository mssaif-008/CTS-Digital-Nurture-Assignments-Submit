import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCourseManagerComponent } from './admin-course-manager.component';

describe('AdminCourseManagerComponent', () => {
  let fixture: ComponentFixture<AdminCourseManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCourseManagerComponent],
      providers: [provideHttpClient()]
    }).compileComponents();
    fixture = TestBed.createComponent(AdminCourseManagerComponent);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
