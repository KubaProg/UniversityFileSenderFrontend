import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
import {CourseControllerService, CourseDto} from "../../../api";
import {CourseStateService} from "../../admin/admin-panel/course-panel/course-state.service";

@Component({
  selector: 'app-course-element-short',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    RouterLink,
    MatIcon,

  ],
  templateUrl: './course-element-short.component.html',
  styleUrl: './course-element-short.component.scss'
})
export class CourseElementShortComponent {

  @Input() course: CourseDto | undefined;
  @Input() isStudent = false;
  @Input() findMode = false;
  @Output() courseDeleted = new EventEmitter<void>();

  constructor(private courseService: CourseControllerService,
              public dialog: MatDialog, public router: Router,
              private courseStateService: CourseStateService) {}


  editCourse(course: CourseDto | undefined) {
    this.courseStateService.updateCurrentCourse(course);
    this.router.navigate(['/course-panel']);
  }

  openDeleteCourseModal(course: CourseDto | undefined) {
    const dialogRef = this.dialog.open(DeleteCourseModalComponent, {
      data: course  // Pass the course data into the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if(course) {
        if (result && course.courseName === result) {
          if (course.id) {
            this.courseService.deleteCourseUsingDELETE(course.id).subscribe(
              () => {
                console.log('Course deleted successfully');
              },
              error => {
                console.error('Failed to delete course', error);
              }
            );
            this.courseDeleted.emit();
          }
        }
      }
    });
  }



  openJoinCourseModal(course: CourseDto | undefined) {
    const dialogRef = this.dialog.open(JoinCourseModalComponent, {
      data: {course: this.course},
      width: '400px'
    });
  }
}
