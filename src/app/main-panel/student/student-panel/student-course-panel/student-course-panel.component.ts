import {Component, Input, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatList} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {NotificationShortComponent} from "../../../admin/admin-panel/notification-short/notification-short.component";
import {TaskElementShortComponent} from "../../../shared/task-element-short/task-element-short.component";
import {TopBarComponent} from "../../../shared/top-bar/top-bar.component";
import {ActivatedRoute} from "@angular/router";
import {AssignmentGetDto} from "../../../../api";
import {CustomCourseService} from "../../../admin/admin-panel/course-panel/custom-course.service";

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
  styleUrl: './student-course-panel.component.scss'
})
export class StudentCoursePanelComponent implements OnInit {

  courseId: string | null = '';
  tasks: AssignmentGetDto[] = [];

  constructor(private route: ActivatedRoute,
              private customCourseService: CustomCourseService) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('courseId');
    });

    this.loadTasks();


  }

  loadTasks() {
    if (this.courseId) {
      this.customCourseService.getAssignments(+this.courseId).subscribe(
        tasks => {
          this.tasks = tasks;
        },
        error => {
          console.error('Error fetching tasks:', error);
        }
      );
    }
  }

}
