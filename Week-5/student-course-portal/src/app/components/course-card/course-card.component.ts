import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Course } from '../../models/course';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, CreditLabelPipe],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnChanges {
  @Input({ required: true }) course!: Course;
  @Input() enrolled = false;
  @Output() enrollRequested = new EventEmitter<number>();
  @Output() cardSelected = new EventEmitter<number>();

  isExpanded = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('Course input changed', {
        previous: changes['course'].previousValue,
        current: changes['course'].currentValue
      });
    }
  }

  get cardClasses(): Record<string, boolean> {
    // A getter keeps conditional CSS decisions in TypeScript and leaves the template easy to scan.
    return {
      'card--enrolled': this.enrolled,
      'card--full': (this.course?.credits ?? 0) >= 4,
      expanded: this.isExpanded
    };
  }

  get borderStyle(): Record<string, string> {
    const colors = { passed: '#1f9d55', failed: '#d64545', pending: '#7b8494' };
    return { borderLeftColor: colors[this.course.gradeStatus] };
  }

  requestEnroll(event: Event): void {
    event.stopPropagation();
    this.enrollRequested.emit(this.course.id);
  }

  toggleDetails(event: Event): void {
    event.stopPropagation();
    this.isExpanded = !this.isExpanded;
  }
}

