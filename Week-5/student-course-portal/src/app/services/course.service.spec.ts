import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Course } from '../models/course';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;
  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Angular Fundamentals', code: 'WEB201', credits: 3, gradeStatus: 'pending' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should load courses from the API', () => {
    service.getCourses().subscribe((courses) => expect(courses.length).toBe(2));
    httpMock.expectOne('http://localhost:3000/courses').flush(mockCourses);
  });

  it('should emit a friendly error when loading courses fails', () => {
    service.getCourses().subscribe({
      error: (error: Error) => expect(error.message).toBe('Failed to load courses. Please try again.')
    });

    httpMock.expectOne('http://localhost:3000/courses').flush('fail', { status: 500, statusText: 'Server Error' });
    httpMock.expectOne('http://localhost:3000/courses').flush('fail', { status: 500, statusText: 'Server Error' });
    httpMock.expectOne('http://localhost:3000/courses').flush('fail', { status: 500, statusText: 'Server Error' });
  });
});
