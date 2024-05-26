import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions} from "@angular/material/dialog";
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { CourseDto } from "../../../../../api";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-delete-course-modal',
  templateUrl: './delete-course-modal.component.html',
  styleUrls: ['./delete-course-modal.component.scss'],
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton,
    MatLabel
  ]
})
export class DeleteCourseModalComponent {
  courseNameConfirm = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<DeleteCourseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseDto
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    if (this.courseNameConfirm.value === this.data.courseName) {
      this.dialogRef.close(this.courseNameConfirm.value);
    } else {
      this.dialogRef.close();
    }
  }
}
