import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {CreateCourseModalComponent} from "../../admin/admin-panel/create-course-modal/create-course-modal.component";
import {DeleteCourseModalComponent} from "../../admin/admin-panel/delete-course-modal/delete-course-modal.component";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-course-element-short',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    RouterLink
  ],
  templateUrl: './course-element-short.component.html',
  styleUrl: './course-element-short.component.scss'
})
export class CourseElementShortComponent {

  @Input() course = 'Course Name'
  @Input() isStudent = false;
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
}
