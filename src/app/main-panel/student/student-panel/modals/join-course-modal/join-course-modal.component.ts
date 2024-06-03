import {Component, EventEmitter, Inject, Output} from '@angular/core';
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
import {CourseDto} from "../../../../../api";
import {CustomCourseService} from "../../../../admin/admin-panel/course-panel/custom-course.service";

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
    @Inject(MAT_DIALOG_DATA) public data: CourseDto,
    private courseService: CustomCourseService
  ) {}

  onRequestCourseJoin() {
    if(this.data.id){
      this.courseService.createPendingEnrollment(this.data.id).subscribe(
        () => {
          console.log('Enrollment request sent successfully');
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error requesting enrollment:', error);
        }
      );
    }
  }


  }
