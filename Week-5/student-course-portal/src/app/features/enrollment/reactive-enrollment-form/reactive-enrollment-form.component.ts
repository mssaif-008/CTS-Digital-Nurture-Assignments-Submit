import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DirtyFormComponent } from '../../../guards/unsaved-changes.guard';

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrl: '../enrollment-form/enrollment-form.component.css'
})
export class ReactiveEnrollmentFormComponent implements DirtyFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly enrollForm = this.fb.nonNullable.group({
    studentName: ['', [Validators.required, Validators.minLength(3)]],
    studentEmail: ['', [Validators.required, Validators.email]],
    courseId: [1, [Validators.required, Validators.min(1)]],
    preferredSemester: ['Odd', Validators.required],
    agreeToTerms: [false, Validators.requiredTrue]
  });

  onSubmit(): void {
    if (this.enrollForm.invalid) {
      this.enrollForm.markAllAsTouched();
      return;
    }

    console.log(this.enrollForm.value, this.enrollForm.valid);
    this.enrollForm.markAsPristine();
  }

  hasUnsavedChanges(): boolean {
    return this.enrollForm.dirty;
  }
}
