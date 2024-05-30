import { Routes } from '@angular/router';
import {StartComponent} from "./start-screen/start/start.component";
import {LoginComponent} from "./login-screen/login/login.component";
import {AdminPanelComponent} from "./main-panel/admin/admin-panel/admin-panel.component";
import {StudentPanelComponent} from "./main-panel/student/student-panel/student-panel.component";
import {CoursePanelComponent} from "./main-panel/admin/admin-panel/course-panel/course-panel.component";
import {CourseFindComponent} from "./main-panel/student/student-panel/course-find/course-find.component";
import {
  StudentCoursePanelComponent
} from "./main-panel/student/student-panel/student-course-panel/student-course-panel.component";
import {AuthGuard} from "./login-screen/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_TEACHER'] } },
  { path: 'student', component: StudentPanelComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_STUDENT'] } },
  { path: 'login/:type', component: LoginComponent },
  { path: 'course-panel', component: CoursePanelComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_TEACHER','ROLE_STUDENT'] } },
  { path: 'student-course-panel/:courseId', component: StudentCoursePanelComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_STUDENT'] } },
  { path: 'courses', component: CourseFindComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_STUDENT', 'ROLE_TEACHER'] } }
];
