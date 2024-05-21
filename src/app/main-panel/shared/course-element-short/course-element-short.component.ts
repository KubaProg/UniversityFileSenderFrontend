import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {Router, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {
  JoinCourseModalComponent
} from "../../student/student-panel/modals/join-course-modal/join-course-modal.component";
import {
  DeleteCourseModalComponent
} from "../../admin/admin-panel/modals/delete-course-modal/delete-course-modal.component";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-course-element-short',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    RouterLink,
    MatIcon,
    MatLabel
  ],
  templateUrl: './course-element-short.component.html',
  styleUrl: './course-element-short.component.scss'
})
export class CourseElementShortComponent {

  @Input() course = 'Course Name'
  @Input() isStudent = false;
  @Input() findMode = false;
  name = '';


  constructor(public dialog: MatDialog, public router: Router) {}

  openDeleteCourseModal(){
    const dialogRef = this.dialog.open(DeleteCourseModalComponent, {
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
    });
  }

  openJoinCourseModal(course: string) {
    const dialogRef = this.dialog.open(JoinCourseModalComponent, {
      data: {name: this.name},
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
    });
  }
}
