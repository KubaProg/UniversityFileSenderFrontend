import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {addCourseDialogData} from "../admin-panel.component";

@Component({
  selector: 'app-delete-course-modal',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDialogClose,
    FormsModule
  ],
  templateUrl: './delete-course-modal.component.html',
  styleUrl: './delete-course-modal.component.scss'
})
export class DeleteCourseModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCourseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: addCourseDialogData,
  ) {}

  onCancelCLick(): void {
    this.dialogRef.close();
  }
}
