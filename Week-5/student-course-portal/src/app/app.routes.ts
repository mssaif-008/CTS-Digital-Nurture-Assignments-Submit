import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AdminCourseManagerComponent } from './pages/admin-course-manager/admin-course-manager.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CoursesLayoutComponent } from './pages/courses-layout/courses-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'courses',
    component: CoursesLayoutComponent,
    children: [
      { path: '', component: CourseListComponent },
      { path: ':id', component: CourseDetailComponent }
    ]
  },
  {
    path: 'enroll',
    canActivate: [authGuard],
    loadChildren: () => import('./features/enrollment/enrollment.module').then((m) => m.EnrollmentModule)
  },
  { path: 'admin', canActivate: [authGuard], component: AdminCourseManagerComponent },
  { path: 'profile', canActivate: [authGuard], component: StudentProfileComponent },
  { path: '**', component: NotFoundComponent }
];
