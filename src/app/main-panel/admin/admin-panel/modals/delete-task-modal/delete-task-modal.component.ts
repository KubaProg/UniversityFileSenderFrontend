import {Component, Inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
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
import {addTaskDialogData} from "../../admin-panel.component";
@Component({
  selector: 'app-delete-task-modal',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogClose
  ],
  templateUrl: './delete-task-modal.component.html',
  styleUrl: './delete-task-modal.component.scss'
})
export class DeleteTaskModalComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: addTaskDialogData
  ) {}

  onCancelCLick(): void {
    this.dialogRef.close();
  }

}
