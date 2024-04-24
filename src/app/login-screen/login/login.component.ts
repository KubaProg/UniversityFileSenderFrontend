import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
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
    MatFormField
  ],
  providers:  [{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
}
