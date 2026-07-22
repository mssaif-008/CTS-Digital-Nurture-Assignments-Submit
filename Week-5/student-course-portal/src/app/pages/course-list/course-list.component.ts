import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest, map, switchMap, takeUntil } from 'rxjs';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { HighlightDirective } from '../../directives/highlight.directive';
import { Course, Student } from '../../models/course';
import { EnrollmentService } from '../../services/enrollment.service';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesError, selectCoursesLoading } from '../../store/course/course.selectors';
import { enrollInCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [AsyncPipe, FormsModule, NgFor, NgIf, CourseCardComponent, HighlightDirective],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly enrollmentService = inject(EnrollmentService);
  private readonly destroy$ = new Subject<void>();
  private readonly selectedStudentsCourseId$ = new Subject<number>();

  isLoading = true;
  searchTerm = '';
  selectedCourseId?: number;
  courses$: Observable<Course[]> = this.store.select(selectAllCourses);
  loading$ = this.store.select(selectCoursesLoading);
  error$ = this.store.select(selectCoursesError);
  enrolledIds$ = this.store.select(selectEnrolledIds);
  enrolledStudents$ = this.selectedStudentsCourseId$.pipe(
    switchMap((courseId) => this.enrollmentService.getStudentsByCourse(courseId))
  );
  filteredCourses$ = combineLatest([this.courses$, this.route.queryParamMap]).pipe(
    map(([courses, params]) => {
      const search = (params.get('search') || '').toLowerCase();
      this.searchTerm = params.get('search') || '';
      return search ? courses.filter((course) => course.name.toLowerCase().includes(search) || course.code.toLowerCase().includes(search)) : courses;
    })
  );

  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.searchTerm = params.get('search') || '';
    });
    setTimeout(() => (this.isLoading = false), 1500);
    this.store.dispatch(loadCourses());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByCourseId(index: number, course: Course): number {
    // trackBy preserves unchanged DOM nodes when the array changes, which keeps large lists faster.
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
    this.selectedStudentsCourseId$.next(courseId);
    this.store.dispatch(enrollInCourse({ courseId }));
  }

  openCourse(courseId: number): void {
    this.router.navigate(['courses', courseId]);
  }

  updateSearch(): void {
    this.router.navigate(['courses'], { queryParams: { search: this.searchTerm || null } });
  }
}
