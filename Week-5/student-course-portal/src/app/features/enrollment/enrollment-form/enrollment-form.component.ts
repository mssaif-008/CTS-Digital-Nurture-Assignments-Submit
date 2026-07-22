import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EnrollmentRequest } from '../../../models/course';
import { CourseService } from '../../../services/course.service';
import { EnrollmentService } from '../../../services/enrollment.service';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './enrollment-form.component.html',
  styleUrl: './enrollment-form.component.css'
})
export class EnrollmentFormComponent {
  private readonly enrollmentService = inject(EnrollmentService);
  private readonly courseService = inject(CourseService);
  submittedMessage = '';
  model: EnrollmentRequest = {
    studentName: '',
    studentEmail: '',
    courseId: 1,
    preferredSemester: 'Odd',
    agreeToTerms: false
  };

  onSubmit(form: NgForm): void {
    console.log(form.value, form.valid);
    if (form.invalid) {
      return;
    }

    const generatedCourse = {
      name: `Enrollment Request ${form.value.courseId}`,
      code: `REQ${form.value.courseId}`,
      credits: 1,
      gradeStatus: 'pending' as const,
      description: `Created from ${form.value.studentName}'s enrollment form.`,
      instructor: 'Enrollment Office'
    };

    forkJoin({
      enrollment: this.enrollmentService.submitEnrollment(form.value),
      createdCourse: this.courseService.createCourse(generatedCourse)
    }).subscribe({
      next: ({ createdCourse }) => {
        this.submittedMessage = `Enrollment submitted and CourseService.createCourse created ${createdCourse.name}.`;
        form.resetForm({ preferredSemester: 'Odd', courseId: 1, agreeToTerms: false });
      },
      error: () => (this.submittedMessage = 'Submission failed. Start JSON Server and try again.')
    });
  }
}
