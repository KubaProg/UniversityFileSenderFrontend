import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatError, MatFormField, MatHint, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { AuthService } from '../auth.service';
import { AuthenticationRequest } from '../../api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatLabel,
    MatHint,
    MatInput,
    MatError,
    NgIf,
    MatFormField,
    MatButton,
    MatCard,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  panelType = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,]],
      password: ['', [Validators.required]]
    });

    this.route.params.subscribe(params => {
      this.panelType = params['type'];
    });
  }

  logInUser() {
    const authRequest: AuthenticationRequest = {
      username: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.authService.logIn(authRequest).subscribe(() => {

        if (this.panelType === 'student') {
          this.router.navigate(['student']);
        } else if (this.panelType === 'admin') {
          this.router.navigate(['admin']);
        }

    }, error => {
      console.error('Login failed', error);
    });
  }
}
