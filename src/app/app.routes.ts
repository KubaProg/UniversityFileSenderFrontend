import { Routes } from '@angular/router';
import {StartComponent} from "./start-screen/start/start.component";
import {LoginComponent} from "./login-screen/login/login.component";
import {RegisterComponent} from "./register-screen/register/register.component";
import {AdminPanelComponent} from "./main-panel/admin/admin-panel/admin-panel.component";
import {StudentPanelComponent} from "./main-panel/student/student-panel/student-panel.component";

export const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'student', component: StudentPanelComponent },
  { path: 'login/:type', component: LoginComponent }
];
