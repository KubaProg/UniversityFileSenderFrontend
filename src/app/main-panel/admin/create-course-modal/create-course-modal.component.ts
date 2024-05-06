import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {CourseDialogData} from "../admin-panel/admin-panel.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-create-course-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatLabel,
    MatFormField,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatInput,
    MatButton
  ],
  templateUrl: './create-course-modal.component.html',
  styleUrl: './create-course-modal.component.scss'
})
export class CreateCourseModalComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateCourseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseDialogData,
  ) {}

  onCancelCLick(): void {
    this.dialogRef.close();
  }

}
