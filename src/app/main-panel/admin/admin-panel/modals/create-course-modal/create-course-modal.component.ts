import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA, MatDialogModule
} from "@angular/material/dialog";
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-create-course-modal',
  templateUrl: './create-course-modal.component.html',
  styleUrls: ['./create-course-modal.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class CreateCourseModalComponent {
  courseForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateCourseModalComponent>) {
    this.courseForm = new FormGroup({
      courseName: new FormControl('', Validators.required)
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
