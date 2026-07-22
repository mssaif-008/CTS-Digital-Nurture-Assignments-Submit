import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course, GradeStatus } from '../../models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-admin-course-manager',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-course-manager.component.html',
  styleUrl: './admin-course-manager.component.css'
})
export class AdminCourseManagerComponent {
  private readonly courseService = inject(CourseService);

  message = '';
  course: Course = {
    id: 6,
    name: 'New Elective',
    code: 'EL100',
    credits: 3,
    gradeStatus: 'pending',
    description: 'Administrator-created course listing.',
    instructor: 'Admin Office'
  };

  readonly gradeStatuses: GradeStatus[] = ['passed', 'failed', 'pending'];

  createCourse(): void {
    const { id, ...newCourse } = this.course;
    this.courseService.createCourse(newCourse).subscribe({
      next: (created) => (this.message = `Created course ${created.id}: ${created.name}`),
      error: (error: Error) => (this.message = error.message)
    });
  }

  updateCourse(): void {
    this.courseService.updateCourse(this.course).subscribe({
      next: (updated) => (this.message = `Updated course ${updated.id}: ${updated.name}`),
      error: (error: Error) => (this.message = error.message)
    });
  }

  deleteCourse(): void {
    this.courseService.deleteCourse(this.course.id).subscribe({
      next: () => (this.message = `Deleted course ${this.course.id}`),
      error: (error: Error) => (this.message = error.message)
    });
  }
}
