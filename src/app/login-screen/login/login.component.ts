import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {ActivatedRoute, Router} from "@angular/router";

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
    MatCard
  ],
  providers:  [{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  panelType = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute
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
    if (this.panelType === 'student') {
      this.router.navigate(['student']);
    } else if (this.panelType === 'admin') {
      this.router.navigate(['admin']);
    }
  }

}
