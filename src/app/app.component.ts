import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {LoginComponent} from "./login-screen/login/login.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatLabel, MatInput, MatFormField, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UniversityFileSender';
}
