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

export const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'student', component: StudentPanelComponent },
  { path: 'login/:type', component: LoginComponent },
  { path: 'course-panel/:course', component: CoursePanelComponent },
  { path: 'student-course-panel/:course', component: StudentCoursePanelComponent },
  { path: 'courses', component: CourseFindComponent }
];
