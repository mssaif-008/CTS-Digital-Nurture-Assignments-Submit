import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MOCK_COURSES } from '../../data/mock-courses';
import { CourseListComponent } from './course-list.component';

describe('CourseListComponent', () => {
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: {
            course: { courses: MOCK_COURSES, loading: false, error: null },
            enrollment: { enrolledCourseIds: [1] }
          }
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseListComponent);
  });

  it('should render course cards from mock store state', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-course-card').length).toBe(MOCK_COURSES.length);
  });

  it('should show loading text from mock store state', () => {
    store.setState({ course: { courses: [], loading: true, error: null }, enrollment: { enrolledCourseIds: [] } });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Loading courses');
  });
});
