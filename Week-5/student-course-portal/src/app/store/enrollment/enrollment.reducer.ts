import { createReducer, on } from '@ngrx/store';
import { enrollInCourse, setEnrolledCourses, unenrollFromCourse } from './enrollment.actions';

export const enrollmentFeatureKey = 'enrollment';

export interface EnrollmentState {
  enrolledCourseIds: number[];
}

export const initialEnrollmentState: EnrollmentState = {
  enrolledCourseIds: [1, 2]
};

export const enrollmentReducer = createReducer(
  initialEnrollmentState,
  on(enrollInCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.includes(courseId)
      ? state.enrolledCourseIds.filter((id) => id !== courseId)
      : [...state.enrolledCourseIds, courseId]
  })),
  on(unenrollFromCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.filter((id) => id !== courseId)
  })),
  on(setEnrolledCourses, (state, { courseIds }) => ({ ...state, enrolledCourseIds: courseIds }))
);
