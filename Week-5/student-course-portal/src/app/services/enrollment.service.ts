import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { EnrollmentRequest, Student } from '../models/course';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private readonly enrollmentsUrl = 'http://localhost:3000/enrollments';
  private readonly studentsUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  submitEnrollment(request: EnrollmentRequest): Observable<EnrollmentRequest> {
    return this.http.post<EnrollmentRequest>(this.enrollmentsUrl, request);
  }

  getStudentsByCourse(courseId: number): Observable<Student[]> {
    return of(courseId).pipe(
      // switchMap cancels the previous HTTP request if a new course id arrives first.
      switchMap((id) => this.http.get<Student[]>(this.studentsUrl).pipe(
        map((students) => students.filter((student) => student.courseIds.includes(id)))
      ))
    );
  }
}
