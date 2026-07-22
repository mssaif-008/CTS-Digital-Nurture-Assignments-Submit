import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Course } from '../../models/course';
import { CourseCardComponent } from './course-card.component';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  const mockCourse: Course = { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CourseCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    component.course = mockCourse;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the course name from input', () => {
    fixture.detectChanges();
    const heading = fixture.debugElement.query(By.css('h3')).nativeElement as HTMLElement;
    expect(heading.textContent).toContain('Data Structures');
  });

  it('should emit the course id when enroll is clicked', () => {
    spyOn(component.enrollRequested, 'emit');
    fixture.detectChanges();
    fixture.debugElement.query(By.css('button.primary')).nativeElement.click();
    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  it('should log previous and current course values in ngOnChanges', () => {
    spyOn(console, 'log');
    component.ngOnChanges({ course: new SimpleChange(undefined, mockCourse, true) });
    expect(console.log).toHaveBeenCalled();
  });

  it('should apply enrolled class when enrolled is true', () => {
    component.enrolled = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.card--enrolled'))).toBeTruthy();
  });
});
