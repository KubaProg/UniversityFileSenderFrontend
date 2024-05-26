import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from "@angular/material/dialog";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { AssignmentGetDto } from "../../../../../api";

@Component({
  selector: 'app-delete-task-modal',
  templateUrl: './delete-task-modal.component.html',
  styleUrls: ['./delete-task-modal.component.scss'],
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
export class DeleteTaskModalComponent {
  taskNameConfirm = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<DeleteTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssignmentGetDto
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    if (this.taskNameConfirm.value === this.data.assignmentName) {
      this.dialogRef.close(this.taskNameConfirm.value);
    } else {
      this.dialogRef.close();
    }
  }
}
