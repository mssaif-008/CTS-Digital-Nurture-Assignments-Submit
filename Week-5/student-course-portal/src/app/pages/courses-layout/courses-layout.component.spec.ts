import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CoursesLayoutComponent } from './courses-layout.component';

describe('CoursesLayoutComponent', () => {
  let fixture: ComponentFixture<CoursesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesLayoutComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(CoursesLayoutComponent);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
