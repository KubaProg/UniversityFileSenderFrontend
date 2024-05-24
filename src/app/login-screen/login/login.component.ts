import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from "@angular/material/core";
import { MatError, MatFormField, MatHint, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationControllerService, AuthenticationRequest } from "../../api";
import {HttpClient} from "@angular/common/http";

interface AuthenticationResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatLabel,
    MatHint,
    ReactiveFormsModule,
    MatInput,
    MatError,
    NgIf,
    MatFormField,
    MatButton,
    MatCard,
  ],
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }, AuthenticationControllerService],
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
    private authenticationService: AuthenticationControllerService,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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

    const url = 'http://localhost:8080/api/public/login';
    this.http.post<AuthenticationResponse>(url, authRequest).subscribe(response => {
      console.log('Full response:', response);

      const token = response.token;
      console.log('Extracted token:', token);

      if (token) {
        if (this.panelType === 'student') {
          this.router.navigate(['student']);
        } else if (this.panelType === 'admin') {
          this.router.navigate(['admin']);
        }
      } else {
        console.error('Token is undefined or null');
      }
    }, error => {
      console.error('Login failed', error);
    });
  }

}
