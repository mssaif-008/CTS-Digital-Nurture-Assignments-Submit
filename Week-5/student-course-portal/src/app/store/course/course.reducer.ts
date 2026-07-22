import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course';
import { MOCK_COURSES } from '../../data/mock-courses';
import { loadCourses, loadCoursesFailure, loadCoursesSuccess } from './course.actions';

export const courseFeatureKey = 'course';

export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialCourseState: CourseState = {
  courses: MOCK_COURSES,
  loading: false,
  error: null
};

export const courseReducer = createReducer(
  initialCourseState,
  on(loadCourses, (state) => ({ ...state, loading: true, error: null })),
  on(loadCoursesSuccess, (state, { courses }) => ({ ...state, courses, loading: false, error: null })),
  on(loadCoursesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
