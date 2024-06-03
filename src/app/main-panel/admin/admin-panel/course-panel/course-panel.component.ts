import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AssignmentGetDto, CourseDto, CourseEnrollmentDetailsDto} from '../../../../api';
import { TopBarComponent } from "../../../shared/top-bar/top-bar.component";
import { MatList, MatListItem } from "@angular/material/list";
import { MatButton } from "@angular/material/button";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { TaskElementShortComponent } from "../../../shared/task-element-short/task-element-short.component";
import { NotificationShortComponent } from "../notification-short/notification-short.component";
import { CourseStateService } from "./course-state.service";
import { CustomCourseService } from "./custom-course.service";
import {AddTaskModalComponent} from "../modals/add-task-modal/add-task-modal.component";

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
    AsyncPipe
  ],
  templateUrl: './course-panel.component.html',
  styleUrls: ['./course-panel.component.scss']
})
export class CoursePanelComponent implements OnInit {
  course: CourseDto | undefined;
  showNotifications = false;
  notifications: CourseEnrollmentDetailsDto[] = [];
  tasks: AssignmentGetDto[] = [];

  constructor(
    private dialog: MatDialog,
    private customCourseService: CustomCourseService,
    private courseStateService: CourseStateService,
  ) {}

  ngOnInit() {

    this.courseStateService.currentCourse.subscribe(course => {

      if (course) {
        this.course = course;
        this.loadTasks();
      } else {
        console.error('No course found');
      }
    });

    this.loadPendingEnrollments();

  }

  loadPendingEnrollments(): void {
    if (this.course?.id) {
      this.customCourseService.getPendingEnrollments(this.course.id).subscribe(
        notifications => {
          this.notifications = notifications;
        },
        error => {
          console.error('Error fetching notifications:', error);
        }
      );
    }
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

  onEnrollmentAccepted(enrollmentId: number): void {
    this.notifications = this.notifications.filter(notification => notification.enrollmentId !== enrollmentId);
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  openCreateTaskModal() {
    const dialogRef = this.dialog.open(AddTaskModalComponent, {
      data: { course: this.course },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadTasks();
    });
  }

}
