export type GradeStatus = 'passed' | 'failed' | 'pending';

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number | null;
  gradeStatus: GradeStatus;
  description?: string;
  instructor?: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  courseIds: number[];
}

export interface EnrollmentRequest {
  id?: number;
  studentName: string;
  studentEmail: string;
  courseId: number;
  preferredSemester: 'Odd' | 'Even';
  agreeToTerms: boolean;
}
