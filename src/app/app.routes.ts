import { Routes } from '@angular/router';
import {StartComponent} from "./start-screen/start/start.component";
import {LoginComponent} from "./login-screen/login/login.component";
import {RegisterComponent} from "./register-screen/register/register.component";

export const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
