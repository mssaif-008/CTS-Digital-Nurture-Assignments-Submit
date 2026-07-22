import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, tap, throwError } from 'rxjs';
import { Course } from '../models/course';

const API_URL = 'http://localhost:3000/courses';

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(API_URL).pipe(
      map((courses) => courses.filter((course) => (course.credits ?? 0) > 0)),
      // tap is for side effects such as logging; map stays reserved for data transformation.
      tap((courses) => console.log('Courses loaded:', courses.length)),
      retry(2),
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${API_URL}/${id}`).pipe(
      catchError(() => throwError(() => new Error('Failed to load course details.')))
    );
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(API_URL, course);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${API_URL}/${course.id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
