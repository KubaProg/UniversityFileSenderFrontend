import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {addTaskDialogData} from "../../../../admin/admin-panel/admin-panel.component";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-join-course-modal',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './join-course-modal.component.html',
  styleUrl: './join-course-modal.component.scss'
})
export class JoinCourseModalComponent {

  constructor(
    public dialogRef: MatDialogRef<JoinCourseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: addTaskDialogData
  ) {}


  onRequestCourseJoin() {
    console.log('Request course join')

  }

}
