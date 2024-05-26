import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AssignmentGetDto, CourseDto, UserControllerService} from '../../../../api';
import { MatButton } from '@angular/material/button';
import { MatList } from '@angular/material/list';
import { NgForOf, NgIf } from '@angular/common';
import { NotificationShortComponent } from '../../../admin/admin-panel/notification-short/notification-short.component';
import { TaskElementShortComponent } from '../../../shared/task-element-short/task-element-short.component';
import { TopBarComponent } from '../../../shared/top-bar/top-bar.component';
import {AddTaskModalComponent} from "../../../admin/admin-panel/add-task-modal/add-task-modal.component";
import {CourseStateService} from "../../../admin/admin-panel/course-panel/course-state.service";

@Component({
  selector: 'app-student-course-panel',
  standalone: true,
  imports: [
    MatButton,
    MatList,
    NgForOf,
    NgIf,
    NotificationShortComponent,
    TaskElementShortComponent,
    TopBarComponent
  ],
  templateUrl: './student-course-panel.component.html',
  styleUrls: ['./student-course-panel.component.scss']
})
export class StudentCoursePanelComponent implements OnInit {

  course: CourseDto | undefined;
  tasks: AssignmentGetDto[] = [];
  newTask = '';
  professor_name = '';

  constructor(private courseStateService: CourseStateService,
              private dialog: MatDialog,
              private userService: UserControllerService) {}

  ngOnInit() {
    this.courseStateService.currentCourse.subscribe(course => {
      if (course) {
        this.course = course;
        if (this.course.teacherId !== undefined) {
          this.userService.getUserByIdUsingGET(this.course.teacherId).subscribe(user => {
            this.professor_name = `${user.firstName} ${user.lastName}`;
          });
        } else {
          console.error("Teacher ID is undefined");
        }
      }
    });
  }

  openCreateTaskModal() {
    const dialogRef = this.dialog.open(AddTaskModalComponent, {
      data: { newTask: this.newTask },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the newTask property or handle the result
        this.newTask = result;
      }
    });
  }
}
