import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentGetDto, CourseControllerService, CourseDto } from '../../../../api';
import { TopBarComponent } from "../../../shared/top-bar/top-bar.component";
import { MatList, MatListItem } from "@angular/material/list";
import { MatButton } from "@angular/material/button";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import { TaskElementShortComponent } from "../../../shared/task-element-short/task-element-short.component";
import { NotificationShortComponent } from "../notification-short/notification-short.component";
import { AddTaskModalComponent } from "../add-task-modal/add-task-modal.component";
import { CourseStateService } from "./course-state.service";
import {CustomCourseService} from "./custom-course.service";

@Component({
  selector: 'app-course-panel',
  standalone: true,
  imports: [
    TopBarComponent,
    MatList,
    MatListItem,
    MatButton,
    NgForOf,
    NgIf,
    TaskElementShortComponent,
    NotificationShortComponent,
    AsyncPipe,
  ],
  templateUrl: './course-panel.component.html',
  styleUrls: ['./course-panel.component.scss']
})
export class CoursePanelComponent implements OnInit {
  course: CourseDto | undefined;
  showNotifications = false;
  notifications: string[] = ["Notification 1", "Notification 2"];
  tasks: AssignmentGetDto[] = [];
  newTask = '';

  constructor(
    private dialog: MatDialog,
    private customCourseService: CustomCourseService,
    private courseStateService: CourseStateService
  ) {}

  ngOnInit() {
    this.courseStateService.currentCourse.subscribe(course => {
      if(course){
        this.course = course;
        this.loadTasks();
      } else {
        console.error('No course found');
      }
    });
  }


  loadTasks() {
    if (this.course?.id) {
      this.customCourseService.getAssignments(this.course.id).subscribe(
        tasks => {
          this.tasks = tasks;
        },
        error => {
          console.error('Error fetching tasks:', error);
        }
      );
    }
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  openCreateTaskModal() {
    const dialogRef = this.dialog.open(AddTaskModalComponent, {
      data: { newTask: this.newTask },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newTask = result;
      }
    });
  }
}
